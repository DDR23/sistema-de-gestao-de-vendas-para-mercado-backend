//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateToken from '../../middlewares/authenticateToken';
import schemaCategory from '../../schemas/schemaCategory';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('/:id', authenticateToken, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A CATEGORIA EXISTE
    const category = await schemaCategory.findById(req.params.id).select('_id CATEGORY_NAME CATEGORY_DELETED');
    if(!category){
      return res.status(404).json({
        error: 'Category not found',
        messege: `That category you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //RETORNA O RESULTADO
    return res.status(200).json(category);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this category due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
