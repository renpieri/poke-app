

function getPokemons(id){

    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => {
            return res.json()
        })
    
}


function getPokemonsByName(name){
    let data = name.toLowerCase()
    return fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
        .then(res => {
            return res.json()
        })
}

export {
    getPokemons,
    getPokemonsByName
}