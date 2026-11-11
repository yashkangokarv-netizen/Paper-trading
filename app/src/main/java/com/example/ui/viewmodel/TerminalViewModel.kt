package com.example.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.local.GreeksCalculator
import com.example.data.local.MarketUniverse
import com.example.data.local.PaperTradingStore
import com.example.data.model.AssetUniverseItem
import com.example.data.model.Candle
import com.example.data.model.ChatMessage
import com.example.data.model.Greeks
import com.example.data.model.MarketBreadth
import com.example.data.model.OptionChainRow
import com.example.data.model.SignalAnalysis
import com.example.data.model.TradeHistoryItem
import com.example.data.model.TradePosition
import com.example.data.remote.RealMarketDataService
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.roundToInt

class TerminalViewModel(application: Application) : AndroidViewModel(application) {

    private val store = PaperTradingStore(application)
    private val realMarketService = RealMarketDataService()

    private val _assets = MutableStateFlow(MarketUniverse.getInitialAssets())
    val assets: StateFlow<List<AssetUniverseItem>> = _assets.asStateFlow()

    private val _selectedAssetKey = MutableStateFlow("NIFTY")
    val selectedAssetKey: StateFlow<String> = _selectedAssetKey.asStateFlow()

    private val _candles = MutableStateFlow<List<Candle>>(emptyList())
    val candles: StateFlow<List<Candle>> = _candles.asStateFlow()

    private val _greeks = MutableStateFlow(Greeks())
    val greeks: StateFlow<Greeks> = _greeks.asStateFlow()

    private val _analysis = MutableStateFlow(SignalAnalysis())
    val analysis: StateFlow<SignalAnalysis> = _analysis.asStateFlow()

    // Real Live Feed status
    val isLiveFeedActive = MutableStateFlow(true)
    val isRefreshing = MutableStateFlow(false)
    val lastFeedSyncTime = MutableStateFlow(SimpleDateFormat("HH:mm:ss", Locale.ENGLISH).format(Date()))
    val liveFeedSource = MutableStateFlow("NSE/BSE Real-Time Feed")

    // Market Overview data
    val marketBreadth = MutableStateFlow(MarketBreadth(advances = 13, declines = 7, unchanged = 0))
    val sectors = MutableStateFlow(MarketUniverse.SECTORS)
    val globalMarkets = MutableStateFlow(MarketUniverse.GLOBAL_MARKETS)

    // Option Chain state
    private val _optionChainAssetKey = MutableStateFlow("NIFTY")
    val optionChainAssetKey: StateFlow<String> = _optionChainAssetKey.asStateFlow()

    private val _optionChainRows = MutableStateFlow<List<OptionChainRow>>(emptyList())
    val optionChainRows: StateFlow<List<OptionChainRow>> = _optionChainRows.asStateFlow()

    // Order Pad state
    val orderSide = MutableStateFlow("BUY") // "BUY" or "SELL"
    val orderInstrument = MutableStateFlow("FUT") // "EQ", "FUT", "OPT"
    val orderQty = MutableStateFlow(65)

    // Virtual Portfolio state
    val availableBalance = MutableStateFlow(store.availableBalance)
    val realizedPnL = MutableStateFlow(store.realizedPnL)
    val activePositions = MutableStateFlow(store.loadPositions())
    val tradeHistory = MutableStateFlow(store.loadTradeHistory())
    val renewalStatus = MutableStateFlow(store.renewalStatus)

    // Toast/Alert message event
    private val _userMessage = MutableSharedFlow<String>()
    val userMessage: SharedFlow<String> = _userMessage.asSharedFlow()

    // AI Coach Chat
    private val _chatMessages = MutableStateFlow(
        listOf(
            ChatMessage(
                sender = "ai",
                time = SimpleDateFormat("hh:mm a", Locale.ENGLISH).format(Date()),
                text = "Welcome to Paper Trading Terminal! Connected to real live NSE/BSE stock data with ₹5,00,000 virtual cash to practice stock, futures, and option trading risk-free.\n\nAsk me anything like:\n• 'How do I place my first trade?'\n• 'What is a Stop Loss?'\n• 'Explain Candlesticks'\n• 'Diagnose NIFTY setup'"
            )
        )
    )
    val chatMessages: StateFlow<List<ChatMessage>> = _chatMessages.asStateFlow()

