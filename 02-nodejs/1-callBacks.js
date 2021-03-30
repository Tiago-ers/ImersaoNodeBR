/*
0- Obter um usuário
1- Obter o numero de telefone de um usuário a partir de seu ID
2- Obter o endereço do usuário pelo Id
*/
/**
 * settimeout simula a requisação no banco 
 */
function obterUsuario(callback){
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: "Tiago",
            dataNascimento: new Date()
        })
    }, 1000)
}
function obterTelefone(idusuario, callback){
    setTimeout(() => {
        return callback(null, {
            telefone: "954292714",
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idusuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua:"dos trouxas",
            numero: "200"
        })
    })
}

function resolveUsuario(erro, usuario){
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
    if(error){
        console.error("Deu error em usuario", error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error){
            console.error("Deu error em telefone", error)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(err2, endereco){
            if(error){
                console.error("Deu error em endereço", error2)
                return;
            }        
            console.log(`
            Nome: ${usuario.nome},
            Endereço: ${endereco.rua}, ${endereco.rua},
            Telefone: (${telefone.ddd})-${telefone.telefone}
            `)
        })
    })
})


//const teelefone = obterTelefone(usuario.id);

//console.log("usuário:" ,usuario)
//console.log("telefone:" ,telefone)

