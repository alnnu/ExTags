class Note {
  constructor(pessoa, nome, texto, data, projeto) {
    this.pessoa = pessoa;
    this.nome = nome;
    this.texto = texto;
    this.data = data;
  }
  async criarNote() {}
  async deletar() {}
}

module.exports = Note;
