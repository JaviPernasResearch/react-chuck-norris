export interface RandomColor {
    id: string; 
    hex: string;
}

export interface FavoriteColor extends RandomColor {
    userId: string;
    createdAt: string;
    dataId: string;
}

export type CreateFavoriteColor = Omit<FavoriteColor, 'userId' | 'createdAt' | 'dataId'>;
