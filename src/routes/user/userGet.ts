//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateTokenAdmin from '../../middlewares/authenticateTokenAdmin';
import schemaUser from '../../schemas/schemaUser';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('/', authenticateTokenAdmin, async (_, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA USER
    const user = await schemaUser.find().select('_id USER_NAME USER_EMAIL USER_DELETED USER_ADMIN createdAt updatedAt');

    //RETORNA O RESULTADO
    return res.status(200).json(user);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: `The user list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
      code: 500
    });
  }
});

export default router;
