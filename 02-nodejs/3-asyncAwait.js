/**
 * Refatorando callBacks.js para promisses
 */

/*
0- Obter um usuário
1- Obter o numero de telefone de um usuário a partir de seu ID
2- Obter o endereço do usuário pelo Id
*/
/**
 * settimeout simula a requisação no banco
 */
function obterUsuario() {
  return new Promise(function resolvePromisse(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: "Tiago",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idusuario, callback) {
  return new Promise(function resolvePromisse(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "954292714",
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idusuario, callback) {
  return new Promise(function resolvePromisse(resolve, reject) {
    setTimeout(() => {
      return resolve({
        rua: "dos trouxas",
        numero: "200",
      });
    }, 1000);
  });
}

// simulando static void main
main();
async function main() {
  try {
    console.time("medida promisses");
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone();
    // const endereco = await obterEndereco();
    const resultado = await Promise.all([
        obterTelefone(usuario.id),
        obterEndereco(usuario.id)
    ])

    const endereco = resultado[1]
    const telefone = resultado[0]

    console.log(
      `Nome: ${usuario.nome}, Telefone: ${telefone.telefone}, Endereço: ${endereco.rua}`
    );
    console.timeEnd("medida promisses");
  } catch (error) {
    console.error("Deu error", error);
  }
}

//   const usuario = obterUsuario();
//   usuario
//     .then((user) => {
//       return obterTelefone(usuario.id)
//       .then((result) => {return { user: {nome: user.nome, id: user.id}, telefone: result}})
//     })
//     .then((result) => {
//       console.log("resultado", result);
//     })
//     .catch((error) => {
//       console.error("Deu Erro", error);
//     });

// obterUsuario(function resolverUsuario(error, usuario) {
//   if (error) {
//     console.error("Deu error em usuario", error);
//     return;
//   }

//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error) {
//       console.error("Deu error em telefone", error);
//       return;
//     }

//     obterEndereco(usuario.id, function resolverEndereco(err2, endereco) {
//       if (error) {
//         console.error("Deu error em endereço", error2);
//         return;
//       }
//       console.log(`
//               Nome: ${usuario.nome},
//               Endereço: ${endereco.rua}, ${endereco.rua},
//               Telefone: (${telefone.ddd})-${telefone.telefone}
//               `);
//     });
//   });
// });

//const teelefone = obterTelefone(usuario.id);

//console.log("usuário:" ,usuario)
//console.log("telefone:" ,telefone)
