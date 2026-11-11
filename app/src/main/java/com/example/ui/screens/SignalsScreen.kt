package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.AccentCyanDim
import com.example.ui.theme.BearRed
import com.example.ui.theme.BearRedBg
import com.example.ui.theme.BullGreen
import com.example.ui.theme.BullGreenBg
import com.example.ui.theme.DarkBg
import com.example.ui.theme.DarkBorder
import com.example.ui.theme.DarkPanel
import com.example.ui.theme.DarkPanelSecondary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary
import com.example.ui.theme.WarnAmber
import com.example.ui.theme.WarnAmberBg
import com.example.ui.viewmodel.TerminalViewModel
import java.util.Locale

@Composable
fun SignalsScreen(
    viewModel: TerminalViewModel,
    modifier: Modifier = Modifier
) {
    val assets by viewModel.assets.collectAsState()
    val selectedKey by viewModel.selectedAssetKey.collectAsState()
    val analysis by viewModel.analysis.collectAsState()
    val greeks by viewModel.greeks.collectAsState()

    val currentAsset = assets.find { it.id == selectedKey } ?: assets.first()

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(horizontal = 14.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // 1. 4-Vector Confirmation Matrix
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkPanel),
                border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = "4-VECTOR CONFIRMATION MATRIX",
                        color = TextMuted,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )
                    Spacer(modifier = Modifier.height(10.dp))

                    VectorRow(
                        vector = "Trend Direction",
                        status = currentAsset.trend,
                        detail = if (currentAsset.trend == "BULL") "Holding above 20 & 50 EMA" else "Trading below 20 & 50 EMA",
                        color = if (currentAsset.trend == "BULL") BullGreen else BearRed
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    VectorRow(
                        vector = "News Sentiment",
                        status = currentAsset.newsSentiment,
                        detail = currentAsset.newsHeadline,
                        color = when (currentAsset.newsSentiment) {
                            "POSITIVE" -> BullGreen
                            "NEGATIVE" -> BearRed
                            else -> TextSecondary
                        }
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    VectorRow(
                        vector = "PCR Interpretation",
                        status = "${String.format(Locale.US, "%.2f", currentAsset.pcr)} (${analysis.pcrBias})",
                        detail = analysis.pcrStatus,
                        color = if (analysis.pcrBias == "BULL") BullGreen else if (analysis.pcrBias == "BEAR") BearRed else TextSecondary
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    VectorRow(
                        vector = "India VIX Regime",
                        status = "${String.format(Locale.US, "%.2f", currentAsset.vix)} (${analysis.vixRegime})",
                        detail = analysis.vixLabel,
                        color = if (currentAsset.vix >= 16) BearRed else if (currentAsset.vix < 12) BullGreen else WarnAmber
                    )
                }
            }
        }

        // 2. Directive Decision Card
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkPanel),
                border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "DETERMINISTIC VERDICT",
                            color = TextMuted,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )

                        val badgeBg = when (analysis.finalState) {
                            "CONFIRMED TRADE" -> if (analysis.directionalBias == "BULLISH") BullGreenBg else BearRedBg
                            "WATCHLIST" -> WarnAmberBg
                            else -> DarkPanelSecondary
                        }
                        val badgeColor = when (analysis.finalState) {
                            "CONFIRMED TRADE" -> if (analysis.directionalBias == "BULLISH") BullGreen else BearRed
                            "WATCHLIST" -> WarnAmber
                            else -> TextSecondary
                        }

                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(badgeBg)
                                .padding(horizontal = 8.dp, vertical = 3.dp)
                        ) {
                            Text(
                                text = analysis.finalState,
                                color = badgeColor,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = analysis.strategyRec,
                        color = AccentCyan,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = analysis.strategicImplication,
                        color = TextSecondary,
                        fontSize = 12.sp,
                        lineHeight = 16.sp
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp))
                            .background(DarkPanelSecondary)
                            .padding(10.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(text = "Target 1", color = TextMuted, fontSize = 10.sp)
                            Text(text = "₹${String.format(Locale.US, "%,.1f", analysis.t1)}", color = BullGreen, fontSize = 13.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                        Column {
                            Text(text = "Target 2", color = TextMuted, fontSize = 10.sp)
                            Text(text = "₹${String.format(Locale.US, "%,.1f", analysis.t2)}", color = BullGreen, fontSize = 13.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                        Column {
                            Text(text = "Stop Loss", color = TextMuted, fontSize = 10.sp)
                            Text(text = "₹${String.format(Locale.US, "%,.1f", analysis.sl)}", color = BearRed, fontSize = 13.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun VectorRow(
    vector: String,
    status: String,
    detail: String,
    color: Color
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(DarkPanelSecondary)
            .padding(10.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(text = vector, color = TextPrimary, fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Text(text = detail, color = TextMuted, fontSize = 10.sp, maxLines = 1)
        }
        Text(
            text = status,
            color = color,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Monospace
        )
    }
}
