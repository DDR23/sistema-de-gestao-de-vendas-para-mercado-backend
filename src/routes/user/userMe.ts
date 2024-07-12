//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import schemaUser from '../../schemas/schemaUser';
import authenticateToken from '../../middlewares/authenticateToken';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('/me', authenticateToken, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findById((req as any).user.id).select('USER_NAME USER_EMAIL USER_DELETED');

    //RETORNA O RESULTADO
    return res.status(200).json(user);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this user due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
