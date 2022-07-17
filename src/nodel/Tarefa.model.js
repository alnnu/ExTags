const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Tarefa {
  async getTarefa() {
    const Tarefa = await prisma.tarefa.findMany();
    return Tarefa;
  }

  async getTarefaById(id) {
    const Tarefa = await prisma.tarefa.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return Tarefa;
  }
  async criar(
    data,
    descricao,
    prioridade,
    estado,
    estimativa,
    nome,
    projeto,
    pessoa
  ) {
    const tarefa = await prisma.tarefa.create({
      data: {
        nome: nome,
        descricao: descricao,
        prioridade: parseInt(prioridade),
        estado: parseInt(estado),
        estimativa: parseInt(estimativa),
        projeto_id: parseInt(projeto),
        pessoa_email: pessoa,
      },
    });

    return tarefa;
  }
}

module.exports = Tarefa;
