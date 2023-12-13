import {
    ChangeEvent, InputHTMLAttributes, memo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Switcher.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChangeCheck'>;
interface SwitcherProps extends HTMLInputProps {
    className?: string;
    checked?: boolean;
    onChangeCheck: (value?: boolean) => void;
    idCheckboxName: string;
}

export const Switcher = memo((props: SwitcherProps) => {
    const {
        className,
        checked = false,
        onChangeCheck,
        placeholder,
        idCheckboxName,
    } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeCheck?.(e.target.checked);
    };

    return (
        <div className={classNames(styles.Switcher, {}, [className])}>
            {placeholder && (
                <div className={styles.placeholder}>
                    {`${placeholder}`}
                </div>
            )}

            <label className={styles.switch} htmlFor={idCheckboxName}>
                <input onChange={handleChange} type="checkbox" checked={checked} className={styles.checkbox} id={idCheckboxName} />
                <div className={classNames(styles.slider, {}, [styles.round])} />
            </label>
        </div>
    );
});
