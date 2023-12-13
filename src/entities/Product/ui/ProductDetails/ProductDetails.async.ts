import { FC, lazy } from 'react';
import { ProductDetailsProps } from './ProductDetails';

export const ProductDetailsAsync = lazy <FC<ProductDetailsProps>>(() => import('./ProductDetails'));