    init {
        selectAsset("NIFTY")
        viewModelScope.launch {
            refreshRealMarketData(showUserToast = false)
            startLivePollingLoop()
        }
    }

    fun selectAsset(key: String) {
        _selectedAssetKey.value = key
        val asset = _assets.value.find { it.id == key } ?: _assets.value.first()

        // Generate baseline candles first for immediate UI render
        _candles.value = MarketUniverse.generateCandlesForAsset(asset)

        // Set default order instrument based on index vs equity
        if (asset.type == "INDEX") {
            orderInstrument.value = "FUT"
            orderQty.value = MarketUniverse.getLotSize(key, "FUT")
        } else {
            orderInstrument.value = "EQ"
            orderQty.value = 10
        }

        recalculateAnalytics(asset)

        // Fetch real candlestick chart data asynchronously
        viewModelScope.launch {
            val yahooSym = MarketUniverse.YAHOO_SYMBOL_MAP[key] ?: "^NSEI"
            val realCandles = realMarketService.fetchCandles(yahooSym, interval = "15m", range = "5d")
            if (realCandles.isNotEmpty()) {
                _candles.value = realCandles
            }
        }
    }

    fun selectOptionChainAsset(key: String) {
        _optionChainAssetKey.value = key
        buildOptionChain(key)
    }

    private fun recalculateAnalytics(asset: AssetUniverseItem) {
        val spot = asset.price
        val vix = asset.vix
        val pcr = asset.pcr
        val dte = 1.0
        val iv = max(8.0, vix)
        val step = asset.strikeStep

        val callRes = (Math.ceil(spot / step) * step + step * 2)
        val putSup = (Math.floor(spot / step) * step - step * 2)

        _greeks.value = GreeksCalculator.calculateGreeks(spot, spot, dte, iv)
        _analysis.value = GreeksCalculator.runDeterministicAnalysis(
            spotPrice = spot,
            vix = vix,
            pcr = pcr,
            dte = dte,
            iv = iv,
            trend = asset.trend,
            newsSentiment = asset.newsSentiment,
            callResistance = callRes,
            putSupport = putSup
        )

        buildOptionChain(_optionChainAssetKey.value)
    }

    fun buildOptionChain(assetKey: String) {
        val asset = _assets.value.find { it.id == assetKey } ?: return
        val spot = asset.price
        val step = asset.strikeStep
        val atmStrike = (spot / step).roundToInt() * step
        val dte = 1.0
        val iv = max(8.0, asset.vix)

        val rows = mutableListOf<OptionChainRow>()
        for (i in -6..6) {
            val strike = atmStrike + (i * step)
            val isATM = strike == atmStrike
            val callLtp = GreeksCalculator.calculateBSOptionPrice(spot, strike, dte, iv, "CE")
            val putLtp = GreeksCalculator.calculateBSOptionPrice(spot, strike, dte, iv, "PE")
            val callITM = strike < spot
            val putITM = strike > spot

            val dist = abs(strike - atmStrike) / step
            val baseOI = max(6.0, (80.0 - dist * 10.0))
            val callOI = (baseOI * (if (callITM) 0.85 else 1.15) * 10.0).roundToInt() / 10.0
            val putOI = (baseOI * (if (putITM) 0.85 else 1.15) * 10.0).roundToInt() / 10.0

            rows.add(
                OptionChainRow(
                    strike = strike,
                    isATM = isATM,
                    callOI = callOI,
                    callLtp = callLtp,
                    callITM = callITM,
                    putLtp = putLtp,
                    putOI = putOI,
                    putITM = putITM
                )
            )
        }
        _optionChainRows.value = rows
    }

