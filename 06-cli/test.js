const { deepEqual, ok } = require("assert");
const { WSAEINVAL } = require("constants");
const database = require("./database");
const dadabse = require("./database");

const DEFAULT_ITEM_CADASTRADO = { nome: "Falsh", poder: "Spedd", id: 1 };

const DEFAULT_ITEM_ATUALIZAR = {
  nome: "Lanterna Verde",
  poder: "Energia anel",
  id: 2,
};

describe("Suite de manipulação de Herois", () => {
  // antes de tudo
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRADO);
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  it("pesquisa um heroi suando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRADO;

    // obten a primeria posição do objeto
    const [resultado] = await database.listar(expected.id);
    deepEqual(resultado, expected);
  });

  it("Cadastrar um heroi usando arquivo", async () => {
    const expected = DEFAULT_ITEM_CADASTRADO;
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRADO);
    const [atual] = await database.listar(DEFAULT_ITEM_CADASTRADO.id);

    deepEqual(atual, expected);
  });

  it("Remove heroi por Id", async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRADO.id);
    deepEqual(resultado, expected);
  });

  it("Atualiza heroi pelo Id", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "Batman",
      poder: "Dinheiro",
    };

    const novoDado = {
      nome: "Batman",
      poder: "Dinheiro",
    };

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
    deepEqual(resultado, expected);
  });
});
