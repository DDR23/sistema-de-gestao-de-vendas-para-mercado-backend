//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateTokenAdmin from '../../middlewares/authenticateTokenAdmin';
import schemaUser from '../../schemas/schemaUser';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('/:id', authenticateTokenAdmin, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findById(req.params.id).select('_id USER_NAME USER_EMAIL USER_ADMIN USER_DELETED createdAt updatedAt');
    if(!user){
      return res.status(404).json({
        error: 'User not found',
        messege: `That user you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

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
