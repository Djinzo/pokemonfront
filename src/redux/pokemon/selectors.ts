import useSelector from "../useSelector";

export const usePokemonsSelector = () =>
  useSelector((state) => state.pokemons.pokemonsData);
export const usePokemonSelector = () =>
  useSelector((state) => state.pokemons.pokemonData);
