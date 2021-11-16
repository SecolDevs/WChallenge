import { testPing, getCoinById, getCoinsMarkets, getCoinsPrice } from '../services/coingecko'

describe('COINGECKO SERVICE TESTS', () => {
  test('Should ping status', async () => {
    const pingResponse = await testPing()

    expect(pingResponse.code).toEqual(200)
  })

  test('Should getCoinsMarkets', async () => {
    const marketsResponse = await getCoinsMarkets('usd')

    expect(marketsResponse.code).toEqual(200)
  })

  test('Should getCoinById', async () => {
    const coinById = await getCoinById('bitcoin')
    expect(coinById.code).toEqual(200)
  })

  test('Should getCoinsPrice', async () => {
    const coinsPrices = await getCoinsPrice(['bitcoin', 'tether'], ['usd', 'eur'])
    expect(coinsPrices.code).toEqual(200)
  })
})
