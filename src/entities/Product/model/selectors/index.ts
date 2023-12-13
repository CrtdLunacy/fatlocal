import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsData = (state: StateSchema) => state.products?.data;
export const getProductsDataIntegration = (state: StateSchema) => state.products?.dataIntegration;
export const getProductDetailsData = (state: StateSchema) => state.products?.productDetailsData;
export const getProductDetailsForm = (state: StateSchema) => state.products?.productDetailsForm;
export const getProductImg = (state: StateSchema) => state.products?.uploadImage;
export const getProductsIsLoading = (state: StateSchema) => state.products?.isLoading || false;

export const getProductsIsLoadingIntegration = (state: StateSchema) => state.products?.isLoadingIntegration || false;
export const getProductsError = (state: StateSchema) => state.products?.error;
export const getProductsErrorDetails = (state: StateSchema) => state.products?.errorDetails;
