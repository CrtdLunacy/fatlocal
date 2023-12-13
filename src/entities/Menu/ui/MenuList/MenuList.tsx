import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './MenuList.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { MenuItem } from '../MenuItem/MenuItem';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getMenuData, getMenuError, getMenuIsLoading } from '../../model/selectors/index';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchMenu } from '../../model/services/fetchMenu/fetchMenu';
import { Menu } from '../../model/types/MenuSchema';
import { SkeletonLoader } from '@/shared/ui/SkeletonLoader';
import { Text, TextTheme } from '@/shared/ui/Text';
import { MenuModal } from '../MenuModal/MenuModal';

interface MenuSectionListProps {
    className?: string;
}

export const MenuList = memo((props: MenuSectionListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getMenuIsLoading);
    const menu = useSelector(getMenuData);
    const menuList = menu && menu.filter((item) => item.menuParentId === 0);
    const error = useSelector(getMenuError);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMenuModal, setIsMenuModal] = useState(false);

    useInitialEffect(() => {
        dispatch(fetchMenu());
    });

    useEffect(() => {
        if (menuList && menuList?.length > 0) {
            setSearchParams({ menu: `${menuList[0].id}` });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu, setSearchParams]);

    const handeCloseModal = useCallback(() => {
        setIsMenuModal(false);
    }, []);

    const handleShowModal = useCallback(() => {
        setIsMenuModal(true);
    }, []);

    const itemsList = (item: Menu) => (
        <MenuItem
            key={item.id}
            name={item.name}
            query={String(item.id)}
            className={styles.menuItem}
        />
    );

    if (isLoading) {
        return (
            <HStack gap="10">
                <SkeletonLoader width={550} height={30} className={styles.skeletonCard} />
                <SkeletonLoader width={550} height={30} className={styles.skeletonCard} />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack className={classNames(styles.error, {}, [])}>
                <Text theme={TextTheme.ERROR} title={error} />
            </HStack>
        );
    }

    if (!isLoading && !menuList) {
        return (
            <div className={classNames('', {}, [className])}>
                <Text title="Меню отсутствует" />
            </div>
        );
    }

    return (
        <HStack max align="end" className={classNames('', {}, [className])}>
            <HStack align="end" className={classNames(styles.MenuSectionList, {}, [className])}>
                {menuList!.length > 0
                    ? menuList!.map(itemsList) : null}
            </HStack>
            <Button
                theme={ButtonTheme.CLEAR}
                size={ButtonSize.L}
                round
                className={styles.addBtn}
                onClick={handleShowModal}
            />
            <MenuModal
                title="Добавить меню"
                menuParentId={0}
                isOpen={isMenuModal}
                onClose={handeCloseModal}
            />
        </HStack>
    );
});
