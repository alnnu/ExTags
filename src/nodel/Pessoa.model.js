const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Pessoa {
  async getPessoas() {
    const Pessoas = await prisma.pessoa.findMany();
    return Pessoas;
  }

  async getPessoaByEmail(email) {
    const Pessoa = await prisma.pessoa.findUnique({
      where: {
        email: email,
      },
    });
    return Pessoa;
  }

  async criar() {
    const novaPessoa = await prisma.pessoa.createMany({
      data: [
        {
          email: "luannf@gmail.com",
          nome: "luannzin",
          senha: "aloMundo",
        },
        {
          email: "d@gmail.com",
          nome: "luannzao",
          senha: "aloMundo",
        },
      ],
    });
  }
  async deletar(email) {
    const pessoa = await prisma.pessoa.findUnique({
      where: {
        email: email,
      },
    });

    if (pessoa == null) {
      return {
        mensagem: "pessoa não encontrada",
      };
    } else {
      const pessoaDeletada = await prisma.pessoa.delete({
        where: {
          email: email,
        },
      });
      return pessoaDeletada;
    }
  }
}

module.exports = Pessoa;
