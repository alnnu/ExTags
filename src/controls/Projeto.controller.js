const Router = require("koa-router");
const Projeto = require("../nodel/Projeto.model");
const Pessoa = require("../nodel/Pessoa.model");
const route = new Router();

route
  .get("/projetos", async (ctx) => {
    const projeto = new Projeto();
    await ctx.render("projetos", {
      projetos: await projeto.getProjetos(),
    });
  })
  .get("/projeto", async (ctx) => {
    const projeto = new Projeto();
    if (ctx.query.id != null) {
      await ctx.render("projeto", {
        projeto: await projeto.getProjetoById(ctx.query.id),
      });
    } else {
      ctx.redirect("/projetos");
    }
  })
  .post("/projeto", async (ctx) => {
    ctx.checkBody("gerente").isEmail().notEmpty().notBlank();
    ctx.checkBody("estado").ge(1).le(3);
    ctx.checkBody("data").isDate();

    if (ctx.errors) {
      ctx.body = ctx.errors;
      console.log(ctx.errors);
    } else {
      const novoProjetoOBJ = ctx.request.body;
      const projeto = new Projeto();
      ctx.body = await projeto.criar(
        novoProjetoOBJ.nome,
        novoProjetoOBJ.data,
        novoProjetoOBJ.estado,
        novoProjetoOBJ.gerente
      );
    }
  })
  .delete("/projeto", async (ctx) => {
    if (ctx.query.id != null) {
      const projetoDeletada = new Projeto();
      ctx.body = await projetoDeletada.deletar(ctx.query.id);
    } else {
      ctx.status = 404;
    }
  })
  .put("/projeto", async (ctx) => {
    if (
      ctx.query.id != null &&
      ctx.query.nome != null &&
      ctx.query.data != null &&
      ctx.query.estado != null &&
      ctx.query.estado >= 1 &&
      ctx.query.estado <= 3
    ) {
      const projetoEditada = new Projeto();
      ctx.body = await projetoEditada.editar(
        ctx.query.id,
        ctx.query.nome,
        ctx.query.data,
        ctx.query.estado
      );
    } else ctx.status = 404;
  })
  .get("/projeto/pessoa", async (ctx) => {
    const projeto = new Projeto();
    if (ctx.query.email != null) {
      let pessoas = projeto.getPessoaByEmail(ctx.query.email);
      ctx.body = await pessoas;
    } else {
      let pessoas = projeto.getPessoas();
      ctx.body = await pessoas;
    }
  });

route.post("/projeto/pessoa/", async (ctx) => {
  ctx.checkBody("pessoa").isEmail().notBlank().notBlank();
  ctx.checkBody("projeto").notBlank().notBlank();

  if (ctx.errors) {
    ctx.body = ctx.errors;
    console.log(ctx.errors);
  } else {
    const novoParticipaOBJ = ctx.request.body;
    const participa = new Projeto();
    ctx.body = await participa.criarParticipa(
      novoParticipaOBJ.pessoa,
      novoParticipaOBJ.projeto
    );
  }
});

module.exports = route.routes();
