//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateToken from '../../middlewares/authenticateToken';
import authenticateTokenAdmin from '../../middlewares/authenticateTokenAdmin';
import schemaCart from '../../schemas/schemaCart';
import express from 'express';
const router = express.Router();

// REQUISIÇÃO HTTP
router.get('/', authenticateTokenAdmin, async (_, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE PRODUTO
    const carts = await schemaCart.find()

    //RETORNA O RESULTADO
    res.status(200).json(carts);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'The cart list could not be retrieved due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
