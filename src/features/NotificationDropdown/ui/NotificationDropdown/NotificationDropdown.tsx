import React from 'react';
import { Dropdown } from '@/shared/ui/Popups';
import styles from './NotificationDropdown.module.scss';
import { RoutePath } from '@/shared/const/router';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import NotificationIcon from '@/shared/assets/icons/NotifBell.svg?react';
import WhiteDropIcon from '@/shared/assets/icons/WhiteDropIcon.svg?react';

interface NotificationDropdownProps {
  className?: string;
}

export const NotificationDropdown = (props: NotificationDropdownProps) => {
    const { className } = props;

    return (
        <Dropdown
            items={[
                { content: 'Test', href: RoutePath.profile },
                { content: 'Test', href: RoutePath.profile },
            ]}
            trigger={(
                <HStack align="center" gap="10" className={styles.NotificationDropdown}>
                    <Icon className={styles.notificationIcon} Svg={NotificationIcon} />
                    <Text className={styles.notificationText} theme={TextTheme.CLEAR_WHITE} text="Уведомления" />
                    <Icon className={styles.avatarIcon} Svg={WhiteDropIcon} />
                </HStack>
            )}
            triggerStyle={styles.trigger}
            direction="bottom left"
        />
    );
};
