const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');
const { response } = require('express');

describe('when calling the controller of listAllProducts', () => {
  describe('when the array is invalid', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsService, 'listAllProducts').resolves({ code: 404, message: 'Products not found' });
    });

    after(() => {
      ProductsService.listAllProducts.restore();
    });

    it('is called the status with code 400', async () => {
      await ProductsController.listAllProducts(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('is called the json with message "Products not found"', async () => {
      await ProductsController.listAllProducts(request, response);
      expect(response.json.calledWith({ message: 'Products not found' })).to.be.equal(true);
    });
    
  })
  describe('when the array is valid', () => {
    const response = {};
    const request = {};
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
      
    ]
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsService, 'listAllProducts').resolves({ code: 200, products });
    });

    after(() => {
      ProductsService.listAllProducts.restore();
    });

    it('is called the status with code 200', async () => {
      await ProductsController.listAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('is called the json with the list of products', async () => {
      await ProductsController.listAllProducts(request, response);
      expect(response.json.calledWith(products)).to.be.equal(true);
    });
  })
})

describe('when calling the controller of listProductById', () => {
  describe('when the id is invalid', () => {
    const request = {};
    const response = {};
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }

    ]
    before(() => {
      request.params = { id: "a" };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsService, 'listAllProducts').resolves({ code: 200, products });
    });
    after(() => {
      ProductsService.listAllProducts.restore();
    });
    it('is called the status with code 404', async () => {
      await ProductsController.listProductById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('is called the json with message "Product not found"', async () => {
      await ProductsController.listProductById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  })
  describe('when the id is valid', () => {
    const response = {};
    const request = {};
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }

    ]
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(ProductsService, 'listAllProducts').resolves({ code: 200, products });
    });

    after(() => {
      ProductsService.listAllProducts.restore();
    });

    it('is called the status with code 200', async () => {
      await ProductsController.listProductById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('is called the json with the product', async () => {
      await ProductsController.listProductById(request, response);
      expect(response.json.calledWith(products[0])).to.be.equal(true);
    });
  })
})

