const productsModel = require('../models/productsModel');

const lisAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (!products) return false;
  return products;
};

module.exports = {
  lisAllProducts,
};