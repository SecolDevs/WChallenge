import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { createCoin, findCoins, findOneCoin } from '../../database/controllers/Coins.controller'
import { getCoinsMarkets, getCoinsPrice } from '../../services/coingecko'
import { buildAllCoinsResponse, buildMyCoinsResponse, getIdCoinsArray, isValidParams } from '../utils/Coins.utils'

export const getAllCoins = async (req: any, res: Response) => {
  try {
    const { favouriteCurrency } = req.user
    const allCoins = await getCoinsMarkets(favouriteCurrency)

    const responseCoins = buildAllCoinsResponse(allCoins.data)
    return res.json(responseCoins)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export const getFavouriteCoins = async (req: any, res: Response) => {
  try {
    const { id, favouriteCurrency } = req.user
    const { limit, sort } = req.query
    let params = { limit: limit ? limit : 25, sort: sort ? sort : 'desc' }

    if (!isValidParams(params)) return res.status(400).json({ message: 'Invalid query' })

    const myCoins = await findCoins({ user: id })
    const coinsId = getIdCoinsArray(myCoins)
    if (coinsId.length === 0) return res.json([])
    else {
      const priceCoinsResponse = await getCoinsPrice(coinsId, ['ars', 'eur', 'usd'])
      let coinsArrs = { priceCoins: priceCoinsResponse.data, allMyCoins: myCoins }
      return res.json(buildMyCoinsResponse(coinsArrs, favouriteCurrency, params))
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export const addFavouriteCoin = async (req: any, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { coinId } = req.body

  const { id } = req.user
  try {
    let findedCoin = await findOneCoin({ coinId, user: id })
    if (findedCoin) return res.status(400).send({ message: 'You already like this coin' })
    const newCoin = await createCoin(coinId, id)
    return res.json(newCoin)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}
