const express = require('express');
const pool = require('./src/db/Conexao');  // Importa o pool de conexões
require('dotenv').config();               // Carrega variáveis do .env

const app = express();
const port = process.env.PORT || 6000;    // Usa a variável de ambiente PORT ou 6000 por padrão

// Rota principal
app.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Erro de conexão ao banco de dados:', err);
      return res.status(500).send('Erro de conexão ao banco de dados');
    }

    // Consultando o banco de dados para verificar a data/hora atual
    connection.query('SELECT NOW()', (error, results) => {
      connection.release(); // Libera a conexão para o pool

      if (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        return res.status(500).send('Erro ao consultar o banco de dados');
      }

      res.send('Backend está funcionando. Data e Hora do Banco: ' + results[0]['NOW()']);
    });
  });
});

// O servidor começa a escutar na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
