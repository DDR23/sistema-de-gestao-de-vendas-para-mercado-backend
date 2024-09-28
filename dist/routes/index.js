"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.get('', async (_, res) => {
    //EXECUTA ESSE BLOCO AO BATER NA ROTA
    try {
        //RETORNA UMA LISTA COM AS ROTAS DISPONIVEIS
        res.status(200).json({
            project: 'projeto---BACKEND---minimarket---OTHERS',
            owner: 'DDR23',
            status: 200
        });
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: `Oops! Estamos passando por alguns contratempos. Estaremos de volta o mais breve possível!`,
            code: 500
        });
    }
});
exports.default = router;
