export interface User {
    id: number;
    isActive: boolean;
    login: string;
    rights: string;
    phone: string;
}

export interface UserSchema {
    isLoading: boolean;
    error?: string;
    user?: User;
    usersList?: User[];
}
