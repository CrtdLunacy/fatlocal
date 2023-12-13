import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './MenuGroupItem.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { MenuModal } from '../MenuModal/MenuModal';
import { Icon } from '@/shared/ui/Icon';
import EditIcon from '@/shared/assets/icons/EditIcon.svg';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface MenuGroupItemProps {
    className?: string;
    name: string;
    id: number;
}

export const MenuGroupItem = memo((props: MenuGroupItemProps) => {
    const {
        className,
        name,
        id,
    } = props;
    const [isMenuModal, setIsMenuModal] = useState(false);
    let element: HTMLElement | null = null;

    useInitialEffect(() => {
        element = document.getElementById(name);
    });

    const handeCloseModal = useCallback(() => {
        setIsMenuModal(false);
    }, []);

    const handleShowModal = useCallback(() => {
        setIsMenuModal(true);
    }, []);

    const handleClick = useCallback(() => {
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [element]);

    return (
        <>
            <div
                className={classNames(styles.MenuGroupItem, {}, [className])}
            >
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={handleClick}
                    className={styles.link}
                >
                    {name}
                </Button>
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={handleShowModal}
                >
                    <Icon Svg={EditIcon} />
                </Button>
            </div>
            {id && (
                <MenuModal
                    title="Редактировать группу"
                    menuParentId={id}
                    isOpen={isMenuModal}
                    onClose={handeCloseModal}
                    editor
                />
            )}
        </>
    );
});
