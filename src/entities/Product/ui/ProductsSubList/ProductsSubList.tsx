import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProductsSubList.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ProductItem } from '../ProductItem/ProductItem';
import { Product } from '../../model/types/ProductsSchema';
import { getProductsData, getProductsIsLoading } from '../../model/selectors/index';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { SkeletonLoader } from '@/shared/ui/SkeletonLoader';
// eslint-disable-next-line lunacy-plugin/layer-imports
import { getMyWarehouseStatus } from '@/widgets/Warehouse';
import { getMenuData, MenuSubgroupList } from '@/entities/Menu';
import { ProductModal } from '../ProductModal/ProductModal';
import { Text } from '@/shared/ui/Text';
import { useLatencyLoading } from '@/shared/lib/hooks/useLatencyLoading/useLatencyLoading';

interface ProductsSubListProps {
    className?: string;
    id: number;
    name: string;
}

export const ProductsSubList = memo((props: ProductsSubListProps) => {
    const {
        className,
        id,
        name,
    } = props;
    const isLoading = useSelector(getProductsIsLoading);
    const products = useSelector(getProductsData);
    const menu = useSelector(getMenuData);
    const subgroupList = menu ? menu.filter((item) => item.menuParentId === id) : [];
    const [productsList, setProductsList] = useState<Product[]>([]);
    const status = useSelector(getMyWarehouseStatus);
    const [isMenuModal, setIsMenuModal] = useState(false);
    const [isLatencyLoading] = useLatencyLoading(isLoading);
    const handleShowModal = useCallback(() => {
        setIsMenuModal(true);
    }, []);

    const handeCloseModal = useCallback(() => {
        setIsMenuModal(false);
    }, []);

    useEffect(() => {
        if (products && !isLoading) {
            const updatedProductsList = subgroupList.reduce(
                (accumulator: Product[], item) => accumulator.concat(products[item.id]), // собираем продукты со всех подгрупп в один массив
                [],
            );
            if (products[id]) { // если есть продукты на уровне групп
                updatedProductsList.push(...products[id]); // подмешиваем эти продукты в общий массив
            }
            const filteredProductsList = updatedProductsList.filter((item) => item !== undefined); // фильтруем на пустоту
            setProductsList(filteredProductsList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    const renderProductList = (card: Product) => (
        <ProductItem
            key={card.id}
            name={String(card.name)}
            price={card.price}
            weight={card.weight}
            imageUrl={card.imageUrl?.includes('https')
                ? card.imageUrl
                : `${window.location.hostname}/uploads/r${45}/${card.imageUrl}`}
            id={card.id}
            units={card.units}
            isActive={card.isActive}
        />
    );

    if (isLatencyLoading) {
        return (
            <HStack
                gap="10"
                className={styles.ProductsSubListLoader}
            >
                <SkeletonLoader border="10px" width={260} height={300} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={260} height={300} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={260} height={300} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={260} height={300} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={260} height={300} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={260} height={300} className={styles.skeletonCard} />
            </HStack>
        );
    }

    if (!isLoading && !productsList) {
        return (
            <div className={classNames('', {}, [className])}>
                <Text title="Продукты отсутствуют" />
            </div>
        );
    }

    return (
        <VStack
            gap="10"
            align="start"
            id={name}
        >
            <MenuSubgroupList
                subgroupList={subgroupList}
                name={name}
                id={id}
            />
            <HStack
                gap="24"
                className={classNames(styles.ProductsSubList, {}, [className])}
            >
                {!status ? (
                    <Button
                        theme={ButtonTheme.CLEAR}
                        className={styles.addItemBtn}
                        onClick={handleShowModal}
                    />
                ) : null}
                {productsList
                    ? productsList!.map(renderProductList)
                    : null}
                {id && (
                    <ProductModal
                        isOpen={isMenuModal}
                        onClose={handeCloseModal}
                        title="Добавить блюдо"
                    />
                )}
            </HStack>
        </VStack>
    );
});
