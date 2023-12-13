import React from 'react';
import { Dropdown } from '@/shared/ui/Popups';
import styles from './HelpDropdown.module.scss';
import { RoutePath } from '@/shared/const/router';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import HelpIcon from '@/shared/assets/icons/HelpIcon.svg?react';
import WhiteDropIcon from '@/shared/assets/icons/WhiteDropIcon.svg?react';

interface HelpDropdownProps {
  className?: string;
}

export const HelpDropdown = (props: HelpDropdownProps) => {
    const { className } = props;

    return (
        <Dropdown
            items={[
                { content: 'Test', href: RoutePath.profile },
                { content: 'Test', href: RoutePath.profile },
            ]}
            trigger={(
                <HStack align="center" gap="10" className={styles.HelpDropdown}>
                    <Icon className={styles.helpIcon} Svg={HelpIcon} />
                    <Text className={styles.helpText} theme={TextTheme.CLEAR_WHITE} text="Помощь" />
                    <Icon className={styles.avatarIcon} Svg={WhiteDropIcon} />
                </HStack>
            )}
            triggerStyle={styles.trigger}
            direction="bottom left"
        />
    );
};
