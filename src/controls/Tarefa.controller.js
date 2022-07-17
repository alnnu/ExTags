const Router = require("koa-router");
const Tarefa = require("../nodel/Tarefa.model");
const route = new Router();

route
  .get("/api/tarefa", async (ctx) => {
    const tarefa = new Tarefa();
    if (ctx.query.id != null) {
      let tarefas = projeto.getTarefaById(ctx.query.id);
      ctx.body = await tarefas;
    } else {
      let tarefas = projeto.getTarefa();
      ctx.body = await tarefa;
    }
  })
  .post("/api/tarefa/criar", async (ctx) => {
    ctx.checkBody("estado").ge(1).le(3).notEmpty().notBlank();
    ctx.checkBody("prioridade").ge(1).le(3).notEmpty().notBlank();
    ctx.checkBody("estimativa").isNumeric().notEmpty().notBlank();
    ctx.checkBody("nome").notEmpty().notBlank();
    ctx.checkBody("projeto").notEmpty().notBlank();
    ctx.checkBody("pessoa").notEmpty().notBlank();
    ctx.checkBody("data").isDate();

    if (ctx.errors) {
      ctx.body = ctx.errors;
      console.log(ctx.errors);
    } else {
      const novaTarefaOBJ = ctx.request.body;
      const tarefa = new Tarefa();
      ctx.body = await tarefa.criar(
        novaTarefaOBJ.data,
        novaTarefaOBJ.descricao,
        novaTarefaOBJ.prioridade,
        novaTarefaOBJ.estado,
        novaTarefaOBJ.estimativa,
        novaTarefaOBJ.nome,
        novaTarefaOBJ.projeto,
        novaTarefaOBJ.pessoa
      );
    }
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
