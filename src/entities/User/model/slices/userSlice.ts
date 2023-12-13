import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/UserSchema';
import { fetchUsers } from '../services/fetchUsers/fetchUsers';
import { fetchUserById } from '../services/fetchUserById/fetchUserById';
import { fetchUserByToken } from '../services/fetchUserByToken/fetchUserByToken';

const initialState: UserSchema = {
    isLoading: false,
    error: undefined,
    user: undefined,
    usersList: undefined,
};
export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.error = undefined;
            })
            .addCase(fetchUsers.fulfilled, (
                state,
                action: PayloadAction<User[]>,
            ) => {
                state.usersList = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchUserById.fulfilled, (
                state,
                action: PayloadAction<User>,
            ) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUserByToken.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchUserByToken.fulfilled, (
                state,
                action: PayloadAction<User>,
            ) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserByToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
