//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateTokenAdmin from '../../middlewares/authenticateTokenAdmin';
import schemaCategory from '../../schemas/schemaCategory';
import schemaProduct from '../../schemas/schemaProduct';
import express from 'express';
import capitalize from '../../utils/capitalizeName';
const router = express.Router();

//REQUISIÇÃO HTTP
router.post('/create', authenticateTokenAdmin, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    let { PRODUCT_NAME, PRODUCT_CATEGORY, PRODUCT_QUANTITY, PRODUCT_PRICE } = req.body;
    const capitalizedProductName = capitalize(PRODUCT_NAME.toLowerCase());

    //VERIFICA SE JÁ EXISTE ALGUM PRODUTO COM O NOME PASSADO NO 'PRODUCT_NAME'
    const productNameNotUnique = await schemaProduct.findOne({ PRODUCT_NAME: capitalizedProductName });
    if (productNameNotUnique) {
      return res.status(409).json({
        error: 'This product already exists',
        message: 'A product with that name already exists in the database.',
        code: 409
      });
    }

    //VERIFICA SE A CATEGORIA EXISTE 
    const categoryExists = await schemaCategory.findOne({ _id: PRODUCT_CATEGORY });
    if (!categoryExists) {
      return res.status(404).json({
        error: 'Category not found',
        message: 'The specified category does not exist in the database.',
        code: 404
      });
    }

    //VERIFICA SE A CATEGORIA ESTA DELETADA 
    if (categoryExists.CATEGORY_DELETED) {
      return res.status(400).json({
        error: 'Category deleted',
        message: 'The specified category has been marked as deleted. Use the PUT method to remove the soft delete.',
        code: 400
      })
    }

    //EXECUTA O POST
    const newProduct = await schemaProduct.create({ PRODUCT_NAME: capitalizedProductName, PRODUCT_CATEGORY, PRODUCT_QUANTITY, PRODUCT_PRICE });

    //RETORNA O RESULTADO
    res.status(201).json(newProduct);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This product could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
