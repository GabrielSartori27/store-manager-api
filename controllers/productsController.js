const ProductsService = require('../services/productsService');

const listAllProducts = async (req, res) => {
  const { code, message, products } = await ProductsService.listAllProducts();
  if (!products) return res.status(code).json({ message });
  return res.status(code).json(products);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { code, products } = await ProductsService.listAllProducts();
  const product = products.find((element) => element.id === Number(id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(code).json(product);
};

const addNewProduct = async (req, res) => {
  const { name } = req.body;
  const { code, message, id, productName } = await ProductsService.addProduct(name);
  if (message) return res.status(code).json({ message });
  return res.status(code).json({ id, name: productName });
};

module.exports = {
  listAllProducts,
  listProductById,
  addNewProduct,
};