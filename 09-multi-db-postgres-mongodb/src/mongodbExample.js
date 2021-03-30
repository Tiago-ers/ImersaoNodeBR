const Mongoose = require("mongoose");

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

connection.once("open", () => console.log("database connected!"));

// const state = Mongoose.connection.readyState;
/**
 * status da conecção
 *
 * 0- Disconectado
 * 1- Conectado
 * 2- Conectado
 * 3- Disconectando
 */
// console.log("State", state);

// schema mongoose
const heroiSchema = new Mongoose.Schema({
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

const model = Mongoose.model("heoir", heroiSchema);

async function main() {
  const resultCadastrar = await model.create({
    nome: "Batman",
    poder: "Dinheiro",
  });
  console.log("Cadastrar: ", resultCadastrar);

  const listItens = await model.find();
  console.log("Listar herois", listItens);
}

main();
