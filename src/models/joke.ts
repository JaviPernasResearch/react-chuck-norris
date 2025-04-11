export interface Joke {
    id: string;
    value: string;
}

export interface ChuckNorrisJoke extends Joke {
    icon_url: string;

    url: string;
}

export type FavoriteJoke = Joke;