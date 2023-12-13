import React, {
    memo, useCallback, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './MenuGroupList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { ReducersList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { MenuReducer } from '../../model/slices/menuSlice';
import { getGroupIsLoading, getMenuData, getMenuError } from '../../model/selectors/index';
import { Menu } from '../../model/types/MenuSchema';
import { MenuGroupItem } from '../MenuGroupItem/MenuGroupItem';
import { SkeletonLoader } from '@/shared/ui/SkeletonLoader';
import { Text, TextTheme } from '@/shared/ui/Text';
import { MenuModal } from '../MenuModal/MenuModal';

interface MenuGroupListProps {
    className?: string;
}

const initialReducers: ReducersList = {
    menu: MenuReducer,
};

export const MenuGroupList = memo((props: MenuGroupListProps) => {
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const { className } = props;
    const [searchParams] = useSearchParams();
    const menuId = searchParams.get('menu');
    const isLoading = useSelector(getGroupIsLoading);
    const menu = useSelector(getMenuData);
    const groupList = menu ? menu.filter((item) => item.menuParentId === Number(menuId)) : [];
    const error = useSelector(getMenuError);
    const [isMenuModal, setIsMenuModal] = useState(false);

    const handeCloseModal = useCallback(() => {
        setIsMenuModal(false);
    }, []);

    const handleShowModal = useCallback(() => {
        setIsMenuModal(true);
    }, []);

    const renderMenuList = (item: Menu) => (
        <MenuGroupItem
            key={item.id}
            id={item.id}
            name={item.name}
        />
    );

    if (isLoading) {
        return (
            <HStack gap="10" className={classNames(styles.MenuGroupList, {}, [className])}>
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
                <SkeletonLoader border="10px" width={90} height={30} className={styles.skeletonCard} />
            </HStack>
        );
    }

    if (!isLoading && !groupList) {
        return (
            <div className={classNames('', {}, [className])}>
                <Text title="Группы отсутствуют" />
            </div>
        );
    }

    if (error) {
        return (
            <HStack className={classNames(styles.error, {}, [])}>
                <Text theme={TextTheme.ERROR} title={error} />
            </HStack>
        );
    }

    return (
        <HStack
            wrap
            gap="10"
            className={classNames(styles.MenuGroupList, {}, [className])}
        >
            {groupList!.length > 0
                ? groupList!.map(renderMenuList)
                : null}
            <Button
                theme={ButtonTheme.CLEAR}
                size={ButtonSize.L}
                round
                className={styles.addBtn}
                onClick={handleShowModal}
            />
            {menuId && (
                <MenuModal
                    title="Добавить группу"
                    menuParentId={Number(menuId)}
                    isOpen={isMenuModal}
                    onClose={handeCloseModal}
                />
            )}
        </HStack>
    );
});
