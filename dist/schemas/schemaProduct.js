"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CONFIG E IMPORTAÇÕES
const mongoose_1 = __importDefault(require("mongoose"));
// ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelProduct = new mongoose_1.default.Schema({
    PRODUCT_NAME: {
        type: String,
        required: true
    },
    PRODUCT_CATEGORY: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    PRODUCT_QUANTITY: {
        type: Number,
        required: true,
        min: [0, 'PRODUCT_QUANTITY cannot be negative']
    },
    PRODUCT_PRICE: {
        type: Number,
        required: true,
        min: [0, 'PRODUCT_PRICE cannot be negative']
    },
    PRODUCT_DELETED: {
        type: Boolean,
        default: 'false'
    }
});
const schemaProduct = mongoose_1.default.model('product', modelProduct);
exports.default = schemaProduct;
