import { AxiosError, AxiosResponse } from "axios";
import { LogInAPIParams } from "../../../entities/auth";
import { api } from "../axiosInstance";

//로그인
export const onLogInSuccess = (response: AxiosResponse) => {
    const { accessToken } = response.data.data;
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // 세션 쿠키는 서버에서 자동으로 설정되므로 클라이언트에서 별도 저장 불필요
};

export const onLogInError = (error: AxiosError) => {
    // 로그인 실패 처리
    throw error;
};

export const onLogIn = async (params: LogInAPIParams) => {
    try {
        // 로그인 요청 시에도 withCredentials: true 필수
        const response = await api.post('/users/login', params, {
            withCredentials: true,
        });

        // 백엔드에서 HttpOnly 쿠키를 성공적으로 설정했다면,
        // 이곳에서는 별도의 onLogInSuccess(response) 호출이 필요 없습니다.
        // 다만, 로그인 성공 여부를 확인하고 사용자 정보가 있다면 반환합니다.
        if (response.status === 200) {
            console.log("로그인 성공", response.data);
            // 백엔드가 로그인 성공 시 사용자 정보를 응답 본문에 담아줄 수 있습니다.
            // (HttpOnly 토큰과 별개로)
            return response.data;
        }
    } catch (error) {
        console.log("로그인 실패", error);
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
            console.error("회원정보가 일치하지 않습니다.");
        } else {
            console.error("로그인 중 알 수 없는 오류 발생:", error);
        }
        throw error; // 에러를 상위 호출자로 다시 던져서 처리할 수 있도록 함
    }
};


//Refresh token
export const onSilentRefresh = async() => {
    try {
        const response = await api.post('/auth/refresh',);
        if(response.status === 200) {
            onLogInSuccess(response);
        }

    }catch(error) {
        const axiosError = error as AxiosError;
        
        if(axiosError.response?.status === 401){
            //TODO: 로그인 로직 구현
        }
    }
}