import createSagaMiddleware from "@redux-saga/core";
import { reducer as pokemonsReducer } from "./pokemon";
import { configureStore } from "@reduxjs/toolkit";
import { watchFetchPokemon, watchFetchPokemons } from "./pokemon/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchPokemon);
sagaMiddleware.run(watchFetchPokemons);
