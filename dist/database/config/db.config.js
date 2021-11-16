"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
/** Object with config DB enviroments  */
exports.dbConfig = {
    development: {
        type: 'sqlite',
        database: './dist/database/databases/devDB.db',
        // synchronize: true,
        logging: false,
        entities: ['./dist/database/entities/*.js'],
    },
    test: {
        type: 'sqlite',
        database: './dist/database/databases/testDB.db',
        // synchronize: true,
        logging: false,
        entities: ['./dist/database/entities/*.js'],
    },
    production: {
        type: 'sqlite',
        database: './dist/database/databases/prodDB.db',
        // synchronize: true,
        logging: false,
        entities: ['./dist/database/entities/*.js'],
    },
};
