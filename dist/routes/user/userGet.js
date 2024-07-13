"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateTokenAdmin_1 = __importDefault(require("../../middlewares/authenticateTokenAdmin"));
const schemaUser_1 = __importDefault(require("../../schemas/schemaUser"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.get('/', authenticateTokenAdmin_1.default, async (_, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //BUSCA TODAS AS INFORMAÇÕES DA TABELA USER
        const user = await schemaUser_1.default.find().select('_id USER_NAME USER_EMAIL USER_DELETED USER_ADMIN createdAt updatedAt');
        //RETORNA O RESULTADO
        return res.status(200).json(user);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: `The user list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
            code: 500
        });
    }
});
exports.default = router;
