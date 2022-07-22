const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

it("Check response Post /api/projeto/criar", function () {
  chai
    .request("http://localhost:3000")
    .post("/addprojeto")
    .send({
      nome: "teste",
      data: "10-03-2004",
      estado: "1",
      gerente: "adm@adm.com",
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      console.log("add pessoa passed");
      return;
    });
});
