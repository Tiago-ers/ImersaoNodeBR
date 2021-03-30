const { obterPessoas } = require("./server");

Array.prototype.meuFilter = function (callback) {
  const lista = [];
  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    lista.push(item);
  }
  return lista;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");

    // const familiaLars = results.filter(function(item){
    //     // false -> remove da lista
    //     // true -> mantém
    //     // não econtrou = -1
    //     // encontro = posicaoNoArray
    //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1
    //     return result
    // })
    const familiaLars = results.meuFilter((item, index, lista) => {
        console.log(`Index ${index}`, lista.length)
      item.name.toLowerCase().indexOf("lars") !== 1;
    });
    const names = familiaLars.map((pessoas) => pessoas.name);
    console.log(names);
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
