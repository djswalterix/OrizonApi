const chai = require("chai");
const { dropDb, mongoose } = require("../config/dbTest");
const sinon = require("sinon");

const User = require("../control/user.controller");
const { deleteOne } = require("../model/user.model");
const { fail } = require("@sinonjs/referee-sinon");

let createdUser = {};

describe("Test User Metods", () => {
  it("Test createUser", async () => {
    try {
      const req = {
        body: {
          name: "Name",
          surname: "Surname",
          email: "example@example.com",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await User.createUser(req, res);
      sinon.assert.calledWith(res.status, 201);
      const responseJson = res.json.getCall(0).args[0];
      // Verifica che le proprietà dell'oggetto corrispon  dano a quelle richieste
      chai.expect(responseJson).to.deep.include({
        name: "Name",
        surname: "Surname",
        email: "example@example.com",
      });

      createdUser = responseJson;
    } catch (error) {
      console.log("error!!" + error);
      fail();
    }
  });

  it("Test getAllUsers", async () => {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    await User.getAllUsers(req, res);
    sinon.assert.calledWith(res.status, 200);
    const responseJson = res.json.getCall(0).args[0];
    console.log("response " + responseJson);
    console.log("crerated " + createdUser);
    //chai.expect(responseJson).to.include(createdUser);
    if (JSON.stringify(responseJson) === JSON.stringify(createdUser)) {
      console.log("Gli oggetti sono uguali.");
    } else {
      console.log("Gli oggetti sono diversi.");
    }
    chai.expect(responseJson).to.deep.include.members(createdUser);
  });

  it("Test getUserByEmail", async () => {
    const req = {
      params: {
        email: "example@example.com",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    await User.getUserByEmail(req, res);
    sinon.assert.calledWith(res.status, 200);
    chai.expect(JSON.stringify(res.json)).to.include(createdUser);
  });

  it("Test updateUser", async () => {
    const req = {
      params: {
        email: "example@example.com",
      },
      body: {
        name: "NameUpdated",
        surname: "SurnameUpdated",
        email: "exampleUpdated@example.com",
      },
    };
    let updatedUser = createdUser;
    updatedUser.name = "NameUpdated";
    updatedUser.surname = "SurnameUpdated";
    updatedUser.email = "exampleUpdated@example.com";
    console.log(updatedUser);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    await User.updateUser(req, res);
    sinon.assert.calledWith(res.status, 200);
    // Assicurati che updatedUser e res.json siano definiti
    chai.expect(updatedUser()).to.be.an("object");
    chai.expect(res.json).to.be.an("object");
    chai
      .expect(JSON.stringify(res.json))
      .to.include(JSON.stringify(updatedUser));
    //chai.expect(JSON.stringify(res.json)).not.to.include(createdUser);
  });
});
