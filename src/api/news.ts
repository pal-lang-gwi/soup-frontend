import { NewsListResponse } from "../types/news";
import { api } from "./axiosInstance";

export const getNewsList = (params: {
	keyword?: string;
	startDate?: string;
	endDate?: string;
	page: number;
	size?: number;
	sort?: string;
}) => {
	return api.get<NewsListResponse>("/news", {
		params,
	});
};

// 뉴스 상세 조회
export const getNewsDetail = (newsId: string) => {
	return api.get(`/news/${newsId}`);
};
