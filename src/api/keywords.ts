import { api } from "./axiosInstance";

// /api/v1/keywords - 키워드 등록
export const axiosKeywords = () => api.get<string[]>('/keywords')
// 내 키워드 등록
export const saveKeywords = (list:string[]) =>
    api.post('user/me/keywords',{list});