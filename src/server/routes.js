const Router = require("koa-router");

const LogController = require("../controls/Log.controller");
const routes = new Router();

routes
  .get("/", (ctx) => {
    ctx.body = {
      status: "sucess",
      message: "foi",
    };
  })
  .use(LogController);

module.exports = routes;
