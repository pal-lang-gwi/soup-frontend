import { AxiosError, AxiosResponse } from "axios";
import { LogInAPIParams, User } from "../../types/auth";
import { api } from "../axiosInstance";

//로그인
export const onLogInSuccess = (response: AxiosResponse) => {
	// HTTP Only 쿠키는 자동으로 브라우저가 관리하므로
	// 별도로 헤더에 설정할 필요가 없음
	console.log("로그인 성공", response.data);
};

// TODO: OAuth2 로그인 사용으로 인해 불필요 - Access Token 발급
// export const onLogIn = async (params: LogInAPIParams): Promise<User | null> => {
// 	try {
// 		const response = await api.post("/users/login", params, {
// 			withCredentials: true, // 쿠키 전송을 위해 필요
// 		});

// 		if (response.status == 200) {
// 			onLogInSuccess(response);
// 			// 백엔드에서 사용자 정보를 포함해서 응답해야 함
// 			return response.data.data?.user || null;
// 		}
// 		return null;
// 	} catch (error) {
// 		console.log("로그인 실패", error);
// 		const axiosError = error as AxiosError;
// 		if (axiosError.response?.status === 401) {
// 			console.error("회원정보가 일치하지 않습니다.");
// 		} else {
// 			console.error("로그인 중 오류 발생:", error);
// 		}
// 		return null;
// 	}
// };

// 현재 로그인한 사용자 정보 조회
export const getCurrentUser = async (): Promise<User | null> => {
	try {
		const response = await api.get("/users", {
			withCredentials: true,
		});

		if (response.status === 200) {
			return response.data.data?.user || null;
		}
		return null;
	} catch (error) {
		console.log("사용자 정보 조회 실패", error);
		return null;
	}
};

//Refresh token
export const onSilentRefresh = async () => {
	try {
		const response = await api.post(
			"/auth/refresh",
			{},
			{
				withCredentials: true, // 쿠키 전송을 위해 필요
			}
		);
		if (response.status === 200) {
			console.log("토큰 갱신 완료");
		}
	} catch (error) {
		const axiosError = error as AxiosError;
		console.log("토큰 갱신 실패", error);

		if (axiosError.response?.status === 401) {
			console.log("리프레시 토큰 만료");
			//TODO: 로그인 페이지로 리다이렉트
		}
	}
};
