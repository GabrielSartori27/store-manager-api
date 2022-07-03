const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../../services/productsService');
const ProductsModel = require('../../../models/productsModel');

describe('get products from databse', () => {
  before(() => {
    sinon.stub(ProductsModel, 'getAllProducts').resolves();
  });
  after(() => {
    ProductsModel.getAllProducts.restore();
  });
  describe('in case of failure', () => {
    it('return an object with the error message', async () => {
      const result = await ProductsService.listAllProducts();
      expect(result).to.be.deep.equal({ code: 404, message: 'Products not found' });
    })
  })
  describe('in case of success', () => {
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ]
    before(() => {
      ProductsModel.getAllProducts.restore();
      sinon.stub(ProductsModel, 'getAllProducts').resolves(products);
    })
    it('return an object with the products', async () => {
      const result = await ProductsService.listAllProducts();
      expect(result).to.be.deep.equal({ code: 200, products });
    })
  })
})