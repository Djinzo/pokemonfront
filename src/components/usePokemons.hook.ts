import { useDispatch } from "react-redux";
import { fetchPokemonsStart } from "../redux/pokemon";
import { useEffect } from "react";
import { usePokemonsSelector } from "../redux/pokemon/selectors";

export const usePokemons = () => {
  const pokemon = usePokemonsSelector();
  const dispatch = useDispatch();

  const fetchMore = () => {
    dispatch(fetchPokemonsStart({ page: pokemon.page }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchMore, []);

  return {
    pokemon,
    fetchMore,
  };
};
