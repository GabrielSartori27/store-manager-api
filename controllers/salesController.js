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

const addSale = async (req, res) => {
  const sales = req.body;
  const { code, message, createdSale } = await SalesService.addSale(sales);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(createdSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { code, message } = await SalesService.deleteSale(id);
  if (message) return res.status(code).json({ message });
  return res.status(code).end();
};

module.exports = {
  listAllSales,
  listSaleById,
  addSale,
  deleteSale,
};