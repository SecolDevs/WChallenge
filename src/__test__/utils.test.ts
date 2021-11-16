import { buildAllCoinsResponse, buildMyCoinsResponse, getIdCoinsArray, isValidParams } from '../api/utils/Coins.utils'

describe('COINS UTILS', () => {
  const rawCoins = [
    {
      id: 11,
      coinId: 'cardano',
      symbol: 'ada',
      name: 'Cardano',
      image: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860',
    },
    {
      id: 12,
      coinId: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
    },
    {
      id: 13,
      coinId: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    },
  ]
  const params = { limit: 16, sort: 'asc' }
  const rawCoinsWrapper: any = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      current_price: 64052,
      market_cap: 1176530798582,
      market_cap_rank: 1,
      fully_diluted_valuation: 1309027786023,
      total_volume: 32273406386,
      high_24h: 66359,
      low_24h: 62335,
      price_change_24h: -3813.470666138041,
      price_change_percentage_24h: -5.78111,
      market_cap_change_24h: -71008473816.14014,
      market_cap_change_percentage_24h: -5.69188,
      circulating_supply: 18874425.0,
      total_supply: 21000000.0,
      max_supply: 21000000.0,
      ath: 69045,
      ath_change_percentage: -8.66451,
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: 67.81,
      atl_change_percentage: 92900.01425,
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2021-11-15T21:13:41.674Z',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      current_price: 4583.19,
      market_cap: 527935575448,
      market_cap_rank: 2,
      fully_diluted_valuation: null,
      total_volume: 18836982083,
      high_24h: 4770.73,
      low_24h: 4487.59,
      price_change_24h: -283.750623833576,
      price_change_percentage_24h: -6.04544,
      market_cap_change_24h: -27514488781.74005,
      market_cap_change_percentage_24h: -4.95355,
      circulating_supply: 118358248.249,
      total_supply: null,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -7.82967,
      ath_date: '2021-11-10T14:24:19.604Z',
      atl: 0.432979,
      atl_change_percentage: 1038359.24735,
      atl_date: '2015-10-20T00:00:00.000Z',
      roi: {
        times: 93.19896720019553,
        currency: 'btc',
        percentage: 9319.896720019553,
      },
      last_updated: '2021-11-15T21:12:33.452Z',
    },
  ]
  const priceCoinsWrapper = [
    {
      bitcoin: {
        eur: 54310,
        usd: 61795,
        ars: 6196304,
        last_updated_at: 1637025522,
      },
      ethereum: {
        eur: 3853.33,
        usd: 4384.43,
        ars: 439632,
        last_updated_at: 1637025382,
      },
    },
  ]

  test('Should get array of coinsID', () => {
    expect(getIdCoinsArray(rawCoins)).toEqual(['cardano', 'bitcoin', 'ethereum'])
  })

  test('Should verify valid params', () => {
    expect(isValidParams(params)).toBeTruthy()
  })

  test('Should build all coins response correctly', () => {
    expect(buildAllCoinsResponse(rawCoinsWrapper)).toEqual([
      {
        id: 'bitcoin',
        symbol: 'btc',
        current_price: 64052,
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        last_updated: '2021-11-15T21:13:41.674Z',
      },
      {
        id: 'ethereum',
        symbol: 'eth',
        current_price: 4583.19,
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
        last_updated: '2021-11-15T21:12:33.452Z',
      },
    ])
  })

  test('Should build my coins response correctly', () => {
    const coinsArrs: any = {
      priceCoins: {
        bitcoin: {
          ars: 6183888,
          eur: 54201,
          usd: 61665,
          last_updated_at: 1637025735,
        },
        ethereum: {
          ars: 437436,
          eur: 3834.08,
          usd: 4362.03,
          last_updated_at: 1637025843,
        },
      },

      allMyCoins: [
        {
          id: 12,
          coinId: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
        },
        {
          id: 13,
          coinId: 'ethereum',
          symbol: 'eth',
          name: 'Ethereum',
          image: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
        },
      ],
    }
    const params = { limit: 10, sort: 'desc' }
    expect(buildMyCoinsResponse(coinsArrs, 'usd', params)).toEqual([
      {
        symbol: 'btc',
        ars: 6183888,
        usd: 61665,
        eur: 54201,
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
        last_updated_at: 1637025735,
      },
      {
        symbol: 'eth',
        ars: 437436,
        usd: 4362.03,
        eur: 3834.08,
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
        last_updated_at: 1637025843,
      },
    ])
  })
})
