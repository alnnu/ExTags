const Route = require("koa-router");
const Pessoa = require("../nodel/Pessoa.model");
const routes = new Route();

routes
  .get("/login", async (ctx) => {
    await ctx.render("login", { message: null });
  })
  .post("/singin", async (ctx) => {
    ctx.checkBody("email").isEmail().notBlank().notBlank();
    ctx.checkBody("nome").notBlank().notBlank();
    ctx.checkBody("senha").notBlank().notBlank();

    if (ctx.errors) {
      ctx.body = ctx.errors;
    } else {
      const novoPessoaOBJ = ctx.request.body;
      const pessoa = new Pessoa();
      ctx.body = await pessoa.criar(
        novoPessoaOBJ.email,
        novoPessoaOBJ.nome,
        novoPessoaOBJ.senha
      );
    }
  });

module.exports = routes.routes();
