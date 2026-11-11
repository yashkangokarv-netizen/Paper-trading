package com.example.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.Candle
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.BearRed
import com.example.ui.theme.BullGreen
import com.example.ui.theme.DarkBg
import com.example.ui.theme.DarkBorder
import com.example.ui.theme.DarkPanelSecondary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary
import java.util.Locale
import kotlin.math.max

@Composable
fun CandlestickChart(
    candles: List<Candle>,
    currentPrice: Double,
    modifier: Modifier = Modifier
) {
    if (candles.isEmpty()) {
        Box(
            modifier = modifier
                .fillMaxWidth()
                .height(280.dp)
                .background(DarkBg, RoundedCornerShape(8.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text("Loading chart candles...", color = TextSecondary, fontSize = 12.sp)
        }
        return
    }

    var selectedIndex by remember { mutableStateOf<Int?>(null) }
    val activeCandle = selectedIndex?.let { if (it in candles.indices) candles[it] else null } ?: candles.lastOrNull()

    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(DarkBg, RoundedCornerShape(8.dp))
            .padding(8.dp)
    ) {
        // Scrubber / Active candle HUD
        activeCandle?.let { c ->
            val isGreen = c.close >= c.open
            val chgPts = c.close - c.open
            val chgPct = if (c.open > 0) (chgPts / c.open) * 100.0 else 0.0

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 4.dp, vertical = 2.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "${c.time}  ",
                    color = TextMuted,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace
                )
                Text(
                    text = "O: ${String.format(Locale.US, "%.1f", c.open)}  H: ${String.format(Locale.US, "%.1f", c.high)}  L: ${String.format(Locale.US, "%.1f", c.low)}  C: ${String.format(Locale.US, "%.1f", c.close)}  ",
                    color = TextSecondary,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace
                )
                Text(
                    text = "${if (chgPts >= 0) "+" else ""}${String.format(Locale.US, "%.2f", chgPct)}%",
                    color = if (isGreen) BullGreen else BearRed,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace
                )
            }
        }

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(250.dp)
                .pointerInput(candles) {
                    detectTapGestures(
                        onPress = { offset ->
                            val slotW = size.width / candles.size
                            val idx = (offset.x / slotW).toInt().coerceIn(0, candles.lastIndex)
                            selectedIndex = idx
                        }
                    )
                }
                .pointerInput(candles) {
                    detectDragGestures(
                        onDragStart = { offset ->
                            val slotW = size.width / candles.size
                            val idx = (offset.x / slotW).toInt().coerceIn(0, candles.lastIndex)
                            selectedIndex = idx
                        },
                        onDrag = { change, _ ->
                            change.consume()
                            val slotW = size.width / candles.size
                            val idx = (change.position.x / slotW).toInt().coerceIn(0, candles.lastIndex)
                            selectedIndex = idx
                        },
                        onDragEnd = {
                            selectedIndex = null
                        },
                        onDragCancel = {
                            selectedIndex = null
                        }
                    )
                }
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val paddingRight = 65.dp.toPx()
                val paddingBottom = 22.dp.toPx()
                val paddingTop = 12.dp.toPx()
                val chartW = size.width - paddingRight
                val chartH = size.height - paddingBottom - paddingTop
                val volumeH = (chartH * 0.22f).coerceAtMost(55.dp.toPx())
                val priceH = chartH - volumeH

                var minPrice = Double.MAX_VALUE
                var maxPrice = Double.MIN_VALUE
                var maxVol = 0L

                for (c in candles) {
                    if (c.low < minPrice) minPrice = c.low
                    if (c.high > maxPrice) maxPrice = c.high
                    if (c.volume > maxVol) maxVol = c.volume
                }

                val pricePadding = ((maxPrice - minPrice) * 0.08).coerceAtLeast(1.0)
                minPrice -= pricePadding
                maxPrice += pricePadding
                val priceRange = maxPrice - minPrice

                // Draw Horizontal Price Grid Lines
                val gridSteps = 4
                for (i in 0..gridSteps) {
                    val y = paddingTop + (priceH / gridSteps) * i
                    val priceVal = maxPrice - (priceRange / gridSteps) * i

                    drawLine(
                        color = DarkBorder,
                        start = Offset(0f, y),
                        end = Offset(chartW, y),
                        strokeWidth = 1.dp.toPx()
                    )

                    drawContext.canvas.nativeCanvas.apply {
                        val paint = android.graphics.Paint().apply {
                            color = android.graphics.Color.parseColor("#8794A7")
                            textSize = 24f
                            typeface = android.graphics.Typeface.MONOSPACE
                        }
                        drawText(String.format(Locale.US, "%.1f", priceVal), chartW + 8f, y + 8f, paint)
                    }
                }

                val slotW = chartW / candles.size
                val candleW = max(3f, slotW * 0.65f)

                // Volume bars & Candlesticks
                candles.forEachIndexed { i, c ->
                    val x = i * slotW + (slotW / 2)
                    val isGreen = c.close >= c.open
                    val candleColor = if (isGreen) BullGreen else BearRed

                    // Volume bar
                    val vBarH = if (maxVol > 0) (c.volume.toFloat() / maxVol) * volumeH else 0f
                    val vBarY = paddingTop + priceH + (volumeH - vBarH)
                    drawRect(
                        color = candleColor.copy(alpha = 0.28f),
                        topLeft = Offset(x - candleW / 2, vBarY),
                        size = Size(candleW, vBarH)
                    )

                    // Wick
                    val yHigh = paddingTop + (((maxPrice - c.high) / priceRange) * priceH).toFloat()
                    val yLow = paddingTop + (((maxPrice - c.low) / priceRange) * priceH).toFloat()
                    drawLine(
                        color = candleColor,
                        start = Offset(x, yHigh),
                        end = Offset(x, yLow),
                        strokeWidth = 1.5.dp.toPx()
                    )

                    // Body
                    val yOpen = paddingTop + (((maxPrice - c.open) / priceRange) * priceH).toFloat()
                    val yClose = paddingTop + (((maxPrice - c.close) / priceRange) * priceH).toFloat()
                    val bodyTop = minOf(yOpen, yClose)
                    val bodyH = max(2f, kotlin.math.abs(yOpen - yClose))

                    drawRect(
                        color = candleColor,
                        topLeft = Offset(x - candleW / 2, bodyTop),
                        size = Size(candleW, bodyH)
                    )
                }

                // 10 EMA Overlay Line
                val emaPath = Path()
                candles.forEachIndexed { i, c ->
                    val x = i * slotW + (slotW / 2)
                    val y = paddingTop + (((maxPrice - c.ema) / priceRange) * priceH).toFloat()
                    if (i == 0) emaPath.moveTo(x, y) else emaPath.lineTo(x, y)
                }
                drawPath(
                    path = emaPath,
                    color = AccentCyan,
                    style = Stroke(width = 2.dp.toPx())
                )

                // Current Price dashed line
                val curY = paddingTop + (((maxPrice - currentPrice) / priceRange) * priceH).toFloat()
                if (curY in 0f..size.height) {
                    drawLine(
                        color = AccentCyan.copy(alpha = 0.8f),
                        start = Offset(0f, curY),
                        end = Offset(chartW, curY),
                        strokeWidth = 1.dp.toPx(),
                        pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f, 10f), 0f)
                    )

                    // Price pill badge on axis
                    drawRoundRect(
                        color = AccentCyan,
                        topLeft = Offset(chartW + 2f, curY - 14f),
                        size = Size(paddingRight - 4f, 28f),
                        cornerRadius = androidx.compose.ui.geometry.CornerRadius(4.dp.toPx())
                    )
                    drawContext.canvas.nativeCanvas.apply {
                        val paint = android.graphics.Paint().apply {
                            color = android.graphics.Color.parseColor("#04131C")
                            textSize = 22f
                            isFakeBoldText = true
                            typeface = android.graphics.Typeface.MONOSPACE
                        }
                        drawText(String.format(Locale.US, "%.1f", currentPrice), chartW + 6f, curY + 6f, paint)
                    }
                }

                // Crosshair scrub line if user is touching
                selectedIndex?.let { idx ->
                    if (idx in candles.indices) {
                        val scrubX = idx * slotW + (slotW / 2)
                        drawLine(
                            color = TextPrimary.copy(alpha = 0.5f),
                            start = Offset(scrubX, 0f),
                            end = Offset(scrubX, size.height - paddingBottom),
                            strokeWidth = 1.dp.toPx(),
                            pathEffect = PathEffect.dashPathEffect(floatArrayOf(6f, 6f), 0f)
                        )
                    }
                }

                // Time labels below
                val timeStep = (candles.size / 4).coerceAtLeast(1)
                for (i in candles.indices step timeStep) {
                    val x = i * slotW + (slotW / 2)
                    drawContext.canvas.nativeCanvas.apply {
                        val paint = android.graphics.Paint().apply {
                            color = android.graphics.Color.parseColor("#8794A7")
                            textSize = 22f
                            typeface = android.graphics.Typeface.MONOSPACE
                        }
                        drawText(candles[i].time, x - 25f, size.height - 4f, paint)
                    }
                }
            }
        }
    }
}
