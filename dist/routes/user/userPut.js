"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateToken_1 = __importDefault(require("../../middlewares/authenticateToken"));
const schemaUser_1 = __importDefault(require("../../schemas/schemaUser"));
const argon2_1 = __importDefault(require("argon2"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.put('/edit/:id', authenticateToken_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE O USUARIO EXISTE
        const user = await schemaUser_1.default.findById(req.params.id).select('_id');
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: `That user you're looking for doesn't exist in the database.`,
                code: 404
            });
        }
        //PEGA TODOS OS VALORES PARA QUE SEJAM ALTERADOS
        const { USER_NAME, USER_PASSWORD, USER_DELETED } = req.body;
        //VERIFICA SE ALGUM VALOR FOI PASSADO
        if (USER_NAME !== undefined) {
            user.USER_NAME = USER_NAME;
        }
        //VERIFICA SE ALGUM VALOR FOI PASSADO
        if (USER_PASSWORD !== undefined) {
            const hashedPassword = await argon2_1.default.hash(USER_PASSWORD);
            user.USER_PASSWORD = hashedPassword;
        }
        //RETIRA O SOFT DELETE
        if (USER_DELETED === true) {
            return res.status(400).json({
                error: 'Invalid operation',
                message: 'Use the DELETE route to mark a user as deleted.',
                code: 400
            });
        }
        if (USER_DELETED === false) {
            user.USER_DELETED = USER_DELETED;
        }
        //EXECUTA O PUT
        await user.save();
        //RETORNA O RESULTADO
        return res.status(200).json(user);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: 'This user could not be edited due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
