//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateTokenAdmin from '../../middlewares/authenticateTokenAdmin';
import schemaCategory from '../../schemas/schemaCategory';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.delete('/delete/:id', authenticateTokenAdmin, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A CATEGORIA EXISTE
    const category = await schemaCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        error: 'Category not found',
        message: `That category you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //VERIFICA SE A CATEGORIA JÁ ESTÁ DELETADA
    if (category.CATEGORY_DELETED === true) {
      return res.status(400).json({
        error: 'Category already deleted',
        message: 'The category is already marked as deleted.',
        code: 400
      });
    }
    
    //EXECUTA O SOFT DELETE
    category.CATEGORY_DELETED = true;
    await category.save();

    //RETORNA O RESULTADO
    return res.status(200).json({
      message: 'category deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This category could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
