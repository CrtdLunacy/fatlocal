import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu, MenuForm, MenuSchema } from '../types/MenuSchema';
import { fetchMenu } from '../services/fetchMenu/fetchMenu';
import { fetchGroups } from '../services/fetchGroups/fetchGroups';
import { fetchSubgroups } from '../services/fetchSubgroups/fetchSubgroups';
import { addMenu } from '../services/addMenu/addMenu';
import { deleteMenu } from '../services/deleteMenu/deleteMenu';
import { fetchMenuById } from '../services/fetchMenuById/fetchMenuById';
import { editMenu } from '../services/editMenu/editMenu';

const initialState: MenuSchema = {
    isLoadingMenu: false,
    isLoadingGroups: false,
    isLoadingSubGroups: false,
    isLoadingDetails: false,
    error: undefined,
    menus: undefined,
    groups: undefined,
    subgroups: undefined,
    groupName: undefined,
    menuForm: {
        name: '',
    },
};
export const MenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateMenuForm: (state, action: PayloadAction<MenuForm>) => {
            state.menuForm = {
                ...state.menuForm,
                ...action.payload,
            };
        },
        setGroupName: (state, action: PayloadAction<string>) => {
            state.groupName = action.payload;
        },
        clearSubGroups: (state) => {
            state.subgroups = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.isLoadingMenu = true;
                state.error = undefined;
            })
            .addCase(fetchMenu.fulfilled, (
                state,
                action: PayloadAction<Menu[]>,
            ) => {
                state.isLoadingMenu = false;
                state.menus = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.isLoadingDetails = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMenuById.pending, (state) => {
                state.isLoadingDetails = true;
                state.error = undefined;
            })
            .addCase(fetchMenuById.fulfilled, (
                state,
                action: PayloadAction<Menu>,
            ) => {
                state.isLoadingDetails = false;
                state.menuForm = action.payload;
            })
            .addCase(fetchMenuById.rejected, (state, action) => {
                state.isLoadingMenu = false;
                state.error = action.payload as string;
            })
            .addCase(fetchGroups.pending, (state) => {
                state.isLoadingGroups = true;
                state.error = undefined;
            })
            .addCase(fetchGroups.fulfilled, (
                state,
                action: PayloadAction<Menu[]>,
            ) => {
                state.isLoadingGroups = false;
                state.groups = action.payload;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.isLoadingGroups = false;
                state.error = action.payload as string;
            })
            .addCase(fetchSubgroups.pending, (state) => {
                state.isLoadingSubGroups = true;
                state.error = undefined;
            })
            .addCase(fetchSubgroups.fulfilled, (
                state,
                action,
            ) => {
                state.isLoadingSubGroups = false;
                state.subgroups = { ...state.subgroups, ...action.payload };
            })
            .addCase(fetchSubgroups.rejected, (state, action) => {
                state.isLoadingSubGroups = false;
                state.error = action.payload as string;
            })
            .addCase(addMenu.pending, (state) => {
                state.error = undefined;
                state.isLoadingMenu = true;
            })
            .addCase(addMenu.fulfilled, (state) => {
                state.isLoadingMenu = false;
            })
            .addCase(addMenu.rejected, (state, action) => {
                state.isLoadingMenu = false;
                state.error = action.payload as string;
            })
            .addCase(deleteMenu.pending, (state) => {
                state.error = undefined;
                state.isLoadingMenu = true;
            })
            .addCase(deleteMenu.fulfilled, (state) => {
                state.isLoadingMenu = false;
            })
            .addCase(deleteMenu.rejected, (state, action) => {
                state.isLoadingMenu = false;
                state.error = action.payload as string;
            })
            .addCase(editMenu.pending, (state) => {
                state.error = undefined;
                state.isLoadingMenu = true;
            })
            .addCase(editMenu.fulfilled, (state) => {
                state.isLoadingMenu = false;
            })
            .addCase(editMenu.rejected, (state, action) => {
                state.isLoadingMenu = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions: MenuActions } = MenuSlice;
export const { reducer: MenuReducer } = MenuSlice;
