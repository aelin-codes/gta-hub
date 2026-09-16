// Central configuration for PAN-free monetization & affiliate partners

export const MONETIZATION_CONFIG = {
  // Crypto Wallets for direct VIP payments (Zero KYC, No PAN)
  crypto: {
    solana: process.env.NEXT_PUBLIC_CRYPTO_SOL_ADDRESS || '9ps7yuj7hX2nKfi26PNte9uUWJEqRTUZ2XBY9yonsS5X',
    usdt_trc20: process.env.NEXT_PUBLIC_CRYPTO_USDT_ADDRESS || 'TXj7f87df67sf9sdf87sd98fsd78f6sdf8',
    bitcoin: process.env.NEXT_PUBLIC_CRYPTO_BTC_ADDRESS || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ethereum: process.env.NEXT_PUBLIC_CRYPTO_ETH_ADDRESS || '0x71C...YourEthAddress',
  },

  // Anonymous Ads (A-Ads) - 0 KYC ad network paying in BTC
  aads: {
    unitId: process.env.NEXT_PUBLIC_AADS_UNIT_ID || '2455520', // e.g. "2345678"
  },

  // Creator platforms
  kofiUrl: process.env.NEXT_PUBLIC_KOFI_URL || 'https://ko-fi.com',

  // Gaming Affiliates (Swap these when registered)
  affiliates: {
    g2a: process.env.NEXT_PUBLIC_G2A_AFFILIATE_URL || 'https://www.g2a.com/n/reflink-82fbbba052',
    kinguin: process.env.NEXT_PUBLIC_KINGUIN_AFFILIATE_URL || 'https://www.kinguin.net',
    nordvpn: process.env.NEXT_PUBLIC_NORDVPN_AFFILIATE_URL || 'https://nordvpn.com',
    fanatical: process.env.NEXT_PUBLIC_FANATICAL_AFFILIATE_URL || 'https://www.fanatical.com',
    amazonTag: process.env.NEXT_PUBLIC_AMAZON_TAG || 'gta6hub-20',
  }
}
