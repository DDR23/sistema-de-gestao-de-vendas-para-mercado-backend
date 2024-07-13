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
router.get('/:id', authenticateToken_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE O PRODUTO EXISTE
        const cart = await schemaCart_1.default.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({
                error: 'Cart not found',
                message: 'The cart you are looking for does not exist in the database.',
                code: 404
            });
        }
        //RETORNA O RESULTADO
        res.status(200).json(cart);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'Unable to obtain this cart due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
