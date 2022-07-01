const productsService = require('../services/productsService');

const listAllProducts = async (req, res) => {
  const products = await productsService.lisAllProducts();
  if (!products) return res.status(404).json({ message: 'Products not found' });
  return res.status(200).json(products);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const products = await productsService.lisAllProducts();
  const product = products.find((element) => element.id === Number(id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

module.exports = {
  listAllProducts,
  listProductById,
};