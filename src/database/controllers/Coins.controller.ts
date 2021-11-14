import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { CoinsResponse } from '../../interface/CoinGecko.interface'
import { getCoinById } from '../../services/coingecko'
import { Coins } from '../entities/Coins.entity'

export const createCoin = async (coinId: string, userId: number) => {
  const coinResponse: CoinsResponse = await getCoinById(coinId)

  const coinToCreate = {
    coinId,
    symbol: coinResponse.symbol,
    name: coinResponse.name,
    image: coinResponse.image,
    userId,
  }

  const newCoin = getRepository(Coins).create(coinToCreate)
  const errors = await validate(newCoin)
  if (errors.length > 0) {
    throw errors
  } else {
    return await getRepository(Coins).save(newCoin)
  }
}
