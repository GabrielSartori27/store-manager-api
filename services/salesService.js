const SalesModel = require('../models/salesModel');

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

module.exports = {
  getAllSales,
  getSaleById,
};