"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const schemaProduct_1 = __importDefault(require("../../schemas/schemaProduct"));
const express_1 = __importDefault(require("express"));
const authenticateTokenAdmin_1 = __importDefault(require("../../middlewares/authenticateTokenAdmin"));
const schemaCategory_1 = __importDefault(require("../../schemas/schemaCategory"));
const capitalizeName_1 = __importDefault(require("../../utils/capitalizeName"));
const router = express_1.default.Router();
//REQUISIÇÃO HTTP
router.put('/edit/:id', authenticateTokenAdmin_1.default, async (req, res) => {
    //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
    try {
        //VERIFICA SE O PRODUTO EXISTE
        const product = await schemaProduct_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                error: 'Product not found',
                message: `That product you're looking for doesn't exist in the database.`,
                code: 404
            });
        }
        //PEGA TODOS OS VALORES PARA QUE SEJAM ALTERADOS
        const { PRODUCT_NAME, PRODUCT_CATEGORY, PRODUCT_QUANTITY, PRODUCT_PRICE, PRODUCT_DELETED } = req.body;
        //ESSE RESPONSÁVEL POR EDITAR O 'PRODUCT_NAME'
        //TORNA O CAMPO 'PRODUCT_NAME' OPCIONAL E SE ALGUM VALOR FOI PASSADO
        if (PRODUCT_NAME !== undefined) {
            const capitalizedNewProductName = (0, capitalizeName_1.default)(PRODUCT_NAME.toLowerCase());
            //VERIFICA SE O VALOR PASSADO JA EXISTE NO BANCO E RETORNA ERRO
            const productNotUnique = await schemaProduct_1.default.findOne({ PRODUCT_NAME: capitalizedNewProductName });
            if (productNotUnique) {
                return res.status(409).json({
                    error: 'This product already exists',
                    message: 'There is already a product with that name in the database.',
                    code: 409
                });
            }
            //SALVA O NOVO VALOR
            product.PRODUCT_NAME = capitalizedNewProductName;
        }
        //VERIFICA SE ALGUM VALOR FOI PASSADO
        if (PRODUCT_CATEGORY !== undefined) {
            //VERIFICA SE O VALOR PASSADO JA EXISTE NO BANCO E RETORNA ERRO
            const categoryExists = await schemaCategory_1.default.findOne({ _id: PRODUCT_CATEGORY });
            if (!categoryExists) {
                return res.status(404).json({
                    error: 'Category not found',
                    message: `That category you're looking for doesn't exist in the database.`,
                    code: 404
                });
            }
            //SALVA O NOVO VALOR
            product.PRODUCT_CATEGORY = PRODUCT_CATEGORY;
        }
        //VERIFICA SE ALGUM VALOR FOI PASSADO
        if (PRODUCT_QUANTITY !== undefined) {
            product.PRODUCT_QUANTITY = PRODUCT_QUANTITY;
        }
        //VERIFICA SE ALGUM VALOR FOI PASSADO
        if (PRODUCT_PRICE !== undefined) {
            product.PRODUCT_PRICE = PRODUCT_PRICE;
        }
        //RETIRA O SOFT DELETE
        if (PRODUCT_DELETED === true) {
            return res.status(400).json({
                error: 'Invalid operation',
                message: 'Use the DELETE route to mark a product as deleted.',
                code: 400
            });
        }
        if (PRODUCT_DELETED === false) {
            product.PRODUCT_DELETED = PRODUCT_DELETED;
        }
        //EXECUTA O PUT
        await product.save();
        //RETORNA O RESULTADO
        res.status(200).json(product);
        //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'This product could not be edited due to an internal server error. Please try again later.',
            code: 500
        });
    }
});
exports.default = router;
