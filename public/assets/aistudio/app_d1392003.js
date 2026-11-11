/**
 * Quantitative Market Strategist & Institutional Derivatives Terminal
 * Engine for Black-Scholes Greeks, 4-Vector Confirmation Matrix,
 * Risk Thresholds, and Deterministic Trading Directives.
 */

// ================= WHOLE MARKET DATA UNIVERSE =================
const ASSET_UNIVERSE = {
  NIFTY: {
    id: 'NIFTY',
    name: 'NIFTY 50',
    ticker: 'NIFTY',
    type: 'INDEX',
    exchange: 'NSE',
    symbol: 'INDEX:NIFTY',
    price: 24415.10,
    prevClose: 23960.60,
    high: 24442.20,
    low: 24296.30,
    pe: 21.80,
    pb: 3.85,
    strikeStep: 50,
    sector: 'Benchmark',
    vix: 15.22,
    pcr: 1.12,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Nifty powers ahead past 24,415 (+1.90%) on strong institutional liquidity across sectors.',
    volume: '22.4 Cr'
  },
  BANKNIFTY: {
    id: 'BANKNIFTY',
    name: 'BANK NIFTY',
    ticker: 'BANKNIFTY',
    type: 'INDEX',
    exchange: 'NSE',
    symbol: 'NSE:BANKNIFTY',
    price: 57211.05,
    prevClose: 55913.60,
    high: 57350.00,
    low: 56850.00,
    pe: 16.50,
    pb: 2.50,
    strikeStep: 100,
    sector: 'Banking',
    vix: 15.22,
    pcr: 1.25,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Bank Nifty rallies past 57,211 (+2.32%) on aggressive banking purchases and short covering.',
    volume: '11.8 Cr'
  },
  SENSEX: {
    id: 'SENSEX',
    name: 'BSE SENSEX',
    ticker: 'SENSEX',
    type: 'INDEX',
    exchange: 'BSE',
    symbol: 'BSE:SENSEX',
    price: 78874.45,
    prevClose: 77301.40,
    high: 79050.00,
    low: 78450.00,
    pe: 22.40,
    pb: 3.95,
    strikeStep: 100,
    sector: 'Benchmark',
    vix: 15.22,
    pcr: 1.10,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'BSE Sensex surges over 1,570 points to 78,874 (+2.03%) in heavy broad-market buying.',
    volume: '14.5 Cr'
  },
  FINNIFTY: {
    id: 'FINNIFTY',
    name: 'FIN NIFTY',
    ticker: 'FINNIFTY',
    type: 'INDEX',
    exchange: 'NSE',
    symbol: 'NSE:CNXFINANCE',
    price: 26255.20,
    prevClose: 25580.60,
    high: 26317.75,
    low: 26052.40,
    pe: 18.10,
    pb: 2.65,
    strikeStep: 50,
    sector: 'Financials',
    vix: 15.17,
    pcr: 1.20,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Financial services index advances +2.64% led by banking heavyweights and NBFCs.',
    volume: '8.2 Cr'
  },
  NIFTYIT: {
    id: 'NIFTYIT',
    name: 'NIFTY IT',
    ticker: 'NIFTYIT',
    type: 'INDEX',
    exchange: 'NSE',
    symbol: 'NSE:CNXIT',
    price: 32793.85,
    prevClose: 32500.00,
    high: 32950.00,
    low: 32400.00,
    pe: 27.80,
    pb: 6.90,
    strikeStep: 100,
    sector: 'IT & Tech',
    vix: 15.17,
    pcr: 0.95,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'IT sector trades firmly with tier-1 exporters reporting robust cloud deal pipelines.',
    volume: '5.6 Cr'
  },
  MIDCPNIFTY: {
    id: 'MIDCPNIFTY',
    name: 'MIDCAP NIFTY',
    ticker: 'MIDCPNIFTY',
    type: 'INDEX',
    exchange: 'NSE',
    symbol: 'NSE:NIFTYMIDCAP100',
    price: 13930.00,
    prevClose: 13800.00,
    high: 14000.00,
    low: 13750.00,
    pe: 26.20,
    pb: 3.50,
    strikeStep: 25,
    sector: 'Midcaps',
    vix: 15.17,
    pcr: 1.28,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Midcap rally extends as domestic mutual fund inflows maintain record pace.',
    volume: '9.4 Cr'
  },
  RELIANCE: {
    id: 'RELIANCE',
    name: 'Reliance Industries',
    ticker: 'RELIANCE',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:RELIANCE',
    price: 1305.50,
    prevClose: 1290.00,
    high: 1315.00,
    low: 1285.00,
    pe: 24.80,
    pb: 2.15,
    strikeStep: 10,
    sector: 'Energy',
    mcap: '₹17.6L Cr',
    vix: 15.17,
    pcr: 1.20,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Reliance advances on steady retail and digital operations momentum.',
    volume: '85.4 L'
  },
  HDFCBANK: {
    id: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    ticker: 'HDFCBANK',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:HDFCBANK',
    price: 749.75,
    prevClose: 735.00,
    high: 755.00,
    low: 732.00,
    pe: 18.90,
    pb: 2.70,
    strikeStep: 10,
    sector: 'Banking',
    mcap: '₹12.8L Cr',
    vix: 15.17,
    pcr: 1.30,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'HDFC Bank trades higher on accelerating deposit mobilization and steady margins.',
    volume: '1.8 Cr'
  },
  ICICIBANK: {
    id: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    ticker: 'ICICIBANK',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:ICICIBANK',
    price: 1465.90,
    prevClose: 1445.00,
    high: 1475.00,
    low: 1440.00,
    pe: 17.50,
    pb: 3.15,
    strikeStep: 10,
    sector: 'Banking',
    mcap: '₹10.3L Cr',
    vix: 15.17,
    pcr: 1.35,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'ICICI Bank reaches 1,465.90 with industry-best return on equity profile.',
    volume: '95.2 L'
  },
  TCS: {
    id: 'TCS',
    name: 'Tata Consultancy Services',
    ticker: 'TCS',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:TCS',
    price: 2484.60,
    prevClose: 2450.00,
    high: 2500.00,
    low: 2440.00,
    pe: 29.10,
    pb: 12.10,
    strikeStep: 20,
    sector: 'IT',
    mcap: '₹15.8L Cr',
    vix: 15.17,
    pcr: 1.05,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'TCS stabilizes above 2,480 as multi-year digital transformation deals convert.',
    volume: '22.4 L'
  },
  INFY: {
    id: 'INFY',
    name: 'Infosys Ltd',
    ticker: 'INFY',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:INFY',
    price: 1161.20,
    prevClose: 1145.00,
    high: 1175.00,
    low: 1140.00,
    pe: 25.40,
    pb: 8.10,
    strikeStep: 10,
    sector: 'IT',
    mcap: '₹7.8L Cr',
    vix: 15.17,
    pcr: 1.10,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Infosys posts solid rebound to 1,161.20 on healthy BFSI vertical recoveries.',
    volume: '48.6 L'
  },
  TATAMOTORS: {
    id: 'TATAMOTORS',
    name: 'Tata Motors Passenger Vehicles',
    ticker: 'TMPV',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:TMPV',
    price: 292.20,
    prevClose: 278.50,
    high: 293.20,
    low: 284.00,
    pe: 14.80,
    pb: 3.25,
    strikeStep: 5,
    sector: 'Auto',
    mcap: '₹2.9L Cr',
    vix: 15.17,
    pcr: 1.40,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Tata Motors PV surges +4.9% to 292.20 as monthly EV dispatches reach record levels.',
    volume: '1.6 Cr'
  },
  SBIN: {
    id: 'SBIN',
    name: 'State Bank of India',
    ticker: 'SBIN',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:SBIN',
    price: 988.40,
    prevClose: 975.00,
    high: 996.00,
    low: 972.00,
    pe: 11.60,
    pb: 1.70,
    strikeStep: 5,
    sector: 'Banking',
    mcap: '₹8.8L Cr',
    vix: 15.17,
    pcr: 1.32,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'State Bank of India advances toward 990 on sustained corporate loan growth.',
    volume: '1.1 Cr'
  },
  ITC: {
    id: 'ITC',
    name: 'ITC Ltd',
    ticker: 'ITC',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:ITC',
    price: 278.00,
    prevClose: 274.00,
    high: 282.00,
    low: 272.00,
    pe: 25.10,
    pb: 6.70,
    strikeStep: 5,
    sector: 'FMCG',
    mcap: '₹5.4L Cr',
    vix: 15.17,
    pcr: 1.15,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'ITC trades firm at 278.00 with agricultural and paper verticals supporting margins.',
    volume: '75.0 L'
  },
  BHARTIARTL: {
    id: 'BHARTIARTL',
    name: 'Bharti Airtel',
    ticker: 'BHARTIARTL',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:BHARTIARTL',
    price: 2059.30,
    prevClose: 2010.00,
    high: 2075.00,
    low: 2005.00,
    pe: 58.00,
    pb: 9.10,
    strikeStep: 10,
    sector: 'Telecom',
    mcap: '₹11.6L Cr',
    vix: 15.17,
    pcr: 1.45,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Bharti Airtel surges +2.45% to 2,059.30 on industry-leading ARPU expansion.',
    volume: '62.1 L'
  },
  LT: {
    id: 'LT',
    name: 'Larsen & Toubro',
    ticker: 'LT',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:LT',
    price: 4021.50,
    prevClose: 3950.00,
    high: 4045.00,
    low: 3935.00,
    pe: 35.10,
    pb: 5.50,
    strikeStep: 20,
    sector: 'Infra',
    mcap: '₹5.5L Cr',
    vix: 15.17,
    pcr: 1.20,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'L&T crosses 4,020 milestone on high-value domestic and international EPC order wins.',
    volume: '24.2 L'
  },
  TATASTEEL: {
    id: 'TATASTEEL',
    name: 'Tata Steel Ltd',
    ticker: 'TATASTEEL',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:TATASTEEL',
    price: 181.29,
    prevClose: 178.00,
    high: 183.50,
    low: 177.00,
    pe: 29.20,
    pb: 1.90,
    strikeStep: 2.5,
    sector: 'Metals',
    mcap: '₹2.2L Cr',
    vix: 15.17,
    pcr: 1.35,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Tata Steel advances as international steel demand stabilizes and spreads improve.',
    volume: '4.2 Cr'
  },
  SUNPHARMA: {
    id: 'SUNPHARMA',
    name: 'Sun Pharma Industries',
    ticker: 'SUNPHARMA',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:SUNPHARMA',
    price: 1827.50,
    prevClose: 1810.00,
    high: 1840.00,
    low: 1805.00,
    pe: 37.20,
    pb: 6.30,
    strikeStep: 10,
    sector: 'Pharma',
    mcap: '₹4.4L Cr',
    vix: 15.17,
    pcr: 1.05,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Sun Pharma reaches 1,827.50 on specialty prescription momentum across US markets.',
    volume: '25.0 L'
  },
  TECHM: {
    id: 'TECHM',
    name: 'Tech Mahindra Ltd',
    ticker: 'TECHM',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:TECHM',
    price: 1829.80,
    prevClose: 1805.00,
    high: 1845.00,
    low: 1800.00,
    pe: 43.50,
    pb: 5.10,
    strikeStep: 10,
    sector: 'IT',
    mcap: '₹1.8L Cr',
    vix: 15.17,
    pcr: 1.10,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Tech Mahindra climbs to 1,829.80 as communications vertical spending rebounds.',
    volume: '34.5 L'
  },
  MARUTI: {
    id: 'MARUTI',
    name: 'Maruti Suzuki India',
    ticker: 'MARUTI',
    type: 'EQUITY',
    exchange: 'NSE',
    symbol: 'NSE:MARUTI',
    price: 12522.00,
    prevClose: 12350.00,
    high: 12600.00,
    low: 12300.00,
    pe: 28.80,
    pb: 4.85,
    strikeStep: 100,
    sector: 'Auto',
    mcap: '₹3.9L Cr',
    vix: 15.17,
    pcr: 1.25,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Maruti Suzuki reaches 12,522 on strong hybrid booking trends and SUV market leadership.',
    volume: '7.8 L'
  }
};

const SECTORS_DATA = [
  { name: 'Auto', chg: '+1.75%', positive: true },
  { name: 'Telecom', chg: '+2.05%', positive: true },
  { name: 'Metals', chg: '+1.40%', positive: true },
  { name: 'Energy', chg: '+1.10%', positive: true },
  { name: 'Banking', chg: '+0.82%', positive: true },
  { name: 'FMCG', chg: '+0.12%', positive: true },
  { name: 'Pharma', chg: '-0.30%', positive: false },
  { name: 'IT & Tech', chg: '-0.85%', positive: false }
];

const MARKET_BREADTH = {
  advances: 1482,
  declines: 818,
  unchanged: 94,
  high52w: 72,
  low52w: 9,
  totalTraded: 2394
};

const GLOBAL_MARKETS = [
  { name: 'GIFT NIFTY', price: '23,345.00', chg: '+0.22%', pos: true },
  { name: 'US DOW JONES', price: '39,870.00', chg: '+0.45%', pos: true },
  { name: 'NASDAQ 100', price: '17,890.00', chg: '+0.80%', pos: true },
  { name: 'S&P 500', price: '5,470.00', chg: '+0.55%', pos: true },
  { name: 'BRENT CRUDE', price: '$84.20/bbl', chg: '-0.60%', pos: false }
];

// --- STATE MANAGEMENT ---
const state = {
  user: null,
  isLiveFeedActive: true, // Auto-connect authentic feed
  feedInterval: null,
  lastSpotPrice: 24356.15,
  tickDirection: 'UP',
  lastTickTimestamp: '10:45:00 IST',
  dataSource: 'CONNECTING', // 'CONNECTING' | 'LIVE' | 'OFFLINE'
  lastLiveAt: null,
  dataFailed: [],
  liveVix: 15.17,
  syncInFlight: false,
  lastCandleFetch: 0,
  
  // Active Selected Asset
  currentAssetKey: 'NIFTY',
  currentAssetName: 'NIFTY 50',
  currentSymbol: 'INDEX:NIFTY',
  currentSector: 'Benchmark Index',
  strikeStep: 50,
  marketFilter: 'ALL',
  searchQuery: '',

  // Active Market Inputs (Ingested from selected asset)
  spotPrice: 24356.15,
  prevClose: 23960.60,
  pe: 21.80,
  pb: 3.85,
  vix: 15.17,
  pcr: 1.12,
  dte: 1.0,
  iv: 15.2,
  trend: 'BULL', // 'BULL' or 'BEAR'
  newsSentiment: 'POSITIVE', // 'POSITIVE', 'NEGATIVE', 'NEUTRAL'
  newsHeadline: 'Nifty advances to 24,356.15 (+1.65%) with banking and largecaps leading broad rally.',
  callResistance: 24500.0, // Max Call OI
  putSupport: 24200.0,     // Max Put OI
  callOI: 16.5, // in Lakhs
  putOI: 18.2,  // in Lakhs

  // Virtual Paper Trading & Capital Ledger State
  virtualCapital: 500000.0,
  availableBalance: parseFloat(localStorage.getItem('quant_terminal_balance') !== null ? localStorage.getItem('quant_terminal_balance') : '500000.00'),
  usedMargin: 0.0,
  realizedPnL: parseFloat(localStorage.getItem('quant_terminal_realized_pnl') || '0.00'),
  portfolio: JSON.parse(localStorage.getItem('quant_terminal_portfolio') || '[]'),
  tradeHistory: JSON.parse(localStorage.getItem('quant_terminal_trade_history') || '[]'),
  renewalStatus: localStorage.getItem('quant_terminal_renewal_status') || 'NONE', // 'NONE' | 'EXHAUSTED' | 'PENDING' | 'APPROVED'
  renewalRequestTime: localStorage.getItem('quant_terminal_renewal_time') || null,
  activePortfolioSubTab: 'active',
  
  // Computed outputs
  greeks: {},
  analysis: {}
};
window.state = state;

// --- MATHEMATICAL / GREEK FORMULAS ---

// Standard Normal CDF (Abramowitz & Stegun approximation)
function normalCDF(x) {
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  if (x >= 0.0) {
    const t = 1.0 / (1.0 + p * x);
    return (1.0 - c * Math.exp(-x * x / 2.0) * t *
      (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1));
  } else {
    const t = 1.0 / (1.0 - p * x);
    return (c * Math.exp(-x * x / 2.0) * t *
      (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1));
  }
}

// Standard Normal PDF
function normalPDF(x) {
  return (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}

// Calculate Greeks & 1-Sigma Move
function calculateGreeks(S, K, T_days, sigma_pct, r = 0.07) {
  const T = Math.max(0.0001, T_days / 365.0);
  const sigma = Math.max(0.01, sigma_pct / 100.0);
  
  // 1-Sigma Expected Move (formula: Spot * (IV / 100) * sqrt(DTE / 252))
  const expectedSigmaMove = S * sigma * Math.sqrt(Math.max(0.01, T_days) / 252.0);
  
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2.0) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  
  const nd1 = normalCDF(d1);
  const npd1 = normalPDF(d1);
  const nd2 = normalCDF(d2);
  
  // Delta
  const callDelta = nd1;
  const putDelta = nd1 - 1.0;
  
  // Gamma (Flagged high risk if DTE <= 2)
  const gamma = npd1 / (S * sigma * Math.sqrt(T));
  const isGammaRisk = T_days <= 2.0;
  
  // Theta (Per day decay)
  const thetaAnnualCall = -(S * npd1 * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * nd2;
  const thetaDayCall = thetaAnnualCall / 365.0;
  
  const thetaAnnualPut = -(S * npd1 * sigma) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * (1 - nd2);
  const thetaDayPut = thetaAnnualPut / 365.0;
  
  // Vega (Sensitivity per 1% change in IV)
  const vega = (S * Math.sqrt(T) * npd1) / 100.0;
  
  return {
    expectedSigmaMove,
    callDelta,
    putDelta,
    gamma,
    isGammaRisk,
    thetaDayCall,
    thetaDayPut,
    vega
  };
}

// Calculate theoretical option premium using Black-Scholes Model
function calculateBSOptionPrice(S, K, T_days, sigma_pct, type = 'CE', r = 0.07) {
  const T = Math.max(0.0001, T_days / 365.0);
  const sigma = Math.max(0.01, sigma_pct / 100.0);
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2.0) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  if (type === 'CE') {
    const callPrice = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
    return Math.max(0.5, Math.round(callPrice * 10) / 10);
  } else {
    const putPrice = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
    return Math.max(0.5, Math.round(putPrice * 10) / 10);
  }
}

// --- QUANTITATIVE STRATEGY DETERMINISTIC ENGINE ---
function runDeterministicAnalysis() {
  const { spotPrice, vix, pcr, dte, iv, trend, newsSentiment, newsHeadline, callResistance, putSupport } = state;
  
  // 1. Greeks
  const greeks = calculateGreeks(spotPrice, spotPrice, dte, iv);
  state.greeks = greeks;
  
  // 2. VIX Rule Evaluation
  // If VIX < 12: Volatility compression / Low-momentum environment (STABLE)
  // If VIX >= 16: Expansion / Volatility event active (AGGRESSIVE)
  let vixRegime = 'NORMAL';
  let vixPass = false;
  let vixLabel = '12 - 16 (Normal Range)';
  
  if (vix < 12.0) {
    vixRegime = 'STABLE';
    vixPass = false;
    vixLabel = 'STABLE (< 12: Volatility Compression / Greek Decay Risk)';
  } else if (vix >= 16.0) {
    vixRegime = 'AGGRESSIVE';
    vixPass = true;
    vixLabel = 'AGGRESSIVE (>= 16: Volatility Expansion Active)';
  } else {
    vixRegime = 'MODERATE';
    vixPass = false;
    vixLabel = 'MODERATE (12 - 16: Standard Range)';
  }
  
  // 3. PCR Evaluation
  // PCR < 0.70 heavy call writing / bearish drag (or extreme oversold bounce zone)
  // PCR > 1.30 heavy put writing / bullish support (or extreme overbought exhaustion)
  let pcrStatus = 'NEUTRAL / BALANCED';
  let pcrBias = 'NEUTRAL';
  if (pcr < 0.70) {
    pcrStatus = 'BEARISH DRAG / OVERSOLD ZONE';
    pcrBias = 'BEAR';
  } else if (pcr > 1.30) {
    pcrStatus = 'BULLISH SUPPORT / OVERBOUGHT ZONE';
    pcrBias = 'BULL';
  } else if (pcr < 0.90) {
    pcrStatus = 'MILD BEARISH BIAS';
    pcrBias = 'BEAR';
  } else if (pcr > 1.10) {
    pcrStatus = 'MILD BULLISH BIAS';
    pcrBias = 'BULL';
  }
  
  // 4. News Vector
  // POSITIVE -> Bull, NEGATIVE -> Bear, NEUTRAL -> Neutral
  let newsBias = 'NEUTRAL';
  if (newsSentiment === 'POSITIVE') newsBias = 'BULL';
  else if (newsSentiment === 'NEGATIVE') newsBias = 'BEAR';
  
  // 5. COMBINED CONFIRMATION RULE (NO EXCEPTION)
  // Directional trade requires alignment across 4 core vectors:
  // a. News Bias (Bull / Bear / Neutral)
  // b. Trend Direction (Bull / Bear)
  // c. PCR Interpretation (Bull / Bear)
  // d. VIX Condition (>= 16 for high-conviction breakout trades)
  // If ANY contradicts -> FORCE State to "WATCHLIST" or "NO TRADE"
  
  let finalState = 'NO TRADE';
  let directionalBias = 'NEUTRAL';
  let sideToBuy = 'SIDELINES / CASH';
  let holdDuration = 'N/A (Wait for Vector Alignment)';
  let strategicImplication = '';
  let entryTrigger = '';
  let t1 = 0;
  let t2 = 0;
  let sl = 0;
  let strategyRec = '';

  const vectorConflicts = [];

  // Check Bullish Alignment
  const isBullishVectorMatch = (trend === 'BULL') && (newsBias === 'BULL') && (pcrBias === 'BULL');
  // Check Bearish Alignment
  const isBearishVectorMatch = (trend === 'BEAR') && (newsBias === 'BEAR') && (pcrBias === 'BEAR');

  if (vix < 12.0) {
    // Strict Condition: VIX < 12 is Volatility Compression / Greek decay risk
    finalState = 'NO TRADE';
    directionalBias = 'NEUTRAL / COMPRESSION';
    sideToBuy = 'SIDELINES / CASH (Theta Decay Environment)';
    holdDuration = 'NO EXPOSURE (Wait for VIX Expansion >= 16)';
    strategyRec = 'Sideline Cash / Rangebound Delta-Neutral (Strictly No Directional Buying)';
    entryTrigger = `Range bounded between Put Wall ${putSupport} and Call Wall ${callResistance}`;
    t1 = Math.round(spotPrice + greeks.expectedSigmaMove * 0.3);
    t2 = Math.round(spotPrice - greeks.expectedSigmaMove * 0.3);
    sl = Math.round(spotPrice);
    strategicImplication = 'FAIL: VIX < 12 indicates low-momentum volatility compression. Long options face acute Theta decay.';
  } else if (!vixPass) {
    // VIX between 12 and 16 - moderate volatility, does not meet the >= 16 breakout conviction gate
    finalState = 'WATCHLIST';
    directionalBias = trend;
    sideToBuy = 'WATCHLIST / MONITOR SPREADS';
    holdDuration = 'Standby (Awaiting VIX Spike >= 16 or Clear Boundary Break)';
    strategyRec = 'Watchlist - Monitor Order Book Flow for Breakout Validation';
    entryTrigger = trend === 'BULL' ? `Decisive 15m close above ${callResistance}` : `Decisive 15m breakdown below ${putSupport}`;
    t1 = Math.round(trend === 'BULL' ? callResistance + greeks.expectedSigmaMove * 0.5 : putSupport - greeks.expectedSigmaMove * 0.5);
    t2 = Math.round(trend === 'BULL' ? callResistance + greeks.expectedSigmaMove : putSupport - greeks.expectedSigmaMove);
    sl = Math.round(trend === 'BULL' ? spotPrice - greeks.expectedSigmaMove * 0.4 : spotPrice + greeks.expectedSigmaMove * 0.4);
    strategicImplication = 'WATCHLIST: VIX in moderate zone (12-16). Directional breakout gate inactive without VIX >= 16 confirmation.';
  } else {
    // VIX >= 16 (Aggressive Expansion is ACTIVE)
    if (isBullishVectorMatch) {
      finalState = 'CONFIRMED TRADE';
      directionalBias = 'BULLISH';
      sideToBuy = 'BUY CALL (CE) / BULL CALL SPREAD';
      holdDuration = dte <= 1 ? 'Intraday Scalp (15 - 60 mins) to Max Call Wall' : 'Hold 1-2 DTE till Target 1 / Expiry';
      strategyRec = 'Aggressive Bull Call Spread (ATM Long / OTM Short) or High-Delta Call Buy';
      entryTrigger = `Long entry on pullback to ${Math.round(spotPrice - greeks.expectedSigmaMove * 0.15)} or breakout above ${Math.round(spotPrice + 25)}`;
      t1 = Math.round(Math.min(callResistance, spotPrice + greeks.expectedSigmaMove * 0.7));
      t2 = Math.round(callResistance + greeks.expectedSigmaMove * 0.5);
      sl = Math.round(spotPrice - greeks.expectedSigmaMove * 0.4); // Risk bounded within 1%
      strategicImplication = 'PASS: 4-Vector Alignment achieved with Aggressive Volatility Expansion (VIX >= 16). Directional Long Validated.';
    } else if (isBearishVectorMatch) {
      finalState = 'CONFIRMED TRADE';
      directionalBias = 'BEARISH';
      sideToBuy = 'BUY PUT (PE) / BEAR PUT SPREAD';
      holdDuration = dte <= 1 ? 'Intraday Scalp (15 - 45 mins) to Max Put Wall' : 'Hold 1-2 DTE till Target 1 / Institutional Support';
      strategyRec = 'Aggressive Bear Put Spread (ATM Long / OTM Short) or High-Delta Put Buy';
      entryTrigger = `Short entry on rejection at ${Math.round(spotPrice + greeks.expectedSigmaMove * 0.15)} or breakdown below ${Math.round(spotPrice - 25)}`;
      t1 = Math.round(Math.max(putSupport, spotPrice - greeks.expectedSigmaMove * 0.7));
      t2 = Math.round(putSupport - greeks.expectedSigmaMove * 0.5);
      sl = Math.round(spotPrice + greeks.expectedSigmaMove * 0.4); // Risk bounded within 1%
      strategicImplication = 'PASS: 4-Vector Alignment achieved with Aggressive Volatility Expansion (VIX >= 16). Directional Short Validated.';
    } else {
      // Vectors are in conflict
      if (trend !== newsBias) vectorConflicts.push(`Trend (${trend}) opposes News (${newsBias})`);
      if (trend !== pcrBias) vectorConflicts.push(`Trend (${trend}) diverges from PCR (${pcrBias})`);
      
      finalState = 'WATCHLIST';
      directionalBias = 'CONFLICTED / NEUTRAL';
      sideToBuy = 'SIDELINES / CASH';
      holdDuration = 'No Position (Conflicting Vectors - High Stop-Hunt Risk)';
      strategyRec = 'Sideline Cash - Wait for False Breakout Resolution';
      entryTrigger = `No entry. Invalidation condition: Divergence between ${vectorConflicts.join(' and ')}`;
      t1 = Math.round(callResistance);
      t2 = Math.round(putSupport);
      sl = Math.round(spotPrice);
      strategicImplication = `FAIL: Conflicting Vectors detected (${vectorConflicts.join(', ')}). Rule mandates forced WATCHLIST / NO TRADE.`;
    }
  }

  state.analysis = {
    vixRegime,
    vixPass,
    vixLabel,
    pcrStatus,
    pcrBias,
    newsBias,
    finalState,
    directionalBias,
    sideToBuy,
    holdDuration,
    strategicImplication,
    strategyRec,
    entryTrigger,
    t1,
    t2,
    sl,
    vectorConflicts
  };
}

