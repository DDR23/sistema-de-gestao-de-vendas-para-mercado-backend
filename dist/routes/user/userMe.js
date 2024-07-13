"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const schemaUser_1 = __importDefault(require("../../schemas/schemaUser"));
const authenticateToken_1 = __importDefault(require("../../middlewares/authenticateToken"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.get('/me', authenticateToken_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE O USUARIO EXISTE
        const user = await schemaUser_1.default.findById(req.user.id).select('USER_NAME USER_EMAIL USER_DELETED');
        //RETORNA O RESULTADO
        return res.status(200).json(user);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Unable to obtain this user due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
