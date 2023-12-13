import React from 'react';
import { Dropdown } from '@/shared/ui/Popups';
import styles from './BillsDropdown.module.scss';
import { RoutePath } from '@/shared/const/router';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import WhiteDropIcon from '@/shared/assets/icons/WhiteDropIcon.svg?react';
import BillsIcon from '@/shared/assets/icons/BillsIcon.svg?react';

interface BillsDropdownProps {
  className?: string;
}

export const BillsDropdown = (props: BillsDropdownProps) => {
    const { className } = props;

    return (
        <Dropdown
            items={[
                { content: 'Test', href: RoutePath.profile },
                { content: 'Test', href: RoutePath.profile },
            ]}
            trigger={(
                <HStack align="center" gap="10" className={styles.BillsDropdown}>
                    <Icon className={styles.billIcon} Svg={BillsIcon} />
                    <Text className={styles.billText} theme={TextTheme.CLEAR_WHITE} text="460 ₽" />
                    <Icon className={styles.avatarIcon} Svg={WhiteDropIcon} />
                </HStack>
            )}
            triggerStyle={styles.trigger}
            direction="bottom left"
        />
    );
};
