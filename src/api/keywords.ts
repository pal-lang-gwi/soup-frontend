import { Keyword, KeywordsApiResponse } from "../types/keyword";
import { api } from "./axiosInstance";

// /api/v1/keywords - 전체 키워드 조회
export const axiosKeywords = (): Promise<Keyword[]> => {
    return api
    .get<KeywordsApiResponse>('/keywords')
    .then((res) => {
        console.log(res);
        return res.data.data.keywords
    });
};