import { User } from "../../types/auth";
import { UpdateUserInfo } from "../../types/user";
import { api } from "../axiosInstance";

// GET /api/v1/users
export const axiosUser = (): Promise<User> => {
    return api
    .get<{ success: boolean; data: User; error: null }>('/users/me')
    .then((res) => {
        return res.data.data;
    });
}

// PATCH /api/v1/users
export const patchUserInfo = (
    data: UpdateUserInfo
): Promise<User> => {
    return api
    .patch<{ success: boolean; data: User; error: null }>('/users/me/info', data)
    .then((res) => res.data.data);
};