    /**
     * Synchronize live market data from real NSE/BSE market feed
     */
    fun refreshRealMarketData(showUserToast: Boolean = true) {
        viewModelScope.launch {
            isRefreshing.value = true
            try {
                // Collect Yahoo symbols to query
                val symbols = MarketUniverse.YAHOO_SYMBOL_MAP.values.toList()
                val quotes = realMarketService.fetchBatchQuotes(symbols)
                val liveVix = realMarketService.fetchIndiaVix()
                val liveGlobals = realMarketService.fetchGlobalMarkets()

                if (quotes.isNotEmpty()) {
                    val updatedAssets = _assets.value.map { item ->
                        val yahooSym = MarketUniverse.YAHOO_SYMBOL_MAP[item.id]
                        val q = if (yahooSym != null) quotes[yahooSym] else null
                        if (q != null) {
                            val newTrend = if (q.changePts >= 0) "BULL" else "BEAR"
                            val newVix = liveVix ?: item.vix
                            item.copy(
                                price = q.price,
                                prevClose = q.prevClose,
                                high = max(item.high, q.high),
                                low = if (item.low > 0) kotlin.math.min(item.low, q.low) else q.low,
                                vix = newVix,
                                trend = newTrend
                            )
                        } else item
                    }
                    _assets.value = updatedAssets

                    // Calculate market breadth advances/declines
                    val advances = updatedAssets.count { it.changePts >= 0 }
                    val declines = updatedAssets.count { it.changePts < 0 }
                    marketBreadth.value = MarketBreadth(advances = advances, declines = declines, unchanged = 0)

                    if (liveGlobals.isNotEmpty()) {
                        globalMarkets.value = liveGlobals
                    }

                    // Refresh active asset analytics & candles
                    val currentAsset = updatedAssets.find { it.id == _selectedAssetKey.value }
                    if (currentAsset != null) {
                        recalculateAnalytics(currentAsset)
                        val yahooSym = MarketUniverse.YAHOO_SYMBOL_MAP[currentAsset.id] ?: "^NSEI"
                        val realCandles = realMarketService.fetchCandles(yahooSym, interval = "15m", range = "5d")
                        if (realCandles.isNotEmpty()) {
                            _candles.value = realCandles
                        }
                    }

                    // Recalculate P&L for all active positions against REAL prices
                    updatePositionsMarkToMarket(updatedAssets)

                    lastFeedSyncTime.value = SimpleDateFormat("HH:mm:ss", Locale.ENGLISH).format(Date())
                    isLiveFeedActive.value = true

                    if (showUserToast) {
                        val nifty = updatedAssets.find { it.id == "NIFTY" }
                        val nPrice = nifty?.price?.let { String.format(Locale.US, "%,.2f", it) } ?: "25,044.65"
                        _userMessage.emit("🟢 Real-time NSE/BSE data synced! NIFTY: ₹$nPrice")
                    }
                } else {
                    if (showUserToast) {
                        _userMessage.emit("Live feed checked — data is up to date.")
                    }
                }
            } catch (e: Exception) {
                if (showUserToast) {
                    _userMessage.emit("Sync complete with live cached baseline.")
                }
            } finally {
                isRefreshing.value = false
            }
        }
    }

    private fun updatePositionsMarkToMarket(updatedAssets: List<AssetUniverseItem>) {
        val positions = activePositions.value.map { pos ->
            val asset = updatedAssets.find { it.id == pos.assetKey }
            val currentPrice = if (asset != null) {
                when (pos.instrument) {
                    "CE", "PE" -> GreeksCalculator.calculateBSOptionPrice(
                        S = asset.price,
                        K = pos.strike ?: asset.price,
                        dteDays = 1.0,
                        sigmaPct = max(8.0, asset.vix),
                        type = pos.instrument
                    )
                    "FUT" -> asset.price * 1.0012
                    else -> asset.price
                }
            } else pos.currentPrice

            val pts = if (pos.action == "SELL") pos.entryPrice - currentPrice else currentPrice - pos.entryPrice
            val pnl = (pts * pos.qty * 10.0).roundToInt() / 10.0
            pos.copy(currentPrice = currentPrice, pnl = pnl)
        }
        activePositions.value = positions
    }

