import { api } from "./axiosInstance"
import { AxiosError } from "axios";
import { keyword, searchKeywordsResponseDto } from "../types/keyword";

export const axiosKeywords = async (): Promise<keyword[]> => {
  try {
    const response = await api.get('/keywords');
    if (!response.data.success) {
      const message = response.data.error?.message ?? '키워드 목록 조회 실패';
      throw new Error(message);
    }

    return response.data.data.keywordResponseDtos;
  } catch (error) {
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? (err as Error).message ?? '키워드 목록 조회 실패';
    throw new Error(message);
  }
};



// 키워드 검색
export const searchKeywords = async (keyword: string): Promise<searchKeywordsResponseDto> => {
    try {
        const response = await api.get("/keywords/search", { params: { keyword } });
        return response.data.data.keywords;
    } catch (error) {
        const err = error as AxiosError<{ error: { message: string } }>;
        const message = err.response?.data?.error?.message ?? '키워드 검색 실패';
        throw new Error(message);
    }
};

// 키워드 구독
export const subscribeKeywords = async (subscribeKeywords: string[]): Promise<void> => {
    try {
        await api.post("/keywords", { subscribeKeywords });
    } catch (error) {
        const err = error as AxiosError<{ error: { message: string } }>;
        const message = err.response?.data?.error?.message ?? '키워드 구독 실패';
        throw new Error(message);
    }
};

// 키워드 구독 해지
export const unsubscribeKeyword = async (keywordId: number): Promise<void> => {
    try {
        await api.post(`/keywords/${keywordId}`);
    } catch (error) {
        const err = error as AxiosError<{ error: { message: string } }>;
        const message = err.response?.data?.error?.message ?? '키워드 구독 해지 실패';
        throw new Error(message);
    }
};

// 키워드 요청 등록
export const requestKeyword = async (userId: string, keyword: string): Promise<void> => {
    try {
        await api.post("/keywords/request", { userId, keyword });
    } catch (error) {
        const err = error as AxiosError<{ error: { message: string } }>;
        const message = err.response?.data?.error?.message ?? '키워드 요청 실패';
        throw new Error(message);
    }
};