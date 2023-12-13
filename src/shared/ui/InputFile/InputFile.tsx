import { InputHTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './InputFile.module.scss';
import UploadIcon from '../../assets/icons/UploadIcon.svg';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;
interface InputFileProps extends HTMLInputProps {
    className?: string;
    onFilesChange(files: File): void;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readOnly?: boolean;
    labelText?: string;
}

export const InputFile = memo((props: InputFileProps) => {
    const {
        className,
        value,
        onChange,
        onFilesChange,
        placeholder,
        autofocus,
        readOnly,
        labelText,
        ...otherProps
    } = props;

    return (
        <div className={classNames(styles.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={styles.placeholder}>
                    {`${placeholder}`}
                </div>
            )}

            <label htmlFor="contained-button-file" className={styles.labelInput}>
                <Text className={styles.textLabel} text={labelText} />
                <input
                    id="contained-button-file"
                    type="file"
                    accept="image/*" // only accept image file types
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const fileList = e.target.files;
                        if (fileList) {
                            onFilesChange(fileList[0]);
                        }
                    }}
                    className={classNames(styles.InputFile, {}, [className])}
                    {...otherProps}
                />

                <Icon Svg={UploadIcon} />
            </label>
        </div>
    );
});
