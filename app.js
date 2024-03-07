const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const swagger_path = path.resolve(__dirname, './swagger.yaml');
const file = fs.readFileSync(swagger_path, 'utf8');
const swaggerDocument = YAML.parse(file);
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/products/search', ProductsController.searchProduct);
app.get('/products', ProductsController.listAllProducts);
app.get('/products/:id', ProductsController.listProductById);
app.post('/products', ProductsController.addNewProduct);
app.put('/products/:id', ProductsController.updateProduct);
app.delete('/products/:id', ProductsController.deleteProduct);
app.get('/sales', SalesController.listAllSales);
app.get('/sales/:id', SalesController.listSaleById);
app.post('/sales', SalesController.addSale);
app.put('/sales/:id', SalesController.updateSale);
app.delete('/sales/:id', SalesController.deleteSale);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;