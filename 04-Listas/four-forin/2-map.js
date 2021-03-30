const service = require("./server");

//método global de lista 
// add meu próprio Map
Array.prototype.meuMap = function (callback) {
  const newArray = [];
  for (let indice = 0; indice < this.length; indice++) {
    const element = callback(this[indice], indice);
    newArray.push(element);
  }

  return newArray;
};

async function main() {
  try {
    const result = await service.obterPessoas("a");
    // const names = []
    // result.results.forEach(item => {
    //     names.push(item.name)
    // });
    // const names = result.results.map((item) => item.name);
    const names = result.results.meuMap(function(pessoa, indice){
      return `[${indice}] ${pessoa.name}`
    })
    console.log("Names: ", names);
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
