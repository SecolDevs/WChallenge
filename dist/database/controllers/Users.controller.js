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
exports.findOneUser = exports.createUser = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Users_entity_1 = require("../entities/Users.entity");
/**
 * @param user Object with user data to insert into database
 * @returns Create user or throws error
 */
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = (0, typeorm_1.getRepository)(Users_entity_1.Users).create(user);
    const errors = yield (0, class_validator_1.validate)(newUser);
    if (errors.length > 0) {
        throw errors;
    }
    else {
        return yield (0, typeorm_1.getRepository)(Users_entity_1.Users).save(newUser);
    }
});
exports.createUser = createUser;
/**
 * @param user Object to get users from database
 * @returns finded user
 */
const findOneUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userResponse = yield (0, typeorm_1.getRepository)(Users_entity_1.Users).findOne(user);
    return userResponse;
});
exports.findOneUser = findOneUser;
