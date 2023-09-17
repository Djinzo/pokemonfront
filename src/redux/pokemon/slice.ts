import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pokemon, PokemonDetails, PokemonsResponse } from "./types";

interface PokemonState {
  pokemonData: {
    pokemon?: PokemonDetails;
    loading: boolean;
    error: boolean;
  };
  pokemonsData: {
    pokemons: Pokemon[];
    loading: boolean;
    error: boolean;
    page: number;
    pageCount: number;
  };
}

const initialState: PokemonState = {
  pokemonData: {
    loading: false,
    error: false,
  },
  pokemonsData: {
    pokemons: [],
    loading: true,
    error: true,
    page: 0,
    pageCount: 1,
  },
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    fetchPokemonsStart(state, action) {
      state.pokemonsData.loading = true;
      state.pokemonsData.error = false;
    },
    fetchPokemonsSuccess(state, action: PayloadAction<PokemonsResponse>) {
      state.pokemonsData.loading = false;
      state.pokemonsData.page = state.pokemonsData.page + 1;
      state.pokemonsData.pageCount = action.payload.count / 100;
      state.pokemonsData.pokemons = [
        ...state.pokemonsData.pokemons,
        ...action.payload.results,
      ];
    },
    fetchPokemonsFailure(state, action) {
      state.pokemonsData.loading = false;
      state.pokemonsData.error = action.payload;
    },

    fetchPokemonStart(state, action) {
      state.pokemonData.loading = true;
      state.pokemonData.error = false;
    },
    fetchPokemonSuccess(state, action: PayloadAction<PokemonDetails>) {
      state.pokemonData.loading = false;
      state.pokemonData.pokemon = action.payload;
    },
    fetchPokemonFailure(state, action) {
      state.pokemonData.loading = false;
      state.pokemonData.error = action.payload;
    },
  },
});

export const {
  fetchPokemonsFailure,
  fetchPokemonsSuccess,
  fetchPokemonsStart,
  fetchPokemonFailure,
  fetchPokemonSuccess,
  fetchPokemonStart,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
