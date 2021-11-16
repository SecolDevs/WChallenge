"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)('firstName', 'fistName is required').not().isEmpty(),
    (0, express_validator_1.check)('lastName', 'lastName is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'password is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'password must contain only letters and numbers').isAlphanumeric(),
    (0, express_validator_1.check)('password', 'password must be longer than 8 characters').isLength({ min: 8 }),
    (0, express_validator_1.check)('favouriteCurrency', 'favouriteCurrency is required').not().isEmpty(),
], auth_controller_1.register);
router.post('/login', [
    (0, express_validator_1.check)('userName', 'userName is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'password is required').not().isEmpty(),
], auth_controller_1.login);
exports.default = router;
