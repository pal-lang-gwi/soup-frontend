import { NewsListResponse } from '../types/news';
import { api } from './axiosInstance';

export const getNewsList = (params: {
    keyword?: string;
    startDate?: string;
    endDate?: string;
    page: number;
}) => {
    return api.get<NewsListResponse>('/news', {
        params,
    });
};
