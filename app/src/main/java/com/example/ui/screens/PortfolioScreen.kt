package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.HourglassTop
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
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
import com.example.data.model.TradeHistoryItem
import com.example.data.model.TradePosition
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.BearRed
import com.example.ui.theme.BearRedBg
import com.example.ui.theme.BearRedBorder
import com.example.ui.theme.BullGreen
import com.example.ui.theme.BullGreenBg
import com.example.ui.theme.BullGreenBorder
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
fun PortfolioScreen(
    viewModel: TerminalViewModel,
    modifier: Modifier = Modifier
) {
    val availableBalance by viewModel.availableBalance.collectAsState()
    val realizedPnL by viewModel.realizedPnL.collectAsState()
    val positions by viewModel.activePositions.collectAsState()
    val history by viewModel.tradeHistory.collectAsState()
    val renewalStatus by viewModel.renewalStatus.collectAsState()

    var activeTab by remember { mutableStateOf("POSITIONS") } // "POSITIONS" or "HISTORY"

    val totalMarginDeployed = positions.sumOf { it.marginAllocated }
    val totalUnrealizedPnL = positions.sumOf { it.pnl }
    val netAccountValue = (availableBalance + totalMarginDeployed + totalUnrealizedPnL).coerceAtLeast(0.0)

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(horizontal = 14.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // 1. Capital Exhaustion & Renewal Alerts
        if (renewalStatus == "EXHAUSTED") {
            item {
                Card(
                    colors = CardDefaults.cardColors(containerColor = BearRedBg),
                    border = androidx.compose.foundation.BorderStroke(1.dp, BearRedBorder),
                    shape = RoundedCornerShape(10.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(14.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.weight(1f)) {
                            Icon(Icons.Default.Warning, contentDescription = null, tint = BearRed)
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(
                                    text = "VIRTUAL CAPITAL EXHAUSTED",
                                    color = BearRed,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "Balance reached ₹0.00. Request ₹5,00,000 replenishment below.",
                                    color = TextSecondary,
                                    fontSize = 11.sp
                                )
                            }
                        }

                        Button(
                            onClick = { viewModel.requestFundRenewal() },
                            colors = ButtonDefaults.buttonColors(containerColor = BearRed),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.testTag("request_renewal_button")
                        ) {
                            Text("Request ₹5L", color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        } else if (renewalStatus == "PENDING") {
            item {
                Card(
                    colors = CardDefaults.cardColors(containerColor = WarnAmberBg),
                    border = androidx.compose.foundation.BorderStroke(1.dp, WarnAmber.copy(alpha = 0.4f)),
                    shape = RoundedCornerShape(10.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.HourglassTop, contentDescription = null, tint = WarnAmber)
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "RENEWAL PENDING APPROVAL",
                                color = WarnAmber,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Your ₹5,00,000 capital renewal is submitted for administrative review.",
                                color = TextSecondary,
                                fontSize = 11.sp
                            )
                        }
                    }
                }
            }
        }

        // 2. Financial Ledger 4-grid Summary
        item {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    LedgerCard(
                        title = "Net Account Value",
                        value = String.format(Locale.US, "₹%,.2f", netAccountValue),
                        subtext = "${if (totalUnrealizedPnL >= 0) "+" else ""}₹${String.format(Locale.US, "%,.1f", totalUnrealizedPnL)} unrl.",
                        subtextColor = if (totalUnrealizedPnL >= 0) BullGreen else BearRed,
                        modifier = Modifier.weight(1f)
                    )
                    LedgerCard(
                        title = "Available Cash",
                        value = String.format(Locale.US, "₹%,.2f", availableBalance),
                        subtext = "Initial ₹5,00,000",
                        modifier = Modifier.weight(1f)
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    LedgerCard(
                        title = "Margin Deployed",
                        value = String.format(Locale.US, "₹%,.2f", totalMarginDeployed),
                        subtext = "${positions.size} open positions",
                        modifier = Modifier.weight(1f)
                    )
                    LedgerCard(
                        title = "Realized P&L",
                        value = "${if (realizedPnL >= 0) "+" else ""}₹${String.format(Locale.US, "%,.2f", realizedPnL)}",
                        valueColor = if (realizedPnL >= 0) BullGreen else BearRed,
                        subtext = "${history.size} closed trades",
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // 3. Tab Switcher (Open Positions vs Trade History)
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(8.dp))
                    .background(DarkPanelSecondary)
                    .padding(4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(modifier = Modifier.weight(1f)) {
                    TabPill(
                        label = "Open Positions (${positions.size})",
                        isSelected = activeTab == "POSITIONS",
                        onClick = { activeTab = "POSITIONS" },
                        modifier = Modifier.weight(1f)
                    )
                    TabPill(
                        label = "Trade History (${history.size})",
                        isSelected = activeTab == "HISTORY",
                        onClick = { activeTab = "HISTORY" },
                        modifier = Modifier.weight(1f)
                    )
                }

                if (positions.isNotEmpty() && activeTab == "POSITIONS") {
                    Spacer(modifier = Modifier.width(8.dp))
                    OutlinedButton(
                        onClick = { viewModel.squareOffAll() },
                        shape = RoundedCornerShape(6.dp),
                        contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 8.dp, vertical = 4.dp),
                        modifier = Modifier.height(30.dp)
                    ) {
                        Text("Exit All", color = BearRed, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        // 4. Content List
        if (activeTab == "POSITIONS") {
            if (positions.isEmpty()) {
                item {
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkPanel),
                        border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 20.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(24.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(text = "No open positions yet.", color = TextPrimary, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(text = "Go to Trade or Option Chain to execute your first practice trade.", color = TextMuted, fontSize = 12.sp)
                        }
                    }
                }
            } else {
                items(positions, key = { it.id }) { pos ->
                    PositionCard(
                        position = pos,
                        onSquareOff = { viewModel.squareOffPosition(pos.id) }
                    )
                }
            }
        } else {
            if (history.isEmpty()) {
                item {
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkPanel),
                        border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 20.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(24.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(text = "No closed trades recorded.", color = TextPrimary, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(text = "When you square off an open position, it is archived here.", color = TextMuted, fontSize = 12.sp)
                        }
                    }
                }
            } else {
                items(history, key = { it.id }) { item ->
                    HistoryCard(item = item)
                }
            }
        }
    }
}

@Composable
private fun LedgerCard(
    title: String,
    value: String,
    valueColor: Color = TextPrimary,
    subtext: String = "",
    subtextColor: Color = TextMuted,
    modifier: Modifier = Modifier
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = DarkPanel),
        border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
        shape = RoundedCornerShape(10.dp),
        modifier = modifier
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(text = title, color = TextMuted, fontSize = 10.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = value, color = valueColor, fontSize = 14.sp, fontWeight = FontWeight.ExtraBold, fontFamily = FontFamily.Monospace)
            if (subtext.isNotEmpty()) {
                Spacer(modifier = Modifier.height(2.dp))
                Text(text = subtext, color = subtextColor, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
            }
        }
    }
}

@Composable
private fun TabPill(
    label: String,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(6.dp))
            .background(if (isSelected) AccentCyan else Color.Transparent)
            .clickable { onClick() }
            .padding(vertical = 6.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = label,
            color = if (isSelected) Color(0xFF04131C) else TextSecondary,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
private fun PositionCard(
    position: TradePosition,
    onSquareOff: () -> Unit
) {
    val isProfit = position.pnl >= 0.0
    val pnlColor = if (isProfit) BullGreen else BearRed

    Card(
        colors = CardDefaults.cardColors(containerColor = DarkPanel),
        border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
        shape = RoundedCornerShape(10.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    val actionBg = if (position.action == "BUY") BullGreenBg else BearRedBg
                    val actionText = if (position.action == "BUY") BullGreen else BearRed
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(4.dp))
                            .background(actionBg)
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text(text = position.action, color = actionText, fontSize = 10.sp, fontWeight = FontWeight.ExtraBold)
                    }

                    Spacer(modifier = Modifier.width(8.dp))

                    Text(
                        text = position.contract,
                        color = TextPrimary,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace
                    )
                }

                Text(
                    text = "${if (isProfit) "+" else ""}₹${String.format(Locale.US, "%,.1f", position.pnl)} (${if (isProfit) "+" else ""}${String.format(Locale.US, "%.1f", position.pnlPercent)}%)",
                    color = pnlColor,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = FontFamily.Monospace
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Qty: ${position.qty} • Entry: ₹${String.format(Locale.US, "%.1f", position.entryPrice)} • CMP: ₹${String.format(Locale.US, "%.1f", position.currentPrice)}",
                        color = TextMuted,
                        fontSize = 11.sp,
                        fontFamily = FontFamily.Monospace
                    )
                    Text(
                        text = "Margin: ₹${String.format(Locale.US, "%,.0f", position.marginAllocated)} • ${position.strategyName}",
                        color = TextSecondary,
                        fontSize = 10.sp
                    )
                }

                Button(
                    onClick = onSquareOff,
                    colors = ButtonDefaults.buttonColors(containerColor = BearRedBg),
                    shape = RoundedCornerShape(6.dp),
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 4.dp),
                    modifier = Modifier.height(30.dp)
                ) {
                    Text("Square Off", color = BearRed, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
private fun HistoryCard(item: TradeHistoryItem) {
    val isProfit = item.realizedPnL >= 0.0
    val pnlColor = if (isProfit) BullGreen else BearRed

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
                    text = item.contract,
                    color = TextPrimary,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace
                )
                Text(
                    text = "${item.action} ${item.qty} units @ ₹${String.format(Locale.US, "%.1f", item.entryPrice)} → Exit @ ₹${String.format(Locale.US, "%.1f", item.exitPrice)}",
                    color = TextMuted,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace
                )
                Text(
                    text = "${item.closeDate} ${item.closeTime} • ${item.strategyName}",
                    color = TextSecondary,
                    fontSize = 10.sp
                )
            }

            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = "${if (isProfit) "+" else ""}₹${String.format(Locale.US, "%,.1f", item.realizedPnL)}",
                    color = pnlColor,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = FontFamily.Monospace
                )
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (isProfit) BullGreenBg else BearRedBg)
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                ) {
                    Text(
                        text = item.result,
                        color = if (isProfit) BullGreen else BearRed,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }
    }
}
