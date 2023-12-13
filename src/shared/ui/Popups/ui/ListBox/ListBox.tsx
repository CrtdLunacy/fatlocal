import {
    Fragment, ReactNode,
} from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClasses } from '../../styles/consts';
import { Icon } from '../../../Icon/Icon';
import { Button } from '../../../Button/Button';
import { ButtonTheme } from '../../../Button/consts';
import styles from './ListBox.module.scss';
import popupStyles from '../../styles/popup.module.scss';
import { VStack } from '../../../Stack/VStack/VStack';
import TriangleIcon from '../../../../assets/icons/TriangleIcon.svg';

export interface ListBoxItem {
    value: string;
    content: ReactNode | string;
    id?: string;
    level?: number;
    hasChildren?: boolean;
}

interface ListBoxProps {
    items?:ListBoxItem[];
    className?: string;
    value?: string | number;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction: DropdownDirection;
    label?: string;
    full?: boolean;
}
export function ListBox(props: ListBoxProps) {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom left',
        label,
        full,
    } = props;

    return (
        <VStack max={full}>
            {label && <span className={styles.label}>{label}</span>}
            <HListBox
                as="div"
                className={classNames(styles.ListBox, { [styles.max]: full }, [className, popupStyles.popup])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button as="div" className={popupStyles.trigger}>
                    <Button
                        max
                        theme={ButtonTheme.CLEAR}
                        className={styles.btnTrigger}
                    >
                        {value || defaultValue}
                        <Icon Svg={TriangleIcon} />
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(styles.options, {}, [mapDirectionClasses[direction]])}>
                    {items?.map((item) => (
                        <HListBox.Option
                            disabled={item.hasChildren}
                            key={item.id || item.value}
                            value={item.id || item.value}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        styles.item,
                                        {
                                            [popupStyles.active]: active,
                                            [popupStyles.selected]: selected,
                                            [styles.level2]: item.level === 2,
                                            [styles.level3]: item.level === 3,
                                            [styles.hasChildren]: item.hasChildren,
                                        },
                                        [],
                                    )}
                                >
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </VStack>
    );
}
