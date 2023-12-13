import { DropdownDirection } from '../../../types/ui';
import styles from './popup.module.scss';

export const mapDirectionClasses: Record<DropdownDirection, string> = {
    'bottom left': styles.optionBottomLeft,
    'bottom right': styles.optionBottomRight,
    'top left': styles.optionTopLeft,
    'top right': styles.optionTopRight,
};
