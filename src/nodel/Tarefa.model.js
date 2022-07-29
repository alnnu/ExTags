const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Tarefa {
  async getTarefa(projeto_id) {
    const Tarefa = await prisma.tarefa.findMany({
      where: {
        projeto_id: Number(projeto_id)
      }
    });
    return Tarefa;
  }

  async getTarefaById(id) {
    const Tarefa = await prisma.tarefa.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    return Tarefa;
  }

  verificarProjeto(id) {
    const Projeto = require("./Projeto.model");
    const projetoObj = new Projeto();
    return projetoObj.getProjetoById(id);
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
    const [ano, mes, dia] = data.split("-");
    if (!(await this.verificarProjeto(projeto))) return {
      erro: "projeto nao essiste"
    };
    const tarefa = await prisma.tarefa.create({
      data: {
        nome: nome,
        descricao: descricao,
        prioridade: parseInt(prioridade),
        estado: parseInt(estado),
        estimativa: parseInt(estimativa),
        projeto_id: parseInt(projeto),
        pessoa_email: pessoa,
        dia: dia,
        mes: mes,
        ano: ano
      }
    });
    return tarefa;
  }
  async update(email,id) {
    await prisma.tarefa.update({
      where: {
        id: Number(id),
      },
      data: {
        pessoa_atribuida: email,
      },
    })
  }
}

module.exports = Tarefa;
