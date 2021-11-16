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
exports.addFavouriteCoin = exports.getFavouriteCoins = exports.getAllCoins = void 0;
const express_validator_1 = require("express-validator");
const Coins_controller_1 = require("../../database/controllers/Coins.controller");
const coingecko_1 = require("../../services/coingecko");
const Coins_utils_1 = require("../utils/Coins.utils");
const getAllCoins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { favouriteCurrency } = req.user;
        const allCoins = yield (0, coingecko_1.getCoinsMarkets)(favouriteCurrency);
        const responseCoins = (0, Coins_utils_1.buildAllCoinsResponse)(allCoins.data);
        return res.json(responseCoins);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getAllCoins = getAllCoins;
const getFavouriteCoins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, favouriteCurrency } = req.user;
        const { limit, sort } = req.query;
        let params = { limit: limit ? limit : 25, sort: sort ? sort : 'desc' };
        if (!(0, Coins_utils_1.isValidParams)(params))
            return res.status(400).json({ message: 'Invalid query' });
        const myCoins = yield (0, Coins_controller_1.findCoins)({ user: id });
        const coinsId = (0, Coins_utils_1.getIdCoinsArray)(myCoins);
        if (coinsId.length === 0)
            return res.json([]);
        else {
            const priceCoinsResponse = yield (0, coingecko_1.getCoinsPrice)(coinsId, ['ars', 'eur', 'usd']);
            let coinsArrs = { priceCoins: priceCoinsResponse.data, allMyCoins: myCoins };
            return res.json((0, Coins_utils_1.buildMyCoinsResponse)(coinsArrs, favouriteCurrency, params));
        }
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getFavouriteCoins = getFavouriteCoins;
const addFavouriteCoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { coinId } = req.body;
    const { id } = req.user;
    try {
        let findedCoin = yield (0, Coins_controller_1.findOneCoin)({ coinId, user: id });
        if (findedCoin)
            return res.status(400).send({ message: 'You already like this coin' });
        const newCoin = yield (0, Coins_controller_1.createCoin)(coinId, id);
        return res.json(newCoin);
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
exports.addFavouriteCoin = addFavouriteCoin;
