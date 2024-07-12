//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateTokenAdmin from '../../middlewares/authenticateTokenAdmin';
import schemaCategory from '../../schemas/schemaCategory';
import express from 'express';
import capitalize from '../../utils/capitalizeName';
const router = express.Router();

//REQUISIÇÃO HTTP
router.post('/create', authenticateTokenAdmin, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { CATEGORY_NAME } = req.body;
    const capitalizedCategoryName  = capitalize(CATEGORY_NAME.toLowerCase());

    //VERIFICA SE JÁ EXISTE ALGUMA CATEGORIA COM O NOME PASSADO NO 'CATEGORY_NAME'
    const categoryNotUnique = await schemaCategory.findOne({ CATEGORY_NAME: capitalizedCategoryName });
    if (categoryNotUnique) {
      return res.status(409).json({
        error: 'This category already exists',
        message: 'There is already a category with that name in the database.',
        code: 409
      });
    }

    //EXECUTA O POST
    const newCategory = await schemaCategory.create({ CATEGORY_NAME: capitalizedCategoryName });

    //RETORNA O RESULTADO
    return res.status(201).json(newCategory);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This inventory could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
