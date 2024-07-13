"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateToken_1 = __importDefault(require("../../middlewares/authenticateToken"));
const schemaProduct_1 = __importDefault(require("../../schemas/schemaProduct"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.get('/', authenticateToken_1.default, async (_, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE PRODUTO
        const products = await schemaProduct_1.default.find().select('_id PRODUCT_NAME PRODUCT_CATEGORY PRODUCT_QUANTITY PRODUCT_PRICE PRODUCT_DELETED');
        //RETORNA O RESULTADO
        res.status(200).json(products);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: `The product list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
            code: 500
        });
    }
});
exports.default = router;
