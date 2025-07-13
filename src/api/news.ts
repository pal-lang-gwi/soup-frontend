import { api } from './axiosInstance';
import { AxiosError } from 'axios';

export interface DailyNewsRequestDto {
  keyword?: string;
  startDate?: string;
  endDate?: string;
}

export interface ArticleDto {
  title: string;
  url: string;
  summary: string;
}

export interface NewsDto {
  keyword: string;
  longSummary: string;
  articles: ArticleDto[];
  createdDate: string;
}

export interface DailyNewsResponseDto {
  newsDtos: NewsDto[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

/**
 * 필터링된 뉴스 목록을 가져옵니다.
 */
export const getFilteredNews = async (
  params: DailyNewsRequestDto,
  page: number = 0,
  size: number = 20
): Promise<DailyNewsResponseDto> => {
  try {
    const response = await api.get('/news', {
      params: {
        ...params,
        page,
        size,
        sort: 'createdDate,desc'
      }
    });
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? '뉴스를 불러오는데 실패했습니다.';
    throw new Error(message);
  }
};

/**
 * 특정 뉴스의 상세 정보를 가져옵니다.
 */
export const getNewsDetail = async (newsId: string): Promise<NewsDto> => {
  try {
    const response = await api.get(`/news/${newsId}`);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? '뉴스 상세 정보를 불러오는데 실패했습니다.';
    throw new Error(message);
  }
};
