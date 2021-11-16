import CoinGecko from 'coingecko-api'

/** Create coinGeckoClient using coinGecko types */
export const coinGeckoClient = new CoinGecko()

/** Create coinGeckoClient without using types */
export const coinGeckoClientNoTS: any = new CoinGecko()
