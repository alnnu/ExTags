const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

it("Check response Post /api/projeto/pessoa/criar", function () {
  chai
    .request("http://localhost:3000")
    .post("/api/projeto/pessoa/criar")
    .send({
      projeto: "10",
      pessoa: "d@gmail.com",
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      console.log("add participa passed");
      return;
    });
});
