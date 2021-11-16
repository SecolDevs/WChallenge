"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidParams = exports.getIdCoinsArray = exports.buildAllCoinsResponse = exports.buildMyCoinsResponse = void 0;
/**
 * Returns an array with object of prices flattenered
 * @param priceCoins Array with priceCoins response from coinGeckoWrapper
 * @returns Array of objects with flat priceKeys
 */
const flatCoinPrices = (priceCoins) => {
    let priceKeys = Object.keys(priceCoins);
    let prices = [];
    priceKeys.forEach((key) => {
        let price = priceCoins[key];
        prices.push({ id: key, ars: price.ars, eur: price.eur, usd: price.usd, last_updated_at: price.last_updated_at });
    });
    return prices;
};
/**
 * Sorts flattered priceCoins array
 * @param priceCoins Array with flattenered priceCoins
 * @param currency Favorite user currency
 * @param sort Sort asc or desc
 * @returns Sorted priceCoins array
 */
const sortPrices = (priceCoins, currency, sort) => {
    let prices = flatCoinPrices(priceCoins);
    prices.sort((a, b) => (sort === 'desc' ? b[currency] - a[currency] : a[currency] - b[currency]));
    return prices;
};
/**
 * Merge two arrays of coins into one
 * @param sortedPrices Array of coinPrices in raw format | From coinGecko wrapper
 * @param allCoins Coins array of all favourte coins of an user
 * @returns One array with data from both arrays of coins
 */
const mergePrices = (sortedPrices, allCoins) => {
    let mergedPrices = sortedPrices.map((price) => {
        let findedCoin = allCoins.find((coin) => coin.coinId === price.id);
        return {
            symbol: findedCoin === null || findedCoin === void 0 ? void 0 : findedCoin.symbol,
            ars: price.ars,
            usd: price.usd,
            eur: price.eur,
            name: findedCoin === null || findedCoin === void 0 ? void 0 : findedCoin.name,
            image: findedCoin === null || findedCoin === void 0 ? void 0 : findedCoin.image,
            last_updated_at: price.last_updated_at,
        };
    });
    return mergedPrices;
};
/**
 * @param coinsArrs Object that cotains two raw arrays of coins, coin prices from coinGecko and allcoins from database
 * @param currency Favourite currecy of an user
 * @param params Object that contains limit and sort values
 * @returns Merged array with limit size
 */
const buildMyCoinsResponse = (coinsArrs, currency, params) => {
    let { priceCoins, allMyCoins } = coinsArrs;
    let { limit, sort } = params;
    let sortedPrices = sortPrices(priceCoins, currency, sort);
    let mergedPrices = mergePrices(sortedPrices, allMyCoins);
    return mergedPrices.slice(0, limit);
};
exports.buildMyCoinsResponse = buildMyCoinsResponse;
/**
 * @param coins Array of coins from coinGeckoWrapper
 * @returns Array of objects with some values from response
 */
const buildAllCoinsResponse = (coins) => {
    let responseCoins = coins.map((coin) => {
        return {
            id: coin.id,
            symbol: coin.symbol,
            current_price: coin.current_price,
            name: coin.name,
            image: coin.image,
            last_updated: coin.last_updated,
        };
    });
    return responseCoins;
};
exports.buildAllCoinsResponse = buildAllCoinsResponse;
/**
 * @param coins Array of coins from favourite coins of an user
 * @returns Array of strings with coinsId
 */
const getIdCoinsArray = (coins) => {
    let coinsId = coins.map((coin) => coin.coinId);
    return coinsId;
};
exports.getIdCoinsArray = getIdCoinsArray;
/**
 * Verify if params given as param are valid
 * @param params Object that includes limit and sort values
 * @returns Boolean if params are valid
 */
const isValidParams = (params) => {
    return params.limit > 0 && params.limit <= 25 && (params.sort === 'desc' || params.sort === 'asc');
};
exports.isValidParams = isValidParams;
