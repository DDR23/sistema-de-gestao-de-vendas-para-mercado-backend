import { config } from 'dotenv';
config();

//ATRIBUI VALOR AS VARIÁVEIS DE ACORDO COM A EXISTENCIA DAS VARIAVEIS DE AMBIENTE
export const DB_USER = process.env.DB_USER || process.env.LOCAL_DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD || process.env.LOCAL_DB_PASSWORD;
export const DB_CLUSTER = process.env.DB_CLUSTER || process.env.LOCAL_DB_CLUSTER;
export const DB_COLLECTION = process.env.DB_COLLECTION || process.env.LOCAL_DB_COLLECTION;
