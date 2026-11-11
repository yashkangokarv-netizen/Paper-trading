package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.Tune
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.local.MarketUniverse
import com.example.data.model.AssetUniverseItem
import com.example.ui.components.CandlestickChart
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.AccentCyanDim
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
import com.example.ui.viewmodel.TerminalViewModel
import java.util.Locale
import kotlin.math.roundToInt

@Composable
fun TradeScreen(
    viewModel: TerminalViewModel,
    modifier: Modifier = Modifier
) {
    val assets by viewModel.assets.collectAsState()
    val selectedKey by viewModel.selectedAssetKey.collectAsState()
    val candles by viewModel.candles.collectAsState()
    val analysis by viewModel.analysis.collectAsState()
    val availableBalance by viewModel.availableBalance.collectAsState()

    val currentAsset = assets.find { it.id == selectedKey } ?: assets.first()

    var orderSide by remember { mutableStateOf("BUY") }
    var orderInstrument by remember { mutableStateOf(if (currentAsset.type == "INDEX") "FUT" else "EQ") }
    var orderQty by remember { mutableStateOf(if (currentAsset.type == "INDEX") MarketUniverse.getLotSize(currentAsset.id, "FUT") else 10) }

    val step = currentAsset.strikeStep
    val recommendedStrike = (currentAsset.price / step).roundToInt() * step + (if (currentAsset.trend == "BULL") step else -step)

    val targetPrice = if (orderSide == "BUY") currentAsset.price * 1.01 else currentAsset.price * 0.99
    val slPrice = if (orderSide == "BUY") currentAsset.price * 0.995 else currentAsset.price * 1.005

    val requiredMargin = viewModel.calculateMargin(
        assetKey = currentAsset.id,
        instrument = orderInstrument,
        action = orderSide,
        qty = orderQty,
        price = currentAsset.price
    )

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(horizontal = 14.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // 1. Asset Switcher Chips
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                assets.take(12).forEach { item ->
                    val isSelected = item.id == selectedKey
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(if (isSelected) AccentCyanDim else DarkPanelSecondary)
                            .border(
                                width = 1.dp,
                                color = if (isSelected) AccentCyan else DarkBorder,
                                shape = RoundedCornerShape(20.dp)
                            )
                            .clickable {
                                viewModel.selectAsset(item.id)
                                orderInstrument = if (item.type == "INDEX") "FUT" else "EQ"
                                orderQty = MarketUniverse.getLotSize(item.id, orderInstrument)
                            }
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                            .testTag("asset_chip_${item.id}")
                    ) {
                        Text(
                            text = item.name,
                            color = if (isSelected) AccentCyan else TextSecondary,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
            }
        }

        // 2. Active Asset Quote & Technical Banner
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
                        verticalAlignment = Alignment.Top
                    ) {
                        Column {
                            Text(
                                text = "${currentAsset.name} (${currentAsset.symbol})",
                                color = TextPrimary,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                            Text(
                                text = "${currentAsset.type} / ${currentAsset.exchange} • ${currentAsset.sector}",
                                color = TextMuted,
                                fontSize = 11.sp
                            )
                        }

                        Column(horizontalAlignment = Alignment.End) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Box(
                                    modifier = Modifier
                                        .size(6.dp)
                                        .clip(CircleShape)
                                        .background(BullGreen)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = "LIVE MARKET",
                                    color = BullGreen,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    fontFamily = FontFamily.Monospace
                                )
                            }
                            Text(
                                text = String.format(Locale.US, "₹%,.2f", currentAsset.price),
                                color = TextPrimary,
                                fontSize = 20.sp,
                                fontWeight = FontWeight.ExtraBold,
                                fontFamily = FontFamily.Monospace
                            )
                            val isPos = currentAsset.changePts >= 0.0
                            Text(
                                text = "${if (isPos) "+" else ""}${String.format(Locale.US, "%.2f", currentAsset.changePts)} (${if (isPos) "+" else ""}${String.format(Locale.US, "%.2f", currentAsset.changePct)}%)",
                                color = if (isPos) BullGreen else BearRed,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Candlestick Chart
                    CandlestickChart(
                        candles = candles,
                        currentPrice = currentAsset.price
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    // Technical gauges row
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        TechnicalStat(label = "Day Range", value = "${String.format(Locale.US, "%.1f", currentAsset.low)} — ${String.format(Locale.US, "%.1f", currentAsset.high)}")
                        TechnicalStat(label = "Trend", value = currentAsset.trend, color = if (currentAsset.trend == "BULL") BullGreen else BearRed)
                        TechnicalStat(label = "EMA 20/50", value = if (currentAsset.trend == "BULL") "STRONG BUY" else "SELL", color = if (currentAsset.trend == "BULL") BullGreen else BearRed)
                        TechnicalStat(label = "VIX Status", value = analysis.vixRegime, color = if (currentAsset.vix >= 16) BearRed else BullGreen)
                    }
                }
            }
        }

        // 3. Smart Strategy Directives Card (1-Click Invest)
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
                            text = "STRATEGY SIGNAL",
                            color = TextMuted,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 0.5.sp
                        )

                        val badgeColor = when (analysis.finalState) {
                            "CONFIRMED TRADE" -> if (analysis.directionalBias == "BULLISH") BullGreen else BearRed
                            "WATCHLIST" -> WarnAmber
                            else -> TextMuted
                        }
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(badgeColor.copy(alpha = 0.16f))
                                .padding(horizontal = 8.dp, vertical = 3.dp)
                        ) {
                            Text(
                                text = "${analysis.finalState} • ${analysis.directionalBias}",
                                color = badgeColor,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = if (analysis.directionalBias == "BULLISH") "${currentAsset.id} ${recommendedStrike.roundToInt()} CALL (CE)" else "${currentAsset.id} ${recommendedStrike.roundToInt()} PUT (PE)",
                        color = TextPrimary,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(text = "Target 1", color = TextMuted, fontSize = 10.sp)
                            Text(text = "₹${String.format(Locale.US, "%,.1f", analysis.t1)}", color = BullGreen, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                        Column {
                            Text(text = "Target 2", color = TextMuted, fontSize = 10.sp)
                            Text(text = "₹${String.format(Locale.US, "%,.1f", analysis.t2)}", color = BullGreen, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                        Column {
                            Text(text = "Stop Loss", color = TextMuted, fontSize = 10.sp)
                            Text(text = "₹${String.format(Locale.US, "%,.1f", analysis.sl)}", color = BearRed, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                        Column {
                            Text(text = "Horizon", color = TextMuted, fontSize = 10.sp)
                            Text(text = if (analysis.holdDuration.length > 15) analysis.holdDuration.take(15) + "..." else analysis.holdDuration, color = TextSecondary, fontSize = 12.sp, fontWeight = FontWeight.Medium)
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Button(
                        onClick = {
                            val isBull = analysis.directionalBias == "BULLISH"
                            val type = if (isBull) "CE" else "PE"
                            val lotSize = MarketUniverse.getLotSize(currentAsset.id, type)
                            viewModel.executeOrder(
                                assetKey = currentAsset.id,
                                instrument = type,
                                action = "BUY",
                                qty = lotSize,
                                price = currentAsset.price * 0.015,
                                target = analysis.t1,
                                stopLoss = analysis.sl,
                                strategyName = "1-Click Quant Blueprint",
                                strike = recommendedStrike
                            )
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = AccentCyan),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .testTag("one_click_trade_button")
                    ) {
                        Icon(imageVector = Icons.Default.Bolt, contentDescription = null, tint = Color(0xFF04131C))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "1-Click Blueprint Paper Trade",
                            color = Color(0xFF04131C),
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // 4. Beginner Order Pad
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkPanel),
                border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = "ORDER TICKET",
                        color = TextMuted,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.5.sp
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    // Buy / Sell Tabs
                    Row(modifier = Modifier.fillMaxWidth()) {
                        Button(
                            onClick = { orderSide = "BUY" },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (orderSide == "BUY") BullGreen else DarkPanelSecondary
                            ),
                            shape = RoundedCornerShape(topStart = 8.dp, bottomStart = 8.dp),
                            modifier = Modifier
                                .weight(1f)
                                .testTag("side_buy_button")
                        ) {
                            Text(
                                text = "BUY (Long)",
                                color = if (orderSide == "BUY") Color.White else TextMuted,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        Button(
                            onClick = { orderSide = "SELL" },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (orderSide == "SELL") BearRed else DarkPanelSecondary
                            ),
                            shape = RoundedCornerShape(topEnd = 8.dp, bottomEnd = 8.dp),
                            modifier = Modifier
                                .weight(1f)
                                .testTag("side_sell_button")
                        ) {
                            Text(
                                text = "SELL (Short)",
                                color = if (orderSide == "SELL") Color.White else TextMuted,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Instrument Mode selector
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp))
                            .background(DarkPanelSecondary)
                            .padding(4.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        listOf("EQ" to "Shares", "FUT" to "Futures", "OPT" to "Options").forEach { (mode, label) ->
                            val isSelected = orderInstrument == mode
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(if (isSelected) AccentCyan else Color.Transparent)
                                    .clickable {
                                        orderInstrument = mode
                                        val lot = MarketUniverse.getLotSize(currentAsset.id, mode)
                                        orderQty = if (mode == "EQ") 10 else lot
                                    }
                                    .padding(vertical = 6.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = label,
                                    color = if (isSelected) Color(0xFF04131C) else TextSecondary,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // Quantity stepper
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = "Quantity", color = TextSecondary, fontSize = 12.sp, fontWeight = FontWeight.Medium)
                            val lotSize = MarketUniverse.getLotSize(currentAsset.id, orderInstrument)
                            Text(
                                text = if (orderInstrument == "EQ") "Min 1 unit" else "Lot size: $lotSize",
                                color = TextMuted,
                                fontSize = 10.sp
                            )
                        }

                        Row(verticalAlignment = Alignment.CenterVertically) {
                            IconButton(
                                onClick = {
                                    val stepQty = if (orderInstrument == "EQ") 1 else MarketUniverse.getLotSize(currentAsset.id, orderInstrument)
                                    orderQty = (orderQty - stepQty).coerceAtLeast(stepQty)
                                },
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(DarkPanelSecondary)
                            ) {
                                Icon(Icons.Default.Remove, contentDescription = "Minus", tint = TextPrimary)
                            }

                            Text(
                                text = "$orderQty",
                                color = TextPrimary,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace,
                                modifier = Modifier.padding(horizontal = 14.dp)
                            )

                            IconButton(
                                onClick = {
                                    val stepQty = if (orderInstrument == "EQ") 1 else MarketUniverse.getLotSize(currentAsset.id, orderInstrument)
                                    orderQty += stepQty
                                },
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(DarkPanelSecondary)
                            ) {
                                Icon(Icons.Default.Add, contentDescription = "Add", tint = TextPrimary)
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Target and Stop Loss pre-calculated values
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp))
                            .background(DarkPanelSecondary)
                            .padding(10.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(text = "Target (+1%)", color = BullGreen, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                            Text(text = String.format(Locale.US, "₹%,.2f", targetPrice), color = TextPrimary, fontSize = 13.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                        Column(horizontalAlignment = Alignment.End) {
                            Text(text = "Stop Loss (-0.5%)", color = BearRed, fontSize = 11.sp, fontWeight = FontWeight.SemiBold)
                            Text(text = String.format(Locale.US, "₹%,.2f", slPrice), color = TextPrimary, fontSize = 13.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // Margin requirements
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "Required Margin:", color = TextSecondary, fontSize = 12.sp)
                        Text(
                            text = String.format(Locale.US, "₹%,.2f", requiredMargin),
                            color = if (availableBalance >= requiredMargin) BullGreen else BearRed,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Monospace
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = {
                            viewModel.executeOrder(
                                assetKey = currentAsset.id,
                                instrument = orderInstrument,
                                action = orderSide,
                                qty = orderQty,
                                price = currentAsset.price,
                                target = targetPrice,
                                stopLoss = slPrice,
                                strategyName = "Order Pad Practice"
                            )
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (orderSide == "BUY") BullGreen else BearRed
                        ),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp)
                            .testTag("execute_order_button")
                    ) {
                        Icon(imageVector = Icons.Default.CheckCircle, contentDescription = null, tint = Color.White)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "Execute Practice $orderSide Trade",
                            color = Color.White,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun TechnicalStat(label: String, value: String, color: Color = TextPrimary) {
    Column {
        Text(text = label, color = TextMuted, fontSize = 10.sp)
        Text(text = value, color = color, fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
    }
}
