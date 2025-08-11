import { api } from "./axiosInstance";
import { AxiosError } from "axios";

export interface UserAdditionalInfoRequestDto {
	nickname: string;
	gender: "MALE" | "FEMALE";
	birthDate: string;
}

export interface UserInitSettingResponseDto {
	userId: number;
	email: string;
	nickname: string;
	role: "USER" | "ADMIN";
	gender: "MALE" | "FEMALE";
	birthDate: string;
	profileImageUrl: string;
}

export interface UserUpdateRequestDto {
	nickname?: string;
	gender?: "MALE" | "FEMALE";
	birthDate?: string;
}

export interface UserResponseDto {
	userId: number;
	email: string;
	nickname: string;
	role: "USER" | "ADMIN";
	gender: "MALE" | "FEMALE";
	birthDate: string;
	profileImageUrl: string;
}

export interface UserDeleteRequestDto {
	reason: string;
}

export interface MyKeywordListResponseDto {
	keywords: string[];
	totalElements: number;
	totalPages: number;
	currentPage: number;
}

/**
 * 사용자 추가 정보를 초기화합니다.
 */
export const initUserAdditionalInfo = async (
	request: UserAdditionalInfoRequestDto
): Promise<UserInitSettingResponseDto> => {
	try {
		const response = await api.post("/users/init", request);
		return response.data.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message =
			err.response?.data?.error?.message ??
			"사용자 정보 초기화에 실패했습니다.";
		throw new Error(message);
	}
};

/**
 * 사용자 정보를 업데이트합니다.
 */
export const updateUserInfo = async (
	request: UserUpdateRequestDto
): Promise<UserResponseDto> => {
	try {
		const response = await api.patch("/users", request);
		return response.data.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message =
			err.response?.data?.error?.message ??
			"사용자 정보 업데이트에 실패했습니다.";
		throw new Error(message);
	}
};

/**
 * 사용자 정보를 가져옵니다.
 */
export const getUserInfo = async (): Promise<UserResponseDto> => {
	try {
		const response = await api.get("/users");
		return response.data.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message =
			err.response?.data?.error?.message ??
			"사용자 정보를 불러오는데 실패했습니다.";
		throw new Error(message);
	}
};

/**
 * 닉네임 사용 가능 여부를 확인합니다.
 */
export const checkNicknameAvailability = async (
	nickname: string
): Promise<boolean> => {
	try {
		const response = await api.get("/users/check-nickname", {
			params: { nickname },
		});
		return response.data.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message =
			err.response?.data?.error?.message ?? "닉네임 확인에 실패했습니다.";
		throw new Error(message);
	}
};

/**
 * 계정을 삭제합니다.
 */
export const deleteAccount = async (
	request: UserDeleteRequestDto
): Promise<void> => {
	try {
		await api.post("/users/delete", request);
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message =
			err.response?.data?.error?.message ?? "계정 삭제에 실패했습니다.";
		throw new Error(message);
	}
};

/**
 * 내 키워드 목록을 가져옵니다.
 */
export const getMyKeywords = async (
	page: number = 0,
	size: number = 20
): Promise<MyKeywordListResponseDto> => {
	try {
		const response = await api.get("/users/me/keywords", {
			params: {
				page,
				size,
				sort: "createdDate,desc",
			},
		});
		return response.data.data;
	} catch (error) {
		const err = error as AxiosError<{ error: { message: string } }>;
		const message =
			err.response?.data?.error?.message ??
			"키워드 목록을 불러오는데 실패했습니다.";
		throw new Error(message);
	}
};
