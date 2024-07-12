//CONFIG E IMPORTAÇÕES
import mongoose from 'mongoose';

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelCategory = new mongoose.Schema(
  {
    CATEGORY_NAME: {
      type: String,
      required: true
    },
    CATEGORY_DELETED: {
      type: Boolean,
      default: 'false'
    }
  }
);

const schemaCategory = mongoose.model('category', modelCategory);
export default schemaCategory;
