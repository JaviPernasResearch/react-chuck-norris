export interface Joke {
    id: string;
    value: string;
    isCustom?: boolean;
}

export interface ChuckNorrisJoke extends Joke {
    icon_url: string;
    url: string;
}

export interface FavoriteJoke extends Joke{
    userId: string;
    createdAt: string;
    dataId: string;
}

// Helper type for creating new favorites
export type CreateFavoriteJoke = Omit<FavoriteJoke, 'userId' | 'createdAt' | 'dataId'>

//Custom Jokes and FavoriteJokes by default