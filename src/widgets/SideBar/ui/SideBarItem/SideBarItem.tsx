import React, { memo } from 'react';
import { AppLink } from '@/shared/ui/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ISideBarItem } from '../../model/types/sidebar';
import styles from './SideBarItem.module.scss';
import { useCurrentLocation } from '@/shared/lib/hooks/useCurrentLocation/useCurrentLocation';
import { HStack } from '@/shared/ui/Stack';

interface SideBarItemProps {
    item: ISideBarItem;
    location: string;
    isBeta?: boolean;
}

const SideBarItem = memo(({ item, location, isBeta }: SideBarItemProps) => {
    const isPicked = useCurrentLocation(item.path, location);
    console.log(item.text, isBeta);

    if (item.path !== '/') {
        return (
            <HStack
                gap="10"
                className={classNames(styles.item, { [styles.isPicked]: isPicked }, [])}
            >
                <a
                    href={`https://cp.nemenu-demo.ru${item.path}`}
                >
                    <span className={styles.link}>{item.text}</span>
                </a>
                {isBeta && (
                    <span className={styles.betaLabel}>Beta</span>
                )}
            </HStack>
        );
    }

    return (
        <HStack
            gap="10"
            className={classNames(styles.item, { [styles.isPicked]: isPicked }, [])}
        >
            <AppLink
                to={item.path}
            >
                <span className={styles.link}>{item.text}</span>
            </AppLink>
            {isBeta && (
                <span className={styles.betaLabel}>Beta</span>
            )}
        </HStack>
    );
});

export default SideBarItem;
