const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha = require("mocha");
const mongoose = require("../config/dbTest");
const sinon = require("sinon");
const ProductModel = require("../model/product.model");
const ProductController = require("../control/product.controller");
chai.use(chaiAsPromised); // Use chai-as-promised
//const { done, fail } = require("@sinonjs/referee-sinon");

const productsData = [
  { name: "Venezia-Napoli" },
  { name: "Venezia-Londra" },
  { name: "Venezia-Roma" },
  { name: "Londra-Malpensa" },
];

before(async () => {
  await ProductModel.insertMany(productsData);
});
describe("Test Product Metods", async () => {
  it("Test createProduct", async () => {
    const testProducts = {
      name: "Milano-Tirana",
    };
    try {
      const req = {
        body: testProducts,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.createProduct(req, res);
      sinon.assert.calledWith(res.status, 201);
      const createdProduct = await ProductModel.findByName("Milano-Tirana");
      chai.assert.equal(createdProduct.name, req.body.name, "name created");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllProducts", async () => {
    try {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.getAllProducts(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((fl) => {
        if (fl.name == "Venezia-Napoli") {
          found = true;
          //console.log(us.name);
        }
      });
      chai.assert.isTrue(found, "flight found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getProductByName", async () => {
    try {
      const req = {
        params: {
          name: "Venezia-Napoli",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.getProductByName(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundProduct = res.json.getCall(0).args[0];

      chai.assert.equal(foundProduct.name, "Venezia-Napoli", "name found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test updateProduct", async () => {
    try {
      const req = {
        params: {
          name: "Venezia-Napoli",
        },
        body: {
          name: "NameUpdated",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.updateProduct(req, res);
      const UpdatedProduct = res.json.getCall(0).args[0];
      chai.assert.equal(UpdatedProduct.name, "NameUpdated", "name found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
  it("Test deleteProduct", async () => {
    try {
      const req = {
        params: {
          name: "Venezia-Londra",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await ProductController.deleteProduct(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundProduct = await ProductModel.findByName("Venezia-Londra");
      chai.assert.isNull(foundProduct, "Venezia-Londra non trovato");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
});
