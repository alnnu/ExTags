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
        id: parseInt(id)
      }
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
        gerente_email: gerente
      }
    });
    this.id = projeto.id;
    this.criarParticipa(gerente, projeto.id);

    return projeto;
  }

  async deletar(projeto) {

      return await prisma.projeto.delete({
        where: {
          id: Number(projeto),
        }
      });
  }

  async editar(id, nome, data, estado) {
    const projetoEditada = await prisma.projeto.update({
      where: {
        id: parseInt(id)
      }, data: {
        nome: nome, estado: estado
      }
    });
    return projetoEditada;
  }

  async getPessoas(id) {
    const Pessoas = await prisma.participa.findMany({
      where: {
        projeto_id: parseInt(id)
      }
    });

    return Pessoas;
  }

  async getPessoaByEmail(email) {

    const Pessoa = require("../nodel/Pessoa.model");
    const pessoa = new Pessoa();
    return await pessoa.getPessoaByEmail(email);
  }

  async verificarParticipa(pessoas, projeto) {

    for (let i = 0; i < pessoas.length; i++) {
      if (!(await this.getPessoaByEmail(pessoas[i]))) {
        //pessoas nao existe
        return `Pessoa com email: ${pessoas[i]}; Não existe`;
      } else {
        const pessoaProjeto = await prisma.participa.findMany({
          where: {
            pessoa_email: pessoas[i],
            projeto_id: Number(projeto)
          }
        });
        if (pessoaProjeto.length !== 0) {
          //pessoas nao esta no projeto
          return `Pessoa com email: ${pessoas[i]}. Ja esta no projeto`;
        } else {
          //pessoas esta no projeto
          return null;
        }
      }
    }

  }

  async criarParticipa(pessoa, projeto) {

    const participa = await prisma.participa.create({
      data: {
        pessoa_email: pessoa,
        projeto_id: parseInt(projeto)
      }
    });
  }
}

module.exports = Projeto;
