const connection = require('./connection');

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

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
};