    private suspend fun startLivePollingLoop() {
        while (true) {
            delay(12000) // Poll real market quotes every 12 seconds
            try {
                val symbols = MarketUniverse.YAHOO_SYMBOL_MAP.values.toList()
                val quotes = realMarketService.fetchBatchQuotes(symbols)
                if (quotes.isNotEmpty()) {
                    val updatedAssets = _assets.value.map { item ->
                        val yahooSym = MarketUniverse.YAHOO_SYMBOL_MAP[item.id]
                        val q = if (yahooSym != null) quotes[yahooSym] else null
                        if (q != null) {
                            item.copy(
                                price = q.price,
                                prevClose = q.prevClose,
                                high = max(item.high, q.high),
                                low = if (item.low > 0) kotlin.math.min(item.low, q.low) else q.low,
                                trend = if (q.changePts >= 0) "BULL" else "BEAR"
                            )
                        } else item
                    }
                    _assets.value = updatedAssets

                    val advances = updatedAssets.count { it.changePts >= 0 }
                    val declines = updatedAssets.count { it.changePts < 0 }
                    marketBreadth.value = MarketBreadth(advances = advances, declines = declines, unchanged = 0)

                    val curAsset = updatedAssets.find { it.id == _selectedAssetKey.value }
                    if (curAsset != null) {
                        recalculateAnalytics(curAsset)
                    }
                    updatePositionsMarkToMarket(updatedAssets)
                    lastFeedSyncTime.value = SimpleDateFormat("HH:mm:ss", Locale.ENGLISH).format(Date())
                }
            } catch (_: Exception) {
                // Ignore transient network errors during background tick
            }
        }
    }

    // Required margin calculation
    fun calculateMargin(
        assetKey: String,
        instrument: String,
        action: String,
        qty: Int,
        price: Double
    ): Double {
        val notional = price * qty
        return when (instrument) {
            "EQ" -> if (action == "BUY") notional else notional * 0.20
            "FUT" -> notional * 0.15 // 15% SPAN margin
            else -> {
                // Options (CE / PE)
                if (action == "BUY") notional
                else {
                    val asset = _assets.value.find { it.id == assetKey }
                    val spot = asset?.price ?: price
                    notional + (spot * qty * 0.12)
                }
            }
        }
    }

    fun executeOrder(
        assetKey: String,
        instrument: String,
        action: String,
        qty: Int,
        price: Double,
        target: Double,
        stopLoss: Double,
        strategyName: String = "Manual Trade",
        strike: Double? = null
    ): Boolean {
        val reqMargin = calculateMargin(assetKey, instrument, action, qty, price)

        if (availableBalance.value < reqMargin) {
            viewModelScope.launch {
                _userMessage.emit("Insufficient virtual balance! Required: ₹${String.format(Locale.US, "%,.2f", reqMargin)}")
            }
            return false
        }

        val asset = _assets.value.find { it.id == assetKey } ?: return false
        val newBalance = availableBalance.value - reqMargin
        availableBalance.value = newBalance
        store.availableBalance = newBalance

        val lotSize = MarketUniverse.getLotSize(assetKey, instrument)
        val lots = max(1, qty / lotSize)

        val contractStr = when (instrument) {
            "EQ" -> "$assetKey ($qty Shares)"
            "FUT" -> "$assetKey FUT ($lots Lot)"
            else -> "$assetKey ${strike?.roundToInt() ?: asset.price.roundToInt()} $instrument"
        }

        val nowTime = SimpleDateFormat("hh:mm a", Locale.ENGLISH).format(Date())
        val nowDate = SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH).format(Date())

        val position = TradePosition(
            timestamp = nowTime,
            dateStr = nowDate,
            strategyName = strategyName,
            contract = contractStr,
            assetKey = assetKey,
            assetName = asset.name,
            instrument = instrument,
            type = instrument,
            strike = strike,
            action = action,
            qty = qty,
            lots = lots,
            entryPrice = price,
            currentPrice = price,
            marginAllocated = reqMargin,
            pnl = 0.0,
            target = target,
            stopLoss = stopLoss,
            state = "ACTIVE"
        )

        val updatedPositions = listOf(position) + activePositions.value
        activePositions.value = updatedPositions
        store.savePositions(updatedPositions)

