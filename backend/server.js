// server.js

// 1. Importa as ferramentas que instalamos
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// 2. Configurações iniciais
const app = express();
const port = process.env.PORT || 3000; // Usa a porta do ambiente ou 3000 como padrão

// 3. Middlewares: preparam nosso servidor para receber dados
app.use(cors()); // Permite que nosso site se comunique com este servidor
app.use(express.json()); // Permite que o servidor entenda dados no formato JSON

// 4. String de Conexão com o MongoDB
// Pega a string de conexão do arquivo .env para segurança
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// 5. A Rota Principal: Onde os dados do quiz vão chegar
// 'POST /submit' é a URL que nosso quiz vai chamar
app.post('/submit', async (req, res) => {
  try {
    // Conecta ao banco de dados
    await client.connect();
    console.log("Conectado ao MongoDB!");

    // Seleciona o banco de dados e a coleção (pense como uma planilha)
    const database = client.db("lixoZeroDB"); // Você pode dar o nome que quiser ao DB
    const results = database.collection("quizResults"); // Onde os resultados serão salvos

    // Pega os dados do quiz que vieram do site (o 'corpo' da requisição)
    const quizData = req.body;
    
    // Insere os dados no banco de dados
    await results.insertOne(quizData);
    console.log("Resultado do quiz inserido com sucesso!");

    // Envia uma resposta de sucesso de volta para o site
    res.status(201).send({ message: "Resultado salvo com sucesso!" });

  } catch (error) {
    console.error("Erro ao salvar no MongoDB", error);
    res.status(500).send({ message: "Erro ao salvar o resultado." });
  } finally {
    // Garante que a conexão com o banco de dados seja fechada
    await client.close();
    console.log("Conexão com MongoDB fechada.");
  }
});

// 6. Inicia o servidor para que ele comece a "ouvir" por requisições
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});