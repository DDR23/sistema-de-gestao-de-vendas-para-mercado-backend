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
router.get('/', authenticateToken_1.default, async (_, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE CATEGORIA
        const category = await schemaCategory_1.default.find().select('_id CATEGORY_NAME CATEGORY_DELETED');
        //RETORNA O RESULTADO
        return res.status(200).json(category);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: `The category list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
            code: 500
        });
    }
});
exports.default = router;
