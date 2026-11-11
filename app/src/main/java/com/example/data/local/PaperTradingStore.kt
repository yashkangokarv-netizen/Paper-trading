package com.example.data.local

import android.content.Context
import android.content.SharedPreferences
import com.example.data.model.TradeHistoryItem
import com.example.data.model.TradePosition
import org.json.JSONArray
import org.json.JSONObject

class PaperTradingStore(context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences("paper_trading_terminal_store", Context.MODE_PRIVATE)

    companion object {
        private const val KEY_BALANCE = "virtual_cash_balance"
        private const val KEY_REALIZED_PNL = "realized_pnl"
        private const val KEY_POSITIONS = "active_positions_json"
        private const val KEY_HISTORY = "trade_history_json"
        private const val KEY_RENEWAL_STATUS = "renewal_status"
        private const val KEY_RENEWAL_TIME = "renewal_request_time"
        const val INITIAL_VIRTUAL_CAPITAL = 500000.0
    }

    var availableBalance: Double
        get() = prefs.getFloat(KEY_BALANCE, INITIAL_VIRTUAL_CAPITAL.toFloat()).toDouble()
        set(value) {
            prefs.edit().putFloat(KEY_BALANCE, value.toFloat()).apply()
        }

    var realizedPnL: Double
        get() = prefs.getFloat(KEY_REALIZED_PNL, 0.0f).toDouble()
        set(value) {
            prefs.edit().putFloat(KEY_REALIZED_PNL, value.toFloat()).apply()
        }

    var renewalStatus: String
        get() = prefs.getString(KEY_RENEWAL_STATUS, "NONE") ?: "NONE"
        set(value) {
            prefs.edit().putString(KEY_RENEWAL_STATUS, value).apply()
        }

    var renewalRequestTime: String?
        get() = prefs.getString(KEY_RENEWAL_TIME, null)
        set(value) {
            prefs.edit().putString(KEY_RENEWAL_TIME, value).apply()
        }

    fun loadPositions(): List<TradePosition> {
        val jsonStr = prefs.getString(KEY_POSITIONS, null) ?: return emptyList()
        val list = mutableListOf<TradePosition>()
        try {
            val arr = JSONArray(jsonStr)
            for (i in 0 until arr.length()) {
                val obj = arr.getJSONObject(i)
                list.add(
                    TradePosition(
                        id = obj.optLong("id", System.currentTimeMillis()),
                        timestamp = obj.optString("timestamp", ""),
                        dateStr = obj.optString("dateStr", ""),
                        strategyName = obj.optString("strategyName", "Manual Trade"),
                        contract = obj.optString("contract", ""),
                        assetKey = obj.optString("assetKey", "NIFTY"),
                        assetName = obj.optString("assetName", "NIFTY 50"),
                        instrument = obj.optString("instrument", "EQ"),
                        type = obj.optString("type", "EQ"),
                        strike = if (obj.has("strike") && !obj.isNull("strike")) obj.optDouble("strike") else null,
                        action = obj.optString("action", "BUY"),
                        qty = obj.optInt("qty", 1),
                        lots = obj.optInt("lots", 1),
                        entryPrice = obj.optDouble("entryPrice", 0.0),
                        currentPrice = obj.optDouble("currentPrice", 0.0),
                        marginAllocated = obj.optDouble("marginAllocated", 0.0),
                        pnl = obj.optDouble("pnl", 0.0),
                        target = obj.optDouble("target", 0.0),
                        stopLoss = obj.optDouble("stopLoss", 0.0),
                        state = obj.optString("state", "ACTIVE")
                    )
                )
            }
        } catch (_: Exception) {}
        return list
    }

    fun savePositions(positions: List<TradePosition>) {
        val arr = JSONArray()
        for (pos in positions) {
            val obj = JSONObject()
            obj.put("id", pos.id)
            obj.put("timestamp", pos.timestamp)
            obj.put("dateStr", pos.dateStr)
            obj.put("strategyName", pos.strategyName)
            obj.put("contract", pos.contract)
            obj.put("assetKey", pos.assetKey)
            obj.put("assetName", pos.assetName)
            obj.put("instrument", pos.instrument)
            obj.put("type", pos.type)
            pos.strike?.let { obj.put("strike", it) }
            obj.put("action", pos.action)
            obj.put("qty", pos.qty)
            obj.put("lots", pos.lots)
            obj.put("entryPrice", pos.entryPrice)
            obj.put("currentPrice", pos.currentPrice)
            obj.put("marginAllocated", pos.marginAllocated)
            obj.put("pnl", pos.pnl)
            obj.put("target", pos.target)
            obj.put("stopLoss", pos.stopLoss)
            obj.put("state", pos.state)
            arr.put(obj)
        }
        prefs.edit().putString(KEY_POSITIONS, arr.toString()).apply()
    }

    fun loadTradeHistory(): List<TradeHistoryItem> {
        val jsonStr = prefs.getString(KEY_HISTORY, null) ?: return emptyList()
        val list = mutableListOf<TradeHistoryItem>()
        try {
            val arr = JSONArray(jsonStr)
            for (i in 0 until arr.length()) {
                val obj = arr.getJSONObject(i)
                list.add(
                    TradeHistoryItem(
                        id = obj.optLong("id", System.currentTimeMillis()),
                        closeTime = obj.optString("closeTime", ""),
                        closeDate = obj.optString("closeDate", ""),
                        contract = obj.optString("contract", ""),
                        strategyName = obj.optString("strategyName", "Manual Trade"),
                        action = obj.optString("action", "BUY"),
                        qty = obj.optInt("qty", 1),
                        entryPrice = obj.optDouble("entryPrice", 0.0),
                        exitPrice = obj.optDouble("exitPrice", 0.0),
                        realizedPnL = obj.optDouble("realizedPnL", 0.0),
                        result = obj.optString("result", "PROFIT")
                    )
                )
            }
        } catch (_: Exception) {}
        return list
    }

    fun saveTradeHistory(history: List<TradeHistoryItem>) {
        val arr = JSONArray()
        for (item in history) {
            val obj = JSONObject()
            obj.put("id", item.id)
            obj.put("closeTime", item.closeTime)
            obj.put("closeDate", item.closeDate)
            obj.put("contract", item.contract)
            obj.put("strategyName", item.strategyName)
            obj.put("action", item.action)
            obj.put("qty", item.qty)
            obj.put("entryPrice", item.entryPrice)
            obj.put("exitPrice", item.exitPrice)
            obj.put("realizedPnL", item.realizedPnL)
            obj.put("result", item.result)
            arr.put(obj)
        }
        prefs.edit().putString(KEY_HISTORY, arr.toString()).apply()
    }

    fun resetToDefaults() {
        availableBalance = INITIAL_VIRTUAL_CAPITAL
        realizedPnL = 0.0
        renewalStatus = "NONE"
        renewalRequestTime = null
        savePositions(emptyList())
    }
}
