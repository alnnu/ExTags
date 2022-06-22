const Router = require("koa-router");
const route = new Router();

route
  .get("/api/projetos", (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "get projetos",
    };
  })
  .post("/api/projetos/criar", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "projetos criado",
    };
  })
  .delete("/api/projeto/deletar", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "projeto deletado",
    };
  })
  .put("/api/projeto/editar/:id", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "projeto editado",
    };
  })
  .get("/api/projeto/get/:id", (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "projeto pego",
    };
  });

module.exports = route.routes();