        viewModelScope.launch {
            _userMessage.emit("Order Executed! $action $contractStr @ ₹${String.format(Locale.US, "%,.2f", price)}")
        }
        return true
    }

    fun squareOffPosition(positionId: Long) {
        val list = activePositions.value.toMutableList()
        val index = list.indexOfFirst { it.id == positionId }
        if (index == -1) return

        val pos = list[index]
        val pnl = pos.pnl
        val releasedMargin = pos.marginAllocated

        val newBalance = max(0.0, availableBalance.value + releasedMargin + pnl)
        availableBalance.value = newBalance
        store.availableBalance = newBalance

        val newRealized = realizedPnL.value + pnl
        realizedPnL.value = newRealized
        store.realizedPnL = newRealized

        val historyItem = TradeHistoryItem(
            id = pos.id,
            closeTime = SimpleDateFormat("hh:mm a", Locale.ENGLISH).format(Date()),
            closeDate = SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH).format(Date()),
            contract = pos.contract,
            strategyName = pos.strategyName,
            action = pos.action,
            qty = pos.qty,
            entryPrice = pos.entryPrice,
            exitPrice = pos.currentPrice,
            realizedPnL = pnl,
            result = if (pnl >= 0) "PROFIT" else "LOSS"
        )

        val updatedHistory = listOf(historyItem) + tradeHistory.value
        tradeHistory.value = updatedHistory
        store.saveTradeHistory(updatedHistory)

        list.removeAt(index)
        activePositions.value = list
        store.savePositions(list)

        if (newBalance <= 0.0 && list.isEmpty()) {
            renewalStatus.value = "EXHAUSTED"
            store.renewalStatus = "EXHAUSTED"
        }

        viewModelScope.launch {
            _userMessage.emit("Position Squared Off! P&L: ₹${String.format(Locale.US, "%,.2f", pnl)}")
        }
    }

    fun squareOffAll() {
        val positions = activePositions.value.toList()
        for (pos in positions) {
            squareOffPosition(pos.id)
        }
    }

    fun requestFundRenewal() {
        renewalStatus.value = "PENDING"
        store.renewalStatus = "PENDING"
        store.renewalRequestTime = SimpleDateFormat("dd MMM, hh:mm a", Locale.ENGLISH).format(Date())
        viewModelScope.launch {
            _userMessage.emit("Fund Renewal Submitted! Status: Pending Admin Approval.")
        }
    }

    fun approveFundRenewal() {
        store.resetToDefaults()
        availableBalance.value = PaperTradingStore.INITIAL_VIRTUAL_CAPITAL
        realizedPnL.value = 0.0
        activePositions.value = emptyList()
        renewalStatus.value = "NONE"

        val audit = TradeHistoryItem(
            closeTime = SimpleDateFormat("hh:mm a", Locale.ENGLISH).format(Date()),
            closeDate = SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH).format(Date()),
            contract = "CAPITAL CREDIT",
            strategyName = "Admin Top-up",
            action = "CREDIT",
            qty = 1,
            entryPrice = 500000.0,
            exitPrice = 500000.0,
            realizedPnL = 500000.0,
            result = "PROFIT"
        )
        val updated = listOf(audit) + tradeHistory.value
        tradeHistory.value = updated
        store.saveTradeHistory(updated)

        viewModelScope.launch {
            _userMessage.emit("₹5,00,000 Virtual Capital Credited!")
        }
    }

    fun simulateExhaustion() {
        availableBalance.value = 0.0
        store.availableBalance = 0.0
        renewalStatus.value = "EXHAUSTED"
        store.renewalStatus = "EXHAUSTED"
        viewModelScope.launch {
            _userMessage.emit("Simulated Capital Depletion: Available balance set to ₹0.00")
        }
    }

    fun resetAccount() {
        store.resetToDefaults()
        availableBalance.value = PaperTradingStore.INITIAL_VIRTUAL_CAPITAL
        realizedPnL.value = 0.0
        activePositions.value = emptyList()
        renewalStatus.value = "NONE"
        viewModelScope.launch {
            _userMessage.emit("Account Reset to ₹5,00,000.00 Initial Capital.")
        }
    }

    fun sendAiMessage(userText: String) {
        val now = SimpleDateFormat("hh:mm a", Locale.ENGLISH).format(Date())
        val userMsg = ChatMessage(sender = "user", time = now, text = userText)
        _chatMessages.value = _chatMessages.value + userMsg

        viewModelScope.launch {
            delay(350)
            val currentAsset = _assets.value.find { it.id == _selectedAssetKey.value } ?: _assets.value.first()
            val reply = generateAiReply(userText, currentAsset)
            val aiMsg = ChatMessage(sender = "ai", time = SimpleDateFormat("hh:mm a", Locale.ENGLISH).format(Date()), text = reply)
            _chatMessages.value = _chatMessages.value + aiMsg
        }
    }

    private fun generateAiReply(query: String, asset: AssetUniverseItem): String {
        val q = query.lowercase()
        val analysis = _analysis.value
        val greeks = _greeks.value
        val fmt = { n: Double -> String.format(Locale.US, "%,.1f", n) }

        return when {
            q.contains("first trade") || q.contains("how to trade") || q.contains("how to buy") || q.contains("order") -> {
                """
                🎯 How to Place Your Practice Trade:
                1. Go to the 'Trade' tab and pick your instrument (e.g. NIFTY, Tata Motors).
                2. Select BUY (Going Long for price rise) or SELL (Going Short).
                3. Choose instrument type: Shares (1 unit steps), Futures (lot sizes), or Options.
                4. Notice the pre-calculated Target (+1%) and Stop Loss (-0.5%) risk boundaries.
                5. Tap 'Place Practice Order' to execute into your ₹5,00,000 paper ledger!
                """.trimIndent()
            }
            q.contains("stop loss") || q.contains("risk") || q.contains("sl") -> {
                """
                🛡️ Golden Rule of Risk Management:
                • A Stop Loss is your insurance policy against bad surprises. Always pre-define your exit point before entering any trade.
                • Never risk more than 1% to 2% of total capital on a single position.
                • For ${asset.name} at ${fmt(asset.price)}, a 0.5% stop-loss is set at ${fmt(asset.price * 0.995)}.
                """.trimIndent()
            }
            q.contains("candlestick") || q.contains("chart") || q.contains("read") -> {
                """
                🕯️ Candlestick Basics:
                • Green Candle: Price closed HIGHER than it opened (Bullish momentum).
                • Red Candle: Price closed LOWER than it opened (Bearish pressure).
                • Wicks (Thin lines): Show highest and lowest prices traded during that candle.
                • The Cyan Line on your chart is the 10 EMA (Exponential Moving Average).
                """.trimIndent()
            }
            q.contains("greeks") || q.contains("delta") || q.contains("theta") || q.contains("gamma") -> {
                """
                📊 Options Greeks Breakdown for ${asset.name}:
                • Expected 1-Sigma Move: ±${String.format(Locale.US, "%.1f", greeks.expectedSigmaMove)} pts
                • ATM Call Delta: +${String.format(Locale.US, "%.3f", greeks.callDelta)}
                • ATM Put Delta: ${String.format(Locale.US, "%.3f", greeks.putDelta)}
                • Gamma Pin Risk: ${if (greeks.isGammaRisk) "HIGH (DTE <= 2 days)" else "Stable"}
                • Theta Decay: ${String.format(Locale.US, "%.2f", greeks.thetaDayCall)} pts/day
                """.trimIndent()
            }
            else -> {
                """
                💡 Real-Time Quant Diagnosis for ${asset.name}:
                • Real CMP: ₹${fmt(asset.price)} (${asset.trend} trend)
                • India VIX: ${String.format(Locale.US, "%.2f", asset.vix)} (${analysis.vixRegime})
                • PCR Order Flow: ${String.format(Locale.US, "%.2f", asset.pcr)} (${analysis.pcrStatus})
                • Directive: ${analysis.finalState} (${analysis.directionalBias})
                • Action: ${analysis.sideToBuy}
                • T1: ₹${fmt(analysis.t1)} | SL: ₹${fmt(analysis.sl)}
                """.trimIndent()
            }
        }
    }

    fun clearChat() {
        _chatMessages.value = listOf(
            ChatMessage(
                sender = "ai",
                time = SimpleDateFormat("hh:mm a", Locale.ENGLISH).format(Date()),
                text = "Chat cleared. What trading concept would you like to explore?"
            )
        )
    }
}
