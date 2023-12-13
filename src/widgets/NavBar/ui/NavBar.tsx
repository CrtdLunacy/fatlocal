import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NavBar.module.scss';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { Icon } from '@/shared/ui/Icon';
import LogoIcon from '@/shared/assets/icons/LogoIcon.svg?react';
import { HStack } from '@/shared/ui/Stack';
import { BillsDropdown } from '@/features/BillsDropdown';
import { NotificationDropdown } from '@/features/NotificationDropdown';
import { HelpDropdown } from '@/features/HelpDropdown';

interface NavbarProps {
  className?: string;
}

export const NavBar = memo(({ className }: NavbarProps) => (
    <header className={classNames(styles.Navbar, {}, [className])}>
        <Icon Svg={LogoIcon} />
        <HStack gap="32">
            <BillsDropdown />
            <NotificationDropdown />
            <HelpDropdown />
            <AvatarDropdown />
        </HStack>
    </header>
));
