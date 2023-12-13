import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import styles from './Flex.module.scss';

export type FlexJustify = 'start' | 'end' | 'center' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '6' | '10' | '16' | '24' | '32';

const justifyClasses: Record<FlexJustify, string> = {
    start: styles.justifyStart,
    end: styles.justifyEnd,
    center: styles.justifyCenter,
    between: styles.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
    start: styles.alignStart,
    end: styles.alignEnd,
    center: styles.alignCenter,
};

const directionClasses: Record<FlexDirection, string> = {
    row: styles.directionRow,
    column: styles.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
    6: styles.gap6,
    10: styles.gap10,
    16: styles.gap16,
    24: styles.gap24,
    32: styles.gap32,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
  grow?: boolean;
  wrap?: boolean;
  id?: string;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        max,
        grow,
        wrap,
        id,
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods:Mods = {
        [styles.max]: max,
        [styles.grow]: grow,
        [styles.wrap]: wrap,
    };

    return (
        <div id={id} className={classNames(styles.Flex, mods, classes)}>
            {children}
        </div>
    );
};
