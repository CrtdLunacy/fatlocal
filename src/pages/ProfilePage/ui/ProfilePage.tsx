import { useSelector } from 'react-redux';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProfilePage.module.scss';
import { getUserData, getUserError, getUserLoading } from '@/entities/User';
import { PageLayout } from '@/widgets/PageLayout';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';
import { authService } from '@/shared/services/auth.service';
import { KeycloackToken } from '@/shared/types/token';
import { Avatar } from '@/shared/ui/Avatar';
import { formatPhoneNumber } from '@/shared/lib/formatPhoneNumber/formatPhoneNumber';
import { Select } from '@/shared/ui/Select';
import { getRestaurant, getRestaurantsList, RestaurantActions } from '@/entities/Restaurant';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const user = useSelector(getUserData);
    const restaurant = useSelector(getRestaurant);
    const restaurantsList = useSelector(getRestaurantsList);
    const userError = useSelector(getUserError);
    const userLoading = useSelector(getUserLoading);
    const token = authService.getAccessToken();
    const decoded: KeycloackToken = jwt_decode(token!);
    const currencyOptions: any = useMemo(() => restaurantsList?.map((val) => ({
        id: val.id,
        value: val.title,
        content: val.title,
    })), [restaurantsList]);
    const [value, setValue] = useState(restaurant?.title || undefined);

    const handleChange = useCallback((value?: string) => {
        setValue(value);
    }, []);

    const handleSave = useCallback(() => {
        dispatch(RestaurantActions.changeRestaurant(value!));
    }, [dispatch, value]);

    return (
        <PageLayout>
            <Card max className={classNames(styles.ProfilePage, {}, [className])}>
                <VStack gap="32">
                    <Avatar
                        size={250}
                        className={styles.profileImg}
                        src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg"
                        alt={decoded.name}
                    />
                    <HStack>
                        <Text size={TextSize.XL} text={decoded.name} />
                    </HStack>
                    <VStack gap="16">
                        <VStack>
                            <Text size={TextSize.S} text="Логин" />
                            <Text size={TextSize.L} text={user?.login} />
                        </VStack>
                        <VStack>
                            <Text size={TextSize.S} text="Права" />
                            <Text size={TextSize.L} text={user?.rights} />
                        </VStack>
                        <VStack>
                            <Text size={TextSize.S} text="Телефон" />
                            <Text size={TextSize.L} text={formatPhoneNumber(user?.phone)} />
                        </VStack>
                    </VStack>
                    <VStack gap="10">
                        <Text size={TextSize.S} text="Выбранный ресторан" />
                        <Select
                            onChange={handleChange}
                            value={value}
                            options={currencyOptions}
                        />
                        <Button
                            className={styles.btnSave}
                            onClick={handleSave}
                            theme={ButtonTheme.CLEAR}
                        >
                            Выбрать ресторан
                        </Button>
                    </VStack>
                </VStack>
            </Card>
        </PageLayout>
    );
};
