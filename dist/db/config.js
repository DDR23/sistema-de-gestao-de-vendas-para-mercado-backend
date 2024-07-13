"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_COLLECTION = exports.DB_CLUSTER = exports.DB_PASSWORD = exports.DB_USER = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//ATRIBUI VALOR AS VARIÁVEIS DE ACORDO COM A EXISTENCIA DAS VARIAVEIS DE AMBIENTE
exports.DB_USER = process.env.DB_USER || process.env.LOCAL_DB_USER;
exports.DB_PASSWORD = process.env.DB_PASSWORD || process.env.LOCAL_DB_PASSWORD;
exports.DB_CLUSTER = process.env.DB_CLUSTER || process.env.LOCAL_DB_CLUSTER;
exports.DB_COLLECTION = process.env.DB_COLLECTION || process.env.LOCAL_DB_COLLECTION;
