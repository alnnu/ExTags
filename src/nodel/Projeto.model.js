const { PrismaClient } = require("@prisma/client");
const { parseInputDatesAsUTC } = require("pg/lib/defaults");
const { createHash } = require("crypto");
const prisma = new PrismaClient();

class Projeto {
  async getProjetos() {
    const Projeto = await prisma.projeto.findMany();
    return Projeto;
  }

  async getProjetoById(id) {
    const Projeto = await prisma.projeto.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return Projeto;
  }
  async criar(nome, data, estado, gerente) {
    const projeto = await prisma.projeto.create({
      data: {
        nome: nome,
        estado: parseInt(estado),
        gerente_email: gerente,
      },
    });
    this.criarParticipa(gerente, projeto.id);

    return projeto;
  }
  async deletar(id) {
    const projeto = await prisma.projeto.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (projeto == null) {
      return {
        mensagem: "projeto não encontrada",
      };
    } else {
      return await prisma.projeto.delete({
        where: {
          id: parseInt(id),
        },
      });
    }
  }
  async editar(id, nome, data, estado) {
    const projetoEditada = await prisma.projeto.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome: nome,
        estado: estado,
      },
    });
    return projetoEditada;
  }
  async getPessoas() {
    const Pessoas = await prisma.participa.findMany();
    return Pessoas;
  }

  async getPessoaByEmail(email) {
    const Pessoa = await prisma.participa.findUnique({
      where: {
        email: email,
      },
    });
    return Pessoa;
  }

  async criarParticipa(pessoa, projeto) {
    const participa = await prisma.participa.create({
      data: {
        pessoa_email: pessoa,
        projeto_id: parseInt(projeto),
      },
    });
  }
}

module.exports = Projeto;
