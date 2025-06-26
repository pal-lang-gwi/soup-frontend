import { api } from "../axiosInstance";
import { AxiosError } from "axios";

//닉네임 중복 체크
export const validateNickname = async (params: {
	nickname?: string;
}): Promise<boolean | null> => {
	try {
		const response = await api.get("/users/check-nickname", { params });
		return response.data.data;
	} catch (error) {
		//백엔드에서 보내주는 에러메시지를 던집니다
		const err = error as AxiosError<{ error: { message: string } }>;
		const message = err.response?.data?.error?.message ?? "Unknown Error";
		throw new Error(message);
	}
};

//초기 유저 정보 입력
export const initFirstUser = async (body: {
	nickname: string;
	birthDate: string; // "YYYY-MM-DD" Format
	gender: string;
}) => {
	try {
		const response = await api.post("/users/init", body);
		return response.data.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message = err.response?.data?.error?.message ?? "Unknown Error";
		throw new Error(message);
	}
};

// 사용자 정보 수정
export const updateUser = async (body: {
	nickname?: string;
	birthDate?: string; // "YYYY-MM-DD" Format
	gender?: string;
}) => {
	try {
		const response = await api.patch("/users", body);
		return response.data.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message = err.response?.data?.error?.message ?? "Unknown Error";
		throw new Error(message);
	}
};

// 계정 삭제
export const deleteAccount = async (body: { reason: string }) => {
	try {
		const response = await api.post("/users/delete", body);
		return response.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message = err.response?.data?.error?.message ?? "Unknown Error";
		throw new Error(message);
	}
};

// 내 키워드 목록 조회
export const getMyKeywords = async (params?: {
	page?: number;
	size?: number;
}) => {
	try {
		const response = await api.get("/users/me/keywords", { params });
		return response.data.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message = err.response?.data?.error?.message ?? "Unknown Error";
		throw new Error(message);
	}
};
