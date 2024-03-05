const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();
  if (!sales) return { code: 404, message: 'Sales not found' };
  return { code: 200, sales };
};

const getSaleById = async (id) => {
  const sale = await SalesModel.getSaleById(id);
  if (!sale[0]) return { code: 404, message: 'Sale not found' };
  return { code: 200, sale };
};

const validateFields = (sales) => {
  const result = [];
  sales.forEach((sale) => {
    if (!sale.productId) result.push({ code: 400, message: '"productId" is required' });
    if (!sale.quantity && sale.quantity !== 0) {
 result
      .push({ code: 400, message: '"quantity" is required' }); 
}
    if (sale.quantity <= 0) {
 result.push(
        {
          code: 422,
          message: '"quantity" must be greater than or equal to 1',
        },
      ); 
}
    });
  return result[0];
};

const validateProductId = async (sales) => {
  const promises = sales.map((sale) => ProductsModel.getById(sale.productId));
  const products = await Promise.all(promises);
  let counter = 0;
  products.forEach((product) => {
    if (product) {
      counter += 1;
    }
  });
  if (counter !== products.length) return { code: 404, message: 'Product not found' };
  return false;
};

const addSale = async (sales) => {
  const fieldsResult = validateFields(sales);
  if (fieldsResult) return { code: fieldsResult.code, message: fieldsResult.message };
  const productIdResult = await validateProductId(sales);
  if (productIdResult) return { code: productIdResult.code, message: productIdResult.message };
  const itemsSold = [];
  sales.forEach((sale) => itemsSold.push(sale));
  const saleId = await SalesModel.addSale(sales);
  const createdSale = {
    id: saleId,
    itemsSold,
  };
  return { code: 201, createdSale };
};

const deleteSale = async (id) => {
  const checkId = await SalesModel.getSaleById(id);
  if (!checkId[0]) return { code: 404, message: 'Sale not found' };
  await SalesModel.deleteSale(id);
  return { code: 204 };
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  deleteSale,
};
