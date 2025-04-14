export interface Joke {
    id: string;
    value: string;
    isCustom?: boolean;
}

export interface ChuckNorrisJoke extends Joke {
    icon_url: string;
    url: string;
}

export interface CustomJoke extends Joke {
    isCustom: true;
}

export type FavoriteJoke = Joke | CustomJoke;