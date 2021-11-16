"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = exports.comparePassword = exports.generatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rounds = Number(process.env.AUTH_ROUNDS); // Get number of rounds from .env file
const secret = process.env.AUTH_SECRET; // Get secre from .env file
const expiresIn = process.env.AUTH_EXPIRES; // Get expiresIn date from .env file
/**
 * Generate hash password
 * @param password raw password
 * @returns hashed password
 */
const generatePassword = (password) => {
    return bcrypt_1.default.hashSync(password, rounds);
};
exports.generatePassword = generatePassword;
/**
 * Compares password and returns if is the same or not
 * @param password Raw password
 * @param encryptedPassword Hashed password
 * @returns boolean with result of comparison
 */
const comparePassword = (password, encryptedPassword) => {
    return bcrypt_1.default.compareSync(password, encryptedPassword);
};
exports.comparePassword = comparePassword;
/**
 * Sign jwt
 * @param user object to save into jwt
 * @returns jwt string with user inside
 */
const generateJWT = (user) => {
    return jsonwebtoken_1.default.sign({ user }, secret, { expiresIn });
};
exports.generateJWT = generateJWT;
/**
 * Verifies if token is valid and returns the user inside token or throws an exception
 * @param token string with token to compare
 * @returns decoded user or throw exception
 */
const verifyJWT = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        throw 'Invalid Token';
    }
};
exports.verifyJWT = verifyJWT;
