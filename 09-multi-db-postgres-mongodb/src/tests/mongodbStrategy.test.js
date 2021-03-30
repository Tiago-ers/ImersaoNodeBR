const assert = require("assert");
const Context = require("../db/strategies/base/contextStrategy");
const MongoDB = require("../db/strategies/mongodb");

const context = new Context(new MongoDB());

describe("MongoDB Siute de testes", function () {
  this.beforeAll(async () => {
    await context.connect();
  });

  it("Verificar conexão", async () => {
    const result = await context.isConnected();
    const expected = "Conectado";

    assert.deepStrictEqual(result, expected);
  });
});
