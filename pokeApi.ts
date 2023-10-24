const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon/";

interface PokemonBase {
  name: string
  url: string
}
//Declarar variables globales para botones atras y siguiente
let previous: string;
let next: string;

async function renderPokemons(URL_POKEMONS: string) {
  const res = await fetch(URL_POKEMONS);
  const data = await res.json();
  const resultadosPokemons = data.results;
  previous = data.previous; //Asignacion de boton
  next = data.next; //Asignacion de boton
  actualizarBotones();
  const pokemonsParaRender = await resultadosPokemons.map(async (pokemonData: PokemonBase) => {
    const nombre = pokemonData.name;
    const URL_POKEMON_DETALLES = pokemonData.url;
    const resDetalle = await fetch(URL_POKEMON_DETALLES);
    const dataDetalle = await resDetalle.json();
    const IDPokemon = dataDetalle.id;
    const imagenPokemon = dataDetalle.sprites.other["official-artwork"].front_default;
    return `
          <div id="carta_${IDPokemon}" class="carta">
              <h4 id="nombrePokemon" class="nombrePokemon">${nombre}</h4>
              <div class="containerImagenPokemon">
                  <img src=${imagenPokemon} alt="imagen ${nombre}" class="imagenPokemon" id="imagenPokemon">
              </div>
              <div class="numeracion">
                  #<span id="numeroCarta" class="numeroCarta">${IDPokemon}</span>
              </div>
          </div>
        `;
  });

  const contenedorCartas = document.getElementById('contenedorCartas') as HTMLElement;
  contenedorCartas.innerHTML = "";
  (await Promise.all(pokemonsParaRender)).forEach((cartaPokemonHTML: string) => {
    contenedorCartas.innerHTML += cartaPokemonHTML;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPokemons(URL_POKEMONS)
})


const btnAtrasEl = document.getElementById('botonAtras') as HTMLButtonElement;
const btnSiguienteEl = document.getElementById('botonSiguiente') as HTMLButtonElement;

function actualizarBotones() {
  if (previous === null) {
    btnAtrasEl.style.display = "none";
  } else {
    btnAtrasEl.style.display = "initial";
  }

}

btnAtrasEl.addEventListener('click', () => {
  renderPokemons(previous);
})

btnSiguienteEl.addEventListener('click', () => {
  renderPokemons(next);
})