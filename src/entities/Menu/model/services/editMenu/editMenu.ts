import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Menu } from '../../types/MenuSchema';
import { MenuActions } from '../../slices/menuSlice';
import { fetchMenu } from '../../services/fetchMenu/fetchMenu';
import { getMenuModalForm } from '../../selectors/index';

export const editMenu = createAsyncThunk<Menu, number, ThunkConfig<string>>(
    'menu/editMenu',
    async (menuId, thunkAPI) => {
        const {
            dispatch, extra, rejectWithValue, getState,
        } = thunkAPI;

        const menuData = getMenuModalForm(getState());
        // @ts-ignore
        const { id, ...objectToSend } = menuData;

        try {
            const response = await extra.api.put(`/Menus/${id}`, objectToSend);
            if (!response.data) {
                throw new Error();
            }

            dispatch(MenuActions.updateMenuForm({ name: '' }));
            dispatch(fetchMenu());

            return response.data;
        } catch (e) {
            return rejectWithValue('Failed edit menu');
        }
    },
);
