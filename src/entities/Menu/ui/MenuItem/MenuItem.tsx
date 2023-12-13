import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './MenuItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MenuActions } from '../../model/slices/menuSlice';

interface MenuSectionItemProps {
    className?: string;
    name: string;
    query: string;
}

export const MenuItem = memo((props: MenuSectionItemProps) => {
    const {
        className, name, query,
    } = props;
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const menuPicked = searchParams.get('menu');

    const isPicked = menuPicked === query;

    const handleClick = useCallback(() => {
        dispatch(MenuActions.setGroupName(''));
        dispatch(MenuActions.clearSubGroups());
    }, [dispatch]);

    return (
        <VStack
            grow
            className={classNames('', { }, [className])}
        >
            <AppLink
                to={`?menu=${query}`}
                onClick={handleClick}
                className={classNames(styles.MenuSectionItem, { [styles.selectedText]: isPicked }, [className])}
            >
                {name}
            </AppLink>
            <div className={classNames(styles.bottomLine, { [styles.selected]: isPicked }, [className])} />
        </VStack>
    );
});
