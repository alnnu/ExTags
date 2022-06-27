const Route = require("koa-router");
const Pessoa = require("../nodel/Pessoa.model");
const routes = new Route();

routes
  .get("/api/pessoa", async (ctx) => {
    const pessoa = new Pessoa();
    if (ctx.query.email != null) {
      let pessoas = pessoa.getPessoaByEmail(ctx.query.email);
      ctx.body = await pessoas;
      pessoa.getPessoaByEmail(ctx.query.email);
    } else {
      let pessoas = pessoa.getPessoas();
      ctx.body = await pessoas;
    }
  })
  .post("/api/pessoa/criar", (ctx) => {
    const pessoa = new Pessoa();
    pessoa.criar();
  })
  .delete("/api/pessoa/deletar", async (ctx) => {
    if (ctx.query.email != null) {
      const pessoaDeletada = new Pessoa();
      ctx.body = await pessoaDeletada.deletar(ctx.query.email);
    } else {
      ctx.status = 404;
    }
  })
  .put("/api/pessoa/editar", async (ctx) => {
    if (ctx.query.email != null && ctx.query.nome != null) {
      const pessoaEditada = new Pessoa();
      ctx.body = await pessoaEditada.editar(ctx.query.email, ctx.query.nome);
    } else ctx.status = 404;
  });

module.exports = routes.routes();
