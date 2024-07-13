"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const schemaUser_1 = __importDefault(require("../../schemas/schemaUser"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.post('/register', async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //GUARDA O CONTEÚDO QUE VEM DO BODY
        const { USER_EMAIL, USER_NAME, USER_PASSWORD } = req.body;
        //VERIFICA SE JÁ EXISTE ALGUM USUARIO COM O EMAIL PASSADO NO 'USER_EMAIL'
        const existingUser = await schemaUser_1.default.findOne({ USER_EMAIL });
        if (existingUser) {
            return res.status(409).json({
                error: 'This email already exists',
                message: 'There is already a user with that email in the database.',
                code: 409
            });
        }
        //VERIFICA SE JWT_SECRET ESTÁ DEFINIDO
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({
                error: 'Internal server error',
                message: 'JWT secret is not defined. Please check the server configuration.',
                code: 500
            });
        }
        // CRIPTOGRAFA A SENHA USANDO ARGON2
        const hashedPassword = await argon2_1.default.hash(USER_PASSWORD);
        //EXECUTA O POST
        const newUser = await schemaUser_1.default.create({ USER_EMAIL, USER_NAME, USER_PASSWORD: hashedPassword });
        //GERA UM TOKEN JWT PARA O NOVO USUÁRIO
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, secret, { expiresIn: '20h' });
        //RETORNA O TOKEN
        return res.status(201).json({ token });
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            message: 'This user could not be created due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
