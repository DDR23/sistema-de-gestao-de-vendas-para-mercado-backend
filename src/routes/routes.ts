//IMPORTAÇÕES
import { Application } from 'express';
import routeHome from './index';
import routeRegister from './auth/authRegister';
import routeLogin from './auth/authLogin';
import routeMe from './user/userMe';
import routeUserGet from './user/userGet';
import routeUserGetOne from './user/userGetOne';
import routeUserPut from './user/userPut';
import routeUserDelete from './user/userDelete';
import routeCategoryPost from './category/categoryPost';
import routeCategoryGet from './category/categoryGet';
import routeCategoryGetOne from './category/categoryGetOne';
import routeCategoryPut from './category/categoryPut';
import routeCategoryDelete from './category/categoryDelete';
import routeProductPost from './product/productPost';
import routeProductGet from './product/productGet';
import routeProductGetOne from './product/productGetOne';
import routeProductPut from './product/productPut';
import routeProductDelete from './product/productDelete';
import routeCartPost from './cart/cartPost';
import routeCartGet from './cart/cartGet';
import routeCartGetOne from './cart/cartGetOne';
import routeCartGetUser from './cart/cartGetUser';
import routeCartPut from './cart/cartPut';

//ESSA FUNÇÃO É CHAMADA NO APP.TS E ELA DETERMINA OS ARQUIVOS COM FUNÇÕES QUE CADA ROTA DEVE DISPARAR
export default function routes(app: Application) {

  //HOME
  app.use('/', routeHome);

  //AUTH
  app.use('/auth', routeRegister);
  app.use('/auth', routeLogin);

  //USER
  
  app.use('/user', routeMe);
  app.use('/user', routeUserGet);
  app.use('/user', routeUserGetOne);
  app.use('/user', routeUserPut);
  app.use('/user', routeUserDelete);

  //CATEGORY
  app.use('/category', routeCategoryPost);
  app.use('/category', routeCategoryGet);
  app.use('/category', routeCategoryGetOne);
  app.use('/category', routeCategoryPut);
  app.use('/category', routeCategoryDelete);

  //PRODUCT
  app.use('/product', routeProductPost);
  app.use('/product', routeProductGet);
  app.use('/product', routeProductGetOne);
  app.use('/product', routeProductPut);
  app.use('/product', routeProductDelete);

  //CART
  app.use('/cart', routeCartPost);
  app.use('/cart', routeCartGet);
  app.use('/cart', routeCartGetOne);
  app.use('/cart', routeCartGetUser);
  app.use('/cart', routeCartPut);
}
