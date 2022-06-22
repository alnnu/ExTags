const Router = require("koa-router");
const route = new Router();

route
  .get("/api/notes", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "notes pegos",
    };
  })
  .post("/api/note/criar", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "note deletado",
    };
  })
  .delete("/api/note/deletar", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "note deletado",
    };
  })
  .put("/api/note/editar/:id", async (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "note editado",
    };
  })
  .get("/api/note/get/:id", (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "note pego",
    };
  });
module.exports = route.routes();
