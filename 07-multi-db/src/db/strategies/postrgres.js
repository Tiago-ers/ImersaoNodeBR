const ICrud = require("./interfaces/interfaceCrud");

// classe concreta que implementão as funções
class PostGres extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("item salvo em postgres");
  }
}

module.exports = PostGres;
