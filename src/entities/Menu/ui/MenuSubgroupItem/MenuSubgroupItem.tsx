import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './MenuSubgroupItem.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { MenuModal } from '../MenuModal/MenuModal';
import { Icon } from '@/shared/ui/Icon';
import EditIcon from '@/shared/assets/icons/EditIcon.svg';

interface MenuSubgroupItemProps {
  className?: string;
  name: string;
  id: number;
}

export const MenuSubgroupItem = memo((props: MenuSubgroupItemProps) => {
    const {
        className,
        name,
        id,
    } = props;

    const [isMenuModal, setIsMenuModal] = useState(false);

    const handeCloseModal = useCallback(() => {
        setIsMenuModal(false);
    }, []);

    const handleShowModal = useCallback(() => {
        setIsMenuModal(true);
    }, []);

    return (
        <>
            <div
                className={classNames(styles.MenuSubgroupItem, {}, [className])}
            >
                <Button
                    theme={ButtonTheme.CLEAR}
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
                    title="Редактировать подгруппу"
                    menuParentId={id}
                    isOpen={isMenuModal}
                    onClose={handeCloseModal}
                    editor
                />
            )}
        </>
    );
});
