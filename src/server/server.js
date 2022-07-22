require("dotenv").config();
const koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const cors = require("koa-cors");
const BodyParsy = require("koa-bodyparser");
const routes = require("./routes");
const render = require("koa-ejs");
const path = require("path");

const session = require("koa-session");
const passport = require("koa-passport");

const PORT = process.env.PORT || 3000;

const server = new koa();
require("koa-validate")(server);

render(server, {
  root: path.join("./src", "view"),
  layout: false,
  viewExt: "ejs",
  cache: false,
  debug: true,
});
require("./auth");

server.use(passport.initialize());

server.keys = [process.env.SECRET];
server
  .use(session(server))
  .use(passport.session())
  .use(cors())
  .use(logger())
  .use(json())
  .use(BodyParsy())
  .use(routes.routes());

server.listen(PORT, () => {
  console.log(`Server opem in http://localhost:${PORT}`);
});
