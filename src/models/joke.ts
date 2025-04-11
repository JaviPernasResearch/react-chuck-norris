export interface Joke {
    value: string;
}

export interface ChuckNorrisJoke extends Joke {
    icon_url: string;
    id: string;
    url: string;
}

export interface FavoriteJoke extends Joke {
    id: string;
}