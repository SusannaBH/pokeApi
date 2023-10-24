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
        const contenedorCartas = document.getElementById('contenedorCartas');
        contenedorCartas.innerHTML = "";
        const promesasResueltas = yield Promise.all(pokemonsParaRender);
        promesasResueltas.forEach((cartaPokemonHTML) => {
            contenedorCartas.innerHTML += cartaPokemonHTML;
        });
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
