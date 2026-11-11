package com.example

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CandlestickChart
import androidx.compose.material.icons.filled.FormatListNumbered
import androidx.compose.material.icons.filled.Functions
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.Public
import androidx.compose.material.icons.filled.ShowChart
import androidx.compose.material.icons.filled.Timeline
import androidx.compose.material.icons.filled.Wallet
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.AdminDeskDialog
import com.example.ui.components.HeaderTickerBar
import com.example.ui.screens.AiCoachScreen
import com.example.ui.screens.GreeksScreen
import com.example.ui.screens.LearnScreen
import com.example.ui.screens.MarketsScreen
import com.example.ui.screens.OptionChainScreen
import com.example.ui.screens.PortfolioScreen
import com.example.ui.screens.SignalsScreen
import com.example.ui.screens.TradeScreen
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.DarkBg
import com.example.ui.theme.DarkBorder
import com.example.ui.theme.DarkPanel
import com.example.ui.theme.PaperTradingTheme
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextSecondary
import com.example.ui.viewmodel.TerminalViewModel

enum class NavigationScreen(val label: String, val icon: ImageVector) {
    TRADE("Trade", Icons.Default.CandlestickChart),
    MARKETS("Markets", Icons.Default.Public),
    OPTIONS("Options", Icons.Default.FormatListNumbered),
    PORTFOLIO("Portfolio", Icons.Default.Wallet),
    SIGNALS("Signals", Icons.Default.Timeline),
    GREEKS("Greeks", Icons.Default.Functions),
    COACH("Coach", Icons.Default.AutoAwesome),
    LEARN("Learn", Icons.Default.School)
}

class MainActivity : ComponentActivity() {

    private val viewModel: TerminalViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PaperTradingTheme {
                MainTerminalApp(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun MainTerminalApp(viewModel: TerminalViewModel) {
    val context = LocalContext.current
    var currentScreen by remember { mutableStateOf(NavigationScreen.TRADE) }
    var showAdminDialog by remember { mutableStateOf(false) }
    val snackbarHostState = remember { SnackbarHostState() }

    val assets by viewModel.assets.collectAsState()
    val availableBalance by viewModel.availableBalance.collectAsState()
    val renewalStatus by viewModel.renewalStatus.collectAsState()
    val isRefreshing by viewModel.isRefreshing.collectAsState()
    val lastSyncTime by viewModel.lastFeedSyncTime.collectAsState()

    val nifty = assets.find { it.id == "NIFTY" }
    val bankNifty = assets.find { it.id == "BANKNIFTY" }
    val sensex = assets.find { it.id == "SENSEX" }

    LaunchedEffect(Unit) {
        viewModel.userMessage.collect { msg ->
            snackbarHostState.showSnackbar(msg)
            Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
        }
    }

    if (showAdminDialog) {
        AdminDeskDialog(
            availableBalance = availableBalance,
            renewalStatus = renewalStatus,
            onApproveRenewal = { viewModel.approveFundRenewal() },
            onSimulateExhaustion = { viewModel.simulateExhaustion() },
            onResetAccount = { viewModel.resetAccount() },
            onDismiss = { showAdminDialog = false }
        )
    }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            HeaderTickerBar(
                availableBalance = availableBalance,
                nifty = nifty,
                bankNifty = bankNifty,
                sensex = sensex,
                vix = nifty?.vix ?: 17.42,
                pcr = nifty?.pcr ?: 1.15,
                renewalPending = renewalStatus == "PENDING",
                isRefreshing = isRefreshing,
                lastSyncTime = lastSyncTime,
                onAdminClick = { showAdminDialog = true },
                onRefreshClick = {
                    viewModel.refreshRealMarketData(showUserToast = true)
                }
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = DarkPanel,
                tonalElevation = 0.dp,
                modifier = Modifier.background(DarkBorder)
            ) {
                listOf(
                    NavigationScreen.TRADE,
                    NavigationScreen.MARKETS,
                    NavigationScreen.OPTIONS,
                    NavigationScreen.PORTFOLIO,
                    NavigationScreen.SIGNALS,
                    NavigationScreen.COACH,
                    NavigationScreen.LEARN
                ).forEach { screen ->
                    val isSelected = currentScreen == screen
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { currentScreen = screen },
                        icon = {
                            Icon(
                                imageVector = screen.icon,
                                contentDescription = screen.label
                            )
                        },
                        label = {
                            Text(
                                text = screen.label,
                                fontSize = 10.sp
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = AccentCyan,
                            selectedTextColor = AccentCyan,
                            unselectedIconColor = TextMuted,
                            unselectedTextColor = TextMuted,
                            indicatorColor = DarkBg
                        ),
                        modifier = Modifier.testTag("nav_tab_${screen.name.lowercase()}")
                    )
                }
            }
        },
        snackbarHost = { SnackbarHost(snackbarHostState) },
        containerColor = DarkBg
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentScreen) {
                NavigationScreen.TRADE -> TradeScreen(viewModel = viewModel)
                NavigationScreen.MARKETS -> MarketsScreen(
                    viewModel = viewModel,
                    onNavigateToTrade = { currentScreen = NavigationScreen.TRADE }
                )
                NavigationScreen.OPTIONS -> OptionChainScreen(viewModel = viewModel)
                NavigationScreen.PORTFOLIO -> PortfolioScreen(viewModel = viewModel)
                NavigationScreen.SIGNALS -> SignalsScreen(viewModel = viewModel)
                NavigationScreen.GREEKS -> GreeksScreen(viewModel = viewModel)
                NavigationScreen.COACH -> AiCoachScreen(viewModel = viewModel)
                NavigationScreen.LEARN -> LearnScreen()
            }
        }
    }
}
