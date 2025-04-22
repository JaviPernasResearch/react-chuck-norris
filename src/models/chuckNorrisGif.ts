export interface ChuckNorrisGif {
    id: string;
    description: string;
    gifUrl: string;
    previewUrl: string;
    pageUrl: string;
}

export interface FavoriteChuckNorrisGif extends ChuckNorrisGif {
    dataId : string;
    userId: string;
}

export type CreateFavoriteChuckNorrisGif = Omit<FavoriteChuckNorrisGif, 'userId' | 'dataId'>
