"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CONFIG E IMPORTAÇÕES
const mongoose_1 = __importDefault(require("mongoose"));
// ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelCart = new mongoose_1.default.Schema({
    CART_USER_ID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    CART_PRODUCT: [
        {
            PRODUCT_ID: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            PRODUCT_QUANTITY: {
                type: Number,
                required: true,
                min: [1, 'PRODUCT_QUANTITY cannot be less than 1']
            }
        }
    ],
    CART_PRICE: {
        type: Number,
        default: 0
    },
    CART_STATUS: {
        type: String,
        enum: ['active', 'completed', 'canceled'],
        default: 'active'
    }
}, {
    timestamps: true
});
const schemaCart = mongoose_1.default.model('cart', modelCart);
exports.default = schemaCart;
