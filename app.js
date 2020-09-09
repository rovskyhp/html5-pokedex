const container = document.getElementById("pokemons");

const myHeaders = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
});

function loadPokemons() {
    for(let i = 1; i<15;i++){
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`, {
            mode: "cors",
            headers: myHeaders
        })
            .then(res => res.json())
            .then(pokemon => {
                console.log(pokemon);
                const pokemonType = pokemon.types
                    .map((poke) => poke.type.name)
                    .join(", ");

                const transformedPokemon = {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: `${pokemon.sprites.front_default}`,
                    type: pokemonType
                };
                showPokemon(transformedPokemon);
            }).catch(err => console.error(err));
    }
   
}

function showPokemon(pokemon) {
    
    let output = `
        <div class="col mb-4">
            <div class="card">
                <span class="cardId">#${pokemon.id}</span>
                <img class="card-img-top cardImage" src=${pokemon.image} alt=${pokemon.name} />
                <div class="card-body">
                    <h5 class="card-title cardName">${pokemon.name}</h5>
                </div>
                <div class="card-footer">
                    <small class="text-muted">${pokemon.type}</small>
                </div>
            </div>
        </div>
    `;

    container.innerHTML += output;
}

loadPokemons();