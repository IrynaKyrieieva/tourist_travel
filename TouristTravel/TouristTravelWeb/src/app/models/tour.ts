export interface Tour {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    isFavorite?: boolean;
    adultCount?: number;
    childrenCount?: number;
    price?: number;
    dateIn?: Date;
    dateOut?: Date;
    country?: string;
}
