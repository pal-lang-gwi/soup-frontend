import { api } from './axiosInstance';
import { AxiosError } from 'axios';

/**
 * 액세스 토큰을 재발급받습니다.
 */
export const refreshToken = async (): Promise<void> => {
  try {
    await api.post('/auth/refresh');
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
    await api.post('/auth/logout');
  } catch (error) {
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? '로그아웃에 실패했습니다.';
    throw new Error(message);
  }
}; 