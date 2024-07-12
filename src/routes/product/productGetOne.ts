//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateToken from '../../middlewares/authenticateToken';
import schemaProduct from '../../schemas/schemaProduct';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('/:id',authenticateToken, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O PRODUTO EXISTE
    const product = await schemaProduct.findById(req.params.id).select('_id PRODUCT_NAME PRODUCT_CATEGORY PRODUCT_QUANTITY PRODUCT_PRICE PRODUCT_DELETED');
    if(!product){
      return res.status(404).json({
        error: 'Product not found',
        messege: `That product you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //RETORNA O RESULTADO
    res.status(200).json(product);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this product due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
