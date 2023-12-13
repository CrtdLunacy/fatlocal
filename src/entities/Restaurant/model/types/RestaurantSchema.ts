export interface Restaurant {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface RestaurantSchema {
  isLoading?: boolean;
  error?: string;
  restaurant?: Restaurant;
  restaurantsList?: Restaurant[];
}
