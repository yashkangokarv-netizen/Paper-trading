package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
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
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.DarkBg
import com.example.ui.theme.DarkBorder
import com.example.ui.theme.DarkPanel
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun LearnScreen(modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(DarkBg)
            .padding(horizontal = 14.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "TRADING FOR BEGINNERS GUIDE",
                color = TextMuted,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 0.5.sp
            )
        }

        item {
            LearnCard(
                title = "1 • How Paper Trading Works",
                content = "You start with ₹5,00,000.00 in virtual funds. Every trade executes using real market prices, but with zero financial risk. It's the best way to master order execution, charts, and strategy before risking real capital."
            )
        }

        item {
            LearnCard(
                title = "2 • How to Read Candlestick Charts",
                content = "• Green Candle: Price closed HIGHER than open (bullish momentum).\n• Red Candle: Price closed LOWER than open (bearish pressure).\n• Shadows (Wicks): The thin lines show intraday extremes (Highest and Lowest price points).\n• 10 EMA (Cyan Line): When price holds above the line, the short-term trend is upward."
            )
        }

        item {
            LearnCard(
                title = "3 • Buying vs Selling (Long vs Short)",
                content = "• BUY (Going Long): You profit when the price goes UP.\n• SELL (Going Short): You profit when the price goes DOWN.\n• In this terminal you can practice both directions across Equity Shares, Futures, and Call/Put Options."
            )
        }

        item {
            LearnCard(
                title = "4 • Mandatory Stop Loss Rule",
                content = "Never trade without a stop loss! A stop loss is an automatic exit point that protects you from catastrophic loss. Rule of thumb: Never risk more than 1% to 2% of your capital on any single trade."
            )
        }

        item {
            LearnCard(
                title = "5 • Introduction to Options Greeks",
                content = "• Delta (Δ): How much option price moves per 1 pt move in stock.\n• Gamma (Γ): Rate of change in Delta (watch out for pin risk near expiry!).\n• Theta (Θ): Time decay. Option buyers lose theta value every day that passes.\n• Vega (ν): Sensitivity to market volatility (India VIX)."
            )
        }

        item {
            LearnCard(
                title = "6 • Capital Renewal & Risk Desk",
                content = "If you deplete your ₹5,00,000 capital, you can request an instant renewal from the Portfolio tab. Tap the Admin icon on the top bar to review and replenish your balance anytime!"
            )
        }
    }
}

@Composable
private fun LearnCard(title: String, content: String) {
    Card(
        colors = CardDefaults.cardColors(containerColor = DarkPanel),
        border = androidx.compose.foundation.BorderStroke(1.dp, DarkBorder),
        shape = RoundedCornerShape(10.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text(text = title, color = AccentCyan, fontSize = 14.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(6.dp))
            Text(text = content, color = TextSecondary, fontSize = 12.sp, lineHeight = 17.sp)
        }
    }
}
