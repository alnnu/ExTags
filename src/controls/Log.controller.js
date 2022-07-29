const Router = require("koa-router");
const Log = require("../nodel/Log.model");

function addLog(log, pessoa_email, tarefa_id) {
  const logOBJ = new Log();

  logOBJ.criarLog(log, pessoa_email, tarefa_id);
}


module.exports = {
  addLog
};
