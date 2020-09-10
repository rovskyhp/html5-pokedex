const container = document.getElementById("pokemons");

const myHeaders = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
});

function loadPokemons() {
    for(let i = 1; i<151;i++){
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`, {
            mode: "cors",
            headers: myHeaders
        })
            .then(res => res.json())
            .then(pokemon => {
                console.log(pokemon);
                const pokemonType = showType(pokemon.types);

                const transformedPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    imageFront: `${pokemon.sprites.front_default}`,
                    imageBack: `${pokemon.sprites.back_default}`,
                    type: pokemonType
                };
                showPokemon(transformedPokemon);
            }).catch(err => console.error(err));
    }
   
}


function showType(pokemonTypes) {
    let output = '';
    pokemonTypes.forEach(poke => {
        output += `<div class="row mx-md-n5"><div class="col px-md-5"><span class="badge badge-${poke.type.name}">${poke.type.name}</span></div></div>`;
    });
    return output;
}

function showPokemon(pokemon) {
    
    let output = `
        <div class="col mb-4">
            <div class="card card-flip">
                <div class="card-front  d-flex">
                    <div class="d-flex flex-column">
                    <span class="cardId">#${pokemon.id}</span>
                    <img class="card-img-top cardImage" src=${pokemon.imageFront} alt=${pokemon.name} />
                    <div class="card-body d-flex">
                        <div class="d-flex flex-column">
                            <h3 class="card-title cardName">${pokemon.name}</h3>
                            ${pokemon.type}
                        </div>
                    </div>
                    </div>
                </div>
                <div class="card-back  d-flex">
                    <div class="d-flex flex-column">
                    <span class="cardId">#${pokemon.id}</span>
                    <img class="card-img-top cardImage" src=${pokemon.imageBack} alt=${pokemon.name} />
                    <div class="card-body d-flex">
                        <div class="d-flex flex-column">
                            <h3 class="card-title cardName">${pokemon.name}</h3>
                            ${pokemon.type}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML += output;
}

loadPokemons();