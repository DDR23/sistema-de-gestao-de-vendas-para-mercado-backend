//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
import express from 'express';
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('', async (_, res) => {

  //EXECUTA ESSE BLOCO AO BATER NA ROTA
  try {

    //RETORNA UMA LISTA COM AS ROTAS DISPONIVEIS
    res.status(200).json({
      project: 'projeto---minimarket---BACKEND',
      owner: 'DDR23',
      status: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `Oops! Estamos passando por alguns contratempos. Estaremos de volta o mais breve possível!`,
      code: 500
    });
  }
});

export default router;
