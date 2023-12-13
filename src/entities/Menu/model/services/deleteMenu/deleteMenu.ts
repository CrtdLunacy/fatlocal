import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Menu } from '../../types/MenuSchema';
import { fetchMenu } from '../../services/fetchMenu/fetchMenu';
import { getMenuModalForm } from '../../selectors/index';

export const deleteMenu = createAsyncThunk<Menu, void, ThunkConfig<string>>(
    'menu/DeleteMenu',
    async (_, thunkAPI) => {
        const {
            dispatch, extra, rejectWithValue, getState,
        } = thunkAPI;

        const formData = getMenuModalForm(getState());

        try {
            const response = await extra.api.delete<Menu>(`/Menus/${formData?.id}`);
            if (response.status !== 200) {
                throw new Error();
            }

            dispatch(fetchMenu());

            return response.data;
        } catch (e) {
            return rejectWithValue('Something went wrong. Try to delete menu later');
        }
    },
);
