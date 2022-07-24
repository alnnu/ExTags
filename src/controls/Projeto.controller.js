const Router = require("koa-router");
const Projeto = require("../nodel/Projeto.model");
const route = new Router();

route
  .get(
    "/projetos",
    function(ctx, next) {
      if (ctx.isAuthenticated()) return next();
      ctx.redirect("/login");
    },
    async (ctx) => {
      const projeto = new Projeto();
      await ctx.render("projetos", {
        projetos: await projeto.getProjetos()
      });
    }
  )
  .get(
    "/projeto",
    function(ctx, next) {
      if (ctx.isAuthenticated()) return next();
      ctx.redirect("/login");
    },
    async (ctx) => {
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
    }
  )
  .get(
    "/Addprojeto",
    function(ctx, next) {
      if (ctx.isAuthenticated()) return next();
      ctx.redirect("/login");
    },
    async (ctx) => {
      await ctx.render("addProjeto");
    }
  )
  .post(
    "/addprojeto",
    function(ctx, next) {
      if (ctx.isAuthenticated()) return next();
      ctx.redirect("/login");
    },
    async (ctx) => {
      ctx.checkBody("estado").ge(1).le(3);
      const data = new Date().toISOString().substring(0, 10);
      console.log(data);

      if (ctx.errors) {
        ctx.body = ctx.errors;
        console.log(ctx.errors);
      } else {
        console.log(typeof ctx.state.user.email);
        const novoProjetoOBJ = ctx.request.body;
        const projeto = new Projeto();
        await projeto.criar(
          novoProjetoOBJ.nome,
          data,
          novoProjetoOBJ.estado,
          ctx.state.user.email
        );
        ctx.redirect(`/projeto?id=${projeto.id}`);
      }
    }
  )
  .delete(
    "/projeto",
    function(ctx, next) {
      if (ctx.isAuthenticated()) return next();
      ctx.redirect("/login");
    },
    async (ctx) => {
      if (ctx.query.id != null) {
        const projetoDeletada = new Projeto();
        ctx.body = await projetoDeletada.deletar(ctx.query.id);
      } else {
        ctx.status = 404;
      }
    }
  )
  .put(
    "/projeto",
    function(ctx, next) {
      if (ctx.isAuthenticated()) return next();
      ctx.redirect("/login");
    },
    async (ctx) => {
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
    }
  )
  .get(
    "/projeto/addpessoa",
    function(ctx, next) {
      if (ctx.isAuthenticated()) return next();
      ctx.redirect("/login");
    },
    async (ctx) => {
      if (!ctx.query.projeto) {
        ctx.status = 404;
      } else {
        await ctx.render("addPessoas", {
          projeto_id: ctx.query.projeto,
          msg: null,
          emails: null
        });
      }
    }
  )
  .post(
    "/projeto/addpessoa",
    function(ctx, next) {
      if (ctx.isAuthenticated()) return next();
      ctx.redirect("/login");
    },
    async (ctx) => {
      ctx.checkBody("projeto").notBlank().notBlank();

      if (ctx.errors) {
        ctx.body = ctx.errors;
        console.log(ctx.errors);
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
        console.log(email.length);
        for (let i = 0; i < email.length; i++) {
          const numero = await participa.criarParticipa(
            email[i],
            novoParticipaOBJ.projeto
          );

          if (numero === 1) {
            //pessoa nao existe
            await ctx.render("addPessoas", {
              projeto_id: novoParticipaOBJ.projeto,
              emails: novoParticipaOBJ.email,
              msg: `Pessoa com email: ${email[i]}. Não existe`
            });
          } else if (numero === 2) {
            await ctx.render("addPessoas", {
              projeto_id: novoParticipaOBJ.projeto,
              emails: email,
              msg: `Pessoa com email: ${email[i]}. Ja esta no projeto`
            });
            //pessoa ja esta no projeto
          } else {
            //tudo ok
            ctx.redirect(`/projeto?id=${novoParticipaOBJ.projeto}`);
          }
        }
      }
    }
  );

module.exports = route.routes();
