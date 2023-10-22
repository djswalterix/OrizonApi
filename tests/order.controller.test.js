const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha = require("mocha");
const mongoose = require("../config/dbTest");
const sinon = require("sinon");
const OrderModel = require("../model/order.model");
const UserModel = require("../model/user.model");
const ProductModel = require("../model/product.model");
const ProductController = require("../control/product.controller");
const UserController = require("../control/user.controller");
const OrderController = require("../control/order.controller");
const orderModel = require("../model/order.model");
chai.use(chaiAsPromised); // Use chai-as-promised
//const { done, fail } = require("@sinonjs/referee-sinon");
let users = [];
let products = [];
let ordersData = [];
before(async () => {
  const usersData = [
    { name: "Alice1", surname: "Rossi1", email: "alice1@example.com" },
    {
      name: "Bob1",
      surname: "Verdi1",
      email: "bob1@example.com",
    },
    {
      name: "Charlie1",
      surname: "Neri1",
      email: "charlie1@example.com",
    },
  ];
  const productsData = [
    { name: "Venezia1-Napoli" },
    { name: "Venezia1-Londra" },
    { name: "Venezia1-Roma" },
    { name: "Londra1-Malpensa" },
  ];
  await UserModel.insertMany(usersData);
  await ProductModel.insertMany(productsData);

  users = await UserModel.find();
  products = await ProductModel.find();
  ordersData = [
    {
      userID: users[0]._id,
      productID: products[0]._id,
      createdAt: new Date("2023-10-18").getTime(),
    },
    {
      userID: users[0]._id,
      productID: products[1]._id,
    },
  ];

  await OrderModel.insertMany(ordersData);
});

describe("Test Order Metods", async () => {
  it("Test createOrder", async () => {
    try {
      const req = {
        body: {
          userID: users[1]._id,
          productID: products[1]._id,
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.createOrder(req, res);
      sinon.assert.calledWith(res.status, 201);
      const createdOrder = res.json.getCall(0).args[0];
      chai.assert.equal(createdOrder.userID, req.body.userID, "user created");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllorders", async () => {
    try {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.getAllOrders(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((or) => {
        //console.log(or.userID._id + " " + ordersData[0].userID);
        if (or.userID._id.equals(ordersData[0].userID)) {
          found = true;
        }
      });
      chai.assert.isTrue(found, "order found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllOrdersbyDate", async () => {
    try {
      const req = {
        params: {
          date: "2023-10-18",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.getAllOrdersbyDate(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      //console.log(responseJson);
      let found = false;
      responseJson.forEach((or) => {
        //console.log(or.userID._id + " " + ordersData[0].userID);
        if (or.userID._id.equals(ordersData[0].userID)) {
          found = true;
        }
      });
      chai.assert.isTrue(found, "order found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllOrdersbyUser", async () => {
    try {
      const req = {
        params: {
          userID: ordersData[0].userID,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.getOrderByUser(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      //console.log(responseJson);
      let found = false;
      responseJson.forEach((or) => {
        //console.log(or.userID._id + " " + ordersData[0].userID);
        if (or.userID._id.equals(ordersData[0].userID)) {
          found = true;
        }
      });
      chai.assert.isTrue(found, "order found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getOrdersByUserAndDate", async () => {
    try {
      const req = {
        params: {
          userID: ordersData[0].userID,
          date: "2023-10-18",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.getOrderByUser(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      //console.log(responseJson);
      let found = false;
      responseJson.forEach((or) => {
        //console.log(or.userID._id + " " + ordersData[0].userID);
        if (or.userID._id.equals(ordersData[0].userID)) {
          found = true;
        }
      });
      chai.assert.isTrue(found, "order found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test updateOrder", async () => {
    try {
      const ordered = await orderModel.find();
      //console.log(ordered[0]._id);
      const req = {
        params: {
          orderID: ordered[0]._id,
        },
        body: {
          userID: users[2]._id,
          productID: products[2],
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.updateOrder(req, res);
      const UpdatedOrder = res.json.getCall(0).args[0];
      //console.log(UpdatedOrder);
      chai.assert.equal(UpdatedOrder.userID, req.body.userID, "user updated");
      chai.assert.equal(
        UpdatedOrder.orderID,
        req.body.orderID,
        "order updated"
      );
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
  it("Test deleteOrder", async () => {
    try {
      const ordered = await orderModel.find();
      //console.log(ordered[0]._id);
      const req = {
        params: {
          orderID: ordered[0]._id,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await OrderController.deleteOrder(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundOrder = await OrderModel.findById(ordered[0]._id);
      chai.assert.isNull(foundOrder, "order not founded");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
});
