const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const mocha = require("mocha");
const mongoose = require("../config/dbTest");
const sinon = require("sinon");
const UserModel = require("../model/user.model");
const UserController = require("../control/user.controller");
chai.use(chaiAsPromised); // Use chai-as-promised
//const { done, fail } = require("@sinonjs/referee-sinon");

const usersData = [
  { name: "Alice", surname: "Rossi", email: "alice@example.com" },
  {
    name: "Bob",
    surname: "Verdi",
    email: "bob@example.com",
  },
  {
    name: "Charlie",
    surname: "Neri",
    email: "charlie@example.com",
  },
];

before(async () => {
  await UserModel.insertMany(usersData);
});
describe("Test User Metods", async () => {
  it("Test createUser", async () => {
    const testUsers = {
      name: "Name",
      surname: "Surname",
      email: "example@example.com",
    };
    try {
      const req = {
        body: testUsers,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.createUser(req, res);
      sinon.assert.calledWith(res.status, 201);
      const createdUser = await UserModel.findByEmail("example@example.com");
      chai.assert.equal(createdUser.name, req.body.name, "name created");
      chai.assert.equal(
        createdUser.surname,
        req.body.surname,
        "surname created"
      );
      chai.assert.equal(createdUser.email, req.body.email, "email created");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getAllUsers", async () => {
    try {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.getAllUsers(req, res);
      sinon.assert.calledWith(res.status, 200);
      const responseJson = res.json.getCall(0).args[0];
      let found = false;
      responseJson.forEach((us) => {
        if (us.email == "alice@example.com") {
          found = true;
          //console.log(us.email);
        }
      });
      chai.assert.isTrue(found, "alice found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test getUserByEmail", async () => {
    try {
      const req = {
        params: {
          email: "alice@example.com",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.getUserByEmail(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundUser = res.json.getCall(0).args[0];
      chai.assert.equal(foundUser.name, "Alice", "name found");
      chai.assert.equal(foundUser.surname, "Rossi", "surname found");
      chai.assert.equal(foundUser.email, "alice@example.com", "email found");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });

  it("Test updateUser", async () => {
    try {
      const req = {
        params: {
          email: "bob@example.com",
        },
        body: {
          name: "NameUpdated",
          surname: "SurnameUpdated",
          email: "bobUpdated@example.com",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.updateUser(req, res);
      const UpdatedUser = res.json.getCall(0).args[0];
      chai.assert.equal(UpdatedUser.name, "NameUpdated", "name found");
      chai.assert.equal(UpdatedUser.surname, "SurnameUpdated", "surname found");
      chai.assert.equal(
        UpdatedUser.email,
        "bobUpdated@example.com",
        "email found"
      );
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
  it("Test deleteUser", async () => {
    try {
      const req = {
        params: {
          email: "alice@example.com",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await UserController.deleteUser(req, res);
      sinon.assert.calledWith(res.status, 200);
      const foundUser = await UserModel.findByEmail("alice@example.com");

      chai.assert.isNull(foundUser, "alice non trovato");
    } catch (error) {
      console.log("error!!" + error);
      throw new Error(error);
    }
  });
});
