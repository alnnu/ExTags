const Router = require("koa-router");
const Projeto = require("../nodel/Projeto.model");
const route = new Router();

route
  .get("/projetos", function(ctx, next) {
    if (ctx.isAuthenticated()) return next();
    ctx.redirect("/login");
  }, async (ctx) => {
    const projeto = new Projeto();
    await ctx.render("projetos", {
      projetos: await projeto.getProjetos()
    });
  })
  .get("/projeto", function(ctx, next) {
    if (ctx.isAuthenticated()) return next();
    ctx.redirect("/login");
  }, async (ctx) => {
    const ProjetoOBJ = new Projeto();
    if (ctx.query.id != null) {
      const projeto = await ProjetoOBJ.getProjetoById(ctx.query.id);

      if (projeto != null) {
        await ctx.render("projeto", {
          projeto: projeto
        });
      } else {
        ctx.redirect("/projetos");
      }
    } else {
      ctx.redirect("/projetos");
    }
  })
  .get("/Addprojeto", function(ctx, next) {
    if (ctx.isAuthenticated()) return next();
    ctx.redirect("/login");
  }, async (ctx) => {
    await ctx.render("addProjeto");
  })
  .post("/addprojeto", function(ctx, next) {
    if (ctx.isAuthenticated()) return next();
    ctx.redirect("/login");
  }, async (ctx) => {
    ctx.checkBody("estado").ge(1).le(3);
    const data = new Date().toISOString().substring(0, 10);

    if (ctx.errors) {
      ctx.body = ctx.errors;
    } else {
      const novoProjetoOBJ = ctx.request.body;
      const projeto = new Projeto();
      await projeto.criar(novoProjetoOBJ.nome, data, novoProjetoOBJ.estado, ctx.state.user.email);
      ctx.redirect(`/projeto?id=${projeto.id}`);
    }
  })
  .delete("/projeto", function(ctx, next) {
    if (ctx.isAuthenticated()) return next();
    ctx.redirect("/login");
  }, async (ctx) => {
    if (ctx.query.id != null) {
      const projetoDeletada = new Projeto();
      ctx.body = await projetoDeletada.deletar(ctx.query.id);
    }
  })
  .put("/projeto", function(ctx, next) {
    if (ctx.isAuthenticated()) return next();
    ctx.redirect("/login");
  }, async (ctx) => {
    if (ctx.query.id != null && ctx.query.nome != null && ctx.query.data != null && ctx.query.estado != null && ctx.query.estado >= 1 && ctx.query.estado <= 3) {
      const projetoEditada = new Projeto();
      ctx.body = await projetoEditada.editar(ctx.query.id, ctx.query.nome, ctx.query.data, ctx.query.estado);
    } else ctx.status = 404;
  })
  .get("/projeto/addpessoa", function(ctx, next) {
    if (ctx.isAuthenticated()) return next();
    ctx.redirect("/login");
  }, async (ctx) => {
    if (!ctx.query.projeto) {
      ctx.status = 404;
    } else {
      await ctx.render("addPessoas", {
        projeto_id: ctx.query.projeto, msg: null, emails: null
      });
    }
  })
  .post("/projeto/addpessoa", function(ctx, next) {
    if (ctx.isAuthenticated()) return next();
    ctx.redirect("/login");
  }, async (ctx) => {
    ctx.checkBody("projeto").notBlank().notBlank();

    if (ctx.errors) {
      ctx.body = ctx.errors;
    } else {
      const novoParticipaOBJ = ctx.request.body;
      const participa = new Projeto();

      const email = [];
      if (typeof (novoParticipaOBJ.email) === "string") {
        email.push(novoParticipaOBJ.email);
      } else {
        for (let i = 0; i < novoParticipaOBJ.email.length; i++) {
          email.push(novoParticipaOBJ.email[i]);
        }
      }

      const erro = participa.verificarParticipa(email, novoParticipaOBJ.projeto);

      if (await erro) {
        await ctx.render("addPessoas", {
          projeto_id: novoParticipaOBJ.projeto, emails: novoParticipaOBJ.email, msg: await erro
        });
      } else {
        for (let i = 0; i < email.length; i++) {
          await participa.criarParticipa(email[i], novoParticipaOBJ.projeto);
        }
        ctx.redirect(`../projeto?id=${novoParticipaOBJ.projeto}`);
      }
    }
  });

module.exports = route.routes();
