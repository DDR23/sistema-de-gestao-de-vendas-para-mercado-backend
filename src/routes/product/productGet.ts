//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateToken from '../../middlewares/authenticateToken';
import schemaProduct from '../../schemas/schemaProduct';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('/', authenticateToken, async (_, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE PRODUTO
    const products = await schemaProduct.find().select('_id PRODUCT_NAME PRODUCT_CATEGORY PRODUCT_QUANTITY PRODUCT_PRICE PRODUCT_DELETED');

    //RETORNA O RESULTADO
    res.status(200).json(products);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The product list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
      code: 500
    });
  }
});

export default router;
