import React from "react";
import { Pokemon } from "../redux/pokemon/types";
import { usePokemonSelector } from "../redux/pokemon/selectors";
import { fetchPokemonStart } from "../redux/pokemon";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


type Props = {
    showModal?: boolean;
    setShowModal?: any;
    pokemon?: Pokemon;
};

export default function PokemonModal({ pokemon, showModal, setShowModal }: Props) {

    const pokemonDetails = usePokemonSelector();
    const dispatch = useDispatch();


    const fetchMore = () => {
        dispatch(fetchPokemonStart({ url: pokemon?.url }));
    };

    useEffect(fetchMore, [pokemon])


    return (
        <>
            {showModal && pokemon ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">

                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                <div className="flex  justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {pokemon.name}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >

                                        <span className="bg-transparent !text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {pokemonDetails.loading === false ? (
                                    <div className="relative p-6 flex-auto">
                                        <div className="columns-2">
                                            <div>
                                                <img className="w-[400px]" src={pokemonDetails.pokemon?.sprites.other["official-artwork"].front_default} alt="pokeimage" />
                                            </div>
                                            <div>

                                                <p> <b> name </b>: {pokemon.name}</p>
                                                <p> <b> order </b>: {pokemonDetails.pokemon?.order}</p>
                                                <p><b> abilities</b>: {pokemonDetails.pokemon?.abilities.map(a => <>{a.ability.name}</>)}</p>
                                                <p> <b>base experience</b> : {pokemonDetails.pokemon?.base_experience}</p>

                                            </div>
                                        </div>
                                    </div>) : <h1>....loading</h1>}
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}