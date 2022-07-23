const { PrismaClient } = require("@prisma/client");
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
    const [ano, mes, dia] = data.split("-");

    const projeto = await prisma.projeto.create({
      data: {
        nome: nome,
        dia: dia,
        mes: mes,
        ano: ano,
        estado: parseInt(estado),
        gerente_email: gerente,
      },
    });
    this.id = projeto.id;
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
    if (!this.getPessoaByEmail(pessoa)) {
      //pessoa nao existe
      return 1;
    } else {
      const pessoaProjeto = await prisma.participa.findMany({
        where: {
          pessoa_email: pessoa,
          projeto_id: projeto,
        },
      });

      if (!pessoaProjeto) {
        //pessoa nao esta no projeto
        const participa = await prisma.participa.create({
          data: {
            pessoa_email: pessoa,
            projeto_id: parseInt(projeto),
          },
        });
        return 3;
      } else {
        //pessoa esta no projeto
        return 2;
      }
    }
  }
}

module.exports = Projeto;
