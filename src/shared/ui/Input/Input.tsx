import {
    ChangeEvent, InputHTMLAttributes, memo, useRef,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import styles from './Input.module.scss';
import { InputType } from './consts';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'maximum'>;
interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readOnly?: boolean;
  type?: InputType;
  maximum?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        autofocus,
        readOnly,
        type = InputType.TEXT,
        maximum,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [styles.readonly]: readOnly,
        [styles.max]: maximum,
    };

    const inputMods: Mods = {
        [styles.fileTheme]: type === InputType.FILE,
        [styles.number]: type === InputType.NUMBER,
    };

    return (
        <div className={classNames(styles.InputWrapper, mods, [className])}>
            {placeholder && (
                <div className={styles.placeholder}>
                    {`${placeholder}`}
                </div>
            )}

            <div className={styles.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value || ''}
                    onChange={handleChange}
                    className={classNames(styles.input, inputMods, [])}
                    readOnly={readOnly}
                    {...otherProps}
                />
            </div>
        </div>
    );
});
