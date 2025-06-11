import { api } from "../axiosInstance";
import { AxiosError } from "axios";

//닉네임 중복 체크
export const validateNickname = async (params: {nickname?: string}): Promise<boolean | null> => {
    try {
        const response = await api.get('/users/check-nickname', { params });
        console.log(response);
        return response.data.data;
    } catch (error) {
        //백엔드에서 보내주는 에러메시지를 던집니다
        const err = error as AxiosError<{ error: { message: string } }>;
        const message = err.response?.data?.error?.message;
        throw new Error(message);
    }
}