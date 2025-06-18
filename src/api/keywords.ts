import { Keyword, KeywordsApiResponse } from "../types/keyword";
import { api } from "./axiosInstance";

// 전체 키워드 목록 조회
export const axiosKeywords = (): Promise<Keyword[]> => {
	return api
		.get<KeywordsApiResponse>("/keywords")
		.then((res) => res.data.data.keywords);
};

// 키워드 검색
export const searchKeywords = (keyword: string): Promise<Keyword[]> => {
	return api
		.get(`/keywords/search`, { params: { keyword } })
		.then((res) => res.data.data.keywords);
};

// 키워드 구독
export const subscribeKeywords = (subscribeKeywords: string[]) => {
	return api.post("/keywords", { subscribeKeywords });
};

// 키워드 구독 해지
 export const unsubscribeKeyword = (keywordId: number) => {
	return api.post(`/keywords/${keywordId}`);
};

// 키워드 요청 등록
export const requestKeyword = (userId: string, keyword: string) => {
	return api.post("/keywords/request", { userId, keyword });
};
