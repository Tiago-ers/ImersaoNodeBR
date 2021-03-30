const ICrud = require("./interfaces/interfaceCrud");

// classe concreta que implementão as funções
class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("item salvo em mongodb");
  }
}

module.exports = MongoDB;
