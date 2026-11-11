package com.example.ui.components

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.AssetUniverseItem
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.BearRed
import com.example.ui.theme.BullGreen
import com.example.ui.theme.DarkBg
import com.example.ui.theme.DarkBorder
import com.example.ui.theme.DarkPanel
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary
import com.example.ui.theme.WarnAmber
import kotlinx.coroutines.delay
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale
import java.util.TimeZone

@Composable
fun HeaderTickerBar(
    availableBalance: Double,
    nifty: AssetUniverseItem?,
    bankNifty: AssetUniverseItem?,
    sensex: AssetUniverseItem?,
    vix: Double,
    pcr: Double,
    renewalPending: Boolean,
    isRefreshing: Boolean = false,
    lastSyncTime: String = "",
    onAdminClick: () -> Unit,
    onRefreshClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var currentTimeIST by remember { mutableStateOf("") }
    var isMarketOpen by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        val istFormat = SimpleDateFormat("dd MMM, hh:mm:ss a", Locale.ENGLISH).apply {
            timeZone = TimeZone.getTimeZone("Asia/Kolkata")
        }
        while (true) {
            val cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Kolkata"))
            currentTimeIST = istFormat.format(cal.time) + " IST"

            val day = cal.get(Calendar.DAY_OF_WEEK)
            val minutes = cal.get(Calendar.HOUR_OF_DAY) * 60 + cal.get(Calendar.MINUTE)
            val isWeekday = day in Calendar.MONDAY..Calendar.FRIDAY
            isMarketOpen = isWeekday && (minutes in (9 * 60 + 15)..(15 * 60 + 30))

            delay(1000)
        }
    }

    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val alphaAnim by infiniteTransition.animateFloat(
        initialValue = 0.4f,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "liveGlow"
    )

    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(DarkPanel)
    ) {
        // Upper Header row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 14.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(34.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(AccentCyan.copy(alpha = 0.16f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.TrendingUp,
                        contentDescription = "App Icon",
                        tint = AccentCyan,
                        modifier = Modifier.size(20.dp)
                    )
                }

                Spacer(modifier = Modifier.width(10.dp))

                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "Paper Trader",
                            color = TextPrimary,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(4.dp))
                                .background(BullGreen.copy(alpha = 0.18f))
                                .padding(horizontal = 5.dp, vertical = 2.dp)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Box(
                                    modifier = Modifier
                                        .size(6.dp)
                                        .clip(CircleShape)
                                        .background(BullGreen.copy(alpha = alphaAnim))
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = "REAL LIVE",
                                    color = BullGreen,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    fontFamily = FontFamily.Monospace
                                )
                            }
                        }
                    }
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = if (isMarketOpen) "NSE/BSE OPEN" else "NSE/BSE CLOSED",
                            color = if (isMarketOpen) BullGreen else WarnAmber,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Monospace
                        )
                        if (lastSyncTime.isNotEmpty()) {
                            Text(
                                text = " • Sync $lastSyncTime",
                                color = TextMuted,
                                fontSize = 9.sp,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                }
            }

            // Right side: Balance and Actions
            Row(verticalAlignment = Alignment.CenterVertically) {
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = "VIRTUAL CASH",
                        color = TextMuted,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.SemiBold,
                        letterSpacing = 0.5.sp
                    )
                    Text(
                        text = String.format(Locale.US, "₹%,.2f", availableBalance),
                        color = TextPrimary,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace
                    )
                }

                Spacer(modifier = Modifier.width(8.dp))

                IconButton(
                    onClick = onRefreshClick,
                    modifier = Modifier
                        .size(32.dp)
                        .testTag("refresh_button")
                ) {
                    if (isRefreshing) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(16.dp),
                            color = AccentCyan,
                            strokeWidth = 2.dp
                        )
                    } else {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Refresh Real Live Data",
                            tint = AccentCyan,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }

                Box {
                    IconButton(
                        onClick = onAdminClick,
                        modifier = Modifier
                            .size(32.dp)
                            .testTag("admin_button")
                    ) {
                        Icon(
                            imageVector = Icons.Default.Shield,
                            contentDescription = "Admin Desk",
                            tint = if (renewalPending) WarnAmber else TextSecondary,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                    if (renewalPending) {
                        Box(
                            modifier = Modifier
                                .size(8.dp)
                                .clip(CircleShape)
                                .background(WarnAmber)
                                .align(Alignment.TopEnd)
                        )
                    }
                }
            }
        }

        // Ticker tape row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(DarkBg)
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 14.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TickerItem(
                label = "NIFTY 50",
                price = nifty?.price ?: 25044.65,
                pct = nifty?.changePct ?: 0.06
            )

            Spacer(modifier = Modifier.width(16.dp))

            TickerItem(
                label = "BANK NIFTY",
                price = bankNifty?.price ?: 59741.25,
                pct = bankNifty?.changePct ?: 1.11
            )

            Spacer(modifier = Modifier.width(16.dp))

            TickerItem(
                label = "SENSEX",
                price = sensex?.price ?: 81106.65,
                pct = sensex?.changePct ?: 0.10
            )

            Spacer(modifier = Modifier.width(16.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(text = "INDIA VIX: ", color = TextMuted, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
                Text(
                    text = String.format(Locale.US, "%.2f", vix),
                    color = if (vix >= 18.0) BearRed else if (vix < 14.0) BullGreen else WarnAmber,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace
                )
            }

            Spacer(modifier = Modifier.width(16.dp))

            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(text = "PCR: ", color = TextMuted, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
                Text(
                    text = String.format(Locale.US, "%.2f", pcr),
                    color = if (pcr > 1.1) BullGreen else if (pcr < 0.9) BearRed else TextSecondary,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace
                )
            }

            Spacer(modifier = Modifier.width(16.dp))

            Text(
                text = currentTimeIST,
                color = TextMuted,
                fontSize = 10.sp,
                fontFamily = FontFamily.Monospace
            )
        }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(DarkBorder)
        )
    }
}

@Composable
private fun TickerItem(label: String, price: Double, pct: Double) {
    val isPos = pct >= 0.0
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(text = "$label ", color = TextMuted, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
        Text(
            text = String.format(Locale.US, "%,.2f", price),
            color = TextPrimary,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Monospace
        )
        Text(
            text = " ${if (isPos) "+" else ""}${String.format(Locale.US, "%.2f", pct)}%",
            color = if (isPos) BullGreen else BearRed,
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Monospace
        )
    }
}
