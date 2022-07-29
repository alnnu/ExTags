const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


class Log {
  async criarLog(log, pessoa_email, tarefa_id) {
    await prisma.processo.create({
      data: {
        log: log, pessoa_email: pessoa_email, tarefa_id: Number(tarefa_id)
      }
    });
  }
}

module.exports = Log;
