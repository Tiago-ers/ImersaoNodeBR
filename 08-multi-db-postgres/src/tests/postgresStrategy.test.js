const assert = require("assert");
const Postgres = require("../db/strategies/postrgres");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "flexa" };
const MOCK_HEROI_ATUALIZADO = { nome: "Batman", poder: "dinheiro" };

describe("Postgres Strategy", function () {
  this.timeout(Infinity);

  this.beforeAll(async function () {
    await context.connect();
    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZADO);
  });

  it("PostgresSQL Connection", async function () {
    const result = await context.isConnected();
    assert.strictEqual(result, true);
  });

  it("Cadastrar Heroi", async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;
    assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("Listar Herois", async function () {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    delete result.id;
    assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("Atualizar Herois", async function () {
    const [itemAtualizar] = await context.read({
      nome: MOCK_HEROI_ATUALIZADO.nome,
    });
    const novoItem = {
      ...MOCK_HEROI_ATUALIZADO,
      nome: "Hobbin",
    };

    const [result] = await context.update(itemAtualizar.id, novoItem);
    const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
    assert.deepStrictEqual(result, 1);
    assert.deepStrictEqual(itemAtualizado.nome, novoItem.nome);
  });

  it("Remover por Id", async function () {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepStrictEqual(result, 1);
  });
});
