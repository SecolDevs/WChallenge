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
exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const Users_controller_1 = require("../../database/controllers/Users.controller");
const auth_config_1 = require("../config/auth.config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        const { firstName, lastName, userName, password, favouriteCurrency } = req.body;
        const newPassword = (0, auth_config_1.generatePassword)(password);
        const newUser = { firstName, lastName, userName, password: newPassword, favouriteCurrency };
        const createdUser = yield (0, Users_controller_1.createUser)(newUser);
        return res.json(createdUser);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const findedUser = yield (0, Users_controller_1.findOneUser)({ userName });
    if (findedUser) {
        if ((0, auth_config_1.comparePassword)(password, findedUser.password)) {
            const token = (0, auth_config_1.generateJWT)(findedUser);
            return res.json({ user: findedUser, token });
        }
        else {
            return res.status(404).json({ message: 'userName or password is incorrect' });
        }
    }
    else {
        return res.status(404).json({ message: 'userName or password is incorrect.' });
    }
});
exports.login = login;
