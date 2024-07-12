//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateToken from '../../middlewares/authenticateToken';
import schemaUser from '../../schemas/schemaUser';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.delete('/delete/:id', authenticateToken, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {
    
    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: `That user you're looking for doesn't exist in the database.`,
        code: 404
      });
    };

    //VERIFICA SE O USUARIO JÁ ESTÁ DELETADO
    if (user.USER_DELETED === true) {
      return res.status(400).json({
        error: 'User already deleted',
        message: 'The user is already marked as deleted.',
        code: 400
      });
    }

    //EXECUTA O SOFT DELETE
    user.USER_DELETED = true;
    await user.save();

    //RETORNA O RESULTADO
    return res.status(200).json({
      message: 'user deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This user could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
