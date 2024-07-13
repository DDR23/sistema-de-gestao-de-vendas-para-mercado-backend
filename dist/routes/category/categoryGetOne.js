"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateToken_1 = __importDefault(require("../../middlewares/authenticateToken"));
const schemaCategory_1 = __importDefault(require("../../schemas/schemaCategory"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.get('/:id', authenticateToken_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE A CATEGORIA EXISTE
        const category = await schemaCategory_1.default.findById(req.params.id).select('_id CATEGORY_NAME CATEGORY_DELETED');
        if (!category) {
            return res.status(404).json({
                error: 'Category not found',
                messege: `That category you're looking for doesn't exist in the database.`,
                code: 404
            });
        }
        //RETORNA O RESULTADO
        return res.status(200).json(category);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Unable to obtain this category due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
