"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinById = exports.getCoinsPrice = exports.getCoinsMarkets = exports.testPing = void 0;
const coinGeckoClient_1 = require("./config/coinGeckoClient");
/**
 * @returns Message if coinGecko API is working
 */
const testPing = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield coinGeckoClient_1.coinGeckoClient.ping();
});
exports.testPing = testPing;
/**
 * @param vs_currency Favourite currency of an user
 * @returns All criptos with currency given as parameter
 */
const getCoinsMarkets = (vs_currency) => __awaiter(void 0, void 0, void 0, function* () {
    let params = { vs_currency };
    let data = yield coinGeckoClient_1.coinGeckoClientNoTS.coins.markets(params);
    return data;
});
exports.getCoinsMarkets = getCoinsMarkets;
/**
 * @param ids string array that contains all coins id to get data
 * @param vs_currencies string array with a list of vs_currencies
 * @returns response with data for all ids and with all currencies
 */
const getCoinsPrice = (ids, vs_currencies) => __awaiter(void 0, void 0, void 0, function* () {
    let params = { ids, vs_currencies, include_last_updated_at: true };
    let responseCoins = yield coinGeckoClient_1.coinGeckoClient.simple.price(params);
    return responseCoins;
});
exports.getCoinsPrice = getCoinsPrice;
/**
 * @param id coinId to search in API
 * @returns Finded coin or throw error
 */
const getCoinById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let params = {};
    let coinResponse = yield coinGeckoClient_1.coinGeckoClient.coins.fetch(id, params);
    return coinResponse;
});
exports.getCoinById = getCoinById;
