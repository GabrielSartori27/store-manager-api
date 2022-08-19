const ProductsService = require('../services/productsService');

const listAllProducts = async (req, res) => {
  const { code, message, products } = await ProductsService.listAllProducts();
  if (!products) return res.status(code).json({ message });
  return res.status(code).json(products);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { code, message, product } = await ProductsService.listProductById(id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(product);
};

const addNewProduct = async (req, res) => {
  const { name } = req.body;
  const { code, message, id, productName } = await ProductsService.addProduct(name);
  if (message) return res.status(code).json({ message });
  return res.status(code).json({ id, name: productName });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { code, message, newName } = await ProductsService.updateProduct(id, name);
  if (message) return res.status(code).json({ message });
  return res.status(code).json({ id, name: newName });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { code, message } = await ProductsService.deleteProduct(id);
  if (message) return res.status(code).json({ message });
  return res.status(code).end();
};

module.exports = {
  listAllProducts,
  listProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};