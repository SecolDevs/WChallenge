import { coinGeckoClient, coinGeckoClientNoTS } from './config/coinGeckoClient'
import { vs_currency } from './types'

export const testPing = async () => {
  return await coinGeckoClient.ping()
}

export const getCoinsMarkets = async (vs_currency: vs_currency) => {
  let params = { vs_currency }
  let data = await coinGeckoClientNoTS.coins.markets(params)
  return data
}

export const getCoinsPrice = async (ids: string[], vs_currencies: string[]) => {
  let params = { ids, vs_currencies, include_last_updated_at: true }
  let data = await coinGeckoClient.simple.price(params)
  return data
}
