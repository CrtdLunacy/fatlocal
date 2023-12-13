export interface Menu {
    id: number;
    name: string;
    menuParentId: number;
    imageUrl: string;
    isActive: boolean;
}

export type MenuForm = {
    [K in keyof Menu]?: Menu[K];
};

export interface MenuSchema {
    isLoadingMenu: boolean;
    isLoadingGroups: boolean;
    isLoadingSubGroups: boolean;
    isLoadingDetails: boolean;
    error?: string;
    groupName?: string;
    menus?: Menu[];
    groups?: Menu[];
    subgroups?: {
        [key: number]: Menu[];
    }
    menuForm: MenuForm;
}
