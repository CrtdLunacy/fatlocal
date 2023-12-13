import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import styles from './Select.module.scss';
import { VStack } from '../Stack';

export interface SelectOptions<T extends string> {
  value: T;
  id: string;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOptions<T>[];
  value?: T;
  onChange?: (value: T) => void;
  max?: boolean;
  defaultValue?: string;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        defaultValue,
        max,
    } = props;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    const optionList = useMemo(() => options?.map((opt) => (
        <option
            className={styles.option}
            value={opt.value}
            key={opt.id}
        >
            {opt.content}
        </option>
    )), [options]);

    const mods:Mods = {
        [styles.max]: max,
    };

    return (
        <VStack className={classNames(styles.Wrapper, mods, [className])}>
            {label && (
                <span className={styles.label}>
                    {`${label}`}
                </span>
            )}
            <select
                defaultValue={defaultValue}
                className={styles.select}
                value={value}
                onChange={handleChange}
            >
                {optionList}
            </select>
        </VStack>
    );
};
