import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Menu } from '../../types/MenuSchema';
import { MenuActions } from '../../slices/menuSlice';
import { fetchMenu } from '../../services/fetchMenu/fetchMenu';
import { getMenuModalForm } from '../../selectors/index';

export const addMenu = createAsyncThunk<Menu, number, ThunkConfig<string>>(
    'menu/AddMenu',
    async (menuParentId, thunkAPI) => {
        const {
            dispatch, extra, rejectWithValue, getState,
        } = thunkAPI;

        const menuData = getMenuModalForm(getState());
        if (!menuData?.name) throw new Error('Не указано название меню');

        try {
            const response = await extra.api.post<Menu>('/Menus', {
                name: menuData.name,
                menuParentId,
            });
            if (!response.data) {
                throw new Error();
            }

            dispatch(MenuActions.updateMenuForm({ name: '' }));
            dispatch(fetchMenu());

            return response.data;
        } catch (e) {
            return rejectWithValue('Failed add new menu');
        }
    },
);
