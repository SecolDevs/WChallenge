import { Request, Response } from 'express'
import { createCoin } from '../../database/controllers/Coins.controller'
import { CoinsResponse } from '../../interface/CoinGecko.interface'
import { getCoinsMarkets } from '../../services/coingecko'

export const getAllCoins = async (req: Request, res: Response) => {
  const allCoins = await getCoinsMarkets('ars')

  const responseCoins = allCoins.data.map((coin: CoinsResponse) => {
    return {
      id: coin.id,
      symbol: coin.symbol,
      current_price: coin.current_price,
      name: coin.name,
      image: coin.image,
      last_updated: coin.last_updated,
    }
  })

  return res.json(responseCoins)
}

export const getMyCoins = async (req: Request, res: Response) => {
  return res.json({ hi: 'Hello' })
}

export const addCoin = async (req: any, res: Response) => {
  const { coinId } = req.body
  const { id } = req.user
  try {
    const newCoin = await createCoin(coinId, id)
    return res.json(newCoin)
  } catch (error) {}
}
