"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG E IMPORTAÇÕES
const mongoose_1 = __importDefault(require("mongoose"));
//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelUser = new mongoose_1.default.Schema({
    USER_NAME: {
        type: String,
        required: true
    },
    USER_EMAIL: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor, insira um email válido']
    },
    USER_PASSWORD: {
        type: String,
        required: true
    },
    USER_ADMIN: {
        type: Boolean,
        default: 'false'
    },
    USER_DELETED: {
        type: Boolean,
        default: 'false'
    },
}, {
    timestamps: true
});
const schemaUser = mongoose_1.default.model('user', modelUser);
exports.default = schemaUser;
