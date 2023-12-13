import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className, src, size, alt,
    } = props;
    const mods: Mods = {};
    const stylesInline = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    return (
        <img
            src={src}
            alt={alt}
            style={stylesInline}
            className={classNames(styles.Avatar, mods, [className])}
        />
    );
};