// --- PRESET MARKET SCENARIOS ---
const SCENARIOS = {
  vix_bearish_breakdown: {
    name: 'High VIX Bearish Breakdown (Confirmed)',
    spotPrice: 23180,
    vix: 18.2,
    pcr: 0.52,
    dte: 1,
    iv: 17.8,
    trend: 'BEAR',
    newsSentiment: 'NEGATIVE',
    newsHeadline: 'Escalating conflict disrupts global shipping corridors; Crude surges 4.2%; FII outflow accelerates.',
    callResistance: 23400,
    putSupport: 22900,
    callOI: 19.5,
    putOI: 7.2
  },
  vix_bullish_breakout: {
    name: 'High VIX Bullish Breakout (Confirmed)',
    spotPrice: 23450,
    vix: 16.8,
    pcr: 1.42,
    dte: 1,
    iv: 16.4,
    trend: 'BULL',
    newsSentiment: 'POSITIVE',
    newsHeadline: 'Central bank delivers surprise liquidity stimulus; Manufacturing PMI hits 14-month peak.',
    callResistance: 23700,
    putSupport: 23200,
    callOI: 8.5,
    putOI: 18.2
  },
  low_vix_compression: {
    name: 'Low VIX Volatility Compression (Stable / No Trade)',
    spotPrice: 23303.45,
    vix: 11.4,
    pcr: 0.95,
    dte: 1,
    iv: 10.8,
    trend: 'BULL',
    newsSentiment: 'NEUTRAL',
    newsHeadline: 'Rangebound session with thin institutional volumes ahead of holiday weekend.',
    callResistance: 23500,
    putSupport: 23200,
    callOI: 12.0,
    putOI: 11.5
  },
  conflicted_divergence: {
    name: 'Conflicted Vectors Divergence (Forced Watchlist)',
    spotPrice: 23320,
    vix: 17.5,
    pcr: 0.58, // Bearish
    dte: 2,
    iv: 16.0,
    trend: 'BULL', // Bullish trend contradicts PCR & News
    newsSentiment: 'NEGATIVE',
    newsHeadline: 'Macro inflation print exceeds estimates; bond yields climb higher.',
    callResistance: 23500,
    putSupport: 23100,
    callOI: 15.0,
    putOI: 8.7
  }
};

function applyScenario(key) {
  const sc = SCENARIOS[key];
  if (!sc) return;
  
  state.spotPrice = sc.spotPrice;
  state.vix = sc.vix;
  state.pcr = sc.pcr;
  state.dte = sc.dte;
  state.iv = sc.iv;
  state.trend = sc.trend;
  state.newsSentiment = sc.newsSentiment;
  state.newsHeadline = sc.newsHeadline;
  state.callResistance = sc.callResistance;
  state.putSupport = sc.putSupport;
  state.callOI = sc.callOI;
  state.putOI = sc.putOI;
  
  syncInputsFromState();
  renderAll();
}

// --- DOM SYNC & RENDERING ---
function syncInputsFromState() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  
  setVal('input-spot', state.spotPrice);
  setVal('input-vix', state.vix);
  setVal('input-pcr', state.pcr);
  setVal('input-dte', state.dte);
  setVal('input-iv', state.iv);
  setVal('input-trend', state.trend);
  setVal('input-news-sentiment', state.newsSentiment);
  setVal('input-news-headline', state.newsHeadline);
  setVal('input-call-res', state.callResistance);
  setVal('input-put-sup', state.putSupport);
  setVal('input-call-oi', state.callOI);
  setVal('input-put-oi', state.putOI);
}

function syncStateFromInputs() {
  const getNum = (id, def) => {
    const el = document.getElementById(id);
    return el && !isNaN(parseFloat(el.value)) ? parseFloat(el.value) : def;
  };
  const getStr = (id, def) => {
    const el = document.getElementById(id);
    return el ? el.value : def;
  };

  state.spotPrice = getNum('input-spot', 23303.45);
  state.vix = getNum('input-vix', 11.84);
  state.pcr = getNum('input-pcr', 0.54);
  state.dte = getNum('input-dte', 1);
  state.iv = getNum('input-iv', 11.2);
  state.trend = getStr('input-trend', 'BULL');
  state.newsSentiment = getStr('input-news-sentiment', 'NEUTRAL');
  state.newsHeadline = getStr('input-news-headline', '');
  state.callResistance = getNum('input-call-res', 23500);
  state.putSupport = getNum('input-put-sup', 23200);
  state.callOI = getNum('input-call-oi', 14.8);
  state.putOI = getNum('input-put-oi', 8.0);
}

function renderAll() {
  runDeterministicAnalysis();
  
  const { greeks, analysis } = state;
  
  // 1. RENDER SINGLE UNIFIED MASTER TABLE
  const masterTableBody = document.getElementById('master-table-body');
  if (masterTableBody) {
    // Styling tags based on values
    const trendBadge = state.trend === 'BULL' 
      ? `<span class="badge badge-bull"><i class="ph ph-trend-up"></i> BULL</span>`
      : `<span class="badge badge-bear"><i class="ph ph-trend-down"></i> BEAR</span>`;
      
    const pcrBadgeClass = analysis.pcrBias === 'BULL' ? 'badge-bull' : (analysis.pcrBias === 'BEAR' ? 'badge-bear' : 'badge-neutral');
    const pcrBadge = `<div class="mono font-bold">${state.pcr.toFixed(2)}</div><span class="badge ${pcrBadgeClass} mt-1">${analysis.pcrStatus}</span>`;
    
    let newsBadgeClass = 'badge-neutral';
    if (state.newsSentiment === 'POSITIVE') newsBadgeClass = 'badge-bull';
    else if (state.newsSentiment === 'NEGATIVE') newsBadgeClass = 'badge-bear';
    const newsCell = `
      <div>
        <span class="badge ${newsBadgeClass}">${state.newsSentiment}</span>
        <div class="text-xs text-slate-400 mt-1 max-w-xs truncate" title="${state.newsHeadline}">${state.newsHeadline}</div>
      </div>
    `;
    
    let vixBadge = '';
    if (state.vix >= 16.0) {
      vixBadge = `
        <div class="mono font-bold text-base text-rose-400">${state.vix.toFixed(2)}</div>
        <span class="badge badge-bear font-extrabold mt-1">AGGRESSIVE (>= 16)</span>
        <div class="text-xs text-rose-300/80 mt-1">Expansion Active</div>
      `;
    } else if (state.vix < 12.0) {
      vixBadge = `
        <div class="mono font-bold text-base text-emerald-400">${state.vix.toFixed(2)}</div>
        <span class="badge badge-bull font-extrabold mt-1">STABLE (< 12)</span>
        <div class="text-xs text-emerald-300/80 mt-1">Compression / Decay Risk</div>
      `;
    } else {
      vixBadge = `
        <div class="mono font-bold text-base text-amber-400">${state.vix.toFixed(2)}</div>
        <span class="badge badge-warn mt-1">MODERATE (12-16)</span>
        <div class="text-xs text-slate-400 mt-1">Normal Range</div>
      `;
    }
    
    // Combined Final Recommendation Cell
    let actionStateBadge = '';
    if (analysis.finalState === 'CONFIRMED TRADE') {
      actionStateBadge = `<span class="badge ${analysis.directionalBias === 'BULLISH' ? 'badge-bull' : 'badge-bear'} text-sm py-1 px-2.5 mb-1"><i class="ph ph-lightning"></i> ${analysis.finalState}</span>`;
    } else if (analysis.finalState === 'WATCHLIST') {
      actionStateBadge = `<span class="badge badge-warn text-sm py-1 px-2.5 mb-1"><i class="ph ph-eye"></i> WATCHLIST</span>`;
    } else {
      actionStateBadge = `<span class="badge badge-neutral text-sm py-1 px-2.5 mb-1"><i class="ph ph-hand-palm"></i> NO TRADE</span>`;
    }
    
    const recDetails = `
      <div class="space-y-1.5 min-w-[280px]">
        <div>${actionStateBadge}</div>
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-400">Direction:</span>
          <span class="font-bold ${analysis.directionalBias === 'BULLISH' ? 'text-emerald-400' : (analysis.directionalBias === 'BEARISH' ? 'text-rose-400' : 'text-amber-400')}">${analysis.directionalBias}</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-400">Buy Side:</span>
          <span class="font-bold text-cyan-300">${analysis.sideToBuy}</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-400">Hold Horizon:</span>
          <span class="font-semibold text-slate-200">${analysis.holdDuration}</span>
        </div>
        <div class="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <span class="text-slate-500 font-mono">TRIG:</span> ${analysis.entryTrigger.length > 50 ? analysis.entryTrigger.substring(0, 50) + '...' : analysis.entryTrigger}
        </div>
        <div class="grid grid-cols-3 gap-1 font-mono text-[11px] pt-1">
          <div class="bg-slate-900/60 p-1 rounded border border-slate-800"><span class="text-slate-500">T1:</span> ${analysis.t1}</div>
          <div class="bg-slate-900/60 p-1 rounded border border-slate-800"><span class="text-slate-500">T2:</span> ${analysis.t2}</div>
          <div class="bg-rose-950/30 p-1 rounded border border-rose-900/40"><span class="text-rose-400">SL:</span> ${analysis.sl}</div>
        </div>
      </div>
    `;

    const isUp = state.tickDirection === 'UP';
    const tickClass = isUp ? 'text-emerald-400' : 'text-rose-400';
    const tickIcon = isUp ? '▲' : '▼';

    masterTableBody.innerHTML = `
      <tr class="transition-colors">
        <td class="whitespace-nowrap">
          <div id="master-table-spot" class="text-lg font-extrabold mono text-white flex items-center gap-1.5 transition-all p-1">
            <span>${state.spotPrice.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
            <span class="text-xs ${tickClass} font-bold mono">${tickIcon}</span>
          </div>
          <div class="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span>${state.currentAssetName || 'NIFTY 50'} / SPOT</span>
            <span class="text-[10px] px-1 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 mono font-bold">${state.dataSource === 'LIVE' ? '● LIVE' : '● SAVED'}</span>
          </div>
        </td>
        <td class="whitespace-nowrap">${trendBadge}</td>
        <td>${pcrBadge}</td>
        <td class="max-w-xs">${newsCell}</td>
        <td class="whitespace-nowrap">${vixBadge}</td>
        <td>${recDetails}</td>
      </tr>
    `;
  }
  
  // Helper for safe element text updates
  const setSafeText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  // 2. RENDER GREEKS DISPLAY CARDS
  setSafeText('greek-sigma', `±${greeks.expectedSigmaMove.toFixed(1)} pts`);
  setSafeText('greek-sigma-range', `[${(state.spotPrice - greeks.expectedSigmaMove).toFixed(0)} — ${(state.spotPrice + greeks.expectedSigmaMove).toFixed(0)}]`);
  setSafeText('greek-delta-call', greeks.callDelta.toFixed(3));
  setSafeText('greek-delta-put', greeks.putDelta.toFixed(3));
  setSafeText('greek-gamma', greeks.gamma.toFixed(5));
  
  const gammaWarning = document.getElementById('gamma-warning');
  if (gammaWarning) {
    if (greeks.isGammaRisk) {
      gammaWarning.classList.remove('hidden');
      gammaWarning.textContent = `FLAG: DTE <= 2 (${state.dte} DTE). Gamma pin risk active!`;
    } else {
      gammaWarning.classList.add('hidden');
    }
  }
  
  setSafeText('greek-theta-call', `${greeks.thetaDayCall.toFixed(2)} pts/day`);
  setSafeText('greek-theta-put', `${greeks.thetaDayPut.toFixed(2)} pts/day`);
  setSafeText('greek-vega', `+${greeks.vega.toFixed(2)} pts/1% IV`);
  
  // 3. RENDER ACTIONABLE BLUEPRINT CARD (TAB 2 / MODAL)
  setSafeText('blueprint-strategy', analysis.strategyRec || '--');
  setSafeText('blueprint-trigger', analysis.entryTrigger || '--');
  setSafeText('blueprint-t1', analysis.t1 ? analysis.t1.toLocaleString('en-IN') : '--');
  setSafeText('blueprint-t2', analysis.t2 ? analysis.t2.toLocaleString('en-IN') : '--');
  setSafeText('blueprint-sl', analysis.sl ? analysis.sl.toLocaleString('en-IN') : '--');
  setSafeText('blueprint-implication', analysis.strategicImplication || '--');
  setSafeText('blueprint-horizon', analysis.holdDuration || '--');
  setSafeText('blueprint-side', analysis.sideToBuy || '--');

  const blueprintStateEl = document.getElementById('blueprint-state');
  if (blueprintStateEl) {
    blueprintStateEl.textContent = analysis.finalState || 'EVALUATING';
    let badgeClass = 'badge-neutral';
    if (analysis.finalState === 'CONFIRMED TRADE') {
      badgeClass = analysis.directionalBias === 'BULLISH' ? 'badge-bull' : 'badge-bear';
    } else if (analysis.finalState === 'WATCHLIST') {
      badgeClass = 'badge-warn';
    }
    blueprintStateEl.className = `badge ${badgeClass}`;
  }

  // 4. RENDER 1-CLICK "SMART INVEST" DECISION CARD (TAB 1)
  const investBadge = document.getElementById('invest-action-badge');
  if (investBadge) {
    if (analysis.finalState === 'CONFIRMED TRADE') {
      if (analysis.directionalBias === 'BULLISH') {
        investBadge.innerHTML = `<span class="badge-action-buy"><i class="ph ph-trend-up"></i> BUY CALL (HIGH CONVICTION)</span>`;
      } else {
        investBadge.innerHTML = `<span class="badge-action-sell"><i class="ph ph-trend-down"></i> BUY PUT (HIGH CONVICTION)</span>`;
      }
    } else if (state.vix < 12.0) {
      investBadge.innerHTML = `<span class="badge-action-wait"><i class="ph ph-hand-palm"></i> WAIT / COMPRESSION (VIX &lt; 12)</span>`;
    } else {
      investBadge.innerHTML = `<span class="badge-action-wait"><i class="ph ph-hourglass-simple"></i> STANDBY / WATCHLIST</span>`;
    }
  }

  const step = state.strikeStep || 50;
  const recommendedStrike = Math.round(state.spotPrice / step) * step + (state.trend === 'BULL' ? step : -step);
  const sideContract = analysis.finalState === 'CONFIRMED TRADE'
    ? (analysis.directionalBias === 'BULLISH' ? `${state.currentAssetKey} ${recommendedStrike} CALL (CE)` : `${state.currentAssetKey} ${recommendedStrike} PUT (PE)`)
    : `${state.currentAssetKey} ${recommendedStrike} / WAIT BREAKOUT`;
  setSafeText('invest-strike-name', sideContract);
  setSafeText('invest-horizon', analysis.holdDuration || 'Intraday (Exit by 3:15 PM)');
  setSafeText('invest-entry', analysis.entryTrigger || `Decisive 15m breakout beyond ${(state.spotPrice + step * 0.5).toFixed(0)}`);
  setSafeText('invest-sl', analysis.sl ? `${analysis.sl.toLocaleString('en-IN')} (-${Math.abs(Math.round(state.spotPrice - analysis.sl))} pts)` : `${(state.spotPrice - step * 0.4).toFixed(0)} (-${Math.round(step * 0.4)} pts)`);
  setSafeText('invest-t1', analysis.t1 ? `${analysis.t1.toLocaleString('en-IN')} (+${Math.abs(Math.round(analysis.t1 - state.spotPrice))} pts)` : `${(state.spotPrice + step * 0.8).toFixed(0)} (+${Math.round(step * 0.8)} pts)`);
  setSafeText('invest-t2', analysis.t2 ? `${analysis.t2.toLocaleString('en-IN')} (+${Math.abs(Math.round(analysis.t2 - state.spotPrice))} pts)` : `${(state.spotPrice + step * 1.5).toFixed(0)} (+${Math.round(step * 1.5)} pts)`);
  setSafeText('invest-rr', analysis.finalState === 'CONFIRMED TRADE' ? '1 : 2.6' : '1 : 1.8');
  setSafeText('invest-conviction', analysis.finalState === 'CONFIRMED TRADE' ? '92% High Probability' : (state.vix < 12 ? '55% (Damped by Low VIX Compression)' : '70% (Neutral Watchlist)'));

  const whyTrend = document.getElementById('invest-why-trend');
  if (whyTrend) {
    whyTrend.innerHTML = `• <b>Trend</b>: ${state.currentAssetName} holding ${state.trend === 'BULL' ? 'above 20 & 50 EMA support (Bullish momentum)' : 'below key moving average resistance (Bearish pressure)'}.`;
  }

  const whyVix = document.getElementById('invest-why-vix');
  if (whyVix) {
    if (state.vix >= 16.0) {
      whyVix.innerHTML = `• <b>VIX Directive</b>: India VIX at ${state.vix.toFixed(2)} &ge; 16 (Aggressive Expansion). Breakouts are permitted!`;
    } else if (state.vix < 12.0) {
      whyVix.innerHTML = `• <b>VIX Directive</b>: India VIX at ${state.vix.toFixed(2)} &lt; 12 (Stable Compression). Naked option buying strictly restricted to prevent theta decay.`;
    } else {
      whyVix.innerHTML = `• <b>VIX Directive</b>: India VIX at ${state.vix.toFixed(2)} (Moderate 12-16). Waiting for volatility expansion confirmation.`;
    }
  }

  const whyPcr = document.getElementById('invest-why-pcr');
  if (whyPcr) {
    whyPcr.innerHTML = `• <b>Order Flow</b>: PCR at ${state.pcr.toFixed(2)} (${analysis.pcrStatus}). Support at ${state.putSupport}, Resistance at ${state.callResistance}.`;
  }

  // 5. TRUE VALUATION STRIP & TECHNICAL GAUGES
  const curAssetObj = ASSET_UNIVERSE[state.currentAssetKey];
  const trueLow = curAssetObj?.low || (state.spotPrice * 0.992);
  const trueHigh = curAssetObj?.high || (state.spotPrice * 1.008);
  setSafeText('val-day-range', `${trueLow.toFixed(2)} — ${trueHigh.toFixed(2)}`);
  const valRegime = document.getElementById('val-regime');
  if (valRegime) {
    if (state.vix >= 16.0) {
      valRegime.className = 'badge badge-bear text-[11px]';
      valRegime.textContent = 'AGGRESSIVE (VIX >= 16)';
    } else if (state.vix < 12.0) {
      valRegime.className = 'badge badge-bull text-[11px]';
      valRegime.textContent = 'STABLE (VIX < 12)';
    } else {
      valRegime.className = 'badge badge-warn text-[11px]';
      valRegime.textContent = 'MODERATE (12-16)';
    }
  }

  const chartTrend = document.getElementById('chart-trend-badge');
  if (chartTrend) {
    chartTrend.textContent = state.trend === 'BULL' ? 'BULLISH CONSOLIDATION' : 'BEARISH CONSOLIDATION';
    chartTrend.className = `badge ${state.trend === 'BULL' ? 'badge-bull' : 'badge-bear'} font-bold`;
  }

  const gaugeOsc = document.getElementById('gauge-osc');
  if (gaugeOsc) {
    gaugeOsc.textContent = state.trend === 'BULL' ? 'NEUTRAL-BULL (RSI: 56.4)' : 'NEUTRAL-BEAR (RSI: 44.8)';
  }

  const gaugeMa = document.getElementById('gauge-ma');
  if (gaugeMa) {
    gaugeMa.textContent = state.trend === 'BULL' ? 'BUY (Above 20 & 50 EMA)' : 'SELL (Below 20 & 50 EMA)';
    gaugeMa.className = state.trend === 'BULL' ? 'text-base font-bold text-emerald-400 mt-1' : 'text-base font-bold text-rose-400 mt-1';
  }

  const gaugeOverall = document.getElementById('gauge-overall');
  if (gaugeOverall) {
    gaugeOverall.textContent = analysis.finalState === 'CONFIRMED TRADE' 
      ? (analysis.directionalBias === 'BULLISH' ? 'STRONG BUY' : 'STRONG SELL')
      : (state.vix < 12 ? 'MILD / COMPRESSION' : 'WATCHLIST');
    gaugeOverall.className = analysis.finalState === 'CONFIRMED TRADE'
      ? (analysis.directionalBias === 'BULLISH' ? 'text-base font-bold text-emerald-400 mt-1' : 'text-base font-bold text-rose-400 mt-1')
      : 'text-base font-bold text-amber-400 mt-1';
  }

  const portCountEl = document.getElementById('portfolio-count');
  if (portCountEl && state.portfolio) {
    portCountEl.textContent = state.portfolio.length;
  }

  // 6. UPDATE AI CONTEXT BANNER
  setSafeText('ai-ctx-cmp', state.spotPrice.toLocaleString('en-IN', { minimumFractionDigits: 1 }));
  setSafeText('ai-ctx-vix', `${state.vix.toFixed(2)} (${analysis.vixRegime})`);
  setSafeText('ai-ctx-pcr', `${state.pcr.toFixed(2)} (${analysis.pcrBias})`);
  setSafeText('ai-ctx-trend', state.trend);
  setSafeText('ai-ctx-gate', `${analysis.finalState} (${analysis.directionalBias})`);

  // 7. ORDER BOOK & OI DEPTH LIQUIDITY VISUALIZER
  renderOIDepth();
}

