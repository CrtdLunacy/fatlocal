import React, { FunctionComponent, SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement>{
  className?: string;
  fillIcon?: boolean;
  Svg: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
}

export const Icon = (props: IconProps) => {
    const {
        className, fillIcon, Svg, ...otherProps
    } = props;

    const mods = {
        [styles.fillIcon]: fillIcon,
    };

    return (
        <Svg
            className={classNames(styles.Icon, mods, [className])}
            {...otherProps}
        />
    );
};
