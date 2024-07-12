// CONFIG E IMPORTAÇÕES
import mongoose from 'mongoose';

// ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelProduct = new mongoose.Schema(
  {
    PRODUCT_NAME: {
      type: String,
      required: true
    },
    PRODUCT_CATEGORY: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true
    },
    PRODUCT_QUANTITY: {
      type: Number,
      required: true,
      min: [0, 'PRODUCT_QUANTITY cannot be negative']
    },
    PRODUCT_PRICE: {
      type: Number,
      required: true,
      min: [0, 'PRODUCT_PRICE cannot be negative']
    },
    PRODUCT_DELETED: {
      type: Boolean,
      default: 'false'
    }
  }
);

const schemaProduct = mongoose.model('product', modelProduct);
export default schemaProduct;
