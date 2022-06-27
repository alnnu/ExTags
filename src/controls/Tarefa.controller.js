const Router = require("koa-router");
const Tarefa = require("../nodel/Tarefa.model");
const route = new Router();

route
  .get("/api/tarefa", async (ctx) => {
    const tarefa = new Tarefa();
    if (ctx.query.id != null) {
      let projetos = projeto.getTarefaById(ctx.query.id);
      ctx.body = await projetos;
    } else {
      let projetos = projeto.getProjetos();
      ctx.body = await projetos;
    }
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
