import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { Coin } from '../../interface/Coin.interface'
import { getCoinById } from '../../services/coingecko'
import { Coins } from '../entities/Coins.entity'

/**
 * @param coinId string to get coin from coinGeckoWrapper
 * @param user Id of user to asign coin
 * @returns Saved coin or throw error
 */
export const createCoin = async (coinId: string, user: number) => {
  const coinResponse = await getCoinById(coinId)
  const coinResponseData = coinResponse.data

  if (Object.keys(coinResponseData)[0] === 'error') throw coinResponseData

  const coinToCreate: Coin = {
    coinId,
    symbol: coinResponseData.symbol,
    name: coinResponseData.name,
    image: coinResponseData.image.thumb,
    user,
  }

  const newCoin = getRepository(Coins).create(coinToCreate)
  const errors = await validate(newCoin)
  if (errors.length > 0) {
    throw errors
  } else {
    return await getRepository(Coins).save(newCoin)
  }
}

/**
 * @param coin Coin object to compare with database saved coins
 * @returns finded coin
 */
export const findOneCoin = async (coin: Coin) => {
  const coinResponse = await getRepository(Coins).findOne(coin)
  return coinResponse
}

/**
 * @param coin Coin object to compare with database saved coins
 * @returns finded coins
 */
export const findCoins = async (coin: Coin) => {
  const coinsResponse = await getRepository(Coins).find(coin)
  return coinsResponse
}
