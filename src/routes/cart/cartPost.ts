//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import authenticateToken from '../../middlewares/authenticateToken';
import schemaCart from '../../schemas/schemaCart';
import schemaProduct from '../../schemas/schemaProduct'; // Importe o schema de produto
import express from 'express';
import schemaUser from '../../schemas/schemaUser';
const router = express.Router();

//REQUISIÇÃO HTTP - POST
router.post('/create', authenticateToken, async (req, res) => {
  try {
    let { CART_USER_ID, CART_PRODUCT, CART_STATUS } = req.body;

    //VERIFICA SE O USUARIO EXISTE
    const userExists = await schemaUser.findOne({ _id: CART_USER_ID });
    if(!userExists){
      return res.status(404).json({
        error: 'User not found',
        message: 'The specified user does not exist in the database.',
        code: 404
      });
    }

    //VERIFICA SE O USUARIO ESTA DELETADO
    if(userExists.USER_DELETED) {
      return res.status(400).json({
        error: 'User deleted',
        message: 'The specified user has been marked as deleted. Use the PUT method to remove the soft delete.',
        code: 400
      })
    }

    let totalPrice = 0;
    for (const productItem of CART_PRODUCT) {
      //VERIFICA SE O PRODUTO EXISTE NO ESTOQUE
      const productInStock = await schemaProduct.findOne({ _id: productItem.PRODUCT_ID });
      if (!productInStock) {
        return res.status(404).json({
          error: 'Product not found',
          message: 'The specified product does not exist in the database.',
          code: 404
        });
      }

      //VERIFICA SE O PRODUTO ESTA DELETADO
      if(productInStock.PRODUCT_DELETED) {
        return res.status(400).json({
          error: 'Product deleted',
          message: 'The specified product has been marked as deleted. Use the PUT method to remove the soft delete.',
          code: 400
        })
      }

      //VERIFICA SE EXISTE A QUANTIDADE NECESSARIA
      if (productInStock.PRODUCT_QUANTITY < productItem.PRODUCT_QUANTITY) {
        return res.status(400).json({
          error: 'Insufficient stock',
          message: 'The quantity in stock is less than the quantity in the cart.',
          code: 400
        });
      }
      //ATUALIZA O VALOR FINAL DO CARRINHO
      totalPrice += productInStock.PRODUCT_PRICE * productItem.PRODUCT_QUANTITY;
    }

    //EXECUTA O POST
    const newCart = await schemaCart.create({ CART_USER_ID, CART_PRODUCT, CART_STATUS, CART_PRICE: totalPrice });

    //ATUALIZA A QUANTIDADE DO BANCO
    for (const cartProduct of CART_PRODUCT) {
      const product = await schemaProduct.findOne({ _id: cartProduct.PRODUCT_ID });
      if (product) {
        product.PRODUCT_QUANTITY -= cartProduct.PRODUCT_QUANTITY;
        await product.save(); //
      }
    }

    //RETORNA O RESULTADO
    res.status(201).json(newCart);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This cart could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

export default router;
