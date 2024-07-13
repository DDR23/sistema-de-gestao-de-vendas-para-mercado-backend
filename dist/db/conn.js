"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = conn;
//MONGOOSE DEFAULT CONFIGURATION
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
//FUNÇÃO DE CONEXÃO
async function conn() {
    // VERIFICA SE A CREDENCIAL DE CONEXÃO ESTÁ DEFINIDA
    if (!config_1.DB_USER || !config_1.DB_PASSWORD || !config_1.DB_CLUSTER || !config_1.DB_COLLECTION) {
        throw new Error('Uma ou mais variáveis de conexão estão vazias');
    }
    //TENTA INICIAR UMA CONEXÃO
    try {
        await mongoose_1.default.connect(`mongodb+srv://${config_1.DB_USER}:${config_1.DB_PASSWORD}@${config_1.DB_CLUSTER}.mongodb.net/${config_1.DB_COLLECTION}`);
        console.log('Conexão com o MongoDB realizada.');
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (err) {
        console.log('Erro na conexão com mongoDB', err);
    }
}
