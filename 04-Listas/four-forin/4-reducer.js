const { obterPessoas } = require("./server");

Array.prototype.meuReducer = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index], this);
  }
  return valorFinal;
};

async function main() {
  try {

    const { results } = await obterPessoas("a");
    
    const pesos = results.map((item) => parseInt(item.height));
    console.log(pesos);

    const totalHeight = pesos.reduce((anterior, proximo) => {
      return anterior + proximo;
    });
    console.log('Soma: ', totalHeight)

    const minhaLista = [
      ["Tiago", "Emanuel"],
      ["NodeBr", "NerdZão"],
    ];

    // transforma minhaLista em um único array
    const total = minhaLista
      .reduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(", ");
    console.log("total", total);

  } catch (error) {
    console.error("Error", error);
  }
}

main();
