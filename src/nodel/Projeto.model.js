class Projeto {
  constructor(nome, tarefas, data, responsavel, estato) {
    this.nome = nome;
    this.tarefas = tarefas;
    this.data = data;
    this.responsavel = responsavel;
    this.estato = estato;
  }
  async criarProjeto() {}

  async finaliza() {}
}

module.exports = Projeto;
