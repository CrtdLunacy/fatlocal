import React, {
    MutableRefObject, ReactNode, useRef,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import styles from './PageLayout.module.scss';
// eslint-disable-next-line lunacy-plugin/layer-imports
import { NavBar } from '@/widgets/NavBar';

interface PageLayoutProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const PageLayout = (props: PageLayoutProps) => {
    const { className, children, onScrollEnd } = props;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });

    return (
        <main
            ref={wrapperRef}
            className={classNames(styles.PageLayout, {}, [className])}
        >
            <NavBar />
            <div className={classNames(styles.content, {}, [className])}>
                {children}
            </div>
            {onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
        </main>
    );
};
