"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const URL_POKEMONS = "https://pokeapi.co/api/v2/pokemon/";
//Declarar variables globales para botones atras y siguiente
let previous;
let next;
function renderPokemons(URL_POKEMONS) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(URL_POKEMONS);
        const data = yield res.json();
        const resultadosPokemons = data.results;
        previous = data.previous; //Asignacion de boton
        next = data.next; //Asignacion de boton
        actualizarBotones();
        const pokemonsParaRender = yield plantillaArray(resultadosPokemons);
        const contenedorCartas = document.getElementById('contenedorCartas');
        contenedorCartas.innerHTML = "";
        const promesasResueltas = yield Promise.all(pokemonsParaRender);
        promesasResueltas.forEach((cartaPokemonHTML) => {
            contenedorCartas.innerHTML += cartaPokemonHTML;
        });
    });
}
function plantillaArray(resultadosPokemons) {
    return __awaiter(this, void 0, void 0, function* () {
        const pokemonsParaRender = yield resultadosPokemons.map((pokemonData) => __awaiter(this, void 0, void 0, function* () {
            const nombre = pokemonData.name;
            const URL_POKEMON_DETALLES = pokemonData.url;
            const resDetalle = yield fetch(URL_POKEMON_DETALLES);
            const dataDetalle = yield resDetalle.json();
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
        }));
        return pokemonsParaRender;
    });
}
document.addEventListener("DOMContentLoaded", () => {
    renderPokemons(URL_POKEMONS);
});
const btnAtrasEl = document.getElementById('botonAtras');
const btnSiguienteEl = document.getElementById('botonSiguiente');
function actualizarBotones() {
    if (previous === null) {
        btnAtrasEl.style.display = "none";
    }
    else {
        btnAtrasEl.style.display = "initial";
    }
}
btnAtrasEl.addEventListener('click', () => {
    renderPokemons(previous);
});
btnSiguienteEl.addEventListener('click', () => {
    renderPokemons(next);
});
//TIPOS
const aceroEl = document.getElementById('acero');
const aguaEl = document.getElementById('agua');
const bichoEl = document.getElementById('bicho');
const dragonEl = document.getElementById('dragon');
const electricoEl = document.getElementById('electrico');
const fantasmaEl = document.getElementById('fantasma');
const fuegoEl = document.getElementById('fuego');
const hadaEl = document.getElementById('hada');
const hieloEl = document.getElementById('hielo');
const luchaEl = document.getElementById('lucha');
const normalEl = document.getElementById('normal');
const plantaEl = document.getElementById('planta');
const psiquicoEl = document.getElementById('psiquico');
const rocaEl = document.getElementById('roca');
const siniestroEl = document.getElementById('siniesto');
const tierraEl = document.getElementById('tierra');
const venenoEl = document.getElementById('veneno');
const voladorEl = document.getElementById('volador');
function fetchTipo(url_tipo) {
    return __awaiter(this, void 0, void 0, function* () {
        const resTipo = yield fetch(url_tipo);
        const data = yield resTipo.json();
        const pokemons = data.pokemon;
        return pokemons;
    });
}
aceroEl.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonsArrayCompleto = yield fetchTipo("https://pokeapi.co/api/v2/type/9/");
    const pokemonsArrayBase = pokemonsArrayCompleto.map((pokemonCompleto) => {
        const nombre = pokemonCompleto.pokemon.name;
        const url_pkm = pokemonCompleto.pokemon.url;
        return {
            name: nombre,
            url: url_pkm // url var
        };
    });
    // llamamos a plantillaArray() pasandole el pokemonsArrayBase
    plantillaArray(pokemonsArrayBase);
    // rendering
    const pokemonsParaRender = yield plantillaArray(pokemonsArrayBase);
    const contenedorCartas = document.getElementById('contenedorCartas');
    contenedorCartas.innerHTML = "";
    const promesasResueltas = yield Promise.all(pokemonsParaRender);
    promesasResueltas.forEach((cartaPokemonHTML) => {
        contenedorCartas.innerHTML += cartaPokemonHTML;
    });
}));
aguaEl.addEventListener('click', () => {
    fetchTipo("https://pokeapi.co/api/v2/type/11/");
});
