const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

it("Check response Post /api/pessoa/criar", function () {
  chai
    .request("http://localhost:3000")
    .post("/api/pessoa/criar")
    .send({ email: "adm@adm.com", nome: "adm", senha: "adm123" })
    .end((err, res) => {
      expect(res).to.have.status(200);
      console.log("add pessoa passed");
      return;
    });
});
