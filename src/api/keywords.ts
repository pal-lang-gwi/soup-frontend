import { Keyword, KeywordsApiResponse } from "../types/keyword";
import { api } from "./axiosInstance";

// /api/v1/keywords - 전체체 키워드 조회
export const axiosKeywords = (): Promise<Keyword[]> => {
    return api
    .get<KeywordsApiResponse>('/keywords')
    .then((res) => {
        console.log(res);
        return res.data.data.keywords
    });
};
  // 내 키워드 등록
// export const saveKeywords = (list:string[]) =>
//     api.post('user/me/keywords',{list});