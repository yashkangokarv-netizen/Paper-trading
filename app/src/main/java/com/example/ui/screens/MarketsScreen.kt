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
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
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
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.AssetUniverseItem
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
import com.example.ui.viewmodel.TerminalViewModel
import java.util.Locale

@Composable
fun MarketsScreen(
    viewModel: TerminalViewModel,
    onNavigateToTrade: () -> Unit,
    modifier: Modifier = Modifier
) {
    val assets by viewModel.assets.collectAsState()
    val breadth by viewModel.marketBreadth.collectAsState()
    val sectors by viewModel.sectors.collectAsState()
    val globalMarkets by viewModel.globalMarkets.collectAsState()

    var searchQuery by remember { mutableStateOf("") }
    var selectedFilter by remember { mutableStateOf("ALL") }

    val filteredAssets = assets.filter { item ->
        val q = searchQuery.trim().lowercase()
        val matchesSearch = q.isEmpty() ||
                item.name.lowercase().contains(q) ||
                item.ticker.lowercase().contains(q) ||
                item.sector.lowercase().contains(q)

        if (!matchesSearch) return@filter false

        when (selectedFilter) {
            "ALL" -> true
            "INDICES" -> item.type == "INDEX"
            "GAINERS" -> item.changePts >= 0.0
            "LOSERS" -> item.changePts < 0.0
            "BANKING" -> item.sector.contains("Banking", ignoreCase = true) || item.sector.contains("Financial", ignoreCase = true)
            "IT" -> item.sector.contains("IT", ignoreCase = true)
            "AUTO" -> item.sector.contains("Auto", ignoreCase = true)
            else -> true
        }
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(horizontal = 14.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // 1. Indices Ribbon
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                assets.filter { it.type == "INDEX" }.forEach { indexItem ->
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkPanel),
                        border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier
                            .width(160.dp)
                            .clickable {
                                viewModel.selectAsset(indexItem.id)
                                onNavigateToTrade()
                            }
                    ) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(text = indexItem.name, color = TextSecondary, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                val isPos = indexItem.changePts >= 0.0
                                Text(
                                    text = "${if (isPos) "+" else ""}${String.format(Locale.US, "%.2f", indexItem.changePct)}%",
                                    color = if (isPos) BullGreen else BearRed,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.Monospace
                                )
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = String.format(Locale.US, "₹%,.1f", indexItem.price),
                                color = TextPrimary,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.ExtraBold,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                }
            }
        }

        // 2. Market Breadth & Global Cues
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = DarkPanel),
                border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(text = "MARKET BREADTH (NSE)", color = TextMuted, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(6.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "Advances: ${breadth.advances}", color = BullGreen, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                        Text(text = "Declines: ${breadth.declines}", color = BearRed, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    // Split bar
                    val total = breadth.advances + breadth.declines
                    val advRatio = if (total > 0) breadth.advances.toFloat() / total else 0.5f

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(6.dp)
                            .clip(RoundedCornerShape(3.dp))
                            .background(DarkBorder)
                    ) {
                        Box(
                            modifier = Modifier
                                .weight(advRatio)
                                .height(6.dp)
                                .background(BullGreen)
                        )
                        Box(
                            modifier = Modifier
                                .weight(1f - advRatio)
                                .height(6.dp)
                                .background(BearRed)
                        )
                    }

                    Spacer(modifier = Modifier.height(10.dp))
                    Text(text = "GLOBAL CUES", color = TextMuted, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(4.dp))

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .horizontalScroll(rememberScrollState()),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        globalMarkets.forEach { gm ->
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(text = "${gm.name}: ", color = TextSecondary, fontSize = 11.sp)
                                Text(text = "${gm.price} ", color = TextPrimary, fontSize = 11.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                                Text(text = gm.chg, color = if (gm.isPos) BullGreen else BearRed, fontSize = 10.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                            }
                        }
                    }
                }
            }
        }

        // 3. Sector Performance Grid
        item {
            Text(text = "SECTOR PERFORMANCE", color = TextMuted, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(6.dp))

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                sectors.forEach { sec ->
                    Card(
                        colors = CardDefaults.cardColors(containerColor = DarkPanelSecondary),
                        border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier
                            .width(100.dp)
                            .clickable {
                                searchQuery = sec.name
                            }
                    ) {
                        Column(
                            modifier = Modifier.padding(8.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(text = sec.name, color = TextPrimary, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = sec.chg,
                                color = if (sec.isPositive) BullGreen else BearRed,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.ExtraBold,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                }
            }
        }

        // 4. Search and Filters
        item {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { searchQuery = it },
                    placeholder = { Text("Search name, ticker, or sector...", color = TextMuted, fontSize = 13.sp) },
                    leadingIcon = { Icon(Icons.Default.Search, contentDescription = null, tint = TextMuted) },
                    trailingIcon = {
                        if (searchQuery.isNotEmpty()) {
                            IconButton(onClick = { searchQuery = "" }) {
                                Icon(Icons.Default.Clear, contentDescription = "Clear", tint = TextMuted)
                            }
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedContainerColor = DarkPanel,
                        unfocusedContainerColor = DarkPanel,
                        focusedBorderColor = AccentCyan,
                        unfocusedBorderColor = DarkBorder,
                        focusedTextColor = TextPrimary,
                        unfocusedTextColor = TextPrimary
                    ),
                    singleLine = true
                )

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    listOf("ALL", "INDICES", "GAINERS", "LOSERS", "BANKING", "IT", "AUTO").forEach { filter ->
                        val isSelected = selectedFilter == filter
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(16.dp))
                                .background(if (isSelected) AccentCyanDim else DarkPanelSecondary)
                                .border(1.dp, if (isSelected) AccentCyan else DarkBorder, RoundedCornerShape(16.dp))
                            .clickable { selectedFilter = filter }
                            .padding(horizontal = 10.dp, vertical = 5.dp)
                        ) {
                            Text(
                                text = filter,
                                color = if (isSelected) AccentCyan else TextSecondary,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }

        // 5. Filtered Instruments List
        items(filteredAssets, key = { it.id }) { item ->
            InstrumentRow(
                item = item,
                onTradeClick = {
                    viewModel.selectAsset(item.id)
                    onNavigateToTrade()
                }
            )
        }
    }
}

@Composable
private fun InstrumentRow(
    item: AssetUniverseItem,
    onTradeClick: () -> Unit
) {
    val isPos = item.changePts >= 0.0

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
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(text = item.name, color = TextPrimary, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                    if (item.type == "INDEX") {
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(4.dp))
                                .background(AccentCyanDim)
                                .padding(horizontal = 4.dp, vertical = 1.dp)
                        ) {
                            Text("INDEX", color = AccentCyan, fontSize = 8.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
                Text(
                    text = "${item.ticker} • ${item.sector} • P/E: ${item.pe?.let { "${it}x" } ?: "--"}",
                    color = TextMuted,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace
                )
            }

            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = String.format(Locale.US, "₹%,.2f", item.price),
                    color = TextPrimary,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace
                )
                Text(
                    text = "${if (isPos) "+" else ""}${String.format(Locale.US, "%.2f", item.changePct)}%",
                    color = if (isPos) BullGreen else BearRed,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace
                )
            }

            Spacer(modifier = Modifier.width(10.dp))

            Button(
                onClick = onTradeClick,
                colors = ButtonDefaults.buttonColors(containerColor = DarkPanelSecondary),
                shape = RoundedCornerShape(6.dp),
                contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 4.dp),
                modifier = Modifier.height(30.dp)
            ) {
                Text("Trade", color = AccentCyan, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}
