//CONFIG E IMPORTAÇÕES
import mongoose from 'mongoose';

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const modelUser = new mongoose.Schema(
  {
    USER_NAME: {
      type: String,
      required: true
    },
    USER_EMAIL: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Por favor, insira um email válido']
    },
    USER_PASSWORD: {
      type: String,
      required: true
    },
    USER_ADMIN: {
      type: Boolean,
      default: 'false'
    },
    USER_DELETED: {
      type: Boolean,
      default: 'false'
    },
  },
  { 
    timestamps: true
  }
);

const schemaUser = mongoose.model('user', modelUser);
export default schemaUser;
