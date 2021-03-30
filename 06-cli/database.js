const { readFileSync, writeFileSync } = require("fs");
// const { promisify } = require("util");

// const readFileAsync = readFile;

// outra formade obter dados do json
// const dadosJson = require('./heroi.json')

class Database {
  constructor() {
    this.NOME_ARQUIVO = "heroi.json";
  }

  async obterDadosArquivo() {
    const arquivo = await readFileSync(this.NOME_ARQUIVO);
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    const writeFile = await writeFileSync(
      this.NOME_ARQUIVO,
      JSON.stringify(dados)
    );
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo();
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    // concaternar obejtos
    const heroiComId = {
      id,
      ...heroi,
    };
    const dadosFinal = [...dados, heroiComId];
    const result = await this.escreverArquivo(dadosFinal);
    return result;
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo();
    const dadosFiltrados = dados.filter((item) => (id ? item.id == id : true));
    return dadosFiltrados;
  }

  async remover(id) {
    if (!id) {
      return await this.escreverArquivo([]);
    }

    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex((item) => item.id === parseInt(id));
    if (indice === -1) {
      throw Error("O usuario informado não existe.");
    }

    dados.splice(indice, 1);
    return await this.escreverArquivo(dados);
  }

  async atualizar(id, modificacaoes) {
    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex((item) => item.id === parseInt(id));

    if (indice === -1) {
      throw Error("Heroi infomrado não existe.");
    }

    const atual = dados[indice];

    const objetoAtualizar = {
      ...atual,
      ...modificacaoes,
    };

    dados.splice(indice, 1);

    return await this.escreverArquivo([...dados, objetoAtualizar]);
  }
}

module.exports = new Database();
