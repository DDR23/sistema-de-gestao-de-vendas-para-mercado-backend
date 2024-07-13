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
router.post('/create', authenticateTokenAdmin_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //GUARDA O CONTEÚDO QUE VEM DO BODY
        const { CATEGORY_NAME } = req.body;
        const capitalizedCategoryName = (0, capitalizeName_1.default)(CATEGORY_NAME.toLowerCase());
        //VERIFICA SE JÁ EXISTE ALGUMA CATEGORIA COM O NOME PASSADO NO 'CATEGORY_NAME'
        const categoryNotUnique = await schemaCategory_1.default.findOne({ CATEGORY_NAME: capitalizedCategoryName });
        if (categoryNotUnique) {
            return res.status(409).json({
                error: 'This category already exists',
                message: 'There is already a category with that name in the database.',
                code: 409
            });
        }
        //EXECUTA O POST
        const newCategory = await schemaCategory_1.default.create({ CATEGORY_NAME: capitalizedCategoryName });
        //RETORNA O RESULTADO
        return res.status(201).json(newCategory);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: 'This inventory could not be created due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
