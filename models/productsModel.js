const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT id, name FROM StoreManager.products');

  return result;
};

module.exports = {
  getAllProducts,
};