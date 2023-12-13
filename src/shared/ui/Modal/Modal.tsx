import { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { mapPositionClasses } from './consts';
import { ModalPosition } from '@/shared/types/ui';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  max?: boolean;
  direction?: ModalPosition;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        max,
        direction = 'center',
    } = props;

    const {
        close,
        isClosing,
    } = useModal({
        onClose,
        isOpen,
        animationDelay: 300,
    });

    const { theme } = useTheme();

    const mods: Mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing,
        [styles.max]: max,
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className, theme, mapPositionClasses[direction]])}>
                <Overlay onClick={close} />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
