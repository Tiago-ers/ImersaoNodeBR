const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const driver = new Sequelize("heroes", "tiago", "minhasenha", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
});

async function main() {
  const Herois = driver.define(
    "heroes",
    {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING,
        required: true,
      },
      poder: {
        type: Sequelize.STRING,
        required: true,
      },
    },
    {
      tableName: "TB_HEROIS",
      freezeTableName: false,
      timestamps: false,
    }
  );
  await Herois.sync();
  //   await Herois.create({
  //     nome: "Lanterna Verde",
  //     poder: "Anel",
  //   });

  const result = await Herois.findAll({ raw: true, attributes: ["nome"] });
  console.log(result);
}

main();
