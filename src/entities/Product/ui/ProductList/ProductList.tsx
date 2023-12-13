import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProductList.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ReducersList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { ProductReducer } from '../../model/slices/productSlice';
import { getMenuData, getMenuIsLoading } from '@/entities/Menu';
import { SkeletonLoader } from '@/shared/ui/SkeletonLoader';
import { ProductsSubList } from '../ProductsSubList/ProductsSubList';
import { fetchProducts } from '../../model/services/fetchProducts/fetchProducts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface ProductListProps {
    className?: string;
}

const initialReducers: ReducersList = {
    products: ProductReducer,
};

export const ProductList = memo((props: ProductListProps) => {
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const { className } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getMenuIsLoading);
    const [searchParams] = useSearchParams();
    const menuId = searchParams.get('menu');
    const menu = useSelector(getMenuData);
    const sectionList = menu ? menu.filter((item) => item.menuParentId === Number(menuId)) : [];

    useInitialEffect(() => {
        dispatch(fetchProducts());
    });

    if (isLoading) {
        return (
            <HStack gap="10">
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
            </HStack>
        );
    }

    return (
        <VStack
            gap="24"
            className={classNames(styles.ProductList, {}, [className])}
            align="start"
        >
            {sectionList
                && sectionList!.map((item) => (
                    <ProductsSubList
                        name={item.name}
                        id={item.id}
                        key={item.id}
                    />
                ))}
        </VStack>
    );
});
