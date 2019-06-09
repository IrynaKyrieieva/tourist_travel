export interface Tour {
    id: number;
    tourId: number;
    title: string;
    description?: string;
    defaultImageUrl: string;
    isFavorite?: boolean;
    adultCount?: number;
    childrenCount?: number;
    price?: number;
    dateIn?: Date;
    dateOut?: Date;
    country?: string;
    photos: string[];
}
