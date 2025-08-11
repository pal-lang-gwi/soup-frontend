import { api } from './axiosInstance';
import { AxiosError } from 'axios';

/**
 * 액세스 토큰을 재발급받습니다.
 */
export const refreshToken = async (): Promise<void> => {
  try {
    // refresh 요청 시에도 withCredentials: true 필수
    await api.post('/auth/refresh', {}, { withCredentials: true }); // 빈 객체를 두 번째 인자로 전달하여 데이터 없음 명시
  } catch (error) {
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? '토큰 갱신에 실패했습니다.';
    throw new Error(message);
  }
};

/**
 * 로그아웃합니다.
 */
export const logout = async (): Promise<void> => {
  try {
    // 로그아웃 요청 시에도 withCredentials: true 필수 (세션/쿠키 무효화를 위해)
    await api.post('/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? '로그아웃에 실패했습니다.';
    throw new Error(message);
  }
};