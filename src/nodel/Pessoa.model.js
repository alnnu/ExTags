const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Pessoa {
  async getPessoas() {
    const Pessoas = await prisma.pessoa.findMany({
      select: {
        nome: true,
        email: true,
      },
    });
    return Pessoas;
  }

  async getPessoaByEmail(email) {
    const Pessoa = await prisma.pessoa.findUnique({
      where: {
        email: email,
      },
      select: {
        nome: true,
        email: true,
      },
    });
    return Pessoa;
  }

  async criar(email, nome, senha) {
    const pessoa = await prisma.pessoa.findUnique({
      where: {
        email: email,
      },
      select: {
        username: true,
        email: true,
      },
    });

    if (pessoa == null) {
      const bcrypt = require("bcryptjs");
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(senha, salt);
      return await prisma.pessoa.create({
        data: {
          email: email,
          username: nome,
          password: hash,
        },
      });
    } else {
      mensagem: "pessoa ja existe";
    }
  }
  async deletar(email) {
    const pessoa = await prisma.pessoa.findUnique({
      where: {
        email: email,
      },
      select: {
        nome: true,
        email: true,
      },
    });

    if (pessoa == null) {
      return {
        mensagem: "pessoa não encontrada",
      };
    } else {
      return await prisma.pessoa.delete({
        where: {
          email: email,
        },
      });
    }
  }
  async editar(email, nome) {
    const pessoaEditada = await prisma.pessoa.update({
      where: {
        email: email,
      },
      data: {
        nome: nome,
      },
    });
    return pessoaEditada;
  }
}

module.exports = Pessoa;
