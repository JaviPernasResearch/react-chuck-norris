export interface CatPic {
    id: string;
    tags: string[];
    created_at: string;
    url: string;
    mimetype: string;
}

export interface FavoriteCatPic extends CatPic {
    dataId : string;
    userId: string;
}

export type CreateFavoriteCatPic = Omit<FavoriteCatPic, 'userId' | 'dataId'>
