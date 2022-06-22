require("dotenv").config();
const koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const cors = require("koa-cors");
const BodyParsy = require("koa-bodyparser");

const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const server = new koa();
require("koa-validate")(server);

server
  .use(cors())
  .use(logger())
  .use(json())
  .use(BodyParsy())
  .use(routes.routes());

server.listen(PORT, () => {
  console.log(`Server opem in http://localhost:${PORT}`);
});
