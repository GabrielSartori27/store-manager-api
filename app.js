const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.get('/products', ProductsController.listAllProducts);
app.get('/products/:id', ProductsController.listProductById);
app.post('/products', ProductsController.addNewProduct);
app.put('/products/:id', ProductsController.updateProduct);
app.delete('/products/:id', ProductsController.deleteProduct);
app.get('/sales', SalesController.listAllSales);
app.get('/sales/:id', SalesController.listSaleById);
app.post('/sales', SalesController.addSale);
app.delete('/sales/:id', SalesController.deleteSale);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;