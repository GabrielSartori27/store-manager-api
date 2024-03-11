const { connection } = require('./connection');

const getAllSales = async () => {
  const [result] = await connection
    .execute('SELECT sales_products.sale_id AS saleId, ' 
      + 'sales_products.product_id AS productId, sales_products.quantity AS quantity, '
      + 'sales.date AS date '
      + 'FROM StoreManager.sales_products ' 
      + 'INNER JOIN StoreManager.sales ' 
      + 'ON sales_products.sale_id = sales.id; ');

  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection
    .execute('SELECT sales_products.product_id AS productId, ' 
      + 'sales_products.quantity AS quantity, sales.date AS date '
      + 'FROM StoreManager.sales_products '
      + 'INNER JOIN StoreManager.sales '
      + 'ON sales_products.sale_id = sales.id AND sales_products.sale_id = ?', [id]);
  return result;
};

const addSale = async (sales) => {
  const [sale] = await connection.execute('INSERT INTO StoreManager.sales () VALUES ()');
  sales.forEach(async (e) => {
    await connection
      .execute('INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)'
        + 'VALUES (?,?,?)', [sale.insertId, e.productId, e.quantity]);
  });
  
  return sale.insertId;
};

const updateSale = async (saleId, products) => {
  const response = await products.map(async (product) => {
    await connection
      .execute('UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? '
        + 'AND product_id = ?', [product.quantity, saleId, product.productId]);
  });
  await Promise.all(response);
  const [result] = await connection
    .execute('SELECT sales_products.product_id AS productId, '
      + 'sales_products.quantity AS quantity '
      + 'FROM StoreManager.sales_products '
      + 'INNER JOIN StoreManager.sales '
      + 'ON sales_products.sale_id = sales.id AND sales_products.sale_id = ?', [saleId]);
  return result;
};

const deleteSale = async (id) => {
  await connection
    .execute('DELETE from StoreManager.sales WHERE id= ?', [id]);
  return true;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
};