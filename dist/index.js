"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DO EXPRESS
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//CONFIG. PADRÃO DO CORS
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
//CONFIG. PADRÃO DO DOTENV
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//EXECUTA A FUNÇÃO DE CONEXÃO COM O BANCO DE DADOS
const conn_1 = __importDefault(require("./db/conn"));
(0, conn_1.default)();
//EXECUTA A FUNÇÃO DE ROTEAMENTO
const routes_1 = __importDefault(require("./routes/routes"));
(0, routes_1.default)(app);
//VERIFICA O AMBIENTE DO BANCO E ABRE UMA CONEXÃO COM O SERVIDOR
if (process.env.DB_COLLECTION) {
    app.listen(8080, (err) => {
        if (err) {
            console.log('Erro ao iniciar o servidor');
        }
        else {
            console.log(`Servidor de produção aberto.`);
        }
    });
}
else {
    app.listen(8080, (err) => {
        if (err) {
            console.log('Erro ao iniciar o servidor');
        }
        else {
            console.log(`Servidor de teste aberto.`);
        }
    });
}
exports.default = app;
