const Route = require("koa-router");
const Pessoa = require("../nodel/Pessoa.model");
const passport = require("koa-passport");
const routes = new Route();

routes
  .post(
    "/login",
    function (ctx, next) {
      if (!ctx.isAuthenticated()) return next();
      ctx.redirect("/");
    },
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login?fail=true",
    })
  )
  .get(
    "/login",
    function (ctx, next) {
      if (!ctx.isAuthenticated()) return next();
      ctx.redirect("/");
    },
    async (ctx) => {
      if (ctx.query.fail)
        await ctx.render("login", {
          message: "Usuário e/ou senha incorretos!",
        });
      else await ctx.render("login", { message: null });
    }
  )
  .get(
    "/singin",
    function (ctx, next) {
      if (!ctx.isAuthenticated()) return next();
      ctx.redirect("/");
    },
    async (ctx) => {
      await ctx.render("singin");
    }
  )
  .post(
    "/singin",
    function (ctx, next) {
      if (!ctx.isAuthenticated()) return next();
      ctx.redirect("/");
    },
    async (ctx) => {
      ctx.checkBody("email").isEmail().notBlank().notBlank();
      ctx.checkBody("username").notBlank().notBlank();
      ctx.checkBody("password").notBlank().notBlank();

      if (ctx.errors) {
        ctx.body = ctx.errors;
      } else {
        const novoPessoaOBJ = ctx.request.body;
        const pessoa = new Pessoa();
        ctx.body = await pessoa.criar(
          novoPessoaOBJ.email,
          novoPessoaOBJ.username,
          novoPessoaOBJ.password
        );
      }
    }
  );

module.exports = routes.routes();
