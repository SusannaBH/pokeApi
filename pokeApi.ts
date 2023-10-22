const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon/";

interface PokemonBase {
  name: string
  url: string
}

async function renderPokemons(URL_POKEMONS: string) {
    const res = await fetch(URL_POKEMONS);
    const data = await res.json();
    const resultadosPokemons = data.results;
    resultadosPokemons.forEach(async (pokemonData: PokemonBase) => {
        const nombre = pokemonData.name;
        const URL_POKEMON_DETALLES = pokemonData.url;
        const resDetalle = await fetch(URL_POKEMON_DETALLES);
        const dataDetalle = await resDetalle.json();
        const IDPokemon = dataDetalle.id;
        const imagenPokemon = dataDetalle.sprites.other["official-artwork"].front_default;
        let cartaPokemonHTML = `
          <div id="carta_${IDPokemon}" class="carta">
              <h4 id="nombrePokemon" class="nombrePokemon">${nombre}</h4>
              <div class="containerImagenPokemon">
                  <img src=${imagenPokemon} alt="imagen ${nombre}" class="imagenPokemon" id="imagenPokemon">
              </div>
              <div class="numeracion">
                  #<span id="numeroCarta" class="numeroCarta">${IDPokemon}</span>
              </div>
          </div>
        `
        const contenedorCartas = document.getElementById('contenedorCartas') as HTMLElement;
        contenedorCartas.innerHTML += cartaPokemonHTML;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPokemons(URL_POKEMONS)
})