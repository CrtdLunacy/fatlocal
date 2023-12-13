export { ProductItem } from './ui/ProductItem/ProductItem';
export { ProductList } from './ui/ProductList/ProductList';
export type { ProductsSchema, Product } from '../Product/model/types/ProductsSchema';
export { fetchProducts } from '../Product/model/services/fetchProducts/fetchProducts';
export { fetchProductsById } from '../Product/model/services/fetchProductsById/fetchProductsById';
export { getProductsDataIntegration, getProductsIsLoadingIntegration, getProductsData } from './model/selectors/index';
export { fetchProductsIntegration } from './model/services/fetchProductsIntegration/fetchProductsIntegration';
