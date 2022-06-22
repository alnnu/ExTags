const Router = require("koa-router");
const route = new Router();

route
  .get("/api/logs", (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "get logs",
    };
  })
  .post("/api/log/criar", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "log criado",
    };
  })
  .delete("/api/log/deletar", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "log deletado",
    };
  })
  .put("/api/log/editar/:id", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "log editado",
    };
  })
  .get("/api/log/get/:id", (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "log pego",
    };
  });

module.exports = route.routes();
