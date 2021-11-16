import { coinGeckoClient, coinGeckoClientNoTS } from './config/coinGeckoClient'
import { vs_currency } from './types'

/**
 * @returns Message if coinGecko API is working
 */
export const testPing = async () => {
  return await coinGeckoClient.ping()
}

/**
 * @param vs_currency Favourite currency of an user
 * @returns All criptos with currency given as parameter
 */
export const getCoinsMarkets = async (vs_currency: vs_currency) => {
  let params = { vs_currency }
  let data = await coinGeckoClientNoTS.coins.markets(params)
  return data
}

/**
 * @param ids string array that contains all coins id to get data
 * @param vs_currencies string array with a list of vs_currencies
 * @returns response with data for all ids and with all currencies
 */
export const getCoinsPrice = async (ids: string[] | any, vs_currencies: string[]) => {
  let params = { ids, vs_currencies, include_last_updated_at: true }
  let responseCoins = await coinGeckoClient.simple.price(params)
  return responseCoins
}

/**
 * @param id coinId to search in API
 * @returns Finded coin or throw error
 */
export const getCoinById = async (id: string) => {
  let params = {}
  let coinResponse = await coinGeckoClient.coins.fetch(id, params)
  return coinResponse
}
