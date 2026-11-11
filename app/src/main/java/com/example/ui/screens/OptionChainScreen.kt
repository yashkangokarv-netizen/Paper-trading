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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.local.MarketUniverse
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.AccentCyanDim
import com.example.ui.theme.BearRed
import com.example.ui.theme.BullGreen
import com.example.ui.theme.DarkBg
import com.example.ui.theme.DarkBorder
import com.example.ui.theme.DarkPanel
import com.example.ui.theme.DarkPanelSecondary
import com.example.ui.theme.ITMBorder
import com.example.ui.theme.ITMYellow
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary
import com.example.ui.theme.WarnAmber
import com.example.ui.viewmodel.TerminalViewModel
import java.util.Locale
import kotlin.math.roundToInt

@Composable
fun OptionChainScreen(
    viewModel: TerminalViewModel,
    modifier: Modifier = Modifier
) {
    val assets by viewModel.assets.collectAsState()
    val chainKey by viewModel.optionChainAssetKey.collectAsState()
    val rows by viewModel.optionChainRows.collectAsState()
    val availableBalance by viewModel.availableBalance.collectAsState()

    val currentAsset = assets.find { it.id == chainKey } ?: assets.first()
    val lotSize = MarketUniverse.getLotSize(currentAsset.id, "CE")

    var selectedOrder by remember {
        mutableStateOf<OptionOrderDialogState?>(null)
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(horizontal = 14.dp, vertical = 8.dp)
    ) {
        // Asset Selector Chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf("NIFTY", "BANKNIFTY", "SENSEX", "FINNIFTY", "MIDCPNIFTY", "RELIANCE", "HDFCBANK", "TCS").forEach { key ->
                val isSelected = key == chainKey
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(20.dp))
                        .background(if (isSelected) AccentCyanDim else DarkPanelSecondary)
                        .border(1.dp, if (isSelected) AccentCyan else DarkBorder, RoundedCornerShape(20.dp))
                        .clickable { viewModel.selectOptionChainAsset(key) }
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                        .testTag("oc_chip_$key")
                ) {
                    Text(
                        text = key,
                        color = if (isSelected) AccentCyan else TextSecondary,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Spot Summary Card
        Card(
            colors = CardDefaults.cardColors(containerColor = DarkPanel),
            border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
            shape = RoundedCornerShape(10.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = currentAsset.name,
                        color = TextPrimary,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = String.format(Locale.US, "₹%,.2f", currentAsset.price),
                            color = TextPrimary,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            fontFamily = FontFamily.Monospace
                        )
                        val isPos = currentAsset.changePts >= 0.0
                        Text(
                            text = " ${if (isPos) "+" else ""}${String.format(Locale.US, "%.2f", currentAsset.changePct)}%",
                            color = if (isPos) BullGreen else BearRed,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Monospace
                        )
                    }
                }

                Row(horizontalArrangement = Arrangement.spacedBy(14.dp)) {
                    Column(horizontalAlignment = Alignment.End) {
                        Text(text = "Lot Size", color = TextMuted, fontSize = 10.sp)
                        Text(text = "$lotSize", color = TextPrimary, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        Text(text = "PCR", color = TextMuted, fontSize = 10.sp)
                        Text(text = String.format(Locale.US, "%.2f", currentAsset.pcr), color = TextPrimary, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        Text(text = "India VIX", color = TextMuted, fontSize = 10.sp)
                        Text(text = String.format(Locale.US, "%.2f", currentAsset.vix), color = WarnAmber, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Option Chain Table Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkPanelSecondary)
                .padding(vertical = 8.dp, horizontal = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "CALLS (CE)",
                color = BullGreen,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1.5f),
                textAlign = TextAlign.Center
            )
            Text(
                text = "STRIKE",
                color = TextPrimary,
                fontSize = 11.sp,
                fontWeight = FontWeight.ExtraBold,
                modifier = Modifier.weight(1f),
                textAlign = TextAlign.Center
            )
            Text(
                text = "PUTS (PE)",
                color = BearRed,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.weight(1.5f),
                textAlign = TextAlign.Center
            )
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkBg)
                .padding(vertical = 4.dp, horizontal = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("OI", color = TextMuted, fontSize = 10.sp, modifier = Modifier.weight(0.6f), textAlign = TextAlign.Center)
            Text("LTP", color = TextMuted, fontSize = 10.sp, modifier = Modifier.weight(0.9f), textAlign = TextAlign.Center)
            Text("Price", color = TextMuted, fontSize = 10.sp, modifier = Modifier.weight(1f), textAlign = TextAlign.Center)
            Text("LTP", color = TextMuted, fontSize = 10.sp, modifier = Modifier.weight(0.9f), textAlign = TextAlign.Center)
            Text("OI", color = TextMuted, fontSize = 10.sp, modifier = Modifier.weight(0.6f), textAlign = TextAlign.Center)
        }

        // Option Chain Rows
        LazyColumn(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            verticalArrangement = Arrangement.spacedBy(2.dp)
        ) {
            items(rows) { row ->
                val callBg = if (row.callITM) ITMYellow else Color.Transparent
                val putBg = if (row.putITM) ITMYellow else Color.Transparent

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(DarkPanel)
                        .padding(vertical = 6.dp, horizontal = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Call side
                    Box(
                        modifier = Modifier
                            .weight(1.5f)
                            .background(callBg)
                            .clickable {
                                selectedOrder = OptionOrderDialogState(
                                    assetKey = currentAsset.id,
                                    strike = row.strike,
                                    type = "CE",
                                    ltp = row.callLtp,
                                    side = "BUY",
                                    lotSize = lotSize
                                )
                            }
                            .padding(horizontal = 4.dp, vertical = 2.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "${row.callOI}L",
                                color = TextMuted,
                                fontSize = 10.sp,
                                fontFamily = FontFamily.Monospace
                            )
                            Text(
                                text = String.format(Locale.US, "₹%.1f", row.callLtp),
                                color = BullGreen,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }

                    // Strike
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .background(if (row.isATM) AccentCyanDim else DarkPanelSecondary)
                            .border(if (row.isATM) 1.dp else 0.dp, if (row.isATM) AccentCyan else Color.Transparent)
                            .padding(vertical = 4.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = String.format(Locale.US, "%,.0f", row.strike),
                            color = if (row.isATM) AccentCyan else TextPrimary,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Monospace
                        )
                    }

                    // Put side
                    Box(
                        modifier = Modifier
                            .weight(1.5f)
                            .background(putBg)
                            .clickable {
                                selectedOrder = OptionOrderDialogState(
                                    assetKey = currentAsset.id,
                                    strike = row.strike,
                                    type = "PE",
                                    ltp = row.putLtp,
                                    side = "BUY",
                                    lotSize = lotSize
                                )
                            }
                            .padding(horizontal = 4.dp, vertical = 2.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = String.format(Locale.US, "₹%.1f", row.putLtp),
                                color = BearRed,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Monospace
                            )
                            Text(
                                text = "${row.putOI}L",
                                color = TextMuted,
                                fontSize = 10.sp,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                }
            }
        }
    }

    // Quick Order Modal
    selectedOrder?.let { order ->
        var lots by remember { mutableStateOf(1) }
        var side by remember { mutableStateOf(order.side) }

        val totalShares = lots * order.lotSize
        val margin = if (side == "BUY") {
            totalShares * order.ltp
        } else {
            totalShares * order.ltp + (currentAsset.price * totalShares * 0.12)
        }

        AlertDialog(
            onDismissRequest = { selectedOrder = null },
            title = {
                Text(
                    text = "${order.assetKey} ${order.strike.roundToInt()} ${order.type}",
                    color = TextPrimary,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text(
                        text = "Premium (LTP): ₹${String.format(Locale.US, "%.2f", order.ltp)}",
                        color = TextSecondary,
                        fontSize = 13.sp
                    )

                    // Buy / Sell toggle
                    Row(modifier = Modifier.fillMaxWidth()) {
                        Button(
                            onClick = { side = "BUY" },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (side == "BUY") BullGreen else DarkPanelSecondary
                            ),
                            modifier = Modifier.weight(1f)
                        ) {
                            Text("BUY", color = if (side == "BUY") Color.White else TextMuted, fontWeight = FontWeight.Bold)
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Button(
                            onClick = { side = "SELL" },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (side == "SELL") BearRed else DarkPanelSecondary
                            ),
                            modifier = Modifier.weight(1f)
                        ) {
                            Text("SELL", color = if (side == "SELL") Color.White else TextMuted, fontWeight = FontWeight.Bold)
                        }
                    }

                    // Lots selector
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "Lots (1 Lot = ${order.lotSize}):", color = TextSecondary, fontSize = 12.sp)
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            OutlinedButton(onClick = { if (lots > 1) lots-- }) { Text("-") }
                            Text(text = "$lots", color = TextPrimary, fontSize = 15.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 10.dp))
                            OutlinedButton(onClick = { lots++ }) { Text("+") }
                        }
                    }

                    Text(
                        text = "Total: $totalShares Shares • Required: ₹${String.format(Locale.US, "%,.2f", margin)}",
                        color = if (availableBalance >= margin) BullGreen else BearRed,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        viewModel.executeOrder(
                            assetKey = order.assetKey,
                            instrument = order.type,
                            action = side,
                            qty = totalShares,
                            price = order.ltp,
                            target = if (side == "BUY") order.ltp * 1.3 else order.ltp * 0.7,
                            stopLoss = if (side == "BUY") order.ltp * 0.8 else order.ltp * 1.2,
                            strategyName = "Option Chain",
                            strike = order.strike
                        )
                        selectedOrder = null
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (side == "BUY") BullGreen else BearRed
                    ),
                    enabled = availableBalance >= margin
                ) {
                    Text("Execute $side Trade")
                }
            },
            dismissButton = {
                OutlinedButton(onClick = { selectedOrder = null }) {
                    Text("Cancel", color = TextSecondary)
                }
            },
            containerColor = DarkPanel,
            shape = RoundedCornerShape(12.dp)
        )
    }
}

data class OptionOrderDialogState(
    val assetKey: String,
    val strike: Double,
    val type: String, // "CE" or "PE"
    val ltp: Double,
    val side: String, // "BUY" or "SELL"
    val lotSize: Int
)
