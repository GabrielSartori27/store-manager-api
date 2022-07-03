const ProductsModel = require('../models/productsModel');

const listAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  if (!products) return { code: 404, message: 'Products not found' };
  return { code: 200, products };
};

module.exports = {
  listAllProducts,
};