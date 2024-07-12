//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateToken from '../../middlewares/authenticateToken';
import schemaCart from '../../schemas/schemaCart';
import express from 'express';
const router = express.Router();

// REQUISIÇÃO HTTP
router.get('/:id', authenticateToken, async (req, res) => {
  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O PRODUTO EXISTE
    const cart = await schemaCart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found',
        message: 'The cart you are looking for does not exist in the database.',
        code: 404
      });
    }

    //RETORNA O RESULTADO
    res.status(200).json(cart);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this cart due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
