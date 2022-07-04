const express = require('express');
const bodyParser = require('body-parser');
const { listAllProducts, listProductById, addNewProduct } = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

app.get('/products', listAllProducts);

app.get('/products/:id', listProductById);

app.post('/products', addNewProduct);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;