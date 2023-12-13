import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClasses } from '../../styles/consts';
import styles from './Popover.module.scss';
import popupStyles from '../../styles/popup.module.scss';

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropdownDirection;
    children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        trigger,
        direction = 'bottom right',
        children,
    } = props;

    return (
        <HPopover className={classNames(styles.Popover, {}, [className, popupStyles.popup])}>
            <HPopover.Button as="div" className={popupStyles.trigger}>{trigger}</HPopover.Button>

            <HPopover.Panel className={classNames(styles.panel, {}, [mapDirectionClasses[direction]])}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
};
