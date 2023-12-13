import React, { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import SideBarItem from '../SideBarItem/SideBarItem';
import styles from './SideBar.module.scss';

interface SideBarProps {
  className?: string
}

const sideBarMenu = [
    {
        path: '/',
        text: 'Серверы',
    },
    {
        path: '/equipment-placement',
        text: 'Размещение оборудования',
    },
    {
        path: '/network',
        text: 'Сеть',
    },
    {
        path: '/backup',
        text: 'Резервное копирование',
    },
    {
        path: '/network-equipment',
        text: 'Сетевое обурудование',
    },
    {
        path: '/firewall',
        text: 'Базовый файрвол',
    },
    {
        path: '/comm-ports',
        text: 'Аренда портов коммутатора',
    },
    {
        path: '/servers',
        text: 'Серверные стойки',
    },
    {
        path: '/ssh-sale',
        text: 'SSH-ключи',
    },
    {
        path: '/api-sale',
        text: 'API',
    },
];

export const SideBar = memo(({ className }: SideBarProps) => {
    const location = useLocation();

    const itemsList = useMemo(() => sideBarMenu.map((item) => (
        <SideBarItem
            item={item}
            location={location.pathname}
            key={item.path}
        />
    )), [location.pathname]);

    return (
        <aside
            data-testid="sidebar"
            className={classNames(styles.SideBar, {}, [className])}
        >
            <VStack role="navigation" className={styles.items}>
                {itemsList}
            </VStack>
        </aside>
    );
});
