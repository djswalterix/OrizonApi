const chai = require("chai");

const { dropDb, mongoose } = require("../config/dbTest");
const sinon = require("sinon");
const User = require("../control/user.controller");
describe("Test User Metods", () => {
  it("Test User Creation", async () => {
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
    sinon.assert.calledWithMatch(res.json, {
      name: "Name",
      surname: "Surname",
      email: "example@example.com",
    });
  });
});
