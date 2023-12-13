import React, { useCallback } from 'react';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import styles from './AvatarDropdown.module.scss';
import { RoutePath } from '@/shared/const/router';
import keycloak from '@/keycloack';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';
import { KeycloackToken } from '@/shared/types/token';
import { authService } from '@/shared/services/auth.service';
import { APP_URL } from '@/shared/const/keycloack';
import { Icon } from '@/shared/ui/Icon';
import WhiteDropIcon from '@/shared/assets/icons/WhiteDropIcon.svg?react';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { className } = props;

    const handleLogout = useCallback(() => {
        keycloak.logout({ redirectUri: APP_URL });
    }, []);

    const token = authService.getAccessToken();
    const decoded: KeycloackToken = jwt_decode(token!);

    return (
        <Dropdown
            items={[
                { content: 'Профиль', href: RoutePath.profile },
                { content: 'Выйти', onClick: handleLogout },
            ]}
            trigger={(
                <HStack align="center" gap="16" className={styles.AvatarDropdown}>
                    <Avatar
                        className={styles.avatar}
                        size={50}
                        src="https://preview.free3d.com/img/2017/05/2146738490367280215/jzme4ttx.jpg"
                    />
                    <VStack>
                        <Text theme={TextTheme.CLEAR_WHITE} text={`Аккаунт: ${decoded.name}`} />
                        <Text theme={TextTheme.CLEAR_WHITE} text={decoded.email} />
                    </VStack>
                    <Icon className={styles.avatarIcon} Svg={WhiteDropIcon} />
                </HStack>
            )}
            triggerStyle={styles.trigger}
            direction="bottom left"
        />
    );
};
