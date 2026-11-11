package com.example.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val TerminalDarkColorScheme = darkColorScheme(
    primary = AccentCyan,
    onPrimary = Color(0xFF04131C),
    primaryContainer = AccentCyanDim,
    onPrimaryContainer = AccentCyanLight,
    secondary = BullGreen,
    onSecondary = Color.Black,
    secondaryContainer = BullGreenBg,
    onSecondaryContainer = BullGreenLight,
    tertiary = WarnAmber,
    onTertiary = Color.Black,
    background = DarkBg,
    onBackground = TextPrimary,
    surface = DarkPanel,
    onSurface = TextPrimary,
    surfaceVariant = DarkPanelSecondary,
    onSurfaceVariant = TextSecondary,
    outline = DarkBorder,
    outlineVariant = DarkBorder,
    error = BearRed,
    onError = Color.White
)

@Composable
fun PaperTradingTheme(
    darkTheme: Boolean = true, // Force crisp professional dark financial terminal theme
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = TerminalDarkColorScheme,
        typography = Typography,
        content = content
    )
}
