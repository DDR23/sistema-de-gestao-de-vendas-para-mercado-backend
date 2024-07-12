//MONGOOSE DEFAULT CONFIGURATION
import mongoose from 'mongoose';
import { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_COLLECTION } from './config';

//FUNÇÃO DE CONEXÃO
export default async function conn() {

  // VERIFICA SE A CREDENCIAL DE CONEXÃO ESTÁ DEFINIDA
  if (!DB_USER || !DB_PASSWORD || !DB_CLUSTER || !DB_COLLECTION) {
    throw new Error('Uma ou mais variáveis de conexão estão vazias');
  }

  //TENTA INICIAR UMA CONEXÃO
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_COLLECTION}`);
    console.log('Conexão com o MongoDB realizada.');

    //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (err) {
    console.log('Erro na conexão com mongoDB', err);
  }
}
