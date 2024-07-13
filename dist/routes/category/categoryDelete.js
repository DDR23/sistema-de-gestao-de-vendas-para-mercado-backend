"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateTokenAdmin_1 = __importDefault(require("../../middlewares/authenticateTokenAdmin"));
const schemaCategory_1 = __importDefault(require("../../schemas/schemaCategory"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.delete('/delete/:id', authenticateTokenAdmin_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE A CATEGORIA EXISTE
        const category = await schemaCategory_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                error: 'Category not found',
                message: `That category you're looking for doesn't exist in the database.`,
                code: 404
            });
        }
        //VERIFICA SE A CATEGORIA JÁ ESTÁ DELETADA
        if (category.CATEGORY_DELETED === true) {
            return res.status(400).json({
                error: 'Category already deleted',
                message: 'The category is already marked as deleted.',
                code: 400
            });
        }
        //EXECUTA O SOFT DELETE
        category.CATEGORY_DELETED = true;
        await category.save();
        //RETORNA O RESULTADO
        return res.status(200).json({
            message: 'category deleted successfully',
            code: 200
        });
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: 'This category could not be deleted due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
