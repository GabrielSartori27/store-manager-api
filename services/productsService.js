const ProductsModel = require('../models/productsModel');

const listAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  if (!products) return { code: 404, message: 'Products not found' };
  return { code: 200, products };
};

const listProductById = async (id) => {
  const product = await ProductsModel.getById(id);
  if (!product) return { code: 404, message: 'Product not found' };
  return { code: 200, product };
};

const validateName = (name) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
};

const addProduct = async (productName) => {
  if (validateName(productName)) return validateName(productName);
  const { id, name } = await ProductsModel.addProduct(productName);
  return { code: 201, id, productName: name };
};

const updateProduct = async (productId, newName) => {
  if (validateName(newName)) return validateName(newName);
  const checkId = await ProductsModel.getById(productId);
  if (!checkId) return { code: 404, message: 'Product not found' };
  await ProductsModel.updateProduct(productId, newName);
  return { code: 200, productId, newName };
};

const deleteProduct = async (id) => {
  const checkId = await ProductsModel.getById(id);
  if (!checkId) return { code: 404, message: 'Product not found' };
  await ProductsModel.deleteProduct(id);
  return { code: 204 };
};

module.exports = {
  listAllProducts,
  listProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};