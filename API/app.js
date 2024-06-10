const express = require('express');
const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');
const routes = require('./routers/route');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(db_mongoose.connection).then(() => {
    console.log('Conectado');
}).catch(() => {
    console.log('Erro de conexão com o banco de dados');
});


app.use(routes);

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});