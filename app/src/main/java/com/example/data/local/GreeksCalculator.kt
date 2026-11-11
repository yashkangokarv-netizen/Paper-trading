package com.example.data.local

import com.example.data.model.Greeks
import com.example.data.model.SignalAnalysis
import kotlin.math.exp
import kotlin.math.ln
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt
import kotlin.math.sqrt

object GreeksCalculator {

    // Standard Normal CDF (Abramowitz & Stegun approximation)
    fun normalCDF(x: Double): Double {
        val b1 = 0.319381530
        val b2 = -0.356563782
        val b3 = 1.781477937
        val b4 = -1.821255978
        val b5 = 1.330274429
        val p = 0.2316419
        val c = 0.39894228

        return if (x >= 0.0) {
            val t = 1.0 / (1.0 + p * x)
            1.0 - c * exp(-x * x / 2.0) * t *
                    (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1)
        } else {
            val t = 1.0 / (1.0 - p * x)
            c * exp(-x * x / 2.0) * t *
                    (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1)
        }
    }

    // Standard Normal PDF
    fun normalPDF(x: Double): Double {
        return (1.0 / sqrt(2.0 * Math.PI)) * exp(-0.5 * x * x)
    }

    fun calculateGreeks(
        S: Double,
        K: Double,
        dteDays: Double,
        sigmaPct: Double,
        r: Double = 0.07
    ): Greeks {
        val T = max(0.0001, dteDays / 365.0)
        val sigma = max(0.01, sigmaPct / 100.0)

        // 1-Sigma Expected Move: S * sigma * sqrt(DTE / 252)
        val expectedSigmaMove = S * sigma * sqrt(max(0.01, dteDays) / 252.0)

        val d1 = (ln(S / K) + (r + (sigma * sigma) / 2.0) * T) / (sigma * sqrt(T))
        val d2 = d1 - sigma * sqrt(T)

        val nd1 = normalCDF(d1)
        val npd1 = normalPDF(d1)
        val nd2 = normalCDF(d2)

        val callDelta = nd1
        val putDelta = nd1 - 1.0

        val gamma = npd1 / (S * sigma * sqrt(T))
        val isGammaRisk = dteDays <= 2.0

        val thetaAnnualCall = -(S * npd1 * sigma) / (2 * sqrt(T)) - r * K * exp(-r * T) * nd2
        val thetaDayCall = thetaAnnualCall / 365.0

        val thetaAnnualPut = -(S * npd1 * sigma) / (2 * sqrt(T)) + r * K * exp(-r * T) * (1.0 - nd2)
        val thetaDayPut = thetaAnnualPut / 365.0

        val vega = (S * sqrt(T) * npd1) / 100.0

        return Greeks(
            expectedSigmaMove = expectedSigmaMove,
            callDelta = callDelta,
            putDelta = putDelta,
            gamma = gamma,
            isGammaRisk = isGammaRisk,
            thetaDayCall = thetaDayCall,
            thetaDayPut = thetaDayPut,
            vega = vega
        )
    }

