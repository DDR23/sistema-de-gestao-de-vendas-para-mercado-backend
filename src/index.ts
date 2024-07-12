//CONFIG. PADRÃO DO EXPRESS
import express from 'express';
const app = express();
app.use(express.json());

//CONFIG. PADRÃO DO CORS
import cors from 'cors';
app.use(cors());

//CONFIG. PADRÃO DO DOTENV
import { config } from 'dotenv';
config();

//EXECUTA A FUNÇÃO DE ROTEAMENTO
import routes from './routes/routes';
routes(app);

//VERIFICA O AMBIENTE DO BANCO E ABRE UMA CONEXÃO COM O SERVIDOR
if (process.env.DB_COLLECTION) {
  app.listen(8080, (err?: Error) => {
    if (err) {
      console.log('Erro ao iniciar o servidor');
    } else {
      console.log(`Servidor de produção aberto.`);
    }
  });
} else {
  app.listen(8080, (err?: Error) => {
    if (err) {
      console.log('Erro ao iniciar o servidor');
    } else {
      console.log(`Servidor de teste aberto.`);
    }
  });
}

export default app;
