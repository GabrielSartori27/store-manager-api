const ProductsModel = require('../models/productsModel');

const listAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  if (!products) return { code: 404, message: 'Products not found' };
  return { code: 200, products };
};

const addProduct = async (productName) => {
  if (!productName) return { code: 400, message: '"name" is required' };
  if (productName.length < 5) return { code: 422, message: '"name" length must be at least 5 characters long' };
  const {id, name} = await ProductsModel.addProduct(productName);
  return { code: 201, id, productName: name};
}

module.exports = {
  listAllProducts,
  addProduct,
};