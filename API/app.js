const express = require('express');
const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');
const routes = require('./routers/route');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(db_mongoose.connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connected Successfully');
  })
  .catch((err) => {
    console.error('Erro de conexão com o banco de dados:', err);
  });

app.use(routes);

app.listen(8081, function(){
  console.log("Servidor rodando na url http://localhost:8081");
});
