const assert = require("assert");
const Context = require("../db/strategies/base/contextStrategy");
const MongoDB = require("../db/strategies/mongodb");

const MOCK_HEROI_CADASTRAR = {
  nome: "Mulher maravilha",
  poder: "Laço",
};

const MOCK_HEROI_DEFAULT = {
  nome: `Homem formiga - ${Date.now()}`,
  poder: "encolher",
};

const context = new Context(new MongoDB());

describe("MongoDB Siute de testes", function () {
  this.beforeAll(async () => {
    await context.connect();
    await context.create(MOCK_HEROI_DEFAULT);
  });

  it("Verificar conexão", async () => {
    const result = await context.isConnected();
    const expected = true;

    assert.deepStrictEqual(result, expected);
  });

  it("Cadastrar", async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });

  it("listar", async () => {
    const [{ nome, poder }] = await context.read({
      nome: MOCK_HEROI_DEFAULT.nome,
    });

    const result = { nome, poder };

    assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT);
  });
});
