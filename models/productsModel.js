const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT id, name FROM StoreManager.products');

  return result;
};

const addProduct = async (productName) => {
  const [result] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [productName]);
  
  return { id: result.insertId, name: productName };
};

module.exports = {
  getAllProducts,
  addProduct,
};