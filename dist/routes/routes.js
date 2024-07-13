"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const index_1 = __importDefault(require("./index"));
const authRegister_1 = __importDefault(require("./auth/authRegister"));
const authLogin_1 = __importDefault(require("./auth/authLogin"));
const userMe_1 = __importDefault(require("./user/userMe"));
const userGet_1 = __importDefault(require("./user/userGet"));
const userGetOne_1 = __importDefault(require("./user/userGetOne"));
const userPut_1 = __importDefault(require("./user/userPut"));
const userDelete_1 = __importDefault(require("./user/userDelete"));
const categoryPost_1 = __importDefault(require("./category/categoryPost"));
const categoryGet_1 = __importDefault(require("./category/categoryGet"));
const categoryGetOne_1 = __importDefault(require("./category/categoryGetOne"));
const categoryPut_1 = __importDefault(require("./category/categoryPut"));
const categoryDelete_1 = __importDefault(require("./category/categoryDelete"));
const productPost_1 = __importDefault(require("./product/productPost"));
const productGet_1 = __importDefault(require("./product/productGet"));
const productGetOne_1 = __importDefault(require("./product/productGetOne"));
const productPut_1 = __importDefault(require("./product/productPut"));
const productDelete_1 = __importDefault(require("./product/productDelete"));
const cartPost_1 = __importDefault(require("./cart/cartPost"));
const cartGet_1 = __importDefault(require("./cart/cartGet"));
const cartGetOne_1 = __importDefault(require("./cart/cartGetOne"));
const cartGetUser_1 = __importDefault(require("./cart/cartGetUser"));
const cartPut_1 = __importDefault(require("./cart/cartPut"));
//ESSA FUNÇÃO É CHAMADA NO APP.TS E ELA DETERMINA OS ARQUIVOS COM FUNÇÕES QUE CADA ROTA DEVE DISPARAR
function routes(app) {
    //HOME
    app.use('/', index_1.default);
    //AUTH
    app.use('/auth', authRegister_1.default);
    app.use('/auth', authLogin_1.default);
    //USER
    app.use('/user', userMe_1.default);
    app.use('/user', userGet_1.default);
    app.use('/user', userGetOne_1.default);
    app.use('/user', userPut_1.default);
    app.use('/user', userDelete_1.default);
    //CATEGORY
    app.use('/category', categoryPost_1.default);
    app.use('/category', categoryGet_1.default);
    app.use('/category', categoryGetOne_1.default);
    app.use('/category', categoryPut_1.default);
    app.use('/category', categoryDelete_1.default);
    //PRODUCT
    app.use('/product', productPost_1.default);
    app.use('/product', productGet_1.default);
    app.use('/product', productGetOne_1.default);
    app.use('/product', productPut_1.default);
    app.use('/product', productDelete_1.default);
    //CART
    app.use('/cart', cartPost_1.default);
    app.use('/cart', cartGet_1.default);
    app.use('/cart', cartGetOne_1.default);
    app.use('/cart', cartGetUser_1.default);
    app.use('/cart', cartPut_1.default);
}
