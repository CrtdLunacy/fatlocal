import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProductItem.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import { ProductModal } from '../ProductModal/ProductModal';
import { Product } from '../../model/types/ProductsSchema';

interface ProductItemProps extends Product{
    className?: string;
}

const tempImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZo8HJXlzsEbcnfi6ciTTC9I1SF8Pb0wY6A&usqp=CAU';
export const ProductItem = memo((props: ProductItemProps) => {
    const {
        className,
        name,
        price,
        weight,
        imageUrl,
        id,
        units = 'г',
        isActive,
    } = props;
    const [isMenuModal, setIsMenuModal] = useState(false);

    const handleShowModal = useCallback(() => {
        setIsMenuModal(true);
    }, []);

    const handeCloseModal = useCallback(() => {
        setIsMenuModal(false);
    }, []);

    return (
        <Card
            className={classNames(styles.ProductItem, { [styles.active]: isActive }, [className])}
            onClick={handleShowModal}
        >
            <VStack justify="between">
                <img
                    src={imageUrl || tempImg}
                    className={styles.img}
                    alt="card data"
                />
                <VStack max justify="between" className={styles.text} gap="10">
                    <Text size={TextSize.MBold} className={styles.title} text={name} />
                    <HStack max justify="between">
                        <Text text={`${weight} ${units}`} />
                        <Text size={TextSize.MBold} className={styles.price} text={`${price} ₽`} />
                    </HStack>
                </VStack>
            </VStack>
            {id && (
                <ProductModal
                    isOpen={isMenuModal}
                    onClose={handeCloseModal}
                    productId={id}
                    title="Редактировать блюдо"
                />
            )}
        </Card>
    );
});
