const Router = require("koa-router");
const Tarefa = require("../nodel/Tarefa.model");
const route = new Router();

route
  .get("tarefa", async (ctx) => {
    const tarefa = new Tarefa();
    if (ctx.query.id != null) {
      let tarefas = projeto.getTarefaById(ctx.query.id);
      ctx.body = await tarefas;
    } else {
      let tarefas = projeto.getTarefa();
      ctx.body = await tarefa;
    }
  })
  .get("/projeto/addtarefa", async (ctx) => {
    const tarefa = new Tarefa();
    if (ctx.query.projeto && (await tarefa.verificarProjeto(ctx.query.projeto ))) {
      await ctx.render("addTarefa", {
        projeto_id: ctx.query.projeto
      });
    } else {
      ctx.status = 404;
    }
  })
  .post("/projeto/addtarefa", async (ctx) => {
    ctx.checkBody("prioridade").ge(1).le(3).notEmpty().notBlank();
    ctx.checkBody("estimativa").isNumeric().notEmpty().notBlank();
    ctx.checkBody("nome").notEmpty().notBlank();
    ctx.checkBody("projeto").notEmpty().notBlank();

    if (ctx.errors) {
      ctx.body = ctx.errors;
      console.log(ctx.errors);
    } else {
      const novaTarefaOBJ = ctx.request.body;
      const tarefa = new Tarefa();

      const data = new Date().toISOString().substring(0, 10);

      const novaTarefa = await tarefa.criar(data, novaTarefaOBJ.descricao, novaTarefaOBJ.prioridade, 1, novaTarefaOBJ.estimativa, novaTarefaOBJ.nome, novaTarefaOBJ.projeto, ctx.state.user.email);

      if (novaTarefa.erro) {
        ctx.body = novaTarefa;
      } else {
        ctx.redirect(`/projeto?id=${novaTarefaOBJ.projeto}`);
      }
    }
  })
  .put("/tarefa/addpessoa", (ctx) => {
    const dados = ctx.request.body;
    const tarefa = new Tarefa();
    tarefa.update(dados.email, dados.id);
    ctx.status = 203;
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
