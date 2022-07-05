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

const getById = async (id) => {
  const [result] = await connection
    .execute('SELECT id FROM StoreManager.products WHERE id = ?', [id]);

  return result[0];
};

const updateProduct = async (id, newName) => {
    await connection
      .execute('UPDATE StoreManager.products SET name= ? WHERE id= ?', [newName, id]);
    return { id, name: newName };
};

const deleteProduct = async (id) => {
  await connection
    .execute('DELETE from StoreManager.products WHERE id= ?', [id]);
};

module.exports = {
  getAllProducts,
  addProduct,
  getById,
  updateProduct,
  deleteProduct,
};