const { PrismaClient } = require("@prisma/client");
const Projeto = require("./Projeto.model");
const prisma = new PrismaClient();

class Tarefa {
  async getTarefa() {
    const Tarefa = await prisma.tarefa.findMany();
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
}

module.exports = Tarefa;
