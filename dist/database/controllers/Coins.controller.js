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
exports.findCoins = exports.findOneCoin = exports.createCoin = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const coingecko_1 = require("../../services/coingecko");
const Coins_entity_1 = require("../entities/Coins.entity");
/**
 * @param coinId string to get coin from coinGeckoWrapper
 * @param user Id of user to asign coin
 * @returns Saved coin or throw error
 */
const createCoin = (coinId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const coinResponse = yield (0, coingecko_1.getCoinById)(coinId);
    const coinResponseData = coinResponse.data;
    if (Object.keys(coinResponseData)[0] === 'error')
        throw coinResponseData;
    const coinToCreate = {
        coinId,
        symbol: coinResponseData.symbol,
        name: coinResponseData.name,
        image: coinResponseData.image.thumb,
        user,
    };
    const newCoin = (0, typeorm_1.getRepository)(Coins_entity_1.Coins).create(coinToCreate);
    const errors = yield (0, class_validator_1.validate)(newCoin);
    if (errors.length > 0) {
        throw errors;
    }
    else {
        return yield (0, typeorm_1.getRepository)(Coins_entity_1.Coins).save(newCoin);
    }
});
exports.createCoin = createCoin;
/**
 * @param coin Coin object to compare with database saved coins
 * @returns finded coin
 */
const findOneCoin = (coin) => __awaiter(void 0, void 0, void 0, function* () {
    const coinResponse = yield (0, typeorm_1.getRepository)(Coins_entity_1.Coins).findOne(coin);
    return coinResponse;
});
exports.findOneCoin = findOneCoin;
/**
 * @param coin Coin object to compare with database saved coins
 * @returns finded coins
 */
const findCoins = (coin) => __awaiter(void 0, void 0, void 0, function* () {
    const coinsResponse = yield (0, typeorm_1.getRepository)(Coins_entity_1.Coins).find(coin);
    return coinsResponse;
});
exports.findCoins = findCoins;
