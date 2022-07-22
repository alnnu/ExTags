const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

it("Check response Post /singin", function () {
  chai
    .request("http://localhost:3000")
    .post("/singin")
    .send({ email: "adm@adm.com", username: "adm", password: "123" })
    .end((err, res) => {
      expect(res).to.have.status(200);
      console.log("add pessoa passed");
      return;
    });
});
