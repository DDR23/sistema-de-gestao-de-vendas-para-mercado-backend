//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import schemaUser from '../../schemas/schemaUser';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.post('/login', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { USER_EMAIL, USER_PASSWORD } = req.body;

    //VERIFICA SE O USUÁRIO EXISTE
    const user = await schemaUser.findOne({ USER_EMAIL });
    if (!user) {
      return res.status(400).json({
        error: 'Auth failed',
        message: 'Auth failed due to an internal server error. Please try again later.',
        code: 400
      });
    }

    //VERIFICA A SENHA USANDO ARGON2
    const isPasswordValid = await argon2.verify(user.USER_PASSWORD, USER_PASSWORD);
    if(!isPasswordValid) {
      return res.status(400).json({
        error: 'Auth failed',
        message: 'Auth failed due to an internal server error. Please try again later.',
        code: 400
      });
    }

    //VERIFICA SE JWT_SECRET ESTÁ DEFINIDO
    const secret = process.env.JWT_SECRET;
    const secretAdmin = process.env.JWT_SECRET_ADMIN;
    if (!secret || !secretAdmin) {
      return res.status(500).json({
        error: 'Internal server error',
        message: 'JWT secret is not defined. Please check the server configuration.',
        code: 500
      });
    }

    //GERA E RETORNA UM TOKEN JTW
    const { USER_ADMIN } = user
    if(USER_ADMIN === true) {
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: '20h' });
      const tokenAdmin = jwt.sign({ id: user._id }, secretAdmin, { expiresIn: '20h' });
      return res.status(200).json({ token, tokenAdmin });
    } else {
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: '20h' });
      return res.status(200).json({ token });
    }

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Internal server error',
      code: 500
    });
  }
});

export default router;
