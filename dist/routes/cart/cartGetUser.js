"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateToken_1 = __importDefault(require("../../middlewares/authenticateToken"));
const schemaCart_1 = __importDefault(require("../../schemas/schemaCart"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// REQUISIÇÃO HTTP
router.get('/user/:userId', authenticateToken_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //PEGA O ID DO USUARIO
        const { userId } = req.params;
        //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE PRODUTO
        const carts = await schemaCart_1.default.find({ CART_USER_ID: userId });
        //VERIFICAR SE EXISTE ALGUM CARRINHO PERTENCENTE A ESSE USUARIO
        if (carts.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'No cart found for this user.',
                code: 404
            });
        }
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