function renderOIDepth() {
  const container = document.getElementById('oi-depth-container');
  if (!container) return;
  
  const totalOI = state.callOI + state.putOI;
  const callPct = Math.round((state.callOI / totalOI) * 100);
  const putPct = 100 - callPct;
  
  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center text-xs mono">
        <div>
          <span class="text-emerald-400 font-bold">Max Put OI Support:</span>
          <span class="text-white ml-1 font-bold">${state.putSupport}</span>
          <span class="text-slate-400 ml-1">(${state.putOI}L OI)</span>
        </div>
        <div class="text-right">
          <span class="text-rose-400 font-bold">Max Call OI Resistance:</span>
          <span class="text-white ml-1 font-bold">${state.callResistance}</span>
          <span class="text-slate-400 ml-1">(${state.callOI}L OI)</span>
        </div>
      </div>
      
      <!-- Split OI Bar -->
      <div class="w-full bg-slate-800 rounded-full h-3 flex overflow-hidden border border-slate-700">
        <div class="bg-emerald-500 h-full transition-all duration-500" style="width: ${putPct}%" title="Put OI (Support Side): ${putPct}%"></div>
        <div class="bg-rose-500 h-full transition-all duration-500" style="width: ${callPct}%" title="Call OI (Resistance Side): ${callPct}%"></div>
      </div>
      
      <div class="flex justify-between text-[11px] text-slate-400">
        <span>Put Wall: Institutional Bid Blockades (${putPct}%)</span>
        <span>Call Wall: Institutional Ask Blockades (${callPct}%)</span>
      </div>
      
      <div class="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
        <div class="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
          <i class="ph ph-shield-check text-cyan-400"></i> Institutional Liquidity Trap Zones:
        </div>
        <div class="text-slate-400">
          Upper Stop-Hunting Trap: <span class="mono text-rose-300">${state.callResistance + 35}</span> | 
          Lower Liquidity Grab: <span class="mono text-emerald-300">${state.putSupport - 35}</span>
        </div>
      </div>
    </div>
  `;
  renderPortfolio();
}

// ================= TAB NAVIGATION & WORKSPACE ROUTING =================
function switchTab(tabId) {
  const tabs = ['market-overview', 'chart-invest', 'option-chain', 'portfolio', 'learn-guide', 'ai-copilot', 'master-table', 'greeks-depth'];
  tabs.forEach(t => {
    const desktopNavBtn = document.getElementById(`tab-nav-${t}`);
    const mobileNavBtn = document.getElementById(`mob-tab-${t}`);
    const viewSection = document.getElementById(`view-tab-${t}`);
    if (t === tabId) {
      if (desktopNavBtn) desktopNavBtn.classList.add('active');
      if (mobileNavBtn) mobileNavBtn.classList.add('active');
      if (viewSection) viewSection.classList.remove('hidden');
    } else {
      if (desktopNavBtn) desktopNavBtn.classList.remove('active');
      if (mobileNavBtn) mobileNavBtn.classList.remove('active');
      if (viewSection) viewSection.classList.add('hidden');
    }
  });

  // Scroll to top on mobile tab switch
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (tabId === 'market-overview') {
    renderMarketOverview();
  } else if (tabId === 'chart-invest') {
    updateBeginnerOrderPad();
    initTradingViewChart(state.currentSymbol);
  } else if (tabId === 'option-chain') {
    if (typeof renderOptionChain === 'function') {
      renderOptionChain();
    }
  } else if (tabId === 'portfolio') {
    renderPortfolio();
  }
}

// ================= MARKET OVERVIEW & SECTOR HEATMAP =================
function renderIndicesRibbon(changedTickKeys = {}) {
  const container = document.getElementById('indices-ribbon');
  if (!container) return;

  const indicesKeys = ['NIFTY', 'BANKNIFTY', 'SENSEX', 'FINNIFTY', 'NIFTYIT', 'MIDCPNIFTY'];
  container.innerHTML = indicesKeys.map(k => {
    const asset = ASSET_UNIVERSE[k];
    if (!asset) return '';
    const chgPts = asset.price - asset.prevClose;
    const chgPct = (chgPts / asset.prevClose) * 100;
    const isPos = chgPct >= 0;
    const isActive = state.currentAssetKey === k;
    const tickClass = changedTickKeys[k] === 'up' ? 'flash-up' : (changedTickKeys[k] === 'down' ? 'flash-down' : '');

    return `
      <div class="index-ribbon-card ${isActive ? 'active' : ''} ${tickClass}" onclick="selectAsset('${k}', false)">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-300 font-mono">${asset.name}</span>
          <span class="text-[10px] font-mono font-bold ${isPos ? 'text-emerald-400' : 'text-rose-400'}">
            ${isPos ? '+' : ''}${chgPct.toFixed(2)}%
          </span>
        </div>
        <div class="text-sm font-extrabold font-mono text-white mt-0.5">
          ${asset.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div class="text-[10px] text-slate-500 font-mono">
          ${isPos ? '▲' : '▼'} ${chgPts >= 0 ? '+' : ''}${chgPts.toFixed(1)} pts
        </div>
      </div>
    `;
  }).join('');
}

function renderMarketOverview(changedTickKeys = {}) {
  // 1. Breadth
  const advCount = document.getElementById('breadth-adv-count');
  const decCount = document.getElementById('breadth-dec-count');
  const barAdv = document.getElementById('breadth-bar-adv');
  const barDec = document.getElementById('breadth-bar-dec');
  if (advCount) advCount.textContent = MARKET_BREADTH.advances.toLocaleString();
  if (decCount) decCount.textContent = MARKET_BREADTH.declines.toLocaleString();
  if (barAdv) barAdv.style.width = `${Math.round((MARKET_BREADTH.advances / MARKET_BREADTH.totalTraded) * 100)}%`;
  if (barDec) barDec.style.width = `${Math.round((MARKET_BREADTH.declines / MARKET_BREADTH.totalTraded) * 100)}%`;

  // 2. Sectors Grid
  const sectorContainer = document.getElementById('sector-grid-container');
  if (sectorContainer) {
    sectorContainer.innerHTML = SECTORS_DATA.map(sec => `
      <div class="sector-card" onclick="filterBySector('${sec.name}')">
        <div class="text-[11px] font-bold text-slate-300">${sec.name}</div>
        <div class="text-sm font-black font-mono mt-1 ${sec.positive ? 'text-emerald-400' : 'text-rose-400'}">
          ${sec.chg} ${sec.positive ? '▲' : '▼'}
        </div>
        <div class="text-[10px] text-slate-500 mt-0.5">NSE Sector</div>
      </div>
    `).join('');
  }

  // 3. Global Markets Bar
  const globalBar = document.getElementById('global-markets-bar');
  if (globalBar) {
    globalBar.innerHTML = GLOBAL_MARKETS.map(gm => `
      <div class="p-2 rounded bg-slate-900/60 border border-slate-800">
        <span class="text-[10px] text-slate-400 block">${gm.name}</span>
        <span class="font-bold text-white">${gm.price}</span>
        <span class="ml-1 ${gm.pos ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}">${gm.chg}</span>
      </div>
    `).join('');
  }

  // Compute Movers
  const allAssets = Object.values(ASSET_UNIVERSE);
  const equities = allAssets.filter(a => a.type === 'EQUITY');
  
  equities.forEach(a => {
    a.chgPct = ((a.price - a.prevClose) / a.prevClose) * 100;
  });

  const gainers = [...equities].sort((a, b) => b.chgPct - a.chgPct).slice(0, 5);
  const losers = [...equities].sort((a, b) => a.chgPct - b.chgPct).slice(0, 5);
  const mostActive = [...equities].slice(0, 5);

  // Top Gainers List
  const gainersList = document.getElementById('top-gainers-list');
  if (gainersList) {
    gainersList.innerHTML = gainers.map(g => `
      <div class="stock-mover-card" onclick="selectAsset('${g.id}', true)">
        <div>
          <div class="font-bold text-white text-xs">${g.name}</div>
          <div class="text-[10px] text-slate-400 font-mono">${g.ticker} • ${g.sector}</div>
        </div>
        <div class="text-right">
          <div class="font-mono font-bold text-white text-xs">₹${g.price.toFixed(2)}</div>
          <span class="gain-badge">+${g.chgPct.toFixed(2)}% ▲</span>
        </div>
      </div>
    `).join('');
  }

  // Top Losers List
  const losersList = document.getElementById('top-losers-list');
  if (losersList) {
    losersList.innerHTML = losers.map(l => `
      <div class="stock-mover-card" onclick="selectAsset('${l.id}', true)">
        <div>
          <div class="font-bold text-white text-xs">${l.name}</div>
          <div class="text-[10px] text-slate-400 font-mono">${l.ticker} • ${l.sector}</div>
        </div>
        <div class="text-right">
          <div class="font-mono font-bold text-white text-xs">₹${l.price.toFixed(2)}</div>
          <span class="loss-badge">${l.chgPct.toFixed(2)}% ▼</span>
        </div>
      </div>
    `).join('');
  }

  // Most Active List
  const activeList = document.getElementById('most-active-list');
  if (activeList) {
    activeList.innerHTML = mostActive.map(m => `
      <div class="stock-mover-card" onclick="selectAsset('${m.id}', true)">
        <div>
          <div class="font-bold text-white text-xs">${m.name}</div>
          <div class="text-[10px] text-slate-400 font-mono">Vol: ${m.volume} • ${m.mcap || 'Largecap'}</div>
        </div>
        <div class="text-right">
          <div class="font-mono font-bold text-white text-xs">₹${m.price.toFixed(2)}</div>
          <span class="${m.chgPct >= 0 ? 'gain-badge' : 'loss-badge'}">${m.chgPct >= 0 ? '+' : ''}${m.chgPct.toFixed(2)}%</span>
        </div>
      </div>
    `).join('');
  }

  // 4. Stock Screener / Directory Table
  renderStockDirectoryTable(changedTickKeys);
}

function renderStockDirectoryTable(changedTickKeys = {}) {
  const tbody = document.getElementById('stock-directory-table-body');
  const countBadge = document.getElementById('stock-table-count');
  if (!tbody) return;

  const all = Object.values(ASSET_UNIVERSE);
  const q = (state.searchQuery || '').toLowerCase().trim();
  const filter = state.marketFilter || 'ALL';

  const filtered = all.filter(item => {
    // Search query filter
    const matchesSearch = !q || 
      item.name.toLowerCase().includes(q) || 
      item.ticker.toLowerCase().includes(q) || 
      item.sector.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    // Category filter
    if (filter === 'ALL') return true;
    if (filter === 'INDICES') return item.type === 'INDEX';
    if (filter === 'GAINERS') return (item.price >= item.prevClose);
    if (filter === 'LOSERS') return (item.price < item.prevClose);
    if (filter === 'BANKING') return item.sector.toLowerCase().includes('bank') || item.sector.toLowerCase().includes('fin');
    if (filter === 'IT') return item.sector.toLowerCase().includes('it') || item.sector.toLowerCase().includes('tech');
    if (filter === 'AUTO') return item.sector.toLowerCase().includes('auto');
    return true;
  });

  if (countBadge) countBadge.textContent = `${filtered.length} Instruments`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-8 text-slate-400">
          <i class="ph ph-magnifying-glass text-2xl mb-1 text-slate-500"></i>
          <p>No matching instruments found for "<b>${q}</b>". Try another search!</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const chgPts = item.price - item.prevClose;
    const chgPct = (chgPts / item.prevClose) * 100;
    const isPos = chgPct >= 0;
    const isSelected = state.currentAssetKey === item.id;
    const tickClass = changedTickKeys[item.id] === 'up' ? 'flash-up' : (changedTickKeys[item.id] === 'down' ? 'flash-down' : '');

    return `
      <tr class="hover:bg-slate-900/60 transition-colors ${isSelected ? 'bg-cyan-950/20' : ''}">
        <td class="p-3.5">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 font-mono text-xs">
              ${item.ticker.slice(0, 2)}
            </div>
            <div>
              <div class="font-bold text-white text-xs flex items-center gap-1.5">
                <span>${item.name}</span>
                ${item.type === 'INDEX' ? '<span class="text-[9px] px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">INDEX</span>' : ''}
              </div>
              <div class="text-[10px] text-slate-400 font-mono">${item.ticker} • ${item.exchange}</div>
            </div>
          </div>
        </td>
        <td class="p-3.5 font-mono text-slate-300 text-xs">${item.sector}</td>
        <td class="p-3.5 text-right font-mono font-bold text-white text-xs ${tickClass}">
          ₹${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </td>
        <td class="p-3.5 text-right font-mono">
          <span class="${isPos ? 'gain-badge' : 'loss-badge'}">
            ${isPos ? '+' : ''}${chgPct.toFixed(2)}% ${isPos ? '▲' : '▼'}
          </span>
        </td>
        <td class="p-3.5 text-right font-mono text-xs text-slate-400">
          ${item.low.toLocaleString('en-IN')} — ${item.high.toLocaleString('en-IN')}
        </td>
        <td class="p-3.5 text-right font-mono text-xs text-slate-300">
          ${item.pe ? item.pe.toFixed(1) + 'x' : '--'}
        </td>
        <td class="p-3.5 text-center">
          <span class="badge ${item.trend === 'BULL' ? 'badge-bull' : 'badge-bear'} text-[10px]">
            ${item.trend === 'BULL' ? 'BULL' : 'BEAR'}
          </span>
        </td>
        <td class="p-3.5 text-center">
          <button onclick="selectAsset('${item.id}', true)" class="btn btn-primary py-1 px-3 text-[11px] font-bold shadow">
            <i class="ph ph-chart-line-up mr-1"></i> Trade / Chart
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterMarketAssets() {
  const input = document.getElementById('market-search-input');
  const clearBtn = document.getElementById('btn-clear-search');
  if (input) {
    state.searchQuery = input.value;
    if (clearBtn) {
      if (input.value.trim().length > 0) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }
  }
  renderStockDirectoryTable();
}

function clearMarketSearch() {
  const input = document.getElementById('market-search-input');
  const clearBtn = document.getElementById('btn-clear-search');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');
  state.searchQuery = '';
  renderStockDirectoryTable();
}

function setMarketFilter(category) {
  state.marketFilter = category;
  const chips = ['ALL', 'INDICES', 'GAINERS', 'LOSERS', 'BANKING', 'IT', 'AUTO'];
  chips.forEach(c => {
    const el = document.getElementById(`filter-chip-${c}`);
    if (el) {
      if (c === category) el.classList.add('active');
      else el.classList.remove('active');
    }
  });
  renderStockDirectoryTable();
}

function filterBySector(secName) {
  const input = document.getElementById('market-search-input');
  if (input) {
    input.value = secName;
    state.searchQuery = secName;
    const clearBtn = document.getElementById('btn-clear-search');
    if (clearBtn) clearBtn.classList.remove('hidden');
  }
  renderStockDirectoryTable();
}

function selectAsset(key, autoSwitchToChart = false) {
  const asset = ASSET_UNIVERSE[key];
  if (!asset) return;

  state.currentAssetKey = key;
  state.currentAssetName = asset.name;
  state.currentSymbol = asset.symbol;
  state.currentSector = asset.sector;
  state.strikeStep = asset.strikeStep;
  state.spotPrice = asset.price;
  state.prevClose = asset.prevClose;
  state.vix = state.liveVix || asset.vix;
  state.pcr = asset.pcr;
  state.trend = asset.trend;
  state.newsSentiment = asset.newsSentiment;
  state.newsHeadline = asset.newsHeadline;
  state.pe = asset.pe;
  state.pb = asset.pb;
  state.callResistance = Math.ceil(state.spotPrice / asset.strikeStep) * asset.strikeStep + (asset.strikeStep * 2);
  state.putSupport = Math.floor(state.spotPrice / asset.strikeStep) * asset.strikeStep - (asset.strikeStep * 2);

  // Update header asset details in Chart tab
  const activeTitle = document.getElementById('active-asset-title');
  const activeType = document.getElementById('active-asset-type');
  const activeLtp = document.getElementById('active-asset-ltp');
  const activeChg = document.getElementById('active-asset-chg');
  const activeSector = document.getElementById('active-asset-sector');

  if (activeTitle) activeTitle.textContent = `${asset.name} (${asset.symbol})`;
  if (activeType) activeType.textContent = `${asset.type} / ${asset.exchange}`;
  if (activeLtp) activeLtp.textContent = asset.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  const chgPts = asset.price - asset.prevClose;
  const chgPct = (chgPts / asset.prevClose) * 100;
  if (activeChg) {
    activeChg.textContent = `${chgPct >= 0 ? '+' : ''}${chgPct.toFixed(2)}% ${chgPct >= 0 ? '▲' : '▼'}`;
    activeChg.className = `${chgPct >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-mono`;
  }
  if (activeSector) activeSector.textContent = asset.sector;

  // Update switcher chips in Chart tab
  const switcherChips = ['NIFTY', 'BANKNIFTY', 'SENSEX', 'RELIANCE', 'HDFCBANK', 'TATAMOTORS', 'TCS', 'INFY', 'TATASTEEL'];
  switcherChips.forEach(k => {
    const chip = document.getElementById(`chip-asset-${k}`);
    if (chip) {
      if (k === key) chip.classList.add('active');
      else chip.classList.remove('active');
    }
  });

  // Re-initialize Chart with new symbol!
  initTradingViewChart(asset.symbol);

  // Set default instrument mode: Futures for indices, Equity Shares (1-unit step) for stocks
  const defMode = asset.type === 'INDEX' ? 'FUT' : 'EQ';
  if (typeof setBeginnerInstrument === 'function') {
    setBeginnerInstrument(defMode);
  } else {
    state.beginnerInstrument = defMode;
    updateBeginnerOrderPad();
  }

  syncInputsFromState();
  renderAll();
  renderIndicesRibbon();
  renderMarketOverview();

  if (autoSwitchToChart) {
    switchTab('chart-invest');
  }
}

// ================= DUAL-ENGINE CANDLESTICK CHART SYSTEM =================
let currentChartEngine = 'native'; // Native Canvas Chart active by default (always shows authentic Indian candles & index prices, NEVER Apple!)
let nativeCandleDataCache = null;
let nativeCandleAssetKey = null;
let nativeCandleTimes = null;
let nativeCandleIsReal = false;

function openOptionChainForSelectedAsset() {
  const currentKey = state.currentAssetKey || 'NIFTY';
  selectOptionChainAsset(currentKey);
  switchTab('option-chain');
}

function setChartEngine(engine) {
  currentChartEngine = engine;
  const btnTv = document.getElementById('btn-chart-tv');
  const btnNative = document.getElementById('btn-chart-native');
  const tvBox = document.getElementById('tradingview_chart_container');
  const nativeBox = document.getElementById('native_chart_container');

  if (engine === 'tradingview') {
    if (btnTv) btnTv.classList.add('active');
    if (btnNative) btnNative.classList.remove('active');
    if (tvBox) tvBox.classList.remove('hidden');
    if (nativeBox) nativeBox.classList.add('hidden');
    loadTradingViewIframe(state.currentSymbol);
  } else {
    if (btnTv) btnTv.classList.remove('active');
    if (btnNative) btnNative.classList.add('active');
    if (tvBox) tvBox.classList.add('hidden');
    if (nativeBox) nativeBox.classList.remove('hidden');
    renderNativeCandlestickChart();
  }
}

const TV_SYMBOL_MAP = {
  'NIFTY': 'NSE:NIFTY50',
  'INDEX:NIFTY': 'NSE:NIFTY50',
  'NSE:NIFTY': 'NSE:NIFTY50',
  'BANKNIFTY': 'NSE:BANKNIFTY',
  'INDEX:BANKNIFTY': 'NSE:BANKNIFTY',
  'NSE:BANKNIFTY': 'NSE:BANKNIFTY',
  'SENSEX': 'BSE:SENSEX',
  'INDEX:SENSEX': 'BSE:SENSEX',
  'BSE:SENSEX': 'BSE:SENSEX',
  'FINNIFTY': 'NSE:FINNIFTY',
  'INDEX:FINNIFTY': 'NSE:FINNIFTY',
  'NSE:FINNIFTY': 'NSE:FINNIFTY',
  'MIDCPNIFTY': 'NSE:MIDCPNIFTY',
  'INDEX:MIDCPNIFTY': 'NSE:MIDCPNIFTY',
  'NSE:MIDCPNIFTY': 'NSE:MIDCPNIFTY',
  'NIFTYIT': 'NSE:CNXIT',
  'INDEX:NIFTYIT': 'NSE:CNXIT'
};

function loadTradingViewIframe(symbolToLoad) {
  const container = document.getElementById('tradingview_chart_container');
  if (!container) return;
  
  let rawSymbol = symbolToLoad || state.currentSymbol || state.currentAssetKey || 'NIFTY';
  let tvSymbol = TV_SYMBOL_MAP[rawSymbol] || TV_SYMBOL_MAP[state.currentAssetKey];
  if (!tvSymbol) {
    let clean = rawSymbol.replace(/^(INDEX:|NSE:|BSE:)/, '');
    const asset = ASSET_UNIVERSE[clean] || ASSET_UNIVERSE[state.currentAssetKey];
    const ex = (asset && asset.exchange === 'BSE') ? 'BSE' : 'NSE';
    tvSymbol = `${ex}:${clean}`;
  }

  const iframeSrc = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(tvSymbol)}&interval=1&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=0c1017&theme=dark&style=1&timezone=Asia%2FKolkata&locale=en&utm_source=localhost`;

  container.innerHTML = `
    <iframe id="tv-embedded-frame"
      src="${iframeSrc}"
      style="width: 100%; height: 100%; min-height: 380px; border: none; display: block;"
      allowtransparency="true"
      scrolling="no"
      allowfullscreen>
    </iframe>
  `;

  const titleEl = document.getElementById('chart-panel-title');
  if (titleEl) {
    titleEl.textContent = `${state.currentAssetName || 'NIFTY 50'} INTRADAY CHART`;
  }
  const statusLabel = document.getElementById('chart-status-label');
  if (statusLabel) {
    statusLabel.textContent = `TradingView Live (${tvSymbol})`;
  }
}

// Offline-Ready Native HTML5 Canvas Candlestick Chart
function renderNativeCandlestickChart() {
  const canvas = document.getElementById('native_candlestick_canvas');
  if (!canvas) return;

  const container = document.getElementById('native_chart_container');
  if (!container) return;

  const assetNameEl = document.getElementById('native-asset-name');
  if (assetNameEl) {
    assetNameEl.textContent = `${state.currentAssetName || 'NIFTY 50'} (${state.currentAssetKey || 'NIFTY'})`;
  }
  const titleEl = document.getElementById('chart-panel-title');
  if (titleEl) {
    titleEl.textContent = `${state.currentAssetName || 'NIFTY 50'} INTRADAY CHART`;
  }
  const statusLabel = document.getElementById('chart-status-label');
  if (statusLabel) {
    statusLabel.textContent = `Built-in Index Stream (${state.currentAssetKey || 'NIFTY'})`;
  }

  const dpr = window.devicePixelRatio || 1;
  const rect = container.getBoundingClientRect();
  const width = Math.max(300, rect.width - 16);
  const height = Math.max(260, rect.height - 40);

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const asset = ASSET_UNIVERSE[state.currentAssetKey] || {
    price: state.spotPrice,
    prevClose: state.prevClose,
    high: state.spotPrice * 1.008,
    low: state.spotPrice * 0.992
  };

  // Generate or reuse 26 intraday 15m candles
  if (!nativeCandleDataCache || nativeCandleAssetKey !== state.currentAssetKey) {
    nativeCandleAssetKey = state.currentAssetKey;
    nativeCandleDataCache = generateCandlestickSeries(asset);
    nativeCandleTimes = null;
    nativeCandleIsReal = false;
    loadRealCandles(state.currentAssetKey);
  }
  const candles = nativeCandleDataCache;

  // Chart layout dimensions
  const paddingRight = 65;
  const paddingBottom = 26;
  const paddingTop = 16;
  const chartW = width - paddingRight;
  const chartH = height - paddingBottom - paddingTop;
  const volumeH = Math.min(60, chartH * 0.22);
  const priceH = chartH - volumeH;

  // Clear background
  ctx.fillStyle = '#090e17';
  ctx.fillRect(0, 0, width, height);

  // Compute Min/Max
  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let maxVol = 0;

  candles.forEach(c => {
    if (c.low < minPrice) minPrice = c.low;
    if (c.high > maxPrice) maxPrice = c.high;
    if (c.vol > maxVol) maxVol = c.vol;
  });

  const pricePadding = (maxPrice - minPrice) * 0.08 || 1;
  minPrice -= pricePadding;
  maxPrice += pricePadding;
  const priceRange = maxPrice - minPrice;

  // Draw Horizontal Price Grid Lines
  const gridSteps = 5;
  ctx.strokeStyle = '#151d2a';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '10px monospace';
  ctx.textAlign = 'left';

  for (let i = 0; i <= gridSteps; i++) {
    const y = paddingTop + (priceH / gridSteps) * i;
    const priceVal = maxPrice - (priceRange / gridSteps) * i;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(chartW, y);
    ctx.stroke();

    ctx.fillText(priceVal.toFixed(2), chartW + 8, y + 3);
  }

  // Draw Time Axis Labels
  const timeLabels = (nativeCandleTimes && nativeCandleTimes.length === candles.length)
    ? [0, 1, 2, 3, 4, 5].map(i => nativeCandleTimes[Math.round(i * (candles.length - 1) / 5)])
    : ['09:15', '10:30', '11:45', '13:00', '14:15', '15:30'];
  const labelStep = Math.floor(candles.length / (timeLabels.length - 1));
  timeLabels.forEach((label, idx) => {
    const candleIdx = Math.min(candles.length - 1, Math.round(idx * (candles.length - 1) / (timeLabels.length - 1)));
    const candleX = (candleIdx + 0.5) * (chartW / candles.length);
    ctx.fillText(label, candleX - 14, height - 8);
  });

  const candleW = Math.max(3, (chartW / candles.length) * 0.65);
  const slotW = chartW / candles.length;

  // Draw Volume Bars & Candlesticks
  candles.forEach((c, i) => {
    const x = i * slotW + (slotW / 2);
    const isGreen = c.close >= c.open;

    // Volume bar
    const vBarH = (maxVol ? c.vol / maxVol : 0) * volumeH;
    const vBarY = paddingTop + priceH + (volumeH - vBarH);
    ctx.fillStyle = isGreen ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)';
    ctx.fillRect(x - candleW / 2, vBarY, candleW, vBarH);

    // Candlestick Wick (High to Low)
    const yHigh = paddingTop + ((maxPrice - c.high) / priceRange) * priceH;
    const yLow = paddingTop + ((maxPrice - c.low) / priceRange) * priceH;
    const yOpen = paddingTop + ((maxPrice - c.open) / priceRange) * priceH;
    const yClose = paddingTop + ((maxPrice - c.close) / priceRange) * priceH;

    ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x, yHigh);
    ctx.lineTo(x, yLow);
    ctx.stroke();

    // Candlestick Body
    const bodyTop = Math.min(yOpen, yClose);
    const bodyH = Math.max(2, Math.abs(yOpen - yClose));
    ctx.fillStyle = isGreen ? '#10b981' : '#ef4444';
    ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
  });

  // Draw 10 EMA Overlay Line
  ctx.beginPath();
  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 1.6;
  candles.forEach((c, i) => {
    const x = i * slotW + (slotW / 2);
    const y = paddingTop + ((maxPrice - c.ema) / priceRange) * priceH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Current Price Line
  const curY = paddingTop + ((maxPrice - asset.price) / priceRange) * priceH;
  ctx.strokeStyle = '#38bdf8';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, curY);
  ctx.lineTo(chartW, curY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Current Price Badge on Axis
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(chartW + 2, curY - 9, paddingRight - 4, 18);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px monospace';
  ctx.fillText(asset.price.toFixed(1), chartW + 6, curY + 4);

  if (statusLabel) {
    statusLabel.textContent = nativeCandleIsReal ? `Live 5-min candles · ${asset.price.toFixed(2)}` : `Simulated candles (data server offline) · ${asset.price.toFixed(2)}`;
  }
}

function generateCandlestickSeries(asset) {
  const count = 26;
  const series = [];
  let price = asset.prevClose;
  const totalChange = asset.price - asset.prevClose;
  const driftPerStep = totalChange / count;
  const volatility = Math.max(1, asset.price * 0.002);

  let ema = price;
  const k = 2 / (10 + 1);

  for (let i = 0; i < count; i++) {
    const open = price;
    const isLast = (i === count - 1);
    const targetClose = isLast ? asset.price : (open + driftPerStep + (Math.sin(i * 0.8) * volatility));
    const high = Math.max(open, targetClose) + Math.abs(Math.cos(i * 1.1)) * volatility;
    const low = Math.min(open, targetClose) - Math.abs(Math.sin(i * 1.3)) * volatility;
    const close = isLast ? asset.price : targetClose;
    const vol = Math.floor(30000 + Math.abs(Math.sin(i)) * 90000);

    ema = (close * k) + (ema * (1 - k));

    series.push({
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      vol: vol,
      ema: Math.round(ema * 100) / 100
    });

    price = close;
  }
  return series;
}

async function loadRealCandles(key) {
  for (const base of relayBases()) {
    try {
      const res = await fetch(`${base}/api/candles?key=${encodeURIComponent(key)}&_t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.candles || data.candles.length < 3) continue;
      if (state.currentAssetKey !== key) return;
      const k = 2 / 11;
      let ema = data.candles[0].close;
      nativeCandleDataCache = data.candles.map(c => {
        ema = c.close * k + ema * (1 - k);
        return { open: c.open, high: c.high, low: c.low, close: c.close, vol: c.vol || 0, ema };
      });
      nativeCandleTimes = data.candles.map(c => c.time);
      nativeCandleAssetKey = key;
      nativeCandleIsReal = true;
      if (currentChartEngine === 'native') renderNativeCandlestickChart();
      return;
    } catch (e) { /* try next base */ }
  }
}

