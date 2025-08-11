import { api } from "./axiosInstance";
import { AxiosError } from "axios";
import { keyword, searchKeywordsResponseDto } from "../../entities/keyword";

export const axiosKeywords = async (): Promise<keyword[]> => {
	try {
		const response = await api.get("/keywords");
		if (!response.data.success) {
			const message = response.data.error?.message ?? "키워드 목록 조회 실패";
			throw new Error(message);
		}

		return response.data.data.keywordResponseDtos;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message =
			err.response?.data?.error?.message ??
			(err as Error).message ??
			"키워드 목록 조회 실패";
		throw new Error(message);
	}
};

/**
 * 키워드 검색 API
 * @param keyword 검색할 키워드
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @returns 검색된 키워드 목록
 */
export const searchKeywords = async (
	keyword: string,
	page: number = 0,
	size: number = 20
) => {
	const response = await api.get<searchKeywordsResponseDto>(
		"/keywords/search",
		{
			params: {
				keyword,
				page,
				size,
			},
		}
	)
	return response;
};

// 키워드 구독
export const subscribeKeywords = async (
	subscribeKeywords: string[]
): Promise<void> => {
	try {
		await api.post("/keywords", { subscribeKeywords });
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message = err.response?.data?.error?.message ?? "키워드 구독 실패";
		throw new Error(message);
	}
};

// 키워드 구독 해지 (ID 기반)
export const unsubscribeKeyword = async (keywordId: number): Promise<void> => {
	try {
		await api.post(`/keywords/${keywordId}`);
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message =
			err.response?.data?.error?.message ?? "키워드 구독 해지 실패";
		throw new Error(message);
	}
};

// 더 이상 사용하지 않음: 이름 기반 해지 함수
// export const unsubscribeKeywordByName = async (keyword: string): Promise<void> => {
//   try {
//     await api.post(`/keywords/unsubscribe`, { keyword });
//   } catch (error) {
//     const err = error as AxiosError<{ error: { message: string } }>;
//     const message = err.response?.data?.error?.message ?? "키워드 구독 해지 실패";
//     throw new Error(message);
//   }
// };

// 키워드 요청 등록
export const requestKeyword = async (
	keyword: string
): Promise<void> => {
	try {
		await api.post("/keywords/request", { keyword });
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message = err.response?.data?.error?.message ?? "키워드 요청 실패";
		throw new Error(message);
	}
};
