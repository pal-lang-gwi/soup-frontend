import { AxiosError, AxiosResponse } from "axios";
import { LogInAPIParams } from "../../types/auth";
import { api } from "../axiosInstance";

//로그인
export const onLogInSuccess = (response: AxiosResponse) => {
    const { accessToken } = response.data;

    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

//Access Token 발급
export const onLogIn = async (params : LogInAPIParams) => {



    try{
        const response = await api.post('/users/login', params, {
            withCredentials: true,
        });

        if(response.status == 200){
            onLogInSuccess(response);
            console.log("로그인 성공", response.data);
            return response.data;
        }
    }catch(error) {
        console.log("accesstoken fail", error);
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
        console.error("회원정보가 일치하지 않습니다.");
        }else{
            console.error("이도저도 아닌 오류 발생:",error);
        }
    }
};


//Refresh token
export const onSilentRefresh = async() => {
    try {
        const response = await api.post('/auth/refresh',);
        if(response.status === 200) {
            onLogInSuccess(response);
            console.log("accessToken 재발급 완료");
        }

    }catch(error) {
        const axiosError = error as AxiosError;
        console.log("refreshtoken fail", error);

        if(axiosError.response?.status === 401){
            console.log("refreshtoken 만료");
            //TODO: 로그인 로직 구현현
        }
    }
}