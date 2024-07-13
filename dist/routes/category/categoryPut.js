"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateTokenAdmin_1 = __importDefault(require("../../middlewares/authenticateTokenAdmin"));
const schemaCategory_1 = __importDefault(require("../../schemas/schemaCategory"));
const express_1 = __importDefault(require("express"));
const capitalizeName_1 = __importDefault(require("../../utils/capitalizeName"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.put('/edit/:id', authenticateTokenAdmin_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE O INVENTARIO EXISTE
        const category = await schemaCategory_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                error: 'Category not found',
                message: `That category you're looking for doesn't exist in the database.`,
                code: 404
            });
        }
        //PEGA TODOS OS VALORES PARA QUE SEJAM ALTERADOS
        const { CATEGORY_NAME, CATEGORY_DELETED } = req.body;
        //ESSE RESPONSÁVEL POR EDITAR O 'CATEGORY_NAME'
        //TORNA O CAMPO 'CATEGORY_NAME' OPCIONAL E SE ALGUM VALOR FOI PASSADO
        if (CATEGORY_NAME !== undefined) {
            const capitalizedNewCategoryName = (0, capitalizeName_1.default)(CATEGORY_NAME.toLowerCase());
            //VERIFICA SE O VALOR PASSADO JA EXISTE NO BANCO E RETORNA ERRO
            const categoryNotUnique = await schemaCategory_1.default.findOne({ CATEGORY_NAME: capitalizedNewCategoryName });
            if (categoryNotUnique) {
                return res.status(409).json({
                    error: 'This category already exists',
                    message: 'There is already a category with that name in the database.',
                    code: 409
                });
            }
            //SALVA O NOVO VALOR
            category.CATEGORY_NAME = capitalizedNewCategoryName;
        }
        //RETIRA O SOFT DELETE
        if (CATEGORY_DELETED === true) {
            return res.status(400).json({
                error: 'Invalid operation',
                message: 'Use the DELETE route to mark a category as deleted.',
                code: 400
            });
        }
        if (CATEGORY_DELETED === false) {
            category.CATEGORY_DELETED = CATEGORY_DELETED;
        }
        //EXECUTA O PUT
        await category.save();
        //RETORNA O RESULTADO
        return res.status(200).json(category);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: 'This category could not be edited due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