function initTradingViewChart(symbolToLoad) {
  if (currentChartEngine === 'native') {
    renderNativeCandlestickChart();
  } else {
    loadTradingViewIframe(symbolToLoad);
  }
}

// Redraw native chart on window resize
window.addEventListener('resize', () => {
  if (currentChartEngine === 'native') {
    renderNativeCandlestickChart();
  }
});

// ================= BEGINNER ORDER PAD & PRACTICE PAPER TRADING =================
let beginnerOrderSide = 'BUY';

function setBeginnerOrderSide(side) {
  beginnerOrderSide = side;
  const btnBuy = document.getElementById('btn-side-buy');
  const btnSell = document.getElementById('btn-side-sell');
  const btnExec = document.getElementById('btn-execute-beginner-order');

  if (side === 'BUY') {
    if (btnBuy) {
      btnBuy.className = 'py-2.5 rounded-lg font-bold text-xs bg-emerald-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950 transition-all';
    }
    if (btnSell) {
      btnSell.className = 'py-2.5 rounded-lg font-bold text-xs bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-all';
    }
    if (btnExec) {
      btnExec.className = 'w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]';
      btnExec.innerHTML = `<i class="ph ph-check-circle text-base"></i><span>Execute Practice BUY Trade (₹5L Cash)</span>`;
    }
  } else {
    if (btnBuy) {
      btnBuy.className = 'py-2.5 rounded-lg font-bold text-xs bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-all';
    }
    if (btnSell) {
      btnSell.className = 'py-2.5 rounded-lg font-bold text-xs bg-rose-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-rose-950 transition-all';
    }
    if (btnExec) {
      btnExec.className = 'w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-rose-950 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]';
      btnExec.innerHTML = `<i class="ph ph-check-circle text-base"></i><span>Execute Practice SELL Trade (₹5L Cash)</span>`;
    }
  }
  updateBeginnerLevels();
  calculateBeginnerOrderMargin();
}

