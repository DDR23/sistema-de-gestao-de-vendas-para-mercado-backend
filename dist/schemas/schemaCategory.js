"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG E IMPORTAÇÕES
const mongoose_1 = __importDefault(require("mongoose"));
//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelCategory = new mongoose_1.default.Schema({
    CATEGORY_NAME: {
        type: String,
        required: true
    },
    CATEGORY_DELETED: {
        type: Boolean,
        default: 'false'
    }
});
const schemaCategory = mongoose_1.default.model('category', modelCategory);
exports.default = schemaCategory;
