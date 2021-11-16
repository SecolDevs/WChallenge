"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const coins_controller_1 = require("../controllers/coins.controller");
const isAuth_middleware_1 = __importDefault(require("../middlewares/isAuth.middleware"));
const router = (0, express_1.Router)();
router.use(isAuth_middleware_1.default);
router.get('/all', coins_controller_1.getAllCoins);
router.get('/favourite', coins_controller_1.getFavouriteCoins);
router.post('/favourite', [(0, express_validator_1.check)('coinId', 'coinId is required').not().isEmpty()], coins_controller_1.addFavouriteCoin);
exports.default = router;
