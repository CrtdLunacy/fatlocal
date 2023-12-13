export interface Product {
  id?: number;
  parentId?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  units?: string;
  weight?: number;
  isActive?: boolean;
  type?: number;
}

export interface UrlData {
  fileName: string;
  directUrl: string;
}

export interface ProductOptions {
  title?: string;
  weight?: number;
  units?: string;
  calories?: number;
  proteins?: number;
  fats?: number;
  carbohydrates?: number;
  price?: number;
  parentId?: number;
  isActive?: boolean;
  id?: number;
}

export type Addons = ProductOptions;

export interface Variants extends ProductOptions {
  cookingTime?: number
}

export interface ProductDetails extends ProductOptions {
  description?: string;
  ingredients?: string;
  image?: string;
  cookingTime?: number
  availableInside?: boolean;
  availableOutside?: boolean;
  availableDelivery?: boolean;
  variants?: Variants[];
  addons?: Addons[];
  type?: number;
}

export interface ProductsSchema {
  isLoading: boolean;
  isLoadingIntegration: boolean;
  error?: string;
  errorDetails?: string;
  data?: {
    [key: number]: Product[];
  }
  dataIntegration?: Product[];
  productDetailsData?: ProductDetails
  productDetailsForm?: ProductDetails
  uploadImage?: string;
}
