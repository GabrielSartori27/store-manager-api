const SalesService = require('../services/salesService');

const listAllSales = async (req, res) => {
  const { code, message, sales } = await SalesService.getAllSales();
  if (message) return res.status(code).json({ message });
  return res.status(code).json(sales);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const { code, message, sale } = await SalesService.getSaleById(id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(sale);
};

module.exports = {
  listAllSales,
  listSaleById,
};