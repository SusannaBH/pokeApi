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
  const pokemonsParaRender = await plantillaArray(resultadosPokemons);
  const contenedorCartas = document.getElementById('contenedorCartas') as HTMLElement;
  contenedorCartas.innerHTML = "";
  const promesasResueltas = await Promise.all(pokemonsParaRender)
  promesasResueltas.forEach((cartaPokemonHTML: string) => {
    contenedorCartas.innerHTML += cartaPokemonHTML;
  });
}
async function plantillaArray(resultadosPokemons: Array<PokemonBase>) {
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
  return pokemonsParaRender;
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

//TIPOS
const aceroEl = document.getElementById('acero') as HTMLDivElement;
const aguaEl = document.getElementById('agua') as HTMLDivElement;
const bichoEl = document.getElementById('bicho') as HTMLDivElement;
const dragonEl = document.getElementById('dragon') as HTMLDivElement;
const electricoEl = document.getElementById('electrico') as HTMLDivElement;
const fantasmaEl = document.getElementById('fantasma') as HTMLDivElement;
const fuegoEl = document.getElementById('fuego') as HTMLDivElement;
const hadaEl = document.getElementById('hada') as HTMLDivElement;
const hieloEl = document.getElementById('hielo') as HTMLDivElement;
const luchaEl = document.getElementById('lucha') as HTMLDivElement;
const normalEl = document.getElementById('normal') as HTMLDivElement;
const plantaEl = document.getElementById('planta') as HTMLDivElement;
const psiquicoEl = document.getElementById('psiquico') as HTMLDivElement;
const rocaEl = document.getElementById('roca') as HTMLDivElement;
const siniestroEl = document.getElementById('siniesto') as HTMLDivElement;
const tierraEl = document.getElementById('tierra') as HTMLDivElement;
const venenoEl = document.getElementById('veneno') as HTMLDivElement;
const voladorEl = document.getElementById('volador') as HTMLDivElement;

async function fetchTipo(url_tipo: string) {
  const resTipo = await fetch(url_tipo);
  const data = await resTipo.json();
  const pokemons = data.pokemon;
  return pokemons;
}
// ESTRUCTURA pokemonCompleto
type PokemonCompleto = {
    pokemon: {
      name: string
      url: string
    },
    slot: number
  }
aceroEl.addEventListener('click', async () => {
  const pokemonsArrayCompleto = await fetchTipo("https://pokeapi.co/api/v2/type/9/");
  const pokemonsArrayBase = pokemonsArrayCompleto.map((pokemonCompleto: PokemonCompleto) => {
    const nombre = pokemonCompleto.pokemon.name;
    const url_pkm = pokemonCompleto.pokemon.url;
    return {
      name: nombre, // pokemon nombre var
      url: url_pkm  // url var
    }
  })
  // llamamos a plantillaArray() pasandole el pokemonsArrayBase
  plantillaArray(pokemonsArrayBase);
  // rendering
  const pokemonsParaRender = await plantillaArray(pokemonsArrayBase);
  const contenedorCartas = document.getElementById('contenedorCartas') as HTMLElement;
  contenedorCartas.innerHTML = "";
  const promesasResueltas = await Promise.all(pokemonsParaRender)
  promesasResueltas.forEach((cartaPokemonHTML: string) => {
    contenedorCartas.innerHTML += cartaPokemonHTML;
  });
})

aguaEl.addEventListener('click',() => {
  fetchTipo("https://pokeapi.co/api/v2/type/11/");
})

