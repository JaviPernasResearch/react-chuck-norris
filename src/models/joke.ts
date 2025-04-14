export interface Joke {
    id: string;
    value: string;
    isCustom?: boolean;
}

export interface ChuckNorrisJoke extends Joke {
    icon_url: string;
    url: string;
}

export type FavoriteJoke = Joke;

//Custom Jokes and FavoriteJokes by default