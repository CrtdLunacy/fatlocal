import { CSSProperties } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './SkeletonLoader.module.scss';

interface SkeletonLoaderProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const SkeletonLoader = (props: SkeletonLoaderProps) => {
    const {
        className,
        height,
        width,
        border,
    } = props;

    const stylesLoader: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(styles.SkeletonLoader, {}, [className])}
            style={stylesLoader}
        />
    );
};
