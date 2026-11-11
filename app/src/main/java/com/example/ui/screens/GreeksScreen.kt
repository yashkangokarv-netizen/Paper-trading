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
import com.example.ui.theme.BearRed
import com.example.ui.theme.BullGreen
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
fun GreeksScreen(
    viewModel: TerminalViewModel,
    modifier: Modifier = Modifier
) {
    val assets by viewModel.assets.collectAsState()
    val selectedKey by viewModel.selectedAssetKey.collectAsState()
    val greeks by viewModel.greeks.collectAsState()

    val currentAsset = assets.find { it.id == selectedKey } ?: assets.first()

    val putSupport = (currentAsset.price - greeks.expectedSigmaMove * 0.8).toInt()
    val callResistance = (currentAsset.price + greeks.expectedSigmaMove * 0.8).toInt()

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(horizontal = 14.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // 1. Black-Scholes Greeks Overview
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkPanel),
                border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = "BLACK-SCHOLES GREEKS (ATM)",
                        color = TextMuted,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    // 1-Sigma Expected Move
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp))
                            .background(DarkPanelSecondary)
                            .padding(12.dp)
                    ) {
                        Column {
                            Text(text = "Expected 1-Sigma Move", color = TextSecondary, fontSize = 11.sp)
                            Text(
                                text = "±${String.format(Locale.US, "%.1f", greeks.expectedSigmaMove)} pts",
                                color = AccentCyan,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.ExtraBold,
                                fontFamily = FontFamily.Monospace
                            )
                            val lowBound = (currentAsset.price - greeks.expectedSigmaMove).toInt()
                            val highBound = (currentAsset.price + greeks.expectedSigmaMove).toInt()
                            Text(
                                text = "Confidence Range: [$lowBound — $highBound]",
                                color = TextMuted,
                                fontSize = 11.sp,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Delta, Gamma, Theta, Vega
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        GreekBox(
                            title = "Delta (Δ)",
                            value1 = "Call: +${String.format(Locale.US, "%.3f", greeks.callDelta)}",
                            value2 = "Put: ${String.format(Locale.US, "%.3f", greeks.putDelta)}",
                            modifier = Modifier.weight(1f)
                        )
                        GreekBox(
                            title = "Gamma (Γ)",
                            value1 = String.format(Locale.US, "%.5f", greeks.gamma),
                            value2 = if (greeks.isGammaRisk) "Pin risk active" else "Stable",
                            value2Color = if (greeks.isGammaRisk) WarnAmber else TextMuted,
                            modifier = Modifier.weight(1f)
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        GreekBox(
                            title = "Theta Decay (Θ)",
                            value1 = "Call: ${String.format(Locale.US, "%.2f", greeks.thetaDayCall)}/d",
                            value2 = "Put: ${String.format(Locale.US, "%.2f", greeks.thetaDayPut)}/d",
                            modifier = Modifier.weight(1f)
                        )
                        GreekBox(
                            title = "Vega (ν)",
                            value1 = "+${String.format(Locale.US, "%.2f", greeks.vega)} pts",
                            value2 = "per 1% IV shift",
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }

        // 2. Open Interest Depth & Trap Zones
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkPanel),
                border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = "ORDER FLOW & OI LIQUIDITY DEPTH",
                        color = TextMuted,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(text = "Put Support Wall", color = BullGreen, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                            Text(text = "₹$putSupport (18.2L OI)", color = TextPrimary, fontSize = 13.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                        Column(horizontalAlignment = Alignment.End) {
                            Text(text = "Call Resistance Wall", color = BearRed, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                            Text(text = "₹$callResistance (16.5L OI)", color = TextPrimary, fontSize = 13.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    // Split bar 55% Put vs 45% Call
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(8.dp)
                            .clip(RoundedCornerShape(4.dp))
                    ) {
                        Box(
                            modifier = Modifier
                                .weight(0.55f)
                                .height(8.dp)
                                .background(BullGreen)
                        )
                        Box(
                            modifier = Modifier
                                .weight(0.45f)
                                .height(8.dp)
                                .background(BearRed)
                        )
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "Put Wall (55% Support)", color = TextMuted, fontSize = 10.sp)
                        Text(text = "Call Wall (45% Resistance)", color = TextMuted, fontSize = 10.sp)
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp))
                            .background(DarkPanelSecondary)
                            .padding(10.dp)
                    ) {
                        Column {
                            Text(
                                text = "Institutional Trap Zones",
                                color = AccentCyan,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = "Upper Stop-Hunt Trap: ${callResistance + 35}  |  Lower Liquidity Grab: ${putSupport - 35}",
                                color = TextSecondary,
                                fontSize = 11.sp,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun GreekBox(
    title: String,
    value1: String,
    value2: String,
    value2Color: Color = TextMuted,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(8.dp))
            .background(DarkPanelSecondary)
            .padding(10.dp)
    ) {
        Column {
            Text(text = title, color = TextSecondary, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(2.dp))
            Text(text = value1, color = TextPrimary, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
            Text(text = value2, color = value2Color, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
        }
    }
}
