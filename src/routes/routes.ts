//IMPORTAÇÕES
import { Application } from 'express';
import routeHome from './index';

//ESSA FUNÇÃO É CHAMADA NO APP.TS E ELA DETERMINA OS ARQUIVOS COM FUNÇÕES QUE CADA ROTA DEVE DISPARAR
export default function routes(app: Application) {

  //HOME
  app.use('/', routeHome);
}
