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
router.get('/:id', authenticateToken_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE O PRODUTO EXISTE
        const product = await schemaProduct_1.default.findById(req.params.id).select('_id PRODUCT_NAME PRODUCT_CATEGORY PRODUCT_QUANTITY PRODUCT_PRICE PRODUCT_DELETED');
        if (!product) {
            return res.status(404).json({
                error: 'Product not found',
                messege: `That product you're looking for doesn't exist in the database.`,
                code: 404
            });
        }
        //RETORNA O RESULTADO
        res.status(200).json(product);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'Unable to obtain this product due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
