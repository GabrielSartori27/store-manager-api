const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

app.get('/products', ProductsController.listAllProducts);

app.get('/products/:id', ProductsController.listProductById);

app.post('/products', ProductsController.addNewProduct);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;