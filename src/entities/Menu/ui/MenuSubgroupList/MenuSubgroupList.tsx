import React, {
    memo, useCallback, useState,
} from 'react';
import { useSelector } from 'react-redux';
import styles from './MenuSubgroupList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { getMenuError, getSubgroupIsLoading } from '../../model/selectors/index';
import { Menu } from '../../model/types/MenuSchema';
import { SkeletonLoader } from '@/shared/ui/SkeletonLoader';
import { Text, TextTheme } from '@/shared/ui/Text';
import { MenuSubgroupItem } from '../MenuSubgroupItem/MenuSubgroupItem';
import { MenuModal } from '../MenuModal/MenuModal';

interface MenuSubgroupListProps {
  className?: string;
  id: number;
  name: string;
  subgroupList: Menu[];
}

export const MenuSubgroupList = memo((props: MenuSubgroupListProps) => {
    const {
        className, id, name, subgroupList,
    } = props;
    const isLoading = useSelector(getSubgroupIsLoading);
    const error = useSelector(getMenuError);
    const [isMenuModal, setIsMenuModal] = useState(false);

    const handeCloseModal = useCallback(() => {
        setIsMenuModal(false);
    }, []);

    const handleShowModal = useCallback(() => {
        setIsMenuModal(true);
    }, []);

    const renderSubGroupList = (item: Menu) => (
        <MenuSubgroupItem
            key={item.id}
            id={item.id}
            name={item.name}
        />
    );

    if (isLoading) {
        return (
            <HStack gap="10">
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
            </HStack>
        );
    }

    if (!isLoading && !subgroupList) {
        return null;
    }

    if (error) {
        return (
            <HStack className={classNames(styles.error, {}, [])}>
                <Text theme={TextTheme.ERROR} title={error} />
            </HStack>
        );
    }

    return (
        <VStack
            max
            gap="10"
        >
            <Text
                title={name}
                id={name}
            />
            <HStack
                wrap
                gap="10"
                className={classNames(styles.MenuSubgroupList, {}, [className])}
            >
                {subgroupList!.length > 0
                    ? subgroupList!.map(renderSubGroupList)
                    : null}
                <Button
                    theme={ButtonTheme.CLEAR}
                    size={ButtonSize.L}
                    round
                    className={styles.addBtn}
                    onClick={handleShowModal}
                />
                {id && (
                    <MenuModal
                        title="Добавить подгруппу"
                        menuParentId={id}
                        isOpen={isMenuModal}
                        onClose={handeCloseModal}
                    />
                )}
            </HStack>
        </VStack>
    );
});
