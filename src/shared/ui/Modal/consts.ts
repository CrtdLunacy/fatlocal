import styles from './Modal.module.scss';
import { ModalPosition } from '@/shared/types/ui';

export const mapPositionClasses: Record<ModalPosition, string> = {
    bottom: styles.optionBottom,
    left: styles.optionLeft,
    top: styles.optionTop,
    right: styles.optionRight,
    center: styles.optionCenter,
};
