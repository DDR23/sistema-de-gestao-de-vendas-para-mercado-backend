"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateTokenAdmin_1 = __importDefault(require("../../middlewares/authenticateTokenAdmin"));
const schemaProduct_1 = __importDefault(require("../../schemas/schemaProduct"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.delete('/delete/:id', authenticateTokenAdmin_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE O PRODUTO EXISTE
        const product = await schemaProduct_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                error: 'Product not found',
                message: `That product you're looking for doesn't exist in the database.`,
                code: 404
            });
        }
        //VERIFICA SE O PRODUTO JÁ ESTÁ DELETADO
        if (product.PRODUCT_DELETED === true) {
            return res.status(400).json({
                error: 'Product already deleted',
                message: 'The product is already marked as deleted.',
                code: 400
            });
        }
        //EXECUTA O SOFT DELETE
        product.PRODUCT_DELETED = true;
        await product.save();
        //RETORNA O RESULTADO
        res.status(200).json({
            message: 'Product deleted successfully',
            code: 200
        });
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'This product could not be deleted due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
