"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateTokenAdmin_1 = __importDefault(require("../../middlewares/authenticateTokenAdmin"));
const schemaCart_1 = __importDefault(require("../../schemas/schemaCart"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// REQUISIÇÃO HTTP
router.get('/', authenticateTokenAdmin_1.default, async (_, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE PRODUTO
        const carts = await schemaCart_1.default.find();
        //RETORNA O RESULTADO
        res.status(200).json(carts);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'The cart list could not be retrieved due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
