//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateToken from '../../middlewares/authenticateToken';
import schemaCategory from '../../schemas/schemaCategory';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('/', authenticateToken, async (_, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE CATEGORIA
    const category = await schemaCategory.find().select('_id CATEGORY_NAME CATEGORY_DELETED');

    //RETORNA O RESULTADO
    return res.status(200).json(category);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: `The category list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
      code: 500
    });
  }
});

export default router;
