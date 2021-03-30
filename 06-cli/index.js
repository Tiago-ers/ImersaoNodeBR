const { command } = require("commander");
const Commander = require("commander");
const Database = require("./database");
const Heroi = require("./heroi");

async function main() {
  Commander.version("v1")
    .option("-n, --nome [value]", "Nome do Herói")
    .option("-p, --poder [value]", "Poder do Herói")
    .option("-i, --id [value]", "Id do Herói")

    .option("-c, --cadastrar", "Cadastrar um Herói")
    .option("-l, --listar", "Listar um Herói")
    .option("-r, --remover", "Remover um Herói")
    .option("-a, --atualizar [value]", "Atualizar um Herói por Id")
    .parse(process.argv);

  const heroi = new Heroi(Commander.opts());
  //   console.log(Commander);

  try {
    const { cadastrar, remover, atualizar, listar } = Commander.opts();
    if (cadastrar) {
      delete heroi.id;
      console.log(heroi);
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) {
        console.error("Herói não cadastrado.");
        return;
      }
      console.log("Herói cadastrado com sucesso !");
    }

    if (listar) {
      const resultado = await Database.listar(heroi.id);
      console.log(resultado);
      return;
    }

    if (remover) {
      const resultado = await Database.remover();
      if (!resultado) {
        console.error("Não foi possível remover o heroi");
      }
      console.error("Heroi removido com sucesso");
    }

    if (atualizar) {
      const idAtualizar = parseInt(atualizar);
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(idAtualizar, heroiAtualizar);
      if (!resultado) {
        console.error("Não foi possível atualizar o heroi!");
        return;
      }
      console.error("Heroi atualizado com sucesso!!!");
    }
  } catch (error) {
    console.error("Error", error);
  }
}

main();