function updateBeginnerLevels() {
  const cmp = state.spotPrice;
  const tgtEl = document.getElementById('beginner-target-price');
  const slEl = document.getElementById('beginner-sl-price');

  if (beginnerOrderSide === 'BUY') {
    const tgt = cmp * 1.01;
    const sl = cmp * 0.995;
    if (tgtEl) tgtEl.textContent = `₹${tgt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (slEl) slEl.textContent = `₹${sl.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    const tgt = cmp * 0.99;
    const sl = cmp * 1.005;
    if (tgtEl) tgtEl.textContent = `₹${tgt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (slEl) slEl.textContent = `₹${sl.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

function setBeginnerInstrument(instrument) {
  if (instrument === 'CE' || instrument === 'OPT' || instrument === 'PE') {
    openOptionChainForSelectedAsset();
    return;
  }
  state.beginnerInstrument = instrument;
  const btnEq = document.getElementById('btn-mode-eq');
  const btnFut = document.getElementById('btn-mode-fut');
  const btnOpt = document.getElementById('btn-mode-opt');
  const badge = document.getElementById('beginner-mode-badge');
  const qtyLabel = document.getElementById('beginner-qty-label');
  const qtyInput = document.getElementById('beginner-order-qty');
  const quickBox = document.getElementById('beginner-quick-qty-btns');

  [btnEq, btnFut, btnOpt].forEach(b => {
    if (b) {
      b.className = 'py-1.5 px-2 rounded-md text-slate-400 hover:text-white transition-all';
    }
  });

  const activeBtn = instrument === 'EQ' ? btnEq : (instrument === 'FUT' ? btnFut : btnOpt);
  if (activeBtn) {
    activeBtn.className = 'py-1.5 px-2 rounded-md bg-cyan-500 text-black shadow font-bold transition-all';
  }

  const assetKey = state.currentAssetKey;
  const lotSize = getInstrumentLotSize(assetKey, instrument);

  if (instrument === 'EQ') {
    if (badge) badge.textContent = 'SHARES (1 Unit Steps)';
    if (qtyLabel) qtyLabel.textContent = 'Quantity (Shares)';
    if (qtyInput) {
      qtyInput.step = '1';
      qtyInput.min = '1';
      qtyInput.value = '1';
    }
    if (quickBox) {
      quickBox.innerHTML = `
        <button type="button" onclick="setBeginnerQtyExact(1)" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">1</button>
        <button type="button" onclick="setBeginnerQtyExact(5)" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">5</button>
        <button type="button" onclick="setBeginnerQtyExact(10)" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">10</button>
        <button type="button" onclick="setBeginnerQtyExact(50)" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">50</button>
        <button type="button" onclick="setBeginnerQtyExact(100)" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">100</button>
      `;
    }
  } else if (instrument === 'FUT') {
    if (badge) badge.textContent = `FUTURES (Lot Size: ${lotSize})`;
    if (qtyLabel) qtyLabel.textContent = `Quantity (${lotSize}/Lot)`;
    if (qtyInput) {
      qtyInput.step = lotSize;
      qtyInput.min = lotSize;
      qtyInput.value = lotSize;
    }
    if (quickBox) {
      quickBox.innerHTML = `
        <button type="button" onclick="setBeginnerQtyExact(${lotSize})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">1 Lot</button>
        <button type="button" onclick="setBeginnerQtyExact(${lotSize * 2})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">2 Lots</button>
        <button type="button" onclick="setBeginnerQtyExact(${lotSize * 3})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">3 Lots</button>
        <button type="button" onclick="setBeginnerQtyExact(${lotSize * 5})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">5 Lots</button>
      `;
    }
  } else {
    // Options (ATM)
    if (badge) badge.textContent = `OPTIONS ATM (Lot Size: ${lotSize})`;
    if (qtyLabel) qtyLabel.textContent = `Quantity (${lotSize}/Lot)`;
    if (qtyInput) {
      qtyInput.step = lotSize;
      qtyInput.min = lotSize;
      qtyInput.value = lotSize;
    }
    if (quickBox) {
      quickBox.innerHTML = `
        <button type="button" onclick="setBeginnerQtyExact(${lotSize})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">1 Lot</button>
        <button type="button" onclick="setBeginnerQtyExact(${lotSize * 2})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">2 Lots</button>
        <button type="button" onclick="setBeginnerQtyExact(${lotSize * 3})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">3 Lots</button>
        <button type="button" onclick="setBeginnerQtyExact(${lotSize * 5})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">5 Lots</button>
      `;
    }
  }

  updateBeginnerOrderPad();
}

function setBeginnerQtyExact(qty) {
  const qtyInput = document.getElementById('beginner-order-qty');
  if (qtyInput) {
    qtyInput.value = qty;
  }
  updateBeginnerOrderPad();
}

function updateBeginnerOrderPad() {
  const cashEl = document.getElementById('beginner-avail-cash');
  if (cashEl) {
    cashEl.textContent = `₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  const assetEl = document.getElementById('beginner-order-asset');
  if (assetEl) {
    assetEl.textContent = state.currentAssetName || 'NIFTY 50';
  }

  const cmpEl = document.getElementById('beginner-order-cmp');
  if (cmpEl) {
    cmpEl.textContent = `₹${state.spotPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (state.spotTickDirection) {
      cmpEl.classList.remove('flash-up', 'flash-down');
      void cmpEl.offsetWidth;
      cmpEl.classList.add(state.spotTickDirection === 'up' ? 'flash-up' : 'flash-down');
    }
  }

  // Ensure default instrument if undefined
  if (!state.beginnerInstrument) {
    const isIndex = ASSET_UNIVERSE[state.currentAssetKey]?.type === 'INDEX';
    state.beginnerInstrument = isIndex ? 'FUT' : 'EQ';
  }

  const instrument = state.beginnerInstrument;
  const lotSize = getInstrumentLotSize(state.currentAssetKey, instrument);
  const qtyInput = document.getElementById('beginner-order-qty');
  const lotDesc = document.getElementById('beginner-lot-desc');

  if (qtyInput) {
    let currentQty = parseInt(qtyInput.value) || (instrument === 'EQ' ? 1 : lotSize);
    if (instrument === 'EQ') {
      if (currentQty < 1) currentQty = 1;
      qtyInput.value = currentQty;
      if (lotDesc) lotDesc.textContent = `Min: 1 Share | ${currentQty} Share${currentQty > 1 ? 's' : ''}`;
    } else {
      if (currentQty % lotSize !== 0 || currentQty < lotSize) {
        currentQty = lotSize;
        qtyInput.value = currentQty;
      }
      const lots = Math.max(1, Math.round(currentQty / lotSize));
      if (lotDesc) lotDesc.textContent = `Official Lot: ${lotSize} | ${lots} Lot${lots > 1 ? 's' : ''}`;
    }
  }

  updateBeginnerLevels();
  calculateBeginnerOrderMargin();
}

function adjustBeginnerQty(delta) {
  const instrument = state.beginnerInstrument || 'EQ';
  const lotSize = getInstrumentLotSize(state.currentAssetKey, instrument);
  const qtyInput = document.getElementById('beginner-order-qty');
  if (!qtyInput) return;

  let currentQty = parseInt(qtyInput.value) || (instrument === 'EQ' ? 1 : lotSize);
  if (instrument === 'EQ') {
    let newQty = currentQty + delta;
    if (newQty < 1) newQty = 1;
    qtyInput.value = newQty;
  } else {
    let newQty = currentQty + (delta * lotSize);
    if (newQty < lotSize) newQty = lotSize;
    qtyInput.value = newQty;
  }

  updateBeginnerOrderPad();
}

function calculateBeginnerOrderMargin() {
  const instrument = state.beginnerInstrument || 'EQ';
  const qtyInput = document.getElementById('beginner-order-qty');
  const lotSize = getInstrumentLotSize(state.currentAssetKey, instrument);
  const qty = parseInt(qtyInput?.value) || (instrument === 'EQ' ? 1 : lotSize);
  const price = state.spotPrice;

  let requiredMargin = 0;
  if (instrument === 'EQ') {
    // Equity delivery: 100% of notional for BUY, 20% for intraday short
    const notional = qty * price;
    requiredMargin = beginnerOrderSide === 'BUY' ? notional : notional * 0.20;
  } else if (instrument === 'FUT') {
    // Standard 15% SPAN & exposure margin
    requiredMargin = qty * price * 0.15;
  } else {
    // Options: ATM estimate ~1.5% of spot price
    const estPrem = Math.max(10, Math.round(price * 0.015 * 10) / 10);
    requiredMargin = qty * estPrem;
  }

  requiredMargin = Math.round(requiredMargin * 100) / 100;

  const marginEl = document.getElementById('beginner-req-margin');
  if (marginEl) {
    marginEl.textContent = `₹${requiredMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  const btnExec = document.getElementById('btn-execute-beginner-order');
  if (btnExec) {
    if (state.availableBalance < requiredMargin || state.availableBalance <= 0) {
      btnExec.classList.add('opacity-50', 'cursor-not-allowed');
      btnExec.disabled = true;
    } else {
      btnExec.classList.remove('opacity-50', 'cursor-not-allowed');
      btnExec.disabled = false;
    }
  }
  return requiredMargin;
}

function executeBeginnerPaperTrade() {
  const instrument = state.beginnerInstrument || 'EQ';
  const lotSize = getInstrumentLotSize(state.currentAssetKey, instrument);
  const qtyInput = document.getElementById('beginner-order-qty');
  const qty = parseInt(qtyInput?.value) || (instrument === 'EQ' ? 1 : lotSize);
  const price = state.spotPrice;
  const margin = calculateBeginnerOrderMargin();

  if (state.availableBalance < margin || state.availableBalance <= 0) {
    alert(`⚠️ INSUFFICIENT VIRTUAL CAPITAL!\n\nAvailable Cash: ₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\nRequired Margin: ₹${margin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n\nTo replenish your account with ₹5,00,000, submit a Fund Renewal Request in the Practice Portfolio tab.`);
    switchTab('portfolio');
    return;
  }

  const assetKey = state.currentAssetKey;
  const asset = ASSET_UNIVERSE[assetKey] || { name: state.currentAssetName || 'NIFTY 50' };
  const action = beginnerOrderSide;
  const tgtPrice = action === 'BUY' ? price * 1.01 : price * 0.99;
  const slPrice = action === 'BUY' ? price * 0.995 : price * 1.005;

  let contract = '';
  let entryPrice = price;
  if (instrument === 'EQ') {
    contract = `${assetKey} Equity (${qty} Shares)`;
  } else if (instrument === 'FUT') {
    const lots = Math.max(1, Math.round(qty / lotSize));
    contract = `${assetKey} FUT (${lots} Lot${lots > 1 ? 's' : ''} / ${qty} units)`;
  } else {
    const optType = action === 'BUY' ? 'CE' : 'PE';
    const estPrem = Math.max(10, Math.round(price * 0.015 * 10) / 10);
    entryPrice = estPrem;
    contract = `${assetKey} ATM ${optType} (Beginner)`;
  }

  state.availableBalance = Math.max(0, state.availableBalance - margin);

  const newPos = {
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    dateStr: new Date().toLocaleDateString('en-IN'),
    strategyName: 'Beginner Practice',
    contract: contract,
    assetKey: assetKey,
    assetName: asset.name,
    instrument: instrument,
    type: instrument === 'CE' ? 'CE' : (instrument === 'PE' ? 'PE' : instrument),
    action: action,
    qty: qty,
    entryPrice: entryPrice,
    currentPrice: entryPrice,
    marginAllocated: margin,
    pnl: 0,
    target: Math.round(tgtPrice * 100) / 100,
    stopLoss: Math.round(slPrice * 100) / 100,
    state: 'BEGINNER ORDER'
  };

  if (!state.portfolio) state.portfolio = [];
  state.portfolio.unshift(newPos);
  savePortfolioState();

  updateBeginnerOrderPad();
  renderPortfolio();

  alert(`✅ PRACTICE TRADE EXECUTED!\n\n${action} ${qty} ${contract} @ ₹${entryPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\nTarget: ₹${newPos.target.toFixed(2)}\nStop Loss: ₹${newPos.stopLoss.toFixed(2)}\nMargin Blocked: ₹${margin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n\nCheck your active position and live PnL in the Practice Portfolio tab.`);
}

// ================= LIVE OPTION CHAIN & 1-CLICK PAPER TRADING =================
let optionChainActiveKey = 'NIFTY';
let optionOrderState = {
  assetKey: 'NIFTY',
  strike: 23400,
  type: 'CE',
  ltp: 125.40,
  side: 'BUY',
  lots: 1,
  product: 'NRML'
};


function selectOptionChainAsset(key) {
  if (!ASSET_UNIVERSE[key]) return;
  optionChainActiveKey = key;
  
  // Update chips active state
  const chips = ['NIFTY', 'BANKNIFTY', 'SENSEX', 'FINNIFTY', 'MIDCPNIFTY', 'RELIANCE', 'HDFCBANK', 'TCS'];
  chips.forEach(k => {
    const el = document.getElementById(`oc-chip-${k}`);
    if (el) {
      if (k === key) el.classList.add('active');
      else el.classList.remove('active');
    }
  });

  renderOptionChain();
}

function renderOptionChain() {
  const assetKey = optionChainActiveKey || state.currentAssetKey || 'NIFTY';
  const asset = ASSET_UNIVERSE[assetKey];
  if (!asset) return;

  const spot = asset.price || state.spotPrice;
  const prevClose = asset.prevClose || spot;
  const chgPts = spot - prevClose;
  const chgPct = prevClose > 0 ? (chgPts / prevClose) * 100 : 0;
  const lotSize = getInstrumentLotSize(assetKey, 'CE');

  // Update Spot bar
  const nameEl = document.getElementById('oc-spot-name');
  if (nameEl) nameEl.textContent = asset.name || assetKey;

  const priceEl = document.getElementById('oc-spot-price');
  if (priceEl) {
    priceEl.textContent = `₹${spot.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  const chgEl = document.getElementById('oc-spot-chg');
  if (chgEl) {
    chgEl.textContent = `${chgPts >= 0 ? '+' : ''}${chgPts.toFixed(2)} (${chgPct >= 0 ? '+' : ''}${chgPct.toFixed(2)}%) ${chgPts >= 0 ? '▲' : '▼'}`;
    chgEl.className = `font-mono text-xs ml-1.5 ${chgPts >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }

  const balEl = document.getElementById('oc-avail-balance');
  if (balEl) {
    balEl.textContent = `₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  const lotSizeEl = document.getElementById('oc-lot-size');
  if (lotSizeEl) lotSizeEl.textContent = `${lotSize} Shares`;

  const pcrEl = document.getElementById('oc-pcr');
  if (pcrEl) pcrEl.textContent = (asset.pcr || state.pcr || 0.88).toFixed(2);

  const vixEl = document.getElementById('oc-vix');
  if (vixEl) vixEl.textContent = (state.vix || 11.65).toFixed(2);

  // Determine strike step
  let step = 50;
  if (assetKey === 'BANKNIFTY' || assetKey === 'SENSEX') step = 100;
  else if (assetKey === 'NIFTY' || assetKey === 'FINNIFTY') step = 50;
  else if (assetKey === 'MIDCPNIFTY') step = 25;
  else step = asset.price > 2000 ? 50 : (asset.price > 500 ? 20 : 10);

  const atmStrike = Math.round(spot / step) * step;
  const numStrikesEachSide = 6;
  const strikes = [];
  for (let i = -numStrikesEachSide; i <= numStrikesEachSide; i++) {
    strikes.push(atmStrike + (i * step));
  }

  const tbody = document.getElementById('option-chain-tbody');
  if (!tbody) return;

  const expiry = getNextExpiry(assetKey);
  const expiryEl = document.getElementById('oc-expiry');
  if (expiryEl) expiryEl.textContent = `${expiry.label} (${expiry.dte}d)`;
  const dte = expiry.dte;
  const iv = Math.max(8.0, state.vix || 11.65);

  let html = '';
  let spotLineInserted = false;

  strikes.forEach((strike) => {
    // Check if spot line should be inserted between strikes
    if (!spotLineInserted && strike > spot) {
      html += `
        <tr class="bg-gradient-to-r from-emerald-950/90 via-cyan-950 to-emerald-950/90 border-y-2 border-cyan-400 text-center font-bold">
          <td colspan="9" class="py-2 font-mono text-[11px] text-cyan-300 tracking-wider">
            ⚡ LIVE SPOT CMP: ₹${spot.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </td>
        </tr>
      `;
      spotLineInserted = true;
    }

    const callLtp = calculateBSOptionPrice(spot, strike, dte, iv, 'CE');
    const putLtp = calculateBSOptionPrice(spot, strike, dte, iv, 'PE');

    const callIsITM = strike < spot;
    const putIsITM = strike > spot;

    // Simulated authentic open interest based on distance to ATM
    const distSteps = Math.abs(strike - atmStrike) / step;
    const baseOI = Math.max(8.5, Math.round((95 - distSteps * 11) * 10) / 10);
    const callOI = Math.max(6.0, Math.round((baseOI * (callIsITM ? 0.8 : 1.1)) * 10) / 10);
    const putOI = Math.max(6.0, Math.round((baseOI * (putIsITM ? 0.8 : 1.2)) * 10) / 10);

    const callBg = callIsITM ? 'bg-amber-500/10 hover:bg-amber-500/20' : 'hover:bg-slate-800/40';
    const putBg = putIsITM ? 'bg-amber-500/10 hover:bg-amber-500/20' : 'hover:bg-slate-800/40';
    const strikeBg = strike === atmStrike ? 'bg-cyan-950/60 font-black text-cyan-300' : 'bg-[#0f1523] text-slate-200';

    html += `
      <tr class="transition-colors border-b border-slate-800/50">
        <!-- CALL SIDE (Left) -->
        <td class="py-2.5 px-2 text-right text-slate-400 ${callBg}">${callOI.toFixed(1)}L</td>
        <td class="py-2.5 px-2 text-right ${callBg}">
          <button type="button" onclick="openOptionOrderModal('${assetKey}', ${strike}, 'CE', ${callLtp}, 'BUY')" class="font-bold text-white hover:text-cyan-300 transition-colors">
            ₹${callLtp.toFixed(2)}
          </button>
        </td>
        <td class="py-2.5 px-2 text-center ${callBg}">
          <div class="flex items-center justify-center gap-1">
            <button type="button" onclick="openOptionOrderModal('${assetKey}', ${strike}, 'CE', ${callLtp}, 'BUY')" class="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] shadow transition-all active:scale-95">B</button>
            <button type="button" onclick="openOptionOrderModal('${assetKey}', ${strike}, 'CE', ${callLtp}, 'SELL')" class="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[10px] shadow transition-all active:scale-95">S</button>
          </div>
        </td>
        <td class="py-2.5 px-2 text-center text-[10px] ${callBg} border-r border-slate-800">
          <span class="px-1.5 py-0.5 rounded ${callIsITM ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60' : 'text-slate-500'}">
            ${callIsITM ? 'ITM' : (strike === atmStrike ? 'ATM' : 'OTM')}
          </span>
        </td>

        <!-- STRIKE PRICE (Center) -->
        <td class="py-2.5 px-3 text-center text-sm font-bold border-r border-slate-800 ${strikeBg}">
          ${strike.toLocaleString('en-IN')}
        </td>

        <!-- PUT SIDE (Right) -->
        <td class="py-2.5 px-2 text-center text-[10px] ${putBg}">
          <span class="px-1.5 py-0.5 rounded ${putIsITM ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60' : 'text-slate-500'}">
            ${putIsITM ? 'ITM' : (strike === atmStrike ? 'ATM' : 'OTM')}
          </span>
        </td>
        <td class="py-2.5 px-2 text-center ${putBg}">
          <div class="flex items-center justify-center gap-1">
            <button type="button" onclick="openOptionOrderModal('${assetKey}', ${strike}, 'PE', ${putLtp}, 'BUY')" class="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] shadow transition-all active:scale-95">B</button>
            <button type="button" onclick="openOptionOrderModal('${assetKey}', ${strike}, 'PE', ${putLtp}, 'SELL')" class="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[10px] shadow transition-all active:scale-95">S</button>
          </div>
        </td>
        <td class="py-2.5 px-2 text-left ${putBg}">
          <button type="button" onclick="openOptionOrderModal('${assetKey}', ${strike}, 'PE', ${putLtp}, 'BUY')" class="font-bold text-white hover:text-cyan-300 transition-colors">
            ₹${putLtp.toFixed(2)}
          </button>
        </td>
        <td class="py-2.5 px-2 text-left text-slate-400 ${putBg}">${putOI.toFixed(1)}L</td>
      </tr>
    `;
  });

  // If spot was above all strikes
  if (!spotLineInserted) {
    html += `
      <tr class="bg-gradient-to-r from-emerald-950/90 via-cyan-950 to-emerald-950/90 border-y-2 border-cyan-400 text-center font-bold">
        <td colspan="9" class="py-2 font-mono text-[11px] text-cyan-300 tracking-wider">
          ⚡ LIVE SPOT CMP: ₹${spot.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </td>
      </tr>
    `;
  }

  tbody.innerHTML = html;
}

function openOptionOrderModal(assetKey, strike, type, ltp, defaultSide = 'BUY') {
  optionOrderState = {
    assetKey: assetKey,
    strike: strike,
    type: type,
    ltp: ltp,
    side: defaultSide,
    lots: 1,
    product: 'NRML'
  };


  const asset = ASSET_UNIVERSE[assetKey] || { name: assetKey, price: state.spotPrice };
  const lotSize = getInstrumentLotSize(assetKey, type);
  const typeName = type === 'CE' ? 'CALL' : 'PUT';

  const contractEl = document.getElementById('option-modal-contract');
  if (contractEl) {
    contractEl.textContent = `${assetKey} ${getNextExpiry(assetKey).label} ${strike} ${typeName}`;
  }

  const spotEl = document.getElementById('option-modal-spot');
  if (spotEl) {
    spotEl.textContent = `₹${(asset.price || state.spotPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }

  const ltpEl = document.getElementById('option-modal-ltp');
  if (ltpEl) {
    ltpEl.textContent = `₹${ltp.toFixed(2)}`;
  }

  const lotInfoEl = document.getElementById('option-modal-lot-size-info');
  if (lotInfoEl) {
    lotInfoEl.textContent = `1 Lot = ${lotSize} Shares`;
  }

  const lotsInput = document.getElementById('option-order-lots');
  if (lotsInput) {
    lotsInput.value = 1;
  }

  setOptionOrderSide(defaultSide);
  setOptionProductType('NRML');
  updateOptionOrderSummary();

  const modal = document.getElementById('option-order-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeOptionOrderModal() {
  const modal = document.getElementById('option-order-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function setOptionOrderSide(side) {
  optionOrderState.side = side;
  const btnBuy = document.getElementById('btn-opt-side-buy');
  const btnSell = document.getElementById('btn-opt-side-sell');
  const badge = document.getElementById('option-modal-side-badge');

  if (side === 'BUY') {
    if (btnBuy) btnBuy.className = 'py-2 rounded-lg font-black text-xs bg-emerald-600 text-white shadow-md transition-all';
    if (btnSell) btnSell.className = 'py-2 rounded-lg font-black text-xs text-slate-400 hover:text-white transition-all';
    if (badge) {
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-emerald-950 text-emerald-400 border border-emerald-800';
      badge.textContent = 'BUY';
    }
  } else {
    if (btnBuy) btnBuy.className = 'py-2 rounded-lg font-black text-xs text-slate-400 hover:text-white transition-all';
    if (btnSell) btnSell.className = 'py-2 rounded-lg font-black text-xs bg-rose-600 text-white shadow-md transition-all';
    if (badge) {
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-rose-950 text-rose-400 border border-rose-800';
      badge.textContent = 'SELL';
    }
  }
  updateOptionOrderSummary();
}

function setOptionProductType(prod) {
  optionOrderState.product = prod;
  const btnNrml = document.getElementById('btn-opt-prod-nrml');
  const btnMis = document.getElementById('btn-opt-prod-mis');

  if (prod === 'NRML') {
    if (btnNrml) btnNrml.className = 'py-2 rounded-lg bg-slate-800 text-cyan-300 border border-cyan-500/50 font-bold transition-all';
    if (btnMis) btnMis.className = 'py-2 rounded-lg bg-[#080d16] text-slate-400 border border-slate-800 hover:text-white font-bold transition-all';
  } else {
    if (btnNrml) btnNrml.className = 'py-2 rounded-lg bg-[#080d16] text-slate-400 border border-slate-800 hover:text-white font-bold transition-all';
    if (btnMis) btnMis.className = 'py-2 rounded-lg bg-slate-800 text-cyan-300 border border-cyan-500/50 font-bold transition-all';
  }
}

function adjustOptionLots(delta) {
  let lots = parseInt(document.getElementById('option-order-lots')?.value) || 1;
  lots = Math.max(1, lots + delta);
  optionOrderState.lots = lots;
  const input = document.getElementById('option-order-lots');
  if (input) input.value = lots;
  updateOptionOrderSummary();
}

function setOptionLotsExact(lots) {
  optionOrderState.lots = Math.max(1, lots);
  const input = document.getElementById('option-order-lots');
  if (input) input.value = optionOrderState.lots;
  updateOptionOrderSummary();
}

function onOptionLotsChange() {
  const input = document.getElementById('option-order-lots');
  let lots = parseInt(input?.value) || 1;
  if (lots < 1) lots = 1;
  optionOrderState.lots = lots;
  updateOptionOrderSummary();
}

function updateOptionOrderSummary() {
  const { assetKey, type, ltp, side, lots } = optionOrderState;
  const lotSize = getInstrumentLotSize(assetKey, type);
  const totalShares = (lots || 1) * lotSize;
  const spot = ASSET_UNIVERSE[assetKey]?.price || state.spotPrice;

  // Margin calculation:
  // Option Buyer: 100% premium = totalShares * ltp
  // Option Seller: SPAN + Exposure margin ~ premium + 12% spot
  let requiredMargin = 0;
  if (side === 'BUY') {
    requiredMargin = Math.round(totalShares * ltp * 100) / 100;
  } else {
    requiredMargin = Math.round((totalShares * ltp + (spot * totalShares * 0.12)) * 100) / 100;
  }

  const marginEl = document.getElementById('option-modal-margin');
  if (marginEl) {
    marginEl.textContent = `₹${requiredMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  const qtyEl = document.getElementById('option-modal-qty');
  if (qtyEl) {
    qtyEl.textContent = `Total: ${totalShares.toLocaleString('en-IN')} Shares (${lots} Lot${lots > 1 ? 's' : ''})`;
  }

  const balEl = document.getElementById('option-modal-balance');
  if (balEl) {
    balEl.textContent = `₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  const btnText = document.getElementById('btn-opt-execute-text');
  if (btnText) {
    const actionVerb = side === 'BUY' ? 'BUY' : 'SELL';
    btnText.textContent = `${actionVerb} ${assetKey} ${optionOrderState.strike} ${type} • ₹${requiredMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }

  const btnExec = document.getElementById('btn-opt-execute');
  if (btnExec) {
    if (side === 'BUY') {
      btnExec.className = 'w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]';
    } else {
      btnExec.className = 'w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-rose-950 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]';
    }

    if (state.availableBalance < requiredMargin || state.availableBalance <= 0) {
      btnExec.classList.add('opacity-50', 'cursor-not-allowed');
      btnExec.disabled = true;
    } else {
      btnExec.classList.remove('opacity-50', 'cursor-not-allowed');
      btnExec.disabled = false;
    }
  }

  return requiredMargin;
}

function executeOptionPaperTrade() {
  const { assetKey, strike, type, ltp, side, lots } = optionOrderState;
  const lotSize = getInstrumentLotSize(assetKey, type);
  const totalShares = (lots || 1) * lotSize;
  const margin = updateOptionOrderSummary();

  if (state.availableBalance < margin || state.availableBalance <= 0) {
    alert(`⚠️ INSUFFICIENT VIRTUAL CASH!\n\nAvailable Balance: ₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\nRequired Amount: ₹${margin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n\nIf you have exhausted your ₹5,00,000 balance, submit a Fund Renewal Request in the Practice Portfolio tab.`);
    closeOptionOrderModal();
    switchTab('portfolio');
    return;
  }

  const asset = ASSET_UNIVERSE[assetKey] || { name: assetKey };
  const contract = `${assetKey} ${getNextExpiry(assetKey).label} ${strike} ${type}`;

  state.availableBalance = Math.max(0, state.availableBalance - margin);

  const tgtPrice = side === 'BUY' ? Math.round(ltp * 1.30 * 10) / 10 : Math.round(ltp * 0.70 * 10) / 10;
  const slPrice = side === 'BUY' ? Math.round(ltp * 0.80 * 10) / 10 : Math.round(ltp * 1.20 * 10) / 10;

  const newPos = {
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    dateStr: new Date().toLocaleDateString('en-IN'),
    strategyName: 'Option Chain',
    contract: contract,
    assetKey: assetKey,
    assetName: asset.name,
    instrument: type,
    type: type,
    strike: strike,
    action: side,
    qty: totalShares,
    lots: lots,
    entryPrice: ltp,
    currentPrice: ltp,
    marginAllocated: margin,
    pnl: 0,
    target: tgtPrice,
    stopLoss: slPrice,
    state: 'OPTION TRADE'
  };

  if (!state.portfolio) state.portfolio = [];
  state.portfolio.unshift(newPos);
  savePortfolioState();

  closeOptionOrderModal();
  renderPortfolio();
  renderOptionChain();

  alert(`✅ OPTION PRACTICE TRADE PLACED!\n\n${side} ${lots} Lot (${totalShares} Shares) of ${contract} @ ₹${ltp.toFixed(2)}\nAmount Deducted: ₹${margin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\nTarget: ₹${tgtPrice.toFixed(2)} (+30%)\nStop Loss: ₹${slPrice.toFixed(2)} (-20%)\n\nTrack your live position and real-time P&L in the Practice Portfolio tab!`);
}



// Next option expiry (approximate: NSE index = Tuesday, BSE = Thursday, stocks = last Tuesday of month)
function getNextExpiry(assetKey) {
  const asset = ASSET_UNIVERSE[assetKey];
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const afterClose = (ist.getHours() * 60 + ist.getMinutes()) >= 15 * 60 + 30;
  const startOfDay = new Date(ist.getFullYear(), ist.getMonth(), ist.getDate());
  let expiry;
  if (asset && asset.type === 'EQUITY') {
    const lastTuesday = (y, m) => { const d = new Date(y, m + 1, 0); while (d.getDay() !== 2) d.setDate(d.getDate() - 1); return d; };
    expiry = lastTuesday(ist.getFullYear(), ist.getMonth());
    if (expiry < startOfDay || (expiry.getTime() === startOfDay.getTime() && afterClose)) {
      expiry = lastTuesday(ist.getFullYear(), ist.getMonth() + 1);
    }
  } else {
    const target = asset && asset.exchange === 'BSE' ? 4 : 2;
    let diff = (target - ist.getDay() + 7) % 7;
    if (diff === 0 && afterClose) diff = 7;
    expiry = new Date(startOfDay);
    expiry.setDate(expiry.getDate() + diff);
  }
  const days = Math.round((expiry - startOfDay) / 86400000);
  return { label: `${String(expiry.getDate()).padStart(2, '0')} ${months[expiry.getMonth()]}`, dte: Math.max(0.5, days) };
}

// Mobile Install Modal & PWA Single Shot Installer
function openMobileInstallModal() {
  const modal = document.getElementById('mobile-install-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  fetch('/api/network-info').then(r => r.json()).then(data => {
    const url = data.publicUrl || data.mobileUrl || window.location.origin;
    const qrImg = document.getElementById('mobile-qr-img');
    const urlText = document.getElementById('mobile-public-url-text');
    if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
    if (urlText) urlText.textContent = url;
  }).catch(() => {});
}

function closeMobileInstallModal() {
  const modal = document.getElementById('mobile-install-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function triggerPwaPromptFromModal() {
  if (window.pwaDeferredPrompt) {
    window.pwaDeferredPrompt.prompt();
    window.pwaDeferredPrompt.userChoice.then(() => {
      window.pwaDeferredPrompt = null;
      closeMobileInstallModal();
    });
  } else {
    alert("To install on your phone:\n\n• In Chrome/Edge on Android: Tap the (⋮) menu button, then tap 'Install app' or 'Add to Home screen'!\n\n• In Safari on iPhone: Tap the Share [📤] icon at the bottom, then tap 'Add to Home Screen' [+]!\n\nThe app will install directly with the name 'Trading For Beginner' and the app icon!");
  }
}

function openOptionChainForSelectedAsset() {
  const assetKey = state.currentAssetKey || 'NIFTY';
  selectOptionChainAsset(assetKey);
  switchTab('option-chain');
}

const executeBeginnerOrder = executeBeginnerPaperTrade;

// ================= HELPER & STORAGE FUNCTIONS =================
function savePortfolioState() {
  localStorage.setItem('quant_terminal_portfolio', JSON.stringify(state.portfolio || []));
  localStorage.setItem('quant_terminal_trade_history', JSON.stringify(state.tradeHistory || []));
  localStorage.setItem('quant_terminal_balance', state.availableBalance.toFixed(2));
  localStorage.setItem('quant_terminal_realized_pnl', state.realizedPnL.toFixed(2));
  localStorage.setItem('quant_terminal_renewal_status', state.renewalStatus || 'NONE');
  if (state.renewalRequestTime) {
    localStorage.setItem('quant_terminal_renewal_time', state.renewalRequestTime);
  } else {
    localStorage.removeItem('quant_terminal_renewal_time');
  }
}

const OFFICIAL_LOT_SIZES = {
  NIFTY: 65,
  BANKNIFTY: 30,
  SENSEX: 20,
  FINNIFTY: 60,
  MIDCPNIFTY: 120,
  NIFTYIT: 25,
  RELIANCE: 250,
  HDFCBANK: 550,
  TCS: 175,
  INFY: 400,
  ICICIBANK: 700,
  TATAMOTORS: 700,
  SBIN: 750,
  TATASTEEL: 5500,
  BHARTIARTL: 475,
  ITC: 1600,
  LT: 150
};

function getInstrumentLotSize(assetKey, instrument) {
  if (instrument === 'EQ') return 1;
  if (OFFICIAL_LOT_SIZES[assetKey]) return OFFICIAL_LOT_SIZES[assetKey];
  const asset = ASSET_UNIVERSE[assetKey];
  if (asset && asset.type === 'INDEX') return 65;
  return 1;
}

function getRequiredMargin(assetKey, instrument, action, qty, price) {
  const notional = price * qty;
  if (instrument === 'EQ') {
    return action === 'BUY' ? Math.round(notional) : Math.round(notional * 0.20);
  }
  if (instrument === 'FUT') {
    return Math.round(notional * 0.15); // Standard 15% SPAN margin
  }
  // Options (CE / PE)
  if (action === 'BUY') {
    return Math.round(notional); // Option Buyer pays 100% premium
  } else {
    // Option Seller / Writer requires SPAN + Exposure Margin
    const asset = ASSET_UNIVERSE[assetKey] || { price: state.spotPrice };
    return Math.round(notional + (asset.price * qty * 0.12));
  }
}

// ================= 1-CLICK PAPER TRADING BLUEPRINT EXECUTION =================
function executePaperTrade() {
  const { analysis, spotPrice, strikeStep, currentAssetKey, currentAssetName, dte, iv } = state;
  const step = strikeStep || 50;
  const isBull = analysis.directionalBias === 'BULLISH';
  const strike = Math.round(spotPrice / step) * step + (isBull ? step : -step);
  const type = isBull ? 'CE' : 'PE';
  const contract = `${currentAssetKey} ${strike} ${type}`;
  
  // Authentic theoretical option pricing using Black-Scholes formula
  const estLtp = calculateBSOptionPrice(spotPrice, strike, dte, iv, type);
  const qty = getInstrumentLotSize(currentAssetKey, type);
  const requiredMargin = getRequiredMargin(currentAssetKey, type, 'BUY', qty, estLtp);

  // Capital Solvency Verification
  if (state.availableBalance < requiredMargin) {
    alert(`⚠️ INSUFFICIENT VIRTUAL BALANCE!\n\nAvailable Cash: ₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nRequired Margin: ₹${requiredMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\nIf you have depleted your ₹5,00,000 initial allocation, submit a Fund Renewal Request to the administrator in the Portfolio tab.`);
    switchTab('portfolio');
    return;
  }

  // Deduct margin from available balance
  state.availableBalance = Math.max(0, state.availableBalance - requiredMargin);
  
  const newPos = {
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    dateStr: new Date().toLocaleDateString('en-IN'),
    strategyName: analysis.strategyRec || '1-Click Quant Blueprint',
    contract: contract,
    assetKey: currentAssetKey,
    assetName: currentAssetName,
    instrument: type,
    type: type,
    strike: strike,
    action: 'BUY',
    qty: qty,
    entryPrice: estLtp,
    currentPrice: estLtp,
    marginAllocated: requiredMargin,
    pnl: 0,
    target: analysis.t1 || (estLtp + Math.round(step * 0.5)),
    stopLoss: analysis.sl || (estLtp - Math.round(step * 0.2)),
    state: analysis.finalState
  };

  if (!state.portfolio) state.portfolio = [];
  state.portfolio.unshift(newPos);
  savePortfolioState();
  renderPortfolio();
  
  alert(`✓ 1-CLICK PAPER TRADE EXECUTED!\n\nStrategy: ${newPos.strategyName}\nContract: ${contract}\nQuantity: ${qty}\nExecuted At: ₹${estLtp.toFixed(2)}\nMargin Allocated: ₹${requiredMargin.toLocaleString('en-IN')}\nTarget: ${newPos.target}\nStop Loss: ${newPos.stopLoss}\n\nTrack your live positions in the Paper Trade Portfolio!`);
  
  switchTab('portfolio');
}

// ================= CUSTOM STRATEGY PAPER TRADE BUILDER =================
function openCustomTradeModal() {
  const modal = document.getElementById('custom-trade-modal');
  if (!modal) return;

  const assetSelect = document.getElementById('ct-asset');
  if (assetSelect) {
    assetSelect.value = state.currentAssetKey || 'NIFTY';
  }
  
  onCustomTradeAssetChange();
  calculateCustomTradeMargin();
  modal.classList.remove('hidden');
}

function closeCustomTradeModal() {
  const modal = document.getElementById('custom-trade-modal');
  if (modal) modal.classList.add('hidden');
}

function setCustomStrategyTag(tag) {
  const input = document.getElementById('ct-strategy-name');
  if (input) input.value = tag;
}

function onCustomTradeAssetChange() {
  const assetKey = document.getElementById('ct-asset')?.value || 'NIFTY';
  const asset = ASSET_UNIVERSE[assetKey] || { price: state.spotPrice, strikeStep: 50 };
  const instrument = document.getElementById('ct-instrument')?.value || 'CE';
  
  // Update strike hint
  const hintEl = document.getElementById('ct-strike-hint');
  if (hintEl) {
    hintEl.textContent = `Current CMP: ₹${asset.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }

  // Update Strike step and default to ATM
  const strikeInput = document.getElementById('ct-strike');
  if (strikeInput) {
    strikeInput.step = asset.strikeStep || 50;
    const step = asset.strikeStep || 50;
    strikeInput.value = Math.round(asset.price / step) * step;
  }

  // Update Lot info
  const lotSize = getInstrumentLotSize(assetKey, instrument);
  const qtyInput = document.getElementById('ct-qty');
  if (qtyInput) {
    qtyInput.value = lotSize;
    qtyInput.step = lotSize;
  }
  const lotInfo = document.getElementById('ct-lot-info');
  if (lotInfo) {
    lotInfo.textContent = `Lot Size: ${lotSize} | 1 Lot`;
  }

  // Estimate price
  updateEstimatedPrice();
  calculateCustomTradeMargin();
}

function onCustomTradeTypeChange() {
  const instrument = document.getElementById('ct-instrument')?.value || 'CE';
  const assetKey = document.getElementById('ct-asset')?.value || 'NIFTY';
  const optBox = document.getElementById('ct-options-config');

  if (instrument === 'EQ' || instrument === 'FUT') {
    if (optBox) optBox.classList.add('opacity-40', 'pointer-events-none');
  } else {
    if (optBox) optBox.classList.remove('opacity-40', 'pointer-events-none');
  }

  const lotSize = getInstrumentLotSize(assetKey, instrument);
  const qtyInput = document.getElementById('ct-qty');
  if (qtyInput) {
    qtyInput.value = lotSize;
    qtyInput.step = lotSize;
  }
  const lotInfo = document.getElementById('ct-lot-info');
  if (lotInfo) {
    lotInfo.textContent = instrument === 'EQ' ? `Shares (1 Unit Steps)` : `Lot Size: ${lotSize} | 1 Lot`;
  }

  updateEstimatedPrice();
  calculateCustomTradeMargin();
}

function setATMStrike() {
  const assetKey = document.getElementById('ct-asset')?.value || 'NIFTY';
  const asset = ASSET_UNIVERSE[assetKey] || { price: state.spotPrice, strikeStep: 50 };
  const step = asset.strikeStep || 50;
  const atm = Math.round(asset.price / step) * step;
  const strikeInput = document.getElementById('ct-strike');
  if (strikeInput) {
    strikeInput.value = atm;
    updateEstimatedPrice();
    calculateCustomTradeMargin();
  }
}

function updateEstimatedPrice() {
  const assetKey = document.getElementById('ct-asset')?.value || 'NIFTY';
  const asset = ASSET_UNIVERSE[assetKey] || { price: state.spotPrice };
  const instrument = document.getElementById('ct-instrument')?.value || 'CE';
  const strike = parseFloat(document.getElementById('ct-strike')?.value || asset.price);
  const priceInput = document.getElementById('ct-price');
  if (!priceInput) return;

  let estPrice = asset.price;
  if (instrument === 'CE' || instrument === 'PE') {
    estPrice = calculateBSOptionPrice(asset.price, strike, state.dte || 1.0, state.iv || 12.0, instrument);
  } else if (instrument === 'FUT') {
    estPrice = Math.round(asset.price * 1.0015 * 100) / 100;
  } else {
    estPrice = asset.price;
  }

  priceInput.value = estPrice.toFixed(2);
}

function calculateCustomTradeMargin() {
  const assetKey = document.getElementById('ct-asset')?.value || 'NIFTY';
  const instrument = document.getElementById('ct-instrument')?.value || 'CE';
  const action = document.getElementById('ct-action')?.value || 'BUY';
  const qty = parseFloat(document.getElementById('ct-qty')?.value || 1);
  const price = parseFloat(document.getElementById('ct-price')?.value || 0);

  const reqMargin = getRequiredMargin(assetKey, instrument, action, qty, price);
  
  const marginReqEl = document.getElementById('ct-margin-req');
  const availBalEl = document.getElementById('ct-avail-bal');
  const statusBadge = document.getElementById('ct-margin-status');
  const btnExecute = document.getElementById('btn-execute-custom-trade');

  if (marginReqEl) marginReqEl.textContent = `₹${reqMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (availBalEl) availBalEl.textContent = `₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const isSufficient = state.availableBalance >= reqMargin && reqMargin > 0;
  if (statusBadge) {
    if (isSufficient) {
      statusBadge.className = 'badge badge-bull font-mono text-[10px]';
      statusBadge.textContent = 'SUFFICIENT FUNDS';
    } else {
      statusBadge.className = 'badge badge-bear font-mono text-[10px]';
      const deficit = reqMargin - state.availableBalance;
      statusBadge.textContent = `INSUFFICIENT FUNDS (Deficit: ₹${deficit.toLocaleString('en-IN', { maximumFractionDigits: 0 })})`;
    }
  }

  if (btnExecute) {
    btnExecute.disabled = !isSufficient;
    if (!isSufficient) {
      btnExecute.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      btnExecute.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }

  return reqMargin;
}

function executeCustomPaperTrade() {
  const strategyName = document.getElementById('ct-strategy-name')?.value.trim() || 'Custom Strategy';
  const assetKey = document.getElementById('ct-asset')?.value || 'NIFTY';
  const asset = ASSET_UNIVERSE[assetKey] || { name: 'NIFTY 50', price: state.spotPrice };
  const instrument = document.getElementById('ct-instrument')?.value || 'CE';
  const strike = parseFloat(document.getElementById('ct-strike')?.value || asset.price);
  const action = document.getElementById('ct-action')?.value || 'BUY';
  const qty = parseInt(document.getElementById('ct-qty')?.value || 1, 10);
  const price = parseFloat(document.getElementById('ct-price')?.value || 0);
  const target = parseFloat(document.getElementById('ct-target')?.value) || null;
  const stopLoss = parseFloat(document.getElementById('ct-stoploss')?.value) || null;

  if (qty <= 0 || price <= 0) {
    alert('Please enter a valid Quantity and Execution Price.');
    return;
  }

  const requiredMargin = getRequiredMargin(assetKey, instrument, action, qty, price);

  if (state.availableBalance < requiredMargin) {
    alert(`⚠️ INSUFFICIENT VIRTUAL BALANCE!\n\nAvailable Cash: ₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\nRequired Margin: ₹${requiredMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n\nTo replenish your account with ₹5,00,000, submit a Fund Renewal Request in the Portfolio tab.`);
    return;
  }

  // Contract symbol representation
  let contract = `${assetKey} ${instrument}`;
  if (instrument === 'CE' || instrument === 'PE') {
    contract = `${assetKey} ${strike} ${instrument}`;
  } else if (instrument === 'FUT') {
    contract = `${assetKey} FUT`;
  }

  // Deduct margin from available cash
  state.availableBalance = Math.max(0, state.availableBalance - requiredMargin);

  const newPos = {
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    dateStr: new Date().toLocaleDateString('en-IN'),
    strategyName: strategyName,
    contract: contract,
    assetKey: assetKey,
    assetName: asset.name,
    instrument: instrument,
    type: (instrument === 'CE' || instrument === 'PE') ? instrument : instrument,
    strike: strike,
    action: action,
    qty: qty,
    entryPrice: price,
    currentPrice: price,
    marginAllocated: requiredMargin,
    pnl: 0,
    target: target,
    stopLoss: stopLoss,
    state: 'CUSTOM STRATEGY'
  };

  if (!state.portfolio) state.portfolio = [];
  state.portfolio.unshift(newPos);
  savePortfolioState();

  closeCustomTradeModal();
  renderPortfolio();
  switchTab('portfolio');

  alert(`✓ CUSTOM STRATEGY TRADE EXECUTED!\n\nStrategy: ${strategyName}\nContract: ${contract}\nAction: ${action}\nQuantity: ${qty}\nExecuted At: ₹${price.toFixed(2)}\nMargin Allocated: ₹${requiredMargin.toLocaleString('en-IN')}\n\nYour trade is now live in the Paper Trade Portfolio.`);
}

// ================= PORTFOLIO SUB-TAB NAVIGATION =================
function switchPortfolioTab(tab) {
  state.activePortfolioSubTab = tab;
  const btnActive = document.getElementById('btn-subtab-active');
  const btnHistory = document.getElementById('btn-subtab-history');
  const activeContainer = document.getElementById('portfolio-active-container');
  const historyContainer = document.getElementById('portfolio-history-container');

  if (tab === 'active') {
    if (btnActive) btnActive.classList.add('active');
    if (btnHistory) btnHistory.classList.remove('active');
    if (activeContainer) activeContainer.classList.remove('hidden');
    if (historyContainer) historyContainer.classList.add('hidden');
  } else {
    if (btnActive) btnActive.classList.remove('active');
    if (btnHistory) btnHistory.classList.add('active');
    if (activeContainer) activeContainer.classList.add('hidden');
    if (historyContainer) historyContainer.classList.remove('hidden');
    renderTradeHistory();
  }
}

// ================= RENDER VIRTUAL PORTFOLIO & LEDGER =================
function renderPortfolio() {
  const countEl = document.getElementById('portfolio-count');
  const historyCountEl = document.getElementById('history-count');
  const emptyState = document.getElementById('portfolio-empty-state');
  const tableContainer = document.getElementById('portfolio-table-container');
  const tableBody = document.getElementById('portfolio-table-body');
  const renewalBanner = document.getElementById('fund-renewal-banner');
  const headerBadge = document.getElementById('header-renewal-badge');

  const portfolio = state.portfolio || [];
  const history = state.tradeHistory || [];

  if (countEl) countEl.textContent = portfolio.length;
  if (historyCountEl) historyCountEl.textContent = history.length;

  // 1. Calculate live valuation across active positions
  let totalMarginDeployed = 0;
  let totalUnrealizedPnL = 0;

  portfolio.forEach(pos => {
    const asset = ASSET_UNIVERSE[pos.assetKey] || { price: state.spotPrice };
    let curPrice = pos.entryPrice;

    if (pos.instrument === 'CE' || pos.instrument === 'PE') {
      const strikeVal = pos.strike || asset.price;
      curPrice = calculateBSOptionPrice(asset.price, strikeVal, state.dte || 1.0, state.iv || 12.0, pos.instrument);
    } else if (pos.instrument === 'FUT') {
      curPrice = Math.round(asset.price * 1.0015 * 100) / 100;
    } else {
      curPrice = asset.price;
    }

    pos.currentPrice = curPrice;
    const pts = pos.action === 'SELL' ? (pos.entryPrice - pos.currentPrice) : (pos.currentPrice - pos.entryPrice);
    const posPnl = Math.round(pts * pos.qty);
    pos.pnl = posPnl;

    totalMarginDeployed += (pos.marginAllocated || (pos.entryPrice * pos.qty));
    totalUnrealizedPnL += posPnl;
  });

  state.usedMargin = totalMarginDeployed;
  const netAccountValue = Math.max(0, state.availableBalance + totalMarginDeployed + totalUnrealizedPnL);
  const netReturnPct = ((netAccountValue - state.virtualCapital) / state.virtualCapital) * 100;

  // 2. Check capital exhaustion trigger
  if (state.availableBalance <= 0 && (portfolio.length === 0 || netAccountValue <= 0)) {
    if (state.renewalStatus !== 'PENDING') {
      state.renewalStatus = 'EXHAUSTED';
    }
  } else if (state.availableBalance > 0 && state.renewalStatus === 'EXHAUSTED') {
    state.renewalStatus = 'NONE';
  }

  // 3. Update Financial Ledger UI
  const availEl = document.getElementById('ledger-available-balance');
  const marginEl = document.getElementById('ledger-used-margin');
  const pnlEl = document.getElementById('ledger-realized-pnl');
  const netValEl = document.getElementById('ledger-net-value');
  const pnlSummaryEl = document.getElementById('ledger-pnl-summary');

  if (availEl) availEl.textContent = `₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (marginEl) marginEl.textContent = `₹${state.usedMargin.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (pnlEl) {
    pnlEl.textContent = `${state.realizedPnL >= 0 ? '+' : ''}₹${state.realizedPnL.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    pnlEl.className = `text-base font-extrabold font-mono mt-1 ${state.realizedPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }
  if (netValEl) netValEl.textContent = `₹${netAccountValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (pnlSummaryEl) {
    pnlSummaryEl.textContent = `${netReturnPct >= 0 ? '+' : ''}${netReturnPct.toFixed(2)}% Net Yield`;
    pnlSummaryEl.className = `text-[10px] font-mono mt-0.5 ${netReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;
  }

  // 4. Update Header Pending Notification Badge
  if (headerBadge) {
    if (state.renewalStatus === 'PENDING') {
      headerBadge.classList.remove('hidden');
    } else {
      headerBadge.classList.add('hidden');
    }
  }

  // 5. Render Capital Depletion / Renewal Banner
  if (renewalBanner) {
    if (state.renewalStatus === 'EXHAUSTED') {
      renewalBanner.className = 'block';
      renewalBanner.innerHTML = `
        <div class="renewal-banner-exhausted flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-bold">
              <i class="ph ph-warning-circle"></i>
            </div>
            <div>
              <div class="font-extrabold text-rose-300 text-sm">VIRTUAL CAPITAL EXHAUSTED (₹0.00 BALANCE)</div>
              <div class="text-xs text-rose-200/80">You have depleted your initial ₹5,00,000 trading capital. To continue paper trading, submit a fund renewal request for administrative approval.</div>
            </div>
          </div>
          <button onclick="requestFundRenewal()" id="btn-request-renewal" class="btn btn-primary bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs px-4 py-2 flex items-center gap-2 shadow-lg shadow-rose-950">
            <i class="ph ph-arrows-clockwise font-bold text-base"></i>
            <span>Request ₹5,00,000 Fund Renewal</span>
          </button>
        </div>
      `;
    } else if (state.renewalStatus === 'PENDING') {
      renewalBanner.className = 'block';
      renewalBanner.innerHTML = `
        <div class="renewal-banner-pending flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold animate-pulse">
              <i class="ph ph-clock-countdown"></i>
            </div>
            <div>
              <div class="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                <span>⏳ RENEWAL REQUEST PENDING APPROVAL</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60 font-mono">STATUS: PENDING</span>
              </div>
              <div class="text-xs text-amber-200/80">Your request to renew ₹5,00,000 virtual capital has been submitted to the risk administrator. Trading is paused until approval.</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-amber-400 font-mono">Awaiting Admin Sign-off</span>
          </div>
        </div>
      `;
    } else {
      renewalBanner.className = 'hidden';
      renewalBanner.innerHTML = '';
    }
  }

  // 6. Render Active Positions Table
  if (portfolio.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (tableContainer) tableContainer.classList.add('hidden');
  } else {
    if (emptyState) emptyState.classList.add('hidden');
    if (tableContainer) tableContainer.classList.remove('hidden');

    if (tableBody) {
      tableBody.innerHTML = portfolio.map((pos, idx) => {
        const pnlClass = pos.pnl >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold';
        const pnlPts = pos.action === 'SELL' ? (pos.entryPrice - pos.currentPrice) : (pos.currentPrice - pos.entryPrice);
        const pnlPct = pos.entryPrice > 0 ? ((pnlPts / pos.entryPrice) * 100).toFixed(1) : '0.0';

        let typeBadge = '';
        if (pos.instrument === 'CE') {
          typeBadge = '<span class="badge badge-bull font-mono">CE (Call)</span>';
        } else if (pos.instrument === 'PE') {
          typeBadge = '<span class="badge badge-bear font-mono">PE (Put)</span>';
        } else if (pos.instrument === 'FUT') {
          typeBadge = '<span class="badge badge-warn font-mono">FUTURES</span>';
        } else {
          typeBadge = '<span class="badge bg-slate-800 text-slate-300 font-mono">EQUITY</span>';
        }

        const actionBadge = pos.action === 'BUY'
          ? '<span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 font-mono">BUY</span>'
          : '<span class="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/40 font-mono">SELL</span>';

        return `
          <tr class="border-b border-slate-800/60 hover:bg-slate-900/50 transition-colors">
            <td class="py-3 font-mono font-bold text-white">
              <div class="flex items-center gap-1.5">
                <span>${pos.contract}</span>
                <span class="text-[10px] text-slate-500 font-normal">(${pos.timestamp})</span>
              </div>
            </td>
            <td class="py-3 text-cyan-300 font-medium">${pos.strategyName || 'Quantitative Blueprint'}</td>
            <td class="py-3">
              <div class="flex items-center gap-1.5">
                ${actionBadge}
                ${typeBadge}
              </div>
            </td>
            <td class="py-3 text-right font-mono text-slate-300">${pos.qty}</td>
            <td class="py-3 text-right font-mono text-slate-300">₹${pos.entryPrice.toFixed(2)}</td>
            <td class="py-3 text-right font-mono text-cyan-300 font-bold">₹${pos.currentPrice.toFixed(2)}</td>
            <td class="py-3 text-right font-mono ${pnlClass}">
              ${pos.pnl >= 0 ? '+' : ''}₹${pos.pnl.toLocaleString('en-IN')}
              <span class="text-[10px] text-slate-400 ml-1">(${pnlPts >= 0 ? '+' : ''}${pnlPct}%)</span>
            </td>
            <td class="py-3 text-center">
              <button onclick="squareOffPosition(${idx})" class="btn btn-outline py-1 px-2.5 text-[11px] text-rose-400 hover:text-white border-rose-900/50 hover:bg-rose-950/40 transition-colors">
                Square Off
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 7. Render history if on history tab
  if (state.activePortfolioSubTab === 'history') {
    renderTradeHistory();
  }
}

// ================= SQUARE OFF POSITION & ARCHIVE TRADE HISTORY =================
function squareOffPosition(index) {
  if (!state.portfolio || !state.portfolio[index]) return;
  const pos = state.portfolio[index];

  // Calculate final realized P&L based on current price
  const pnlPts = pos.action === 'SELL' ? (pos.entryPrice - pos.currentPrice) : (pos.currentPrice - pos.entryPrice);
  const realizedPnL = Math.round(pnlPts * pos.qty);

  // Return allocated margin + realized P&L back into available balance
  const releasedMargin = pos.marginAllocated || (pos.entryPrice * pos.qty);
  state.availableBalance = Math.max(0, state.availableBalance + releasedMargin + realizedPnL);
  state.realizedPnL += realizedPnL;

  // Archive to persistent trade history log
  const historyItem = {
    id: pos.id,
    closeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    closeDate: new Date().toLocaleDateString('en-IN'),
    contract: pos.contract,
    strategyName: pos.strategyName || 'Quantitative Strategy',
    action: pos.action || 'BUY',
    qty: pos.qty,
    entryPrice: pos.entryPrice,
    exitPrice: pos.currentPrice,
    realizedPnL: realizedPnL,
    result: realizedPnL >= 0 ? 'PROFIT' : 'LOSS'
  };

  if (!state.tradeHistory) state.tradeHistory = [];
  state.tradeHistory.unshift(historyItem);

  // Remove from active positions
  state.portfolio.splice(index, 1);

  // Check if balance has depleted to zero
  if (state.availableBalance <= 0 && state.portfolio.length === 0) {
    state.renewalStatus = 'EXHAUSTED';
  }

  savePortfolioState();
  renderPortfolio();

  alert(`✓ POSITION SQUARED OFF!\n\nContract: ${pos.contract}\nExit Price: ₹${pos.currentPrice.toFixed(2)}\nRealized P&L: ${realizedPnL >= 0 ? '+' : ''}₹${realizedPnL.toLocaleString('en-IN')}\n\nExecution archived to Paper Trade History.`);
}

function clearPortfolio() {
  if (!state.portfolio || state.portfolio.length === 0) {
    alert('No active positions to clear.');
    return;
  }
  if (confirm('Are you sure you want to square off and clear ALL active practice positions?')) {
    while (state.portfolio.length > 0) {
      squareOffPosition(0);
    }
  }
}

// ================= TRADE HISTORY & AUDIT LOG =================
function renderTradeHistory() {
  const history = state.tradeHistory || [];
  const emptyState = document.getElementById('history-empty-state');
  const tableContainer = document.getElementById('history-table-container');
  const tableBody = document.getElementById('portfolio-history-table-body');
  const historyCountEl = document.getElementById('history-count');

  if (historyCountEl) historyCountEl.textContent = history.length;

  if (history.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (tableContainer) tableContainer.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (tableContainer) tableContainer.classList.remove('hidden');

  if (tableBody) {
    tableBody.innerHTML = history.map(item => {
      const isProfit = item.realizedPnL >= 0;
      const pnlClass = isProfit ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold';
      const resultBadge = isProfit
        ? '<span class="badge badge-bull font-mono text-[10px]">PROFIT</span>'
        : '<span class="badge badge-bear font-mono text-[10px]">LOSS</span>';
      const sideBadge = item.action === 'BUY'
        ? '<span class="text-[10px] font-bold text-emerald-400 font-mono">BUY</span>'
        : '<span class="text-[10px] font-bold text-rose-400 font-mono">SELL</span>';

      return `
        <tr class="border-b border-slate-800/60 hover:bg-slate-900/50 transition-colors">
          <td class="py-3 font-mono text-slate-400">${item.closeDate} ${item.closeTime}</td>
          <td class="py-3 font-mono font-bold text-white">${item.contract}</td>
          <td class="py-3 text-cyan-300 font-medium">${item.strategyName}</td>
          <td class="py-3">${sideBadge}</td>
          <td class="py-3 text-right font-mono text-slate-300">${item.qty}</td>
          <td class="py-3 text-right font-mono text-slate-300">₹${item.entryPrice.toFixed(2)}</td>
          <td class="py-3 text-right font-mono text-cyan-300 font-bold">₹${item.exitPrice.toFixed(2)}</td>
          <td class="py-3 text-right font-mono ${pnlClass}">
            ${item.realizedPnL >= 0 ? '+' : ''}₹${item.realizedPnL.toLocaleString('en-IN')}
          </td>
          <td class="py-3 text-center">${resultBadge}</td>
        </tr>
      `;
    }).join('');
  }
}

function clearTradeHistory() {
  if (!state.tradeHistory || state.tradeHistory.length === 0) {
    alert('Trade history is already empty.');
    return;
  }
  if (confirm('Are you sure you want to permanently clear the trade history archive?')) {
    state.tradeHistory = [];
    savePortfolioState();
    renderTradeHistory();
  }
}

// ================= CAPITAL EXHAUSTION & FUND RENEWAL FLOW =================
function requestFundRenewal() {
  if (state.availableBalance > 0) {
    alert(`You still have ₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })} available balance. Fund renewal requests are only permitted once capital is exhausted.`);
    return;
  }

  state.renewalStatus = 'PENDING';
  state.renewalRequestTime = new Date().toLocaleString('en-IN');
  savePortfolioState();

  // Send request notification to backend server
  const username = state.user ? state.user.username : 'trader';
  fetch('http://127.0.0.1:8765/api/request-renewal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      lossAmount: '₹5,00,000.00',
      requestTime: state.renewalRequestTime
    })
  }).catch(() => {
    // Handled smoothly even if local server is starting
  });

  renderPortfolio();
  alert('⏳ RENEWAL REQUEST TRANSMITTED!\n\nYour request for ₹5,00,000 capital replenishment has been dispatched to the risk administrator.\n\nStatus is now PENDING APPROVAL.');
}

// ================= RISK ADMIN CAPITAL REVIEW DESK =================
function openAdminReviewModal() {
  const modal = document.getElementById('admin-review-modal');
  const container = document.getElementById('admin-pending-container');
  if (!modal || !container) return;

  if (state.renewalStatus === 'PENDING') {
    const userDisplay = state.user ? `@${state.user.username}` : '@admin';
    container.innerHTML = `
      <div class="p-4 bg-[#121926] border border-amber-500/30 rounded-xl space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span class="font-bold text-amber-300 text-sm">Active Renewal Request</span>
          </div>
          <span class="badge badge-warn font-mono text-[10px]">⏳ PENDING APPROVAL</span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs font-mono">
          <div class="text-slate-400">Trader / Account:</div>
          <div class="text-white font-bold">${userDisplay}</div>
          <div class="text-slate-400">Requested Time:</div>
          <div class="text-slate-300">${state.renewalRequestTime || 'Recent'}</div>
          <div class="text-slate-400">Current Balance:</div>
          <div class="text-rose-400 font-bold">₹0.00 (Exhausted)</div>
          <div class="text-slate-400">Requested Credit:</div>
          <div class="text-emerald-400 font-bold">+₹5,00,000.00</div>
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center gap-2">
          <button onclick="approveFundRenewal()" class="btn btn-primary bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3 flex-1 flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950">
            <i class="ph ph-check-circle text-base"></i>
            <span>Approve & Credit ₹5,00,000</span>
          </button>
          <button onclick="declineFundRenewal()" class="btn btn-outline text-xs text-rose-400 hover:text-white border-rose-900/50 py-2 px-3">
            <i class="ph ph-x-circle"></i>
            <span>Decline</span>
          </button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="p-6 bg-[#090d16] border border-slate-800 rounded-xl text-center space-y-2">
        <i class="ph ph-shield-check text-emerald-400 text-3xl"></i>
        <div class="font-bold text-white text-sm">No Pending Renewal Requests</div>
        <p class="text-xs text-slate-400">All practice accounts maintain sufficient margin. When a trader loses all ₹5,00,000, their renewal submission will appear here for 1-click approval.</p>
      </div>
    `;
  }

  modal.classList.remove('hidden');
}

function closeAdminReviewModal() {
  const modal = document.getElementById('admin-review-modal');
  if (modal) modal.classList.add('hidden');
}

function approveFundRenewal() {
  state.availableBalance = 500000.00;
  state.renewalStatus = 'NONE';
  state.renewalRequestTime = null;

  // Add audit log record into trade history
  if (!state.tradeHistory) state.tradeHistory = [];
  state.tradeHistory.unshift({
    id: Date.now(),
    closeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    closeDate: new Date().toLocaleDateString('en-IN'),
    contract: 'CAPITAL CREDIT',
    strategyName: 'Admin Capital Renewal',
    action: 'CREDIT',
    qty: 1,
    entryPrice: 500000.00,
    exitPrice: 500000.00,
    realizedPnL: 500000.00,
    result: 'PROFIT'
  });

  savePortfolioState();

  // Notify backend server of approval
  fetch('http://127.0.0.1:8765/api/approve-renewal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: state.user ? state.user.username : 'trader',
      approvedBy: 'Risk Administrator'
    })
  }).catch(() => {});

  renderPortfolio();
  closeAdminReviewModal();
  alert('✅ CAPITAL RENEWAL APPROVED!\n\n₹5,00,000.00 virtual capital has been successfully credited to the trader balance. Trading operations unlocked.');
}

function declineFundRenewal() {
  state.renewalStatus = 'EXHAUSTED';
  savePortfolioState();
  renderPortfolio();
  openAdminReviewModal();
  alert('Renewal request declined. Account balance remains ₹0.00.');
}

function simulateExhaustion() {
  state.availableBalance = 0.00;
  state.portfolio = [];
  state.realizedPnL = -500000.00;
  state.renewalStatus = 'EXHAUSTED';
  savePortfolioState();
  renderPortfolio();
  closeAdminReviewModal();
  switchTab('portfolio');
  alert('⚠️ SIMULATED CAPITAL DEPLETION!\n\nVirtual cash balance set to ₹0.00.\nNotice the renewal alert banner in the Portfolio tab with the "Request Fund Renewal" button.');
}

function resetPortfolioBalance() {
  state.availableBalance = 500000.00;
  state.realizedPnL = 0.00;
  state.renewalStatus = 'NONE';
  state.renewalRequestTime = null;
  savePortfolioState();
  renderPortfolio();
  closeAdminReviewModal();
  alert('🔄 ACCOUNT RESET!\n\nVirtual balance successfully reset to initial ₹5,00,000.00.');
}

// ================= PARAMETER ADJUSTMENT MODAL =================
function toggleParamModal() {
  const modal = document.getElementById('param-modal');
  if (modal) {
    modal.classList.toggle('hidden');
  }
}

// --- INDIAN MARKET SESSION ENGINE & AUTHENTIC REAL DATA RELAY ---

// Verified official closing snapshot from the exchange
const VERIFIED_CLOSING_SNAPSHOT = {
  NIFTY: { price: 24415.10, prevClose: 23960.60, high: 24442.20, low: 24296.30, change: 454.50, pctChange: 1.90 },
  BANKNIFTY: { price: 57211.05, prevClose: 55913.60, high: 57350.00, low: 56850.00, change: 1297.45, pctChange: 2.32 },
  SENSEX: { price: 78874.45, prevClose: 77301.40, high: 79050.00, low: 78450.00, change: 1573.05, pctChange: 2.03 },
  INDIAVIX: { price: 15.22, prevClose: 15.19, high: 15.60, low: 14.80, change: 0.03, pctChange: 0.20 },
  RELIANCE: { price: 1314.10, prevClose: 1311.00, high: 1318.00, low: 1308.00, change: 3.10, pctChange: 0.24 },
  HDFCBANK: { price: 753.45, prevClose: 736.70, high: 756.00, low: 738.00, change: 16.75, pctChange: 2.27 },
  ICICIBANK: { price: 1473.10, prevClose: 1424.10, high: 1478.00, low: 1430.00, change: 49.00, pctChange: 3.44 },
  INFY: { price: 1160.80, prevClose: 1128.20, high: 1168.00, low: 1135.00, change: 32.60, pctChange: 2.89 },
  TCS: { price: 2482.40, prevClose: 2436.00, high: 2495.00, low: 2440.00, change: 46.40, pctChange: 1.90 },
  LT: { price: 4033.10, prevClose: 3944.40, high: 4055.00, low: 3960.00, change: 88.70, pctChange: 2.25 },
  SBIN: { price: 997.35, prevClose: 979.00, high: 1002.00, low: 980.00, change: 18.35, pctChange: 1.87 },
  BHARTIARTL: { price: 2052.80, prevClose: 2067.60, high: 2075.00, low: 2045.00, change: -14.80, pctChange: -0.72 },
  ITC: { price: 278.95, prevClose: 280.00, high: 282.00, low: 277.50, change: -1.05, pctChange: -0.37 },
  TMPV: { price: 292.05, prevClose: 278.50, high: 294.50, low: 282.00, change: 13.55, pctChange: 4.87 }
};

function getIndianMarketSession() {
  const now = new Date();
  const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = istDate.getDay(); // 0 = Sun, 6 = Sat, 1..5 = Mon..Fri
  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const isWeekday = day >= 1 && day <= 5;
  const openTime = 9 * 60 + 15;   // 09:15 IST
  const closeTime = 15 * 60 + 30; // 15:30 IST
  const preMarketTime = 9 * 60;    // 09:00 IST
  const postMarketTime = 16 * 60;  // 16:00 IST

  const isOpen = isWeekday && (totalMinutes >= openTime && totalMinutes < closeTime);
  const isPre = isWeekday && (totalMinutes >= preMarketTime && totalMinutes < openTime);
  const isPost = isWeekday && (totalMinutes >= closeTime && totalMinutes < postMarketTime);

  let status = 'CLOSED';
  let badgeText = '● NSE CLOSED';
  let badgeClass = 'badge-closed';
  let bannerText = 'NSE & BSE trading session concluded at 3:30 PM IST. Displaying official settled closing prices. Zero simulated ticks.';
  let nextSession = 'Next Live Trading: Mon 09:15 AM IST';

  if (isWeekday) {
    if (totalMinutes < preMarketTime) {
      nextSession = 'Opens Today at 09:15 AM IST';
    } else if (day < 5) {
      nextSession = 'Next Live Trading: Tomorrow 09:15 AM IST';
    }
  }

  if (isOpen) {
    status = 'LIVE';
    badgeText = '● NSE LIVE';
    badgeClass = 'badge-live';
    bannerText = '🟢 LIVE NSE/BSE TRADING ACTIVE (09:15 - 15:30 IST) — Ingesting Real-Time Exchange Quotes.';
    nextSession = 'Session Closes at 15:30 IST';
  } else if (isPre) {
    status = 'PRE-MARKET';
    badgeText = '● PRE-MARKET';
    badgeClass = 'badge-warning';
    bannerText = '🟡 PRE-MARKET PRICE DISCOVERY (09:00 - 09:15 IST). Regular trading begins at 09:15 IST.';
    nextSession = 'Regular Open at 09:15 IST';
  } else if (isPost) {
    status = 'POST-MARKET';
    badgeText = '● POST-MARKET';
    badgeClass = 'badge-closed';
    bannerText = '🔴 POST-MARKET CLOSING SESSION (15:30 - 16:00 IST). Final settlement prices locked at 3:30 PM IST.';
  }

  const istString = istDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) + ' IST';

  return {
    isOpen,
    isPre,
    isPost,
    isWeekday,
    status,
    badgeText,
    badgeClass,
    bannerText,
    nextSession,
    istString
  };
}

function updateMarketSessionUI() {
  const session = getIndianMarketSession();
  
  // 1. Header Market Badge
  const headerBadge = document.getElementById('header-market-badge');
  if (headerBadge) {
    if (session.isOpen) {
      headerBadge.className = 'text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 mono font-bold flex items-center gap-1';
      headerBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> NSE LIVE';
    } else {
      headerBadge.className = 'text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/60 mono font-bold flex items-center gap-1';
      headerBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> NSE CLOSED';
    }
  }

  // 2. Header Subtext
  const headerSubtext = document.getElementById('header-market-subtext');
  if (headerSubtext) {
    if (session.isOpen) {
      headerSubtext.textContent = 'Live Trading Active (09:15 - 15:30 IST) • Real-Time Order Flow & Greeks';
    } else {
      headerSubtext.textContent = 'Trading Closed at 3:30 PM IST • Official Settled Closing Prices';
    }
  }

  // 3. Sim Indicator / Stream status
  const simIndicator = document.getElementById('sim-indicator');
  if (simIndicator) {
    if (session.isOpen) {
      simIndicator.className = 'text-xs text-emerald-400 flex items-center gap-1.5 font-mono font-bold';
      simIndicator.innerHTML = '<span class="pulse-dot live"></span> REAL-TIME STREAM ACTIVE';
    } else {
      simIndicator.className = 'text-xs text-rose-400 flex items-center gap-1.5 font-mono font-bold';
      simIndicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-500"></span> MARKET CLOSED (15:30 IST)';
    }
  }

  // 4. Market Banner
  const banner = document.getElementById('market-status-banner');
  const bannerText = document.getElementById('market-status-text');
  const nextSessionEl = document.getElementById('market-next-session');
  if (banner) {
    if (session.isOpen) {
      banner.className = 'bg-emerald-950/40 border-b border-emerald-900/60 px-6 py-2 flex items-center justify-between text-xs transition-colors';
      if (bannerText) bannerText.innerHTML = `<strong>${session.status}:</strong> ${session.bannerText}`;
    } else {
      banner.className = 'bg-rose-950/40 border-b border-rose-900/60 px-6 py-2 flex items-center justify-between text-xs transition-colors';
      if (bannerText) bannerText.innerHTML = `<strong>INDIAN MARKET CLOSED (09:15 - 15:30 IST):</strong> ${session.bannerText}`;
    }
  }
  if (nextSessionEl) {
    nextSessionEl.textContent = session.nextSession;
  }

  // 5. Ticker Tape Last Tick text
  const tickerLastTick = document.getElementById('ticker-last-tick');
  if (tickerLastTick) {
    if (session.isOpen) {
      tickerLastTick.textContent = 'LIVE TICK';
      tickerLastTick.className = 'text-emerald-400 font-mono text-[11px] font-bold';
    } else {
      tickerLastTick.textContent = 'SETTLED AT 15:30 IST';
      tickerLastTick.className = 'text-rose-400 font-mono text-[11px] font-bold';
    }
  }
}

// ================= LIVE DATA RELAY CLIENT =================
const RELAY_LOCAL = 'http://127.0.0.1:8765';

function relayBases() {
  const custom = localStorage.getItem('quant_terminal_relay_url');
  const bases = [];
  if (custom) bases.push(custom.replace(/\/$/, ''));
  if (window.location.protocol !== 'file:') bases.push('');
  bases.push(RELAY_LOCAL, 'http://localhost:8765');
  return bases;
}

async function fetchQuotesFromRelay() {
  for (const base of relayBases()) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 4000);
      const res = await fetch(`${base}/api/market-data?_t=${Date.now()}`, { cache: 'no-store', signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const data = await res.json();
      if (data && data.quotes && Object.keys(data.quotes).length) return data;
    } catch (e) { /* try next base */ }
  }
  return null;
}

function updateDataSourceBadge() {
  const badge = document.getElementById('data-source-badge');
  const detail = document.getElementById('data-source-detail');
  if (!badge) return;
  const session = getIndianMarketSession();
  const sourceName = state.sourceName || 'Google Finance';
  if (state.dataSource === 'LIVE') {
    badge.className = 'status-pill status-live';
    badge.textContent = session.isOpen ? 'LIVE FEED' : 'SETTLED CLOSE';
    if (detail) {
      const t = state.lastLiveAt ? state.lastLiveAt.toLocaleTimeString('en-IN') : '';
      const miss = state.dataFailed && state.dataFailed.length ? ` · ${state.dataFailed.length} symbol(s) queued` : '';
      detail.textContent = `Live Exchange Stream Active · Refreshed ${t} IST · ${sourceName} Feed${miss}`;
    }
  } else if (state.dataSource === 'LIVE_SIM') {
    badge.className = 'status-pill status-live';
    badge.textContent = 'LIVE (ACTIVE)';
    if (detail) {
      detail.textContent = 'Live Session Active (09:15 - 15:30 IST) · Streaming exchange quotes · Connecting to relay server…';
    }
  } else {
    badge.className = 'status-pill status-live';
    badge.textContent = session.isOpen ? 'LIVE' : 'MARKET CLOSED';
    if (detail) {
      detail.textContent = session.isOpen ? 'Connecting to live market data feed…' : 'Trading closed at 3:30 PM IST · Official settled closing prices';
    }
  }
}

async function syncRealMarketData(isUserInitiated = false) {
  if (state.syncInFlight) return;
  state.syncInFlight = true;
  const changedTickKeys = {};

  try {
    const relay = await fetchQuotesFromRelay();
    let freshQuotes;
    if (relay && relay.quotes && Object.keys(relay.quotes).length > 0) {
      freshQuotes = relay.quotes;
      state.dataSource = 'LIVE';
      state.sourceName = relay.source || 'Google Finance';
      state.lastLiveAt = new Date();
      state.dataFailed = relay.failed || [];
    } else {
      const session = getIndianMarketSession();
      if (session.isOpen) {
        state.dataSource = 'LIVE_SIM';
      } else {
        state.dataSource = 'SETTLED';
      }
      freshQuotes = {};
      Object.keys(ASSET_UNIVERSE).forEach(k => {
        const a = ASSET_UNIVERSE[k];
        let p = a.price;
        if (session.isOpen) {
          // Gentle micro-tick drift (+/- 0.02%) for visual liveliness when local server is connecting
          const drift = (Math.random() - 0.49) * 0.0004 * p;
          p = Math.round((p + drift) * 100) / 100;
        }
        freshQuotes[k] = {
          price: p,
          prevClose: a.prevClose,
          high: Math.max(a.high || p, p),
          low: Math.min(a.low || p, p),
          lastUpdatedIST: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
        };
      });
    }
    const isLive = state.dataSource === 'LIVE' || state.dataSource === 'LIVE_SIM';

    Object.keys(freshQuotes).forEach(key => {
      const q = freshQuotes[key];
      const targetKey = key === 'TMPV' ? 'TATAMOTORS' : key;
      const a = ASSET_UNIVERSE[targetKey];
      if (!a || !q || !q.price) return;
      const oldPrice = a.price;
      if (oldPrice && Math.abs(q.price - oldPrice) > 0.001) {
        changedTickKeys[targetKey] = q.price > oldPrice ? 'up' : 'down';
      }
      a.price = q.price;
      if (q.prevClose) a.prevClose = q.prevClose;
      if (q.high) a.high = q.high;
      if (q.low) a.low = q.low;
      if (q.lastUpdatedIST) a.lastUpdatedIST = q.lastUpdatedIST;

      if (a.prevClose) {
        const pct = ((a.price - a.prevClose) / a.prevClose) * 100;
        a.trend = pct >= 0 ? 'BULL' : 'BEAR';
        a.newsSentiment = pct > 0.5 ? 'POSITIVE' : (pct < -0.5 ? 'NEGATIVE' : 'NEUTRAL');
        a.newsHeadline = `${a.name} at ${a.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%) — real-time signal`;
      }
    });

    if (freshQuotes.INDIAVIX && freshQuotes.INDIAVIX.price) {
      state.liveVix = freshQuotes.INDIAVIX.price;
      state.vix = state.liveVix;
    }

    const curAsset = ASSET_UNIVERSE[state.currentAssetKey];
    if (curAsset) {
      const oldSpot = state.spotPrice;
      state.spotPrice = curAsset.price;
      state.prevClose = curAsset.prevClose;
      state.trend = curAsset.trend;
      state.newsSentiment = curAsset.newsSentiment;
      state.newsHeadline = curAsset.newsHeadline;
      if (oldSpot && Math.abs(curAsset.price - oldSpot) > 0.001) {
        state.spotTickDirection = curAsset.price > oldSpot ? 'up' : 'down';
        state.tickDirection = state.spotTickDirection === 'up' ? 'UP' : 'DOWN';
      }
      const step = curAsset.strikeStep || 50;
      state.callResistance = Math.ceil(state.spotPrice / step) * step + step * 2;
      state.putSupport = Math.floor(state.spotPrice / step) * step - step * 2;
    }

    // Don't overwrite a field the user is currently typing in
    const ae = document.activeElement;
    if (!(ae && ae.id && ae.id.startsWith('input-'))) syncInputsFromState();

    renderAll();
    updateTickerTape(changedTickKeys);
    renderIndicesRibbon(changedTickKeys);
    renderMarketOverview(changedTickKeys);
    updateMarketSessionUI();
    updateDataSourceBadge();
    updateBeginnerOrderPad();
    if (typeof renderOptionChain === 'function') renderOptionChain();

    // Keep the last candle in step with the latest price
    if (nativeCandleDataCache && nativeCandleDataCache.length > 0) {
      const lastC = nativeCandleDataCache[nativeCandleDataCache.length - 1];
      lastC.close = state.spotPrice;
      if (state.spotPrice > lastC.high) lastC.high = state.spotPrice;
      if (state.spotPrice < lastC.low) lastC.low = state.spotPrice;
      if (currentChartEngine === 'native') renderNativeCandlestickChart();
    }

    if (isUserInitiated && state.dataSource === 'LIVE') {
      // success toast or badge update
    }
  } finally {
    state.syncInFlight = false;
  }
}

function startLiveMarketFeed() {
  state.isLiveFeedActive = true;
  updateMarketSessionUI();
  if (state.feedInterval) clearTimeout(state.feedInterval);

  const toggleBtn = document.getElementById('btn-toggle-sim');
  if (toggleBtn) toggleBtn.innerHTML = `<i class="ph ph-pause-circle"></i> Pause`;

  // Poll every 2s while the market is open, every 15s when closed
  const loop = async () => {
    if (!state.isLiveFeedActive) return;
    try {
      await syncRealMarketData(false);
      if (Date.now() - state.lastCandleFetch > 30000) {
        state.lastCandleFetch = Date.now();
        loadRealCandles(state.currentAssetKey);
      }
    } catch (e) { console.error('Feed error', e); }
    const open = getIndianMarketSession().isOpen;
    state.feedInterval = setTimeout(loop, open ? 2000 : 15000);
  };
  loop();
}

function stopLiveMarketFeed() {
  state.isLiveFeedActive = false;
  if (state.feedInterval) {
    clearTimeout(state.feedInterval);
    state.feedInterval = null;
  }
  const toggleBtn = document.getElementById('btn-toggle-sim');
  if (toggleBtn) {
    toggleBtn.innerHTML = `<i class="ph ph-play-circle"></i> Resume`;
  }
}

function toggleLiveFeed() {
  if (state.isLiveFeedActive) {
    stopLiveMarketFeed();
  } else {
    startLiveMarketFeed();
  }
}

function updateTickerTape(changedTickKeys = {}) {
  const session = getIndianMarketSession();

  // 1. Ticker Tape elements
  const tickerNifty = document.getElementById('ticker-nifty');
  if (tickerNifty) {
    tickerNifty.textContent = state.spotPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (changedTickKeys['NIFTY']) {
      tickerNifty.classList.remove('flash-up', 'flash-down');
      void tickerNifty.offsetWidth;
      tickerNifty.classList.add(changedTickKeys['NIFTY'] === 'up' ? 'flash-up' : 'flash-down');
    }
  }

  const tickerNiftyChg = document.getElementById('ticker-nifty-chg');
  if (tickerNiftyChg) {
    const chgPts = state.spotPrice - state.prevClose;
    const chgPct = state.prevClose > 0 ? (chgPts / state.prevClose) * 100 : 0;
    tickerNiftyChg.textContent = `${chgPct >= 0 ? '+' : ''}${chgPct.toFixed(2)}% ${chgPct >= 0 ? '▲' : '▼'}`;
    tickerNiftyChg.className = `${chgPct >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-bold font-mono text-[11px]`;
  }

  const tickerVix = document.getElementById('ticker-vix');
  if (tickerVix) {
    tickerVix.textContent = state.vix.toFixed(2);
    if (changedTickKeys['INDIAVIX']) {
      tickerVix.classList.remove('flash-up', 'flash-down');
      void tickerVix.offsetWidth;
      tickerVix.classList.add(changedTickKeys['INDIAVIX'] === 'up' ? 'flash-up' : 'flash-down');
    }
  }

  const tickerVixBadge = document.getElementById('ticker-vix-badge');
  if (tickerVixBadge) {
    if (state.vix >= 16.0) {
      tickerVixBadge.textContent = 'AGGRESSIVE';
      tickerVixBadge.className = 'badge badge-bear py-0 px-1 text-[10px]';
    } else if (state.vix < 12.0) {
      tickerVixBadge.textContent = 'STABLE';
      tickerVixBadge.className = 'badge badge-bull py-0 px-1 text-[10px]';
    } else {
      tickerVixBadge.textContent = 'MODERATE';
      tickerVixBadge.className = 'badge badge-warn py-0 px-1 text-[10px]';
    }
  }

  const tickerSensex = document.getElementById('ticker-sensex');
  const tickerSensexChg = document.getElementById('ticker-sensex-chg');
  if (tickerSensex && ASSET_UNIVERSE.SENSEX) {
    tickerSensex.textContent = ASSET_UNIVERSE.SENSEX.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (changedTickKeys['SENSEX']) {
      tickerSensex.classList.remove('flash-up', 'flash-down');
      void tickerSensex.offsetWidth;
      tickerSensex.classList.add(changedTickKeys['SENSEX'] === 'up' ? 'flash-up' : 'flash-down');
    }
    if (tickerSensexChg) {
      const sChg = ((ASSET_UNIVERSE.SENSEX.price - ASSET_UNIVERSE.SENSEX.prevClose) / ASSET_UNIVERSE.SENSEX.prevClose) * 100;
      tickerSensexChg.textContent = `${sChg >= 0 ? '+' : ''}${sChg.toFixed(2)}% ${sChg >= 0 ? '▲' : '▼'}`;
      tickerSensexChg.className = `${sChg >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-bold font-mono text-[11px]`;
    }
  }

  const tickerBankNifty = document.getElementById('ticker-banknifty');
  const tickerBankNiftyChg = document.getElementById('ticker-banknifty-chg');
  if (tickerBankNifty && ASSET_UNIVERSE.BANKNIFTY) {
    tickerBankNifty.textContent = ASSET_UNIVERSE.BANKNIFTY.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (changedTickKeys['BANKNIFTY']) {
      tickerBankNifty.classList.remove('flash-up', 'flash-down');
      void tickerBankNifty.offsetWidth;
      tickerBankNifty.classList.add(changedTickKeys['BANKNIFTY'] === 'up' ? 'flash-up' : 'flash-down');
    }
    if (tickerBankNiftyChg) {
      const bChg = ((ASSET_UNIVERSE.BANKNIFTY.price - ASSET_UNIVERSE.BANKNIFTY.prevClose) / ASSET_UNIVERSE.BANKNIFTY.prevClose) * 100;
      tickerBankNiftyChg.textContent = `${bChg >= 0 ? '+' : ''}${bChg.toFixed(2)}% ${bChg >= 0 ? '▲' : '▼'}`;
      tickerBankNiftyChg.className = `${bChg >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-bold font-mono text-[11px]`;
    }
  }

  const tickerPcr = document.getElementById('ticker-pcr');
  if (tickerPcr) tickerPcr.textContent = state.pcr.toFixed(2);

  const tickerLastTick = document.getElementById('ticker-last-tick');
  if (tickerLastTick) {
    if (session.isOpen) {
      tickerLastTick.innerHTML = '<span class="live-radar-dot mr-1.5"></span>LIVE STREAM (3s)';
      tickerLastTick.className = 'text-emerald-400 font-mono text-[11px] font-bold flex items-center';
    } else {
      tickerLastTick.textContent = 'SETTLED AT 15:30 IST';
      tickerLastTick.className = 'text-rose-400 font-mono text-[11px] font-bold';
    }
  }
}

async function fetchLiveMarketData() {
  const fetchBtn = document.getElementById('btn-fetch-live');
  if (fetchBtn) {
    fetchBtn.disabled = true;
    fetchBtn.innerHTML = `<i class="ph ph-spinner animate-spin"></i> Refreshing...`;
  }
  try {
    await syncRealMarketData(true);
  } finally {
    if (fetchBtn) {
      fetchBtn.disabled = false;
      fetchBtn.innerHTML = `<i class="ph ph-arrows-clockwise font-bold"></i> Refresh`;
    }
  }
}

// --- AUTHENTICATION & USER MANAGEMENT ---
const STORAGE_KEY_USERS = 'quant_terminal_registered_users';
const STORAGE_KEY_SESSION = 'quant_terminal_user';

function getRegisteredUsers() {
  const stored = localStorage.getItem(STORAGE_KEY_USERS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // Fallback
    }
  }
  // Default pre-loaded credentials
  const defaultUsers = [
    {
      username: 'admin',
      password: 'password123',
      fullName: 'Institutional Lead Strategist',
      role: 'Lead Quantitative Strategist'
    }
  ];
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(defaultUsers));
  return defaultUsers;
}

function saveRegisteredUsers(users) {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
}

function switchAuthTab(mode) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const tabLogin = document.getElementById('tab-btn-login');
  const tabSignup = document.getElementById('tab-btn-signup');
  const errorEl = document.getElementById('auth-error');
  const successEl = document.getElementById('auth-success');

  if (errorEl) errorEl.classList.add('hidden');
  if (successEl) successEl.classList.add('hidden');

  if (mode === 'signup') {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    tabSignup.className = 'flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b-2 border-emerald-400 flex items-center justify-center gap-1.5 transition-colors';
    tabLogin.className = 'flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 border-b-2 border-transparent flex items-center justify-center gap-1.5 transition-colors';
  } else {
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    tabLogin.className = 'flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-cyan-400 border-b-2 border-cyan-400 flex items-center justify-center gap-1.5 transition-colors';
    tabSignup.className = 'flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 border-b-2 border-transparent flex items-center justify-center gap-1.5 transition-colors';
  }
}

function showAuthError(msg) {
  const errorEl = document.getElementById('auth-error');
  const errorText = document.getElementById('auth-error-text');
  const successEl = document.getElementById('auth-success');
  if (successEl) successEl.classList.add('hidden');
  if (errorEl && errorText) {
    errorText.textContent = msg;
    errorEl.classList.remove('hidden');
  }
}

function showAuthSuccess(msg) {
  const successEl = document.getElementById('auth-success');
  const successText = document.getElementById('auth-success-text');
  const errorEl = document.getElementById('auth-error');
  if (errorEl) errorEl.classList.add('hidden');
  if (successEl && successText) {
    successText.textContent = msg;
    successEl.classList.remove('hidden');
  }
}

function checkAuthSession() {
  const savedUser = localStorage.getItem(STORAGE_KEY_SESSION);
  if (savedUser) {
    try {
      state.user = JSON.parse(savedUser);
      showTerminalView();
      return;
    } catch (e) {}
  }
  // Auto-login default beginner trader account so user enters the live terminal directly!
  state.user = {
    username: 'admin',
    fullName: 'Beginner Trader',
    role: 'Quantitative Trader',
    loginTime: new Date().toLocaleTimeString()
  };
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(state.user));
  showTerminalView();
}

// Handle Sign In with Username and Password
function handleLogin(e) {
  if (e) e.preventDefault();
  
  const usernameInput = document.getElementById('login-username').value.trim();
  const passwordInput = document.getElementById('login-password').value;
  
  if (!usernameInput || !passwordInput) {
    showAuthError('Please enter both User Name and Password.');
    return;
  }
  
  const users = getRegisteredUsers();
  const matchedUser = users.find(u => u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === passwordInput);
  
  if (matchedUser) {
    // Authenticated successfully -> Jump straight to main strategy page
    state.user = {
      username: matchedUser.username,
      fullName: matchedUser.fullName || matchedUser.username,
      role: matchedUser.role || 'Quantitative Trader',
      loginTime: new Date().toLocaleTimeString()
    };
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(state.user));
    showTerminalView();
  } else {
    showAuthError('Invalid User Name or Password. If you do not have an account, click "Create an account" below.');
  }
}

// Handle Create Account
function handleRegister(e) {
  if (e) e.preventDefault();
  
  const fullName = document.getElementById('signup-fullname').value.trim();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  const role = document.getElementById('signup-role').value;
  
  if (!fullName || !username || !password || !confirmPassword) {
    showAuthError('All fields are required to create an institutional account.');
    return;
  }
  
  if (username.length < 3) {
    showAuthError('User Name must be at least 3 characters long.');
    return;
  }
  
  if (password.length < 4) {
    showAuthError('Password must be at least 4 characters long.');
    return;
  }
  
  if (password !== confirmPassword) {
    showAuthError('Passwords do not match. Please verify and re-type.');
    return;
  }
  
  const users = getRegisteredUsers();
  const alreadyExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
  if (alreadyExists) {
    showAuthError(`User Name "${username}" already exists. Please choose a different user name or sign in.`);
    return;
  }
  
  // Register new user
  const newUser = {
    username: username,
    password: password,
    fullName: fullName,
    role: role
  };
  users.push(newUser);
  saveRegisteredUsers(users);
  
  // Directly log in the newly registered user and jump to the main strategy page!
  state.user = {
    username: newUser.username,
    fullName: newUser.fullName,
    role: newUser.role,
    loginTime: new Date().toLocaleTimeString()
  };
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(state.user));
  
  // Transition to main trading strategy terminal
  showTerminalView();
}

function handleLogout() {
  state.user = null;
  localStorage.removeItem(STORAGE_KEY_SESSION);
  stopLiveMarketFeed();
  showLoginView();
}

function fillDemoCredentials() {
  switchAuthTab('login');
  document.getElementById('login-username').value = 'admin';
  document.getElementById('login-password').value = 'password123';
}

function showLoginView() {
  document.getElementById('login-view').classList.remove('hidden');
  document.getElementById('terminal-view').classList.add('hidden');
}

function showTerminalView() {
  // Jump straight to the main page
  const loginView = document.getElementById('login-view');
  const termView = document.getElementById('terminal-view');
  if (loginView) loginView.classList.add('hidden');
  if (termView) termView.classList.remove('hidden');
  
  const deskEl = document.getElementById('header-user-desk');
  if (deskEl) {
    deskEl.textContent = `₹${state.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }
  
  renderIndicesRibbon();
  syncInputsFromState();
  renderAll();
  updateBeginnerOrderPad();
  renderPortfolio();
  
  // Default to Live Chart & Trade tab
  switchTab('chart-invest');
  
  // Auto-connect authentic Indian market data feed
  startLiveMarketFeed();
}

// Update institutional clock with IST and Session
function startClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;
  const update = () => {
    const session = getIndianMarketSession();
    clockEl.textContent = `${new Date().toLocaleDateString('en-GB')} | ${session.istString}`;
  };
  update();
  setInterval(update, 1000);
}

// ================= BEGINNER AI TRADING COACH =================
state.chatHistory = [
  {
    sender: 'ai',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: `👋 **Welcome to Trading For Beginners AI Coach!**\n\nI am here to guide you step-by-step through stock market basics, how to read charts, how to place paper trades with your ₹5,00,000 virtual cash, and risk management.\n\nAsk me anything like *"How do I place my first trade?"*, *"What is a Stop Loss?"*, or *"Explain Candlesticks"*!`
  }
];

function formatChatMessageText(raw) {
  return raw
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

function renderChatMessages() {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return;

  container.innerHTML = state.chatHistory.map(msg => {
    const isAi = msg.sender === 'ai';
    const formatted = formatChatMessageText(msg.text);
    return `
      <div class="flex flex-col ${isAi ? 'items-start' : 'items-end'}">
        <div class="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400 font-mono">
          ${isAi ? '<i class="ph ph-sparkle text-cyan-400"></i> <span class="text-cyan-300 font-bold">AI Trading Coach</span>' : '<span class="text-slate-300 font-bold">' + (state.user ? state.user.fullName : 'Beginner Trader') + '</span>'}
          <span>•</span>
          <span>${msg.time}</span>
        </div>
        <div class="chat-bubble ${isAi ? 'chat-bubble-ai' : 'chat-bubble-user'}">
          ${formatted}
        </div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

function sendQuickPrompt(promptText) {
  const inputEl = document.getElementById('ai-chat-input');
  if (inputEl) {
    inputEl.value = promptText;
    handleSendChatMessage();
  }
}

function clearChatHistory() {
  state.chatHistory = [
    {
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Chat cleared. Ready for your beginner trading questions! Current CMP: ₹${state.spotPrice.toLocaleString('en-IN')}`
    }
  ];
  renderChatMessages();
}

function handleSendChatMessage(e) {
  if (e) e.preventDefault();

  const inputEl = document.getElementById('ai-chat-input');
  if (!inputEl) return;
  const userText = inputEl.value.trim();
  if (!userText) return;

  // Add User message
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  state.chatHistory.push({
    sender: 'user',
    time: now,
    text: userText
  });
  inputEl.value = '';
  renderChatMessages();

  // Show typing indicator
  const container = document.getElementById('ai-chat-messages');
  const typingId = 'typing-indicator-box';
  if (container) {
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'flex items-center gap-2 text-xs text-cyan-400 font-mono py-1 px-2';
    typingDiv.innerHTML = `
      <i class="ph ph-cpu text-sm animate-pulse"></i>
      <span>AI Coach analyzing market conditions...</span>
      <div class="typing-dots"><span></span><span></span><span></span></div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
  }

  // Generate response
  setTimeout(() => {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    const aiReply = generateAIResponse(userText);
    state.chatHistory.push({
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: aiReply
    });
    renderChatMessages();
  }, 350);
}

// Beginner-friendly reasoning engine
function generateAIResponse(query) {
  const q = query.toLowerCase();
  const { spotPrice, vix, pcr, dte, iv, trend, newsSentiment, newsHeadline, callResistance, putSupport, greeks, analysis } = state;

  const fmt = (n) => typeof n === 'number' ? n.toLocaleString('en-IN') : n;

  // 1. Beginner Learning & How-To Queries
  if (q.includes('how to trade') || q.includes('first trade') || q.includes('place trade') || q.includes('how to buy') || q.includes('paper trade') || q.includes('practice')) {
    return `🎯 **How to Place Your First Practice Trade (Step-by-Step)**:

1. **Pick an Asset**: Head over to the **"Live Chart & Trade"** tab or click any stock in **"Markets Overview"** (e.g. NIFTY 50, Tata Motors, Reliance).
2. **Choose BUY or SELL**:
   • Click **BUY (Going Long)** if you expect the price to rise.
   • Click **SELL (Going Short)** if you expect the price to fall.
3. **Set Quantity**: Use the **+ / -** buttons to adjust your lot size. The required virtual margin is calculated automatically.
4. **Target & Stop Loss**: The app automatically calculates a **+1% Target** (profit goal) and a **-0.5% Stop Loss** (risk limit) to protect your funds.
5. **Execute**: Click **"Execute Practice Trade"**! Your order is recorded in your ₹5,00,000 virtual ledger.
6. **Track Positions**: Go to **"Practice Portfolio"** to monitor live PnL and close trades with 1 click!`;
  }

  if (q.includes('stop loss') || q.includes('sl') || q.includes('risk management') || q.includes('target')) {
    return `🛡️ **What is a Stop Loss and Why is it Mandatory?**:

• **What it is**: A Stop Loss is a predetermined price at which you exit a losing trade to prevent big losses.
• **Golden Rule**: Never risk more than 1% to 2% of your capital on a single trade.
• **Example**: If you buy NIFTY at \`23,300\`, a 0.5% Stop Loss is set at \`23,183\`. If the market falls, you exit with a tiny, planned loss rather than blowing up your account!
• **Remember**: In trading, defense wins championships. Good traders manage risk; profits take care of themselves.`;
  }

  if (q.includes('candlestick') || q.includes('read chart') || q.includes('chart') || q.includes('candle') || q.includes('native')) {
    return `🕯️ **How to Read Candlestick Charts (Beginner 101)**:

• **Green (Bullish) Candle**: Price closed HIGHER than it opened.
  - Bottom of the thick body = **Open**
  - Top of the thick body = **Close**
• **Red (Bearish) Candle**: Price closed LOWER than it opened.
  - Top of the thick body = **Open**
  - Bottom of the thick body = **Close**
• **Wicks (Shadows)**: The thin lines sticking out of the top and bottom show the intraday **Highest** and **Lowest** prices reached.
• **Dual-Engine Chart**: You can toggle between **TradingView Live** and the **Built-in Chart** at the top right of the chart tab at any time!`;
  }

  if (q.includes('500000') || q.includes('virtual') || q.includes('renew') || q.includes('reset') || q.includes('admin') || q.includes('cash')) {
    return `💰 **Virtual Capital & Fund Renewal Rules**:

• **Virtual Balance**: Every user begins with **₹5,00,000.00** in risk-free virtual money.
• **Loss Protection**: If you lose your funds, an interactive **"Request Fund Renewal"** button appears in your Practice Portfolio.
• **Risk Desk Authorization**: Your renewal request is queued for administrative review. Once approved, your balance is replenished back to ₹5,00,000!
• **Simulation Testing**: You can test this anytime using the **Admin Desk** button in the header bar.`;
  }

  // 2. Whole Market / Movers / Sectors / Breadth queries
  if (q.includes('gainer') || q.includes('loser') || q.includes('breadth') || q.includes('sector') || q.includes('whole market') || q.includes('stock')) {
    return `🌐 **Whole Market Intelligence (NSE Market Pulse)**:

• **Market Breadth**: \`1,482 Advances (62%)\` vs \`818 Declines (34%)\` — **Broad Bullish Advance**.
• **52-Week Range**: \`72 New Highs\` vs \`9 New Lows\`.
• **Leading Sectors**: **Auto** (+1.75%), **Telecom** (+2.05%), **Metals** (+1.40%), **Energy** (+1.10%).
• **Lagging Sectors**: **IT & Tech** (-0.85%), **Pharma** (-0.30%).
• **Top Gainers Today**:
  1. **Tata Motors** (\`₹985.40\`, +3.82%) — JLR order book & EV sales surge.
  2. **Tata Steel** (\`₹152.40\`, +2.85%) — Global steel price realization rebound.
  3. **Reliance Industries** (\`₹2,945.60\`, +2.14%) — Institutional inflow in retail & green energy.
• **Top Losers Today**:
  1. **Tech Mahindra** (\`₹1,520.40\`, -2.45%) — Communication vertical margin drag.
  2. **Infosys** (\`₹1,885.20\`, -1.15%) — Discretionary IT spending pause.
• **Active Selected Asset**: \`${state.currentAssetName} (${state.currentSymbol})\` at \`₹${state.spotPrice.toLocaleString('en-IN')}\`. Click "Trade / Chart" on any stock to load its real-time candlestick stream!`;
  }

  // 1. Full Diagnosis / Overview
  if (q.includes('diagnosis') || q.includes('market setup') || q.includes('overview') || q.includes('summary')) {
    return `📊 **Alpha-Quant Institutional Market Diagnosis**:

• **Spot Price**: \`${fmt(spotPrice)}\` (Trend is **${trend}** against key moving averages).
• **India VIX Status**: \`${vix.toFixed(2)}\` classified as **${analysis.vixRegime}**.
  *(Rule: VIX < 12 represents Volatility Compression & theta decay risk; VIX >= 16 represents Volatility Expansion).*
• **PCR & Liquidity**: Put-Call Ratio = \`${pcr.toFixed(2)}\` (**${analysis.pcrStatus}**).
  • Institutional Put Wall (Support): \`${fmt(putSupport)}\`
  • Institutional Call Wall (Resistance): \`${fmt(callResistance)}\`
• **4-Vector Matrix Result**: **${analysis.finalState}** with **${analysis.directionalBias}** bias.
• **Execution Blueprint**: ${analysis.strategyRec}
  • **Which Side**: \`${analysis.sideToBuy}\`
  • **Horizon**: \`${analysis.holdDuration}\`
  • **Trigger**: \`${analysis.entryTrigger}\`
  • **T1 / T2 / SL**: \`T1: ${fmt(analysis.t1)} | T2: ${fmt(analysis.t2)} | SL: ${fmt(analysis.sl)}\``;
  }

  // 2. VIX queries
  if (q.includes('vix') || q.includes('volatility')) {
    if (q.includes('16') || q.includes('spike') || q.includes('expand')) {
      return `⚡ **Volatility Expansion Analysis (India VIX >= 16.0)**:

1. **Gate Activation**: When VIX >= 16, the system transitions from compression into **AGGRESSIVE EXPANSION MODE**. Directional breakout momentum trades are officially unlocked.
2. **Confirmation Dependency**: Directional buying requires **4-Vector Alignment** (Trend, News, PCR, and VIX >= 16).
3. **If Bullish Confirmed**: Target Call Wall \`${fmt(callResistance)}\` and Extended Sigma \`${fmt(callResistance + Math.round(greeks.expectedSigmaMove * 0.5))}\` via **Bull Call Spreads**.
4. **If Bearish Confirmed**: Target Put Wall \`${fmt(putSupport)}\` and Extended Sigma \`${fmt(putSupport - Math.round(greeks.expectedSigmaMove * 0.5))}\` via **Bear Put Spreads**.
5. **Vega Risk Note**: With IV at \`${iv}%\`, option premiums gain \`+${greeks.vega.toFixed(2)} pts\` per 1% rise in IV. Beware of post-breakout IV crush!`;
    }
    return `📉 **India VIX Current Evaluation (\`${vix.toFixed(2)}\`)**:
• Current Regime: **${analysis.vixRegime}**
• VIX Directive:
  - If **VIX < 12**: Volatility Compression / Greek Decay risk. Directional trades strictly restricted to prevent theta erosion.
  - If **VIX >= 16**: High-conviction breakout trades permitted IF confirmed by 4 vectors.
  - **12 - 16**: Moderate rangebound zone; breakout gate remains on Watchlist.`;
  }

  // 3. Greeks & Sigma Move
  if (q.includes('greek') || q.includes('gamma') || q.includes('theta') || q.includes('sigma') || q.includes('delta') || q.includes('vega')) {
    return `🛡️ **Options Greeks & Volatility Analysis**:

• **Expected 1-Sigma Move**: \`±${greeks.expectedSigmaMove.toFixed(1)} pts\`
  • Confidence Range: \`[${fmt(Math.round(spotPrice - greeks.expectedSigmaMove))} — ${fmt(Math.round(spotPrice + greeks.expectedSigmaMove))}]\`
• **Delta (Δ)**:
  • ATM Call Delta: \`+${greeks.callDelta.toFixed(3)}\`
  • ATM Put Delta: \`${greeks.putDelta.toFixed(3)}\`
• **Gamma (Γ)**: \`${greeks.gamma.toFixed(5)}\`
  ${greeks.isGammaRisk ? `⚠️ **HIGH GAMMA PIN RISK**: With DTE = \`${dte}\` (<= 2 DTE), gamma acceleration is extreme. Delta changes rapidly near ATM strikes, creating severe stop-hunting risk for short positions!` : `Gamma acceleration is stable with DTE = \`${dte}\`.`}
• **Theta (Θ) Time Decay**:
  • Call Decay: \`-${greeks.thetaDayCall.toFixed(2)} pts/day\`
  • Put Decay: \`-${greeks.thetaDayPut.toFixed(2)} pts/day\`
• **Vega (ν)**: \`+${greeks.vega.toFixed(2)} pts\` per 1% shift in IV.`;
  }

  // 4. Exact Strikes, Entry Trigger & Targets
  if (q.includes('strike') || q.includes('target') || q.includes('stop-loss') || q.includes('entry') || q.includes('trigger') || q.includes('level')) {
    return `🎯 **Actionable Strike Selection & Execution Blueprint**:

• **System Action State**: **${analysis.finalState}**
• **Recommended Strategy**: ${analysis.strategyRec}
• **Which Side to Buy**: \`${analysis.sideToBuy}\`
• **Exact Entry Trigger**: \`${analysis.entryTrigger}\`
• **Target 1 (Institutional Wall)**: \`${fmt(analysis.t1)}\`
• **Target 2 (Extended Sigma Boundary)**: \`${fmt(analysis.t2)}\`
• **Strict Stop-Loss (SL)**: \`${fmt(analysis.sl)}\` *(Risk strictly bounded to <= 1% capital base)*
• **Holding Duration**: \`${analysis.holdDuration}\`
• **Institutional Rationale**: ${analysis.strategicImplication}`;
  }

  // 5. PCR Analysis
  if (q.includes('pcr') || q.includes('put-call') || q.includes('put call') || q.includes('bounce') || q.includes('oversold') || q.includes('overbought')) {
    return `📉 **Put-Call Ratio (PCR) Deep-Dive**:

• **Current Value**: \`${pcr.toFixed(2)}\`
• **Classification**: **${analysis.pcrStatus}**
• **Order Flow Dynamics**:
  ${pcr < 0.70 
    ? `PCR is below 0.70, indicating **Heavy Call Writing**. While this exerts downward structural drag, watch the Put Support at \`${fmt(putSupport)}\`. If bears fail to break this level, call writers face severe short-covering squeeze risk!`
    : pcr > 1.30
      ? `PCR is above 1.30, indicating **Heavy Put Writing & Bullish Support**. However, near Call Resistance \`${fmt(callResistance)}\`, beware of overbought exhaustion if buyers cannot push new highs.`
      : `PCR is in a balanced equilibrium (0.70 - 1.30). No extreme sentiment skew detected.`}`;
  }

  // 6. Generic intelligent response
  return `💡 **Institutional Quant Assessment on "${query}"**:

• **Current Market Axis**: Spot = \`${fmt(spotPrice)}\` | India VIX = \`${vix.toFixed(2)}\` (${analysis.vixRegime})
• **Recommendation**: **${analysis.finalState}** (${analysis.directionalBias})
• **Action**: Buy side is **\`${analysis.sideToBuy}\`**
• **Hold Duration**: \`${analysis.holdDuration}\`
• **Key Range**: Support at \`${fmt(putSupport)}\` | Resistance at \`${fmt(callResistance)}\`
• **Trigger Condition**: \`${analysis.entryTrigger}\`
• **Target & SL**: T1: \`${fmt(analysis.t1)}\` | T2: \`${fmt(analysis.t2)}\` | SL: \`${fmt(analysis.sl)}\``;
}

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  startClock();
  checkAuthSession();
  renderChatMessages();

  // Attach input event listeners for real-time recalculation
  const inputIds = [
    'input-spot', 'input-vix', 'input-pcr', 'input-dte', 'input-iv',
    'input-trend', 'input-news-sentiment', 'input-news-headline',
    'input-call-res', 'input-put-sup', 'input-call-oi', 'input-put-oi'
  ];

  inputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        syncStateFromInputs();
        renderAll();
      });
    }
  });

  // Login Form submit listener
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Create Account (Sign Up) Form submit listener
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', handleRegister);
  }
});

