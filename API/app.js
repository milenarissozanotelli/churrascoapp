const express = require('express');
const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');
const routes = require('./routers/route');
const bodyParser = require('body-parser');
const authMiddleware = require('./config/authMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(db_mongoose.connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connected Successfully');
  })
  .catch(() => {
    console.log('Erro de conexão com o banco de dados');
  });

// Use authMiddleware on protected routes
app.use('/list', authMiddleware);

app.use(routes);

app.listen(8081, function(){
  console.log("Servidor rodando na url http://localhost:8081");
});
