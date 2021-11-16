"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinGeckoClientNoTS = exports.coinGeckoClient = void 0;
const coingecko_api_1 = __importDefault(require("coingecko-api"));
/** Create coinGeckoClient using coinGecko types */
exports.coinGeckoClient = new coingecko_api_1.default();
/** Create coinGeckoClient without using types */
exports.coinGeckoClientNoTS = new coingecko_api_1.default();
