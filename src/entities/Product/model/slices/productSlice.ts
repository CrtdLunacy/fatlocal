import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Product, ProductDetails, ProductsSchema, UrlData,
} from '../types/ProductsSchema';
import { fetchProductsById } from '../services/fetchProductsById/fetchProductsById';
import {
    fetchProductsIntegration,
} from '../services/fetchProductsIntegration/fetchProductsIntegration';
import { fetchProductDetails } from '../services/fetchProductDetails/fetchProductDetails';
import { updateProductDetails } from '../services/updateProductDetails/updateProductDetails';
import { uploadProductImg } from '../services/uploadProductImg/uploadProductImg';
import { fetchProducts } from '../services/fetchProducts/fetchProducts';

const initialState: ProductsSchema = {
    isLoading: false,
    isLoadingIntegration: false,
    error: undefined,
    errorDetails: undefined,
    data: undefined,
    uploadImage: undefined,
    dataIntegration: undefined,
    productDetailsData: {},
    productDetailsForm: {
        title: 'Название',
        description: 'Описание',
        ingredients: 'Ингредиенты',
        units: 'г',
        type: 0,
    },
};
export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProductDetails: (state, action: PayloadAction<ProductDetails>) => {
            state.productDetailsForm = {
                ...state.productDetailsForm,
                ...action.payload,
            };
        },
        clearProductDetails: (state) => {
            state.productDetailsForm = {};
            state.productDetailsData = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProducts.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchProductsById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProductsById.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProductsById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchProductsIntegration.pending, (state) => {
                state.isLoadingIntegration = true;
                state.error = undefined;
            })
            .addCase(fetchProductsIntegration.fulfilled, (
                state,
                action: PayloadAction<Product[]>,
            ) => {
                state.isLoadingIntegration = false;
                state.dataIntegration = action.payload;
            })
            .addCase(fetchProductsIntegration.rejected, (state, action) => {
                state.isLoadingIntegration = false;
                state.error = action.payload as string;
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.error = undefined;
            })
            .addCase(fetchProductDetails.fulfilled, (
                state,
                action: PayloadAction<ProductDetails>,
            ) => {
                state.productDetailsData = action.payload;
                state.productDetailsForm = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateProductDetails.pending, (state) => {
                state.isLoading = true;
                state.errorDetails = undefined;
            })
            .addCase(updateProductDetails.fulfilled, (
                state,
                action: PayloadAction<ProductDetails>,
            ) => {
                state.isLoading = false;
                state.productDetailsData = action.payload;
                state.productDetailsForm = action.payload;
            })
            .addCase(updateProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.errorDetails = action.payload as string;
            })
            .addCase(uploadProductImg.pending, (state) => {
                state.error = undefined;
            })
            .addCase(uploadProductImg.fulfilled, (
                state,
                action: PayloadAction<UrlData>,
            ) => {
                state.uploadImage = action.payload.fileName;
            })
            .addCase(uploadProductImg.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { actions: ProductActions } = ProductSlice;
export const { reducer: ProductReducer } = ProductSlice;
