package com.example.data.remote

import android.util.Log
import com.example.data.model.Candle
import com.example.data.model.GlobalMarketItem
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import java.util.concurrent.TimeUnit
import kotlin.math.roundToInt

data class RealQuote(
    val symbol: String,
    val price: Double,
    val prevClose: Double,
    val high: Double,
    val low: Double,
    val changePts: Double,
    val changePct: Double,
    val volume: Long,
    val timestamp: Long
)

class RealMarketDataService {

    private val client = OkHttpClient.Builder()
        .connectTimeout(8, TimeUnit.SECONDS)
        .readTimeout(8, TimeUnit.SECONDS)
        .build()

    private val userAgent = "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36"

    /**
     * Fetch real-time market quote for a single Yahoo symbol (e.g. ^NSEI, RELIANCE.NS)
     */
    suspend fun fetchQuote(symbol: String): RealQuote? = withContext(Dispatchers.IO) {
        try {
            val url = "https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=5m&range=1d"
            val request = Request.Builder()
                .url(url)
                .header("User-Agent", userAgent)
                .header("Accept", "application/json")
                .build()

            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) {
                    Log.w("RealMarketData", "Quote error for $symbol: HTTP ${response.code}")
                    return@withContext null
                }
                val bodyStr = response.body?.string() ?: return@withContext null
                parseQuoteJson(symbol, bodyStr)
            }
        } catch (e: Exception) {
            Log.e("RealMarketData", "Exception fetching quote for $symbol", e)
            null
        }
    }

    /**
     * Fetch real quotes for multiple symbols concurrently in parallel
     */
    suspend fun fetchBatchQuotes(symbols: List<String>): Map<String, RealQuote> = coroutineScope {
        val deferreds = symbols.map { sym ->
            async(Dispatchers.IO) {
                val q = fetchQuote(sym)
                if (q != null) sym to q else null
            }
        }
        deferreds.awaitAll().filterNotNull().toMap()
    }

    /**
     * Fetch real candlestick time series data for technical analysis and charts
     */
    suspend fun fetchCandles(
        symbol: String,
        interval: String = "15m",
        range: String = "5d"
    ): List<Candle> = withContext(Dispatchers.IO) {
        try {
            val url = "https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}"
            val request = Request.Builder()
                .url(url)
                .header("User-Agent", userAgent)
                .header("Accept", "application/json")
                .build()

            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) return@withContext emptyList()
                val bodyStr = response.body?.string() ?: return@withContext emptyList()
                parseCandlesJson(bodyStr)
            }
        } catch (e: Exception) {
            Log.e("RealMarketData", "Exception fetching candles for $symbol", e)
            emptyList()
        }
    }

    /**
     * Fetch real India VIX index value
     */
    suspend fun fetchIndiaVix(): Double? = withContext(Dispatchers.IO) {
        val quote = fetchQuote("^INDIAVIX")
        quote?.price
    }

    /**
     * Fetch real global market indices (Dow Jones, Nasdaq, S&P 500, Brent Crude)
     */
    suspend fun fetchGlobalMarkets(): List<GlobalMarketItem> = coroutineScope {
        val targets = listOf(
            Triple("^DJI", "DOW JONES", true),
            Triple("^IXIC", "NASDAQ 100", true),
            Triple("^GSPC", "S&P 500", true),
            Triple("BZ=F", "BRENT CRUDE", false)
        )

        val quotes = targets.map { (sym, label, isIndex) ->
            async(Dispatchers.IO) {
                val q = fetchQuote(sym)
                if (q != null) {
                    val sign = if (q.changePct >= 0) "+" else ""
                    val chgStr = "$sign${String.format(Locale.US, "%.2f", q.changePct)}%"
                    val priceStr = if (isIndex) {
                        String.format(Locale.US, "%,.2f", q.price)
                    } else {
                        "$" + String.format(Locale.US, "%.2f", q.price) + "/bbl"
                    }
                    GlobalMarketItem(
                        name = label,
                        price = priceStr,
                        chg = chgStr,
                        isPos = q.changePct >= 0
                    )
                } else null
            }
        }.awaitAll().filterNotNull()

        if (quotes.isNotEmpty()) quotes else emptyList()
    }

    private fun parseQuoteJson(symbol: String, jsonStr: String): RealQuote? {
        return try {
            val root = JSONObject(jsonStr)
            val chart = root.getJSONObject("chart")
            val results = chart.optJSONArray("result") ?: return null
            if (results.length() == 0) return null
            val item = results.getJSONObject(0)
            val meta = item.getJSONObject("meta")

            val price = meta.optDouble("regularMarketPrice", 0.0)
            val prevClose = meta.optDouble("chartPreviousClose", meta.optDouble("previousClose", price))
            val high = meta.optDouble("regularMarketDayHigh", price)
            val low = meta.optDouble("regularMarketDayLow", price)
            val volume = meta.optLong("regularMarketVolume", 0L)
            val timestamp = meta.optLong("regularMarketTime", System.currentTimeMillis() / 1000)

            val changePts = price - prevClose
            val changePct = if (prevClose > 0.0) (changePts / prevClose) * 100.0 else 0.0

            RealQuote(
                symbol = symbol,
                price = (price * 100.0).roundToInt() / 100.0,
                prevClose = (prevClose * 100.0).roundToInt() / 100.0,
                high = (high * 100.0).roundToInt() / 100.0,
                low = (low * 100.0).roundToInt() / 100.0,
                changePts = (changePts * 100.0).roundToInt() / 100.0,
                changePct = (changePct * 100.0).roundToInt() / 100.0,
                volume = volume,
                timestamp = timestamp
            )
        } catch (e: Exception) {
            Log.e("RealMarketData", "Failed to parse quote for $symbol", e)
            null
        }
    }

    private fun parseCandlesJson(jsonStr: String): List<Candle> {
        val candles = mutableListOf<Candle>()
        try {
            val root = JSONObject(jsonStr)
            val chart = root.getJSONObject("chart")
            val results = chart.optJSONArray("result") ?: return emptyList()
            if (results.length() == 0) return emptyList()

            val res = results.getJSONObject(0)
            val timestamps = res.optJSONArray("timestamp") ?: return emptyList()
            val indicators = res.getJSONObject("indicators")
            val quoteArr = indicators.optJSONArray("quote") ?: return emptyList()
            if (quoteArr.length() == 0) return emptyList()

            val quote = quoteArr.getJSONObject(0)
            val opens = quote.optJSONArray("open")
            val highs = quote.optJSONArray("high")
            val lows = quote.optJSONArray("low")
            val closes = quote.optJSONArray("close")
            val volumes = quote.optJSONArray("volume")

            val timeFormat = SimpleDateFormat("HH:mm", Locale.ENGLISH).apply {
                timeZone = TimeZone.getTimeZone("Asia/Kolkata")
            }

            var ema = 0.0
            val k = 2.0 / (10.0 + 1.0)
            var initializedEma = false

            val count = timestamps.length()
            // Take the latest up to 35 candles for clean readable chart display
            val startIdx = maxOf(0, count - 35)

            for (i in startIdx until count) {
                val t = timestamps.optLong(i, 0L) * 1000L
                val o = opens?.optDouble(i, Double.NaN) ?: Double.NaN
                val h = highs?.optDouble(i, Double.NaN) ?: Double.NaN
                val l = lows?.optDouble(i, Double.NaN) ?: Double.NaN
                val c = closes?.optDouble(i, Double.NaN) ?: Double.NaN
                val v = volumes?.optLong(i, 0L) ?: 0L

                if (o.isNaN() || h.isNaN() || l.isNaN() || c.isNaN()) {
                    continue
                }

                if (!initializedEma) {
                    ema = c
                    initializedEma = true
                } else {
                    ema = (c * k) + (ema * (1.0 - k))
                }

                val timeStr = timeFormat.format(Date(t))
                candles.add(
                    Candle(
                        time = timeStr,
                        open = (o * 100.0).roundToInt() / 100.0,
                        high = (h * 100.0).roundToInt() / 100.0,
                        low = (l * 100.0).roundToInt() / 100.0,
                        close = (c * 100.0).roundToInt() / 100.0,
                        volume = v,
                        ema = (ema * 100.0).roundToInt() / 100.0
                    )
                )
            }
        } catch (e: Exception) {
            Log.e("RealMarketData", "Failed to parse candles", e)
        }
        return candles
    }
}
