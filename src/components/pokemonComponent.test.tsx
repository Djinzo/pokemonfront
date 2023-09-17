import PokemonComponent from "./PokemonComponent";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/configure";
import * as pockemopnHooks from "./usePokemons.hook";

const mockTranslate = jest.fn((label: string) => label);

jest.mock("./usePokemons.hook", () => ({
    useTranslate: () => mockTranslate,
}));

describe("pokemon compoenent", () => {
    it("should show pokemens corrently when provided", async () => {
        const mockFetchMoreFn = jest.fn;
        jest.spyOn(pockemopnHooks, "usePokemons").mockReturnValue({
            pokemon: {
                pokemons: [
                    {
                        name: "bulbasaur",
                        url: "https://pokeapi.co/api/v2/pokemon/1/",
                    },
                    {
                        name: "ivysaur",
                        url: "https://pokeapi.co/api/v2/pokemon/2/",
                    },
                    {
                        name: "venusaur",
                        url: "https://pokeapi.co/api/v2/pokemon/3/",
                    },
                    {
                        name: "charmander",
                        url: "https://pokeapi.co/api/v2/pokemon/4/",
                    },
                ],
                loading: false,
                error: false,
                page: 1,
                pageCount: 10,
            },
            fetchMore: mockFetchMoreFn,
        });

        render(
            <Provider store={store}>
                <PokemonComponent />
            </Provider>
        );

        expect(await screen.findByText("bulbasaur")).toBeTruthy();
    });
});
