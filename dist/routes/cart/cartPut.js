"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const authenticateTokenAdmin_1 = __importDefault(require("../../middlewares/authenticateTokenAdmin"));
const schemaCart_1 = __importDefault(require("../../schemas/schemaCart"));
const express_1 = __importDefault(require("express"));
const schemaProduct_1 = __importDefault(require("../../schemas/schemaProduct"));
const router = express_1.default.Router();
// REQUISIÇÃO HTTP
router.put('/edit/:id', authenticateTokenAdmin_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE O CARRINHO EXISTE
        const cart = await schemaCart_1.default.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({
                error: 'Cart not found',
                message: 'The cart you are looking for does not exist in the database.',
                code: 404
            });
        }
        //SALVA O NOVO VALOR
        const { CART_STATUS } = req.body;
        //SE CANCELED ESTORNA OS PRODUTOS NO CARRINHO E APAGA O CARRINHO
        if (CART_STATUS === 'canceled') {
            for (const productItem of cart.CART_PRODUCT) {
                const productInStock = await schemaProduct_1.default.findById(productItem.PRODUCT_ID);
                if (productInStock) {
                    productInStock.PRODUCT_QUANTITY += productItem.PRODUCT_QUANTITY;
                    await productInStock.save();
                }
            }
            //EXECUTA O PUT
            cart.CART_STATUS = CART_STATUS;
            await cart.save();
            //RETORNA O RESULTADO
            return res.status(200).json({
                message: 'Cart canceled and product quantities restored',
                code: 200
            });
            //SE COMPLETED SETA O CARRINHO COMO PAGO
        }
        else if (CART_STATUS === 'completed') {
            cart.CART_STATUS = CART_STATUS;
            //EXECUTA O PUT
            await cart.save();
            //RETORNA O RESULTADO
            return res.status(200).json(cart);
            //RETORNA ERRO CASO O VALOR PASSADO NAO SEJA OS ESPERADOS
        }
        else {
            return res.status(400).json({
                error: 'Invalid status',
                message: `The provided status is not valid. Valid statuses are 'complete' and 'canceled'.`,
                code: 400
            });
        }
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'This cart could not be edited due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
