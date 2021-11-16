import { Coins } from '../../database/entities/Coins.entity'
import { Coin } from '../../interface/Coin.interface'
import { CoinPrice, CoinsResponse } from '../../interface/CoinGecko.interface'

interface CoinsArrs {
  priceCoins: any[]
  allMyCoins: Coins[]
}
interface Params {
  limit: number
  sort: string
}

/**
 * Returns an array with object of prices flattenered
 * @param priceCoins Array with priceCoins response from coinGeckoWrapper
 * @returns Array of objects with flat priceKeys
 */
const flatCoinPrices = (priceCoins: any) => {
  let priceKeys = Object.keys(priceCoins)
  let prices: CoinPrice[] = []
  priceKeys.forEach((key) => {
    let price = priceCoins[key]
    prices.push({ id: key, ars: price.ars, eur: price.eur, usd: price.usd, last_updated_at: price.last_updated_at })
  })
  return prices
}

/**
 * Sorts flattered priceCoins array
 * @param priceCoins Array with flattenered priceCoins
 * @param currency Favorite user currency
 * @param sort Sort asc or desc
 * @returns Sorted priceCoins array
 */
const sortPrices = (priceCoins: any, currency: string, sort: string) => {
  let prices = flatCoinPrices(priceCoins)
  prices.sort((a: any, b: any) => (sort === 'desc' ? b[currency] - a[currency] : a[currency] - b[currency]))
  return prices
}

/**
 * Merge two arrays of coins into one
 * @param sortedPrices Array of coinPrices in raw format | From coinGecko wrapper
 * @param allCoins Coins array of all favourte coins of an user
 * @returns One array with data from both arrays of coins
 */
const mergePrices = (sortedPrices: CoinPrice[], allCoins: Coins[]) => {
  let mergedPrices = sortedPrices.map((price: CoinPrice) => {
    let findedCoin = allCoins.find((coin) => coin.coinId === price.id)
    return {
      symbol: findedCoin?.symbol,
      ars: price.ars,
      usd: price.usd,
      eur: price.eur,
      name: findedCoin?.name,
      image: findedCoin?.image,
      last_updated_at: price.last_updated_at,
    }
  })

  return mergedPrices
}

/**
 * @param coinsArrs Object that cotains two raw arrays of coins, coin prices from coinGecko and allcoins from database
 * @param currency Favourite currecy of an user
 * @param params Object that contains limit and sort values
 * @returns Merged array with limit size
 */
export const buildMyCoinsResponse = (coinsArrs: CoinsArrs, currency: string, params: Params) => {
  let { priceCoins, allMyCoins } = coinsArrs
  let { limit, sort } = params
  let sortedPrices = sortPrices(priceCoins, currency, sort)
  let mergedPrices = mergePrices(sortedPrices, allMyCoins)
  return mergedPrices.slice(0, limit)
}

/**
 * @param coins Array of coins from coinGeckoWrapper
 * @returns Array of objects with some values from response
 */
export const buildAllCoinsResponse = (coins: CoinsResponse[]) => {
  let responseCoins = coins.map((coin: CoinsResponse) => {
    return {
      id: coin.id,
      symbol: coin.symbol,
      current_price: coin.current_price,
      name: coin.name,
      image: coin.image,
      last_updated: coin.last_updated,
    }
  })

  return responseCoins
}

/**
 * @param coins Array of coins from favourite coins of an user
 * @returns Array of strings with coinsId
 */
export const getIdCoinsArray = (coins: Coin[]) => {
  let coinsId = coins.map((coin: Coin) => coin.coinId)
  return coinsId
}

/**
 * Verify if params given as param are valid
 * @param params Object that includes limit and sort values
 * @returns Boolean if params are valid
 */
export const isValidParams = (params: Params): boolean => {
  return params.limit > 0 && params.limit <= 25 && (params.sort === 'desc' || params.sort === 'asc')
}
