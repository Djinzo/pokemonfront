export interface Pokemon {
  name: string;
  url: string;
}
export interface PokemonDetails {
  abilities: [
    {
      ability: { name: string };
      slot: number;
      is_hidden: boolean;
    }
  ];
  base_experience: number;
  name: string;
  order: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
  };
}

export interface PokemonsResponse {
  count: number;
  results: Pokemon[];
}
export interface PokemonsRequest {
  page: number;
}

export interface PokemonRequest {
  url: string;
}
export interface PokemonResponse {
  results: PokemonDetails;
}
