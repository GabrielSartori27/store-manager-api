const sinon = require('sinon');
const { expect } = require('chai');
const { connection } = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');

describe('get products from databse', () => {
  before(async () => {
    const execute = [[
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
        "name": "Escudo do Capitão América",
      }
    ]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  })
    it('return an array ', async () => {
      const response = await ProductsModel.getAllProducts();
      expect(response).to.be.a('array');
    })
    it('the array includes the products', async () => {
      const response = await ProductsModel.getAllProducts();
      expect(response).to.deep.includes(
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
          "name": "Escudo do Capitão América",
        }
      );
    })
  })




