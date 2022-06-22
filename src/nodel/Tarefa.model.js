class Tarefa {
  constructor(pessoa, nome, descricao, prioridade, data, estimativa, estato) {
    this.pessoa = pessoa;
    this.nome = nome;
    this.descricao = descricao;
    this.prioridade = prioridade;
    this.data = data;
    this.estimativa = estimativa;
    this.estato = estato;
  }
}

module.exports = Tarefa;
