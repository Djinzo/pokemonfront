import { useEffect, useState } from "react";
import { Pokemon } from "../redux/pokemon/types";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonModal from "./PokemonModal";
import { usePokemons } from "./usePokemons.hook";

function PokemonComponent() {
    const { pokemon, fetchMore } = usePokemons();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedPokemon, setselectedPokemon] = useState<Pokemon>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchMore, []);

    const handleClick = (e: Pokemon) => {
        setselectedPokemon(e);
        setShowModal(true);
    };

    return (
        <div>
            <PokemonModal
                pokemon={selectedPokemon}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <InfiniteScroll
                dataLength={pokemon.pokemons.length}
                next={fetchMore}
                hasMore={pokemon.pokemons.length !== 1281}
                loader={<></>}
                className="grid p-11 grid-cols-{auto-fill}"
            >
                <div className="flex flex-wrap justify-between gap-5">
                    {pokemon.pokemons.map((pokemon: Pokemon, id: number) => (
                        <div
                            key={id}
                            className="flex  font-bold text-xl items-center border border-gray-300 p-3 rounded w-[250px] "
                            onClick={() => handleClick(pokemon)}
                        >
                            <img
                                alt={pokemon.name}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1
                                    }.png`}
                            />
                            {pokemon.name}
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default PokemonComponent;
