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
exports.connectToDB = void 0;
const typeorm_1 = require("typeorm");
const db_config_1 = require("./db.config");
/** Initialize connection with DB */
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    let env = process.env.NODE_ENV;
    yield (0, typeorm_1.createConnection)(db_config_1.dbConfig[env]);
});
exports.connectToDB = connectToDB;
