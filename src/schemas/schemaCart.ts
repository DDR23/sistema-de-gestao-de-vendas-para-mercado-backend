// CONFIG E IMPORTAÇÕES
import mongoose from 'mongoose';

// ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelCart = new mongoose.Schema(
  {
    CART_USER_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    CART_PRODUCT: [
      {
        PRODUCT_ID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true
        },
        PRODUCT_QUANTITY: {
          type: Number,
          required: true,
          min: [1, 'PRODUCT_QUANTITY cannot be less than 1']
        }
      }
    ],
    CART_PRICE: {
      type: Number,
      default: 0
    },
    CART_STATUS: {
      type: String,
      enum: ['active', 'completed', 'canceled'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

const schemaCart = mongoose.model('cart', modelCart);
export default schemaCart;
