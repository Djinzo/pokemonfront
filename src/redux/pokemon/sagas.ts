import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  fetchPokemonsSuccess,
  fetchPokemonsFailure,
  fetchPokemonSuccess,
  fetchPokemonFailure,
} from "./slice";
import { SagaIterator } from "redux-saga";
import {
  PokemonRequest,
  PokemonResponse,
  PokemonsRequest,
  PokemonsResponse,
} from "./types";

const fetchApi = async (page: number) => {
  const data = await axios.get<PokemonsResponse>(
    `https://pokeapi.co/api/v2/pokemon/?offset=${page * 100}&limit=100`
  );
  return data.data;
};

function* fetchPokemons(action: PayloadAction<PokemonsRequest>): SagaIterator {
  try {
    const response = yield call(fetchApi, action.payload.page);
    yield put(fetchPokemonsSuccess(response));
  } catch (error) {
    yield put(fetchPokemonsFailure(error));
  }
}

const fetchPokemonApi = async (url: string) => {
  const data = await axios.get<PokemonResponse>(url);
  return data.data;
};

function* fetchPokemon(action: PayloadAction<PokemonRequest>): SagaIterator {
  try {
    const response = yield call(fetchPokemonApi, action.payload.url);
    yield put(fetchPokemonSuccess(response));
  } catch (error) {
    yield put(fetchPokemonFailure(error));
  }
}

export function* watchFetchPokemons() {
  yield takeLatest("pokemon/fetchPokemonsStart", fetchPokemons);
}

export function* watchFetchPokemon() {
  yield takeLatest("pokemon/fetchPokemonStart", fetchPokemon);
}
