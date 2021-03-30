/**
 * esse arquivo serve somente para estudo,
 * o próprio já foi refatorado em novas pastas
 */

class NotImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}

class ICrud {
  create(item) {
    throw new NotImplementedException();
  }

  read(query) {
    throw new NotImplementedException();
  }

  uodate(id, item) {
    throw new NotImplementedException();
  }

  delete(id) {
    throw new NotImplementedException();
  }
}

// classe concreta que implementão as funções
class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("item salvo em mongodb");
  }
}

// classe concreta que implementão as funções
class PostGres extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("item salvo em postgres");
  }
}

// classe abstrata, chama os metodos que são passados no construtor
class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(item) {
    return this._database.read(item);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }
}

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostgres = new ContextStrategy(new PostGres());
contextPostgres.create();

contextMongo.read();
