const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const options = {};

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (username, done) => {
  return await prisma.pessoa
    .findUnique({
      where: {
        email: username,
      },
    })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

async function getUser(email) {
  return await prisma.pessoa.findUnique({ where: { email: email } });
}

passport.use(
  new LocalStrategy(options, async (username, password, done) => {
    const user = await getUser(username);

    if (!user) return done(null, user);
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        return done(null, user);
      } else {
        return done(null, user);
      }
    });
  })
);
