import { memo, Suspense, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './MenuModal.module.scss';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { MenuFormAsync } from '../MenuForm/MenuForm.async';
import { MenuActions } from '../../model/slices/menuSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteMenu } from '../../model/services/deleteMenu/deleteMenu';

interface MenuModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    menuParentId: number;
    title: string;
    editor?: boolean
}

export const MenuModal = memo((props: MenuModalProps) => {
    const {
        className,
        onClose,
        isOpen,
        menuParentId,
        title,
        editor,
    } = props;

    const dispatch = useAppDispatch();

    const handleChangeMenu = useCallback((value?: string) => {
        dispatch(MenuActions.updateMenuForm({ menuParentId: Number(value) || 0 }));
    }, [dispatch]);

    const handleDeleteMenu = useCallback(async () => {
        if (menuParentId) {
            await dispatch(deleteMenu());
        }
    }, [dispatch, menuParentId]);

    const handleToggleMenu = useCallback((value?: boolean) => {
        dispatch(MenuActions.updateMenuForm({ isActive: value || false }));
    }, [dispatch]);

    const handleChangeMenuName = useCallback((value?: string) => {
        dispatch(MenuActions.updateMenuForm({ name: value || '' }));
    }, [dispatch]);

    return (
        <Modal
            className={classNames(styles.MenuModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            max={editor}
            direction="top"
        >
            <Suspense fallback={<Loader />}>
                <MenuFormAsync
                    editor={editor}
                    title={title}
                    menuParentId={menuParentId}
                    onSuccess={onClose}
                    onChangeMenu={handleChangeMenu}
                    onDeleteMenu={handleDeleteMenu}
                    onToggleMenu={handleToggleMenu}
                    onChangeName={handleChangeMenuName}
                />
            </Suspense>
        </Modal>
    );
});
