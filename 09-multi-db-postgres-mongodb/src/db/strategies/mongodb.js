const ICrud = require("./interfaces/interfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando",
};

// classe concreta que implementão as funções
class MongoDB extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === "Conectado") return true;

    if (state !== "Conectando") return state;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return STATUS[this._driver.readyState];
  }

  connect() {
    Mongoose.connect(
      "mongodb://Tiago:140783@localhost:27017/herois",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (error) {
        if (!error) return;
        console.log("Falha na execução!");
      }
    );

    const connection = Mongoose.connection;
    this._driver = connection;

    connection.once("open", () => console.log("database connected!"));
  }

  defineModel() {
    heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true,
      },
      poder: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      },
    });

    this._herois = Mongoose.model("heoir", heroiSchema);
  }

  async create(item) {
    const resultCadastrar = await model.create({
      nome: "Batman",
      poder: "Dinheiro",
    });

    console.log("Cadastrar: ", resultCadastrar);
  }
}

module.exports = MongoDB;
