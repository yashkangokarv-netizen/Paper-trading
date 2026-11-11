package com.example.data.model

data class AssetUniverseItem(
    val id: String,
    val name: String,
    val ticker: String,
    val type: String, // "INDEX" or "EQUITY"
    val exchange: String, // "NSE" or "BSE"
    val symbol: String,
    val price: Double,
    val prevClose: Double,
    val high: Double,
    val low: Double,
    val pe: Double? = null,
    val pb: Double? = null,
    val strikeStep: Double,
    val sector: String,
    val vix: Double,
    val pcr: Double,
    val trend: String, // "BULL" or "BEAR"
    val newsSentiment: String, // "POSITIVE", "NEGATIVE", "NEUTRAL"
    val newsHeadline: String,
    val volume: String,
    val mcap: String? = null
) {
    val changePts: Double get() = price - prevClose
    val changePct: Double get() = if (prevClose > 0.0) (changePts / prevClose) * 100.0 else 0.0
    val isPositive: Boolean get() = changePts >= 0.0
}

data class Candle(
    val time: String,
    val open: Double,
    val high: Double,
    val low: Double,
    val close: Double,
    val volume: Long,
    val ema: Double
)

data class Greeks(
    val expectedSigmaMove: Double = 0.0,
    val callDelta: Double = 0.5,
    val putDelta: Double = -0.5,
    val gamma: Double = 0.001,
    val isGammaRisk: Boolean = false,
    val thetaDayCall: Double = 0.0,
    val thetaDayPut: Double = 0.0,
    val vega: Double = 0.0
)

data class SignalAnalysis(
    val vixRegime: String = "NORMAL",
    val vixPass: Boolean = false,
    val vixLabel: String = "",
    val pcrStatus: String = "NEUTRAL",
    val pcrBias: String = "NEUTRAL",
    val newsBias: String = "NEUTRAL",
    val finalState: String = "WATCHLIST", // "CONFIRMED TRADE", "WATCHLIST", "NO TRADE"
    val directionalBias: String = "NEUTRAL", // "BULLISH", "BEARISH", "NEUTRAL"
    val sideToBuy: String = "SIDELINES / CASH",
    val holdDuration: String = "",
    val strategicImplication: String = "",
    val strategyRec: String = "",
    val entryTrigger: String = "",
    val t1: Double = 0.0,
    val t2: Double = 0.0,
    val sl: Double = 0.0,
    val vectorConflicts: List<String> = emptyList()
)

data class TradePosition(
    val id: Long = System.currentTimeMillis(),
    val timestamp: String,
    val dateStr: String,
    val strategyName: String,
    val contract: String,
    val assetKey: String,
    val assetName: String,
    val instrument: String, // "EQ", "FUT", "CE", "PE"
    val type: String,
    val strike: Double? = null,
    val action: String, // "BUY" or "SELL"
    val qty: Int,
    val lots: Int = 1,
    val entryPrice: Double,
    var currentPrice: Double,
    val marginAllocated: Double,
    var pnl: Double = 0.0,
    val target: Double = 0.0,
    val stopLoss: Double = 0.0,
    val state: String = "ACTIVE"
) {
    val pnlPts: Double
        get() = if (action == "SELL") entryPrice - currentPrice else currentPrice - entryPrice
    val pnlPercent: Double
        get() = if (entryPrice > 0) (pnlPts / entryPrice) * 100.0 else 0.0
}

data class TradeHistoryItem(
    val id: Long = System.currentTimeMillis(),
    val closeTime: String,
    val closeDate: String,
    val contract: String,
    val strategyName: String,
    val action: String,
    val qty: Int,
    val entryPrice: Double,
    val exitPrice: Double,
    val realizedPnL: Double,
    val result: String // "PROFIT" or "LOSS"
)

data class OptionChainRow(
    val strike: Double,
    val isATM: Boolean,
    val callOI: Double,
    val callLtp: Double,
    val callITM: Boolean,
    val putLtp: Double,
    val putOI: Double,
    val putITM: Boolean
)

data class MarketBreadth(
    val advances: Int = 1482,
    val declines: Int = 818,
    val unchanged: Int = 94,
    val high52w: Int = 72,
    val low52w: Int = 9,
    val totalTraded: Int = 2394
)

data class SectorInfo(
    val name: String,
    val chg: String,
    val isPositive: Boolean
)

data class GlobalMarketItem(
    val name: String,
    val price: String,
    val chg: String,
    val isPos: Boolean
)

data class ChatMessage(
    val id: Long = System.currentTimeMillis(),
    val sender: String, // "ai" or "user"
    val time: String,
    val text: String
)
