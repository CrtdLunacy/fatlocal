import { StateSchema } from '@/app/providers/StoreProvider';

export const getMenuData = (state: StateSchema) => state.menu?.menus || [];
export const getGroupData = (state: StateSchema) => state.menu?.groups;
export const getGroupName = (state: StateSchema) => state.menu?.groupName || '';
export const getMenuModalForm = (state: StateSchema) => state.menu?.menuForm;
export const getSubgroupData = (state: StateSchema) => state.menu?.subgroups;
export const getMenuIsLoading = (state: StateSchema) => state.menu?.isLoadingMenu || false;
export const getGroupIsLoading = (state: StateSchema) => state.menu?.isLoadingGroups || false;
export const getSubgroupIsLoading = (state: StateSchema) => state.menu?.isLoadingSubGroups || false;
export const getMenuError = (state: StateSchema) => state.menu?.error;
