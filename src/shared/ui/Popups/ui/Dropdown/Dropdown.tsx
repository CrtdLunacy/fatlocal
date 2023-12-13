import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClasses } from '../../styles/consts';
import { AppLink } from '../../../AppLink/AppLink';
import styles from './Dropdown.module.scss';
import popupStyles from '../../styles/popup.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    triggerStyle: string;
    direction?: DropdownDirection;

}

export function Dropdown(props: DropdownProps) {
    const {
        className,
        items,
        trigger,
        triggerStyle,
        direction = 'bottom right',
    } = props;

    return (
        <Menu as="div" className={classNames(styles.Dropdown, {}, [className, popupStyles.popup])}>
            <Menu.Button className={classNames(popupStyles.btn, {}, [triggerStyle])}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(styles.menu, {}, [mapDirectionClasses[direction]])}>
                {items.map((item, index) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(styles.item, { [popupStyles.active]: active }, [])}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                        // eslint-disable-next-line react/no-array-index-key
                            <Menu.Item key={index} as={AppLink} to={item.href} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                    // eslint-disable-next-line react/no-array-index-key
                        <Menu.Item key={index} as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
