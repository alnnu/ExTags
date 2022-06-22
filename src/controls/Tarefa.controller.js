const Router = require("koa-router");
const route = new Router();

route
  .get("/api/tarefa", (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "get tarefa",
    };
  })
  .post("/api/tarefa/criar", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "tarefa criado",
    };
  })
  .delete("/api/tarefa/deletar", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "tarefa deletado",
    };
  })
  .put("/api/tarefa/editar/:id", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "tarefa editado",
    };
  })
  .get("/api/Tarefa/get/:id", (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "tarefa pego",
    };
  });

module.exports = route.routes();