    fun calculateBSOptionPrice(
        S: Double,
        K: Double,
        dteDays: Double,
        sigmaPct: Double,
        type: String = "CE",
        r: Double = 0.07
    ): Double {
        val T = max(0.0001, dteDays / 365.0)
        val sigma = max(0.01, sigmaPct / 100.0)
        val d1 = (ln(S / K) + (r + (sigma * sigma) / 2.0) * T) / (sigma * sqrt(T))
        val d2 = d1 - sigma * sqrt(T)

        return if (type.uppercase() == "CE") {
            val callPrice = S * normalCDF(d1) - K * exp(-r * T) * normalCDF(d2)
            max(0.5, (callPrice * 10.0).roundToInt() / 10.0)
        } else {
            val putPrice = K * exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1)
            max(0.5, (putPrice * 10.0).roundToInt() / 10.0)
        }
    }

    fun runDeterministicAnalysis(
        spotPrice: Double,
        vix: Double,
        pcr: Double,
        dte: Double,
        iv: Double,
        trend: String,
        newsSentiment: String,
        callResistance: Double,
        putSupport: Double
    ): SignalAnalysis {
        val greeks = calculateGreeks(spotPrice, spotPrice, dte, iv)

        val vixRegime: String
        val vixPass: Boolean
        val vixLabel: String

        if (vix < 12.0) {
            vixRegime = "STABLE"
            vixPass = false
            vixLabel = "STABLE (< 12: Volatility Compression / Greek Decay Risk)"
        } else if (vix >= 16.0) {
            vixRegime = "AGGRESSIVE"
            vixPass = true
            vixLabel = "AGGRESSIVE (>= 16: Volatility Expansion Active)"
        } else {
            vixRegime = "MODERATE"
            vixPass = false
            vixLabel = "MODERATE (12 - 16: Standard Range)"
        }

        val pcrStatus: String
        val pcrBias: String
        if (pcr < 0.70) {
            pcrStatus = "BEARISH DRAG / OVERSOLD ZONE"
            pcrBias = "BEAR"
        } else if (pcr > 1.30) {
            pcrStatus = "BULLISH SUPPORT / OVERBOUGHT ZONE"
            pcrBias = "BULL"
        } else if (pcr < 0.90) {
            pcrStatus = "MILD BEARISH BIAS"
            pcrBias = "BEAR"
        } else if (pcr > 1.10) {
            pcrStatus = "MILD BULLISH BIAS"
            pcrBias = "BULL"
        } else {
            pcrStatus = "NEUTRAL / BALANCED"
            pcrBias = "NEUTRAL"
        }

        val newsBias = when (newsSentiment.uppercase()) {
            "POSITIVE" -> "BULL"
            "NEGATIVE" -> "BEAR"
            else -> "NEUTRAL"
        }

        val vectorConflicts = mutableListOf<String>()
        val isBullishVectorMatch = (trend == "BULL") && (newsBias == "BULL") && (pcrBias == "BULL")
        val isBearishVectorMatch = (trend == "BEAR") && (newsBias == "BEAR") && (pcrBias == "BEAR")

        val finalState: String
        val directionalBias: String
        val sideToBuy: String
        val holdDuration: String
        val strategyRec: String
        val entryTrigger: String
        val t1: Double
        val t2: Double
        val sl: Double
        val strategicImplication: String

        if (vix < 12.0) {
            finalState = "NO TRADE"
            directionalBias = "NEUTRAL / COMPRESSION"
            sideToBuy = "SIDELINES / CASH (Theta Decay Environment)"
            holdDuration = "NO EXPOSURE (Wait for VIX Expansion >= 16)"
            strategyRec = "Sideline Cash / Rangebound Delta-Neutral (Strictly No Directional Buying)"
            entryTrigger = "Range bounded between Put Wall ${putSupport.roundToInt()} and Call Wall ${callResistance.roundToInt()}"
            t1 = (spotPrice + greeks.expectedSigmaMove * 0.3).roundToInt().toDouble()
            t2 = (spotPrice - greeks.expectedSigmaMove * 0.3).roundToInt().toDouble()
            sl = spotPrice.roundToInt().toDouble()
            strategicImplication = "FAIL: VIX < 12 indicates low-momentum volatility compression. Long options face acute Theta decay."
        } else if (!vixPass) {
            finalState = "WATCHLIST"
            directionalBias = trend
            sideToBuy = "WATCHLIST / MONITOR SPREADS"
            holdDuration = "Standby (Awaiting VIX Spike >= 16 or Clear Boundary Break)"
            strategyRec = "Watchlist - Monitor Order Book Flow for Breakout Validation"
            entryTrigger = if (trend == "BULL") "Decisive 15m close above ${callResistance.roundToInt()}" else "Decisive 15m breakdown below ${putSupport.roundToInt()}"
            t1 = (if (trend == "BULL") callResistance + greeks.expectedSigmaMove * 0.5 else putSupport - greeks.expectedSigmaMove * 0.5).roundToInt().toDouble()
            t2 = (if (trend == "BULL") callResistance + greeks.expectedSigmaMove else putSupport - greeks.expectedSigmaMove).roundToInt().toDouble()
            sl = (if (trend == "BULL") spotPrice - greeks.expectedSigmaMove * 0.4 else spotPrice + greeks.expectedSigmaMove * 0.4).roundToInt().toDouble()
            strategicImplication = "WATCHLIST: VIX in moderate zone (12-16). Directional breakout gate inactive without VIX >= 16 confirmation."
        } else {
            if (isBullishVectorMatch) {
                finalState = "CONFIRMED TRADE"
                directionalBias = "BULLISH"
                sideToBuy = "BUY CALL (CE) / BULL CALL SPREAD"
                holdDuration = if (dte <= 1) "Intraday Scalp (15 - 60 mins) to Max Call Wall" else "Hold 1-2 DTE till Target 1 / Expiry"
                strategyRec = "Aggressive Bull Call Spread (ATM Long / OTM Short) or High-Delta Call Buy"
                entryTrigger = "Long entry on pullback to ${(spotPrice - greeks.expectedSigmaMove * 0.15).roundToInt()} or breakout above ${(spotPrice + 25).roundToInt()}"
                t1 = min(callResistance, spotPrice + greeks.expectedSigmaMove * 0.7).roundToInt().toDouble()
                t2 = (callResistance + greeks.expectedSigmaMove * 0.5).roundToInt().toDouble()
                sl = (spotPrice - greeks.expectedSigmaMove * 0.4).roundToInt().toDouble()
                strategicImplication = "PASS: 4-Vector Alignment achieved with Aggressive Volatility Expansion (VIX >= 16). Directional Long Validated."
            } else if (isBearishVectorMatch) {
                finalState = "CONFIRMED TRADE"
                directionalBias = "BEARISH"
                sideToBuy = "BUY PUT (PE) / BEAR PUT SPREAD"
                holdDuration = if (dte <= 1) "Intraday Scalp (15 - 45 mins) to Max Put Wall" else "Hold 1-2 DTE till Target 1 / Institutional Support"
                strategyRec = "Aggressive Bear Put Spread (ATM Long / OTM Short) or High-Delta Put Buy"
                entryTrigger = "Short entry on rejection at ${(spotPrice + greeks.expectedSigmaMove * 0.15).roundToInt()} or breakdown below ${(spotPrice - 25).roundToInt()}"
                t1 = max(putSupport, spotPrice - greeks.expectedSigmaMove * 0.7).roundToInt().toDouble()
                t2 = (putSupport - greeks.expectedSigmaMove * 0.5).roundToInt().toDouble()
                sl = (spotPrice + greeks.expectedSigmaMove * 0.4).roundToInt().toDouble()
                strategicImplication = "PASS: 4-Vector Alignment achieved with Aggressive Volatility Expansion (VIX >= 16). Directional Short Validated."
            } else {
                if (trend != newsBias) vectorConflicts.add("Trend ($trend) opposes News ($newsBias)")
                if (trend != pcrBias) vectorConflicts.add("Trend ($trend) diverges from PCR ($pcrBias)")

                finalState = "WATCHLIST"
                directionalBias = "CONFLICTED / NEUTRAL"
                sideToBuy = "SIDELINES / CASH"
                holdDuration = "No Position (Conflicting Vectors - High Stop-Hunt Risk)"
                strategyRec = "Sideline Cash - Wait for False Breakout Resolution"
                entryTrigger = "No entry. Invalidation condition: Divergence between ${vectorConflicts.joinToString(" and ")}"
                t1 = callResistance.roundToInt().toDouble()
                t2 = putSupport.roundToInt().toDouble()
                sl = spotPrice.roundToInt().toDouble()
                strategicImplication = "FAIL: Conflicting Vectors detected (${vectorConflicts.joinToString(", ")}). Rule mandates forced WATCHLIST / NO TRADE."
            }
        }

        return SignalAnalysis(
            vixRegime = vixRegime,
            vixPass = vixPass,
            vixLabel = vixLabel,
            pcrStatus = pcrStatus,
            pcrBias = pcrBias,
            newsBias = newsBias,
            finalState = finalState,
            directionalBias = directionalBias,
            sideToBuy = sideToBuy,
            holdDuration = holdDuration,
            strategicImplication = strategicImplication,
            strategyRec = strategyRec,
            entryTrigger = entryTrigger,
            t1 = t1,
            t2 = t2,
            sl = sl,
            vectorConflicts = vectorConflicts
        )
    }
}
