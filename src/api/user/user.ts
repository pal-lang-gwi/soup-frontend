import { api } from "../axiosInstance";
import { AxiosError } from "axios";

//닉네임 중복 체크
export const validateNickname = async (params: {nickname?: string}): Promise<boolean | null> => {
    try {
        const response = await api.get('/users/check-nickname', { params });
        return response.data.data;
    } catch (error) {
        //백엔드에서 보내주는 에러메시지를 던집니다
        const err = error as AxiosError<{ error: { message: string } }>;
        const message = err.response?.data?.error?.message ?? 'Unknown Error';
        throw new Error(message);
    }
}

//초기 유저 정보 입력
export const initFirstUser = async (body : {
    nickname: string,
    birthDate: string; // "YYYY-MM-DD" Format
    gender: string;
}) => {
    try {
        const response = await api.post('/users/init', body);
        return response.data.data;
    } catch (error) {
        const err = error as AxiosError<{ error: { message: string } }>;
        const message = err.response?.data?.error?.message ?? 'Unknown Error';
        throw new Error(message);
    }
}

// 유저 기본 정보 조회
export const getUserInfo = async () => {
  try {
    const response = await api.get("/users");
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? "사용자 정보를 불러올 수 없습니다.";
    throw new Error(message);
  }
};

// 구독 키워드 목록 조회
export const getMyKeywords = async (page = 0): Promise<MyKeywordListResponse> => {
  try {
    const response = await api.get("/users/me/keywords", {
      params: { page }, // 쿼리 파라미터로 페이지 전송
    });
    return response.data.data; // 전체 객체 리턴
  } catch (error) {
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? "키워드 정보를 불러올 수 없습니다.";
    throw new Error(message);
  }
};