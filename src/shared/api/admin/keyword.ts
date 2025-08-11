// src/api/keywordRequests.ts

import { AdminKeywordResponseListDto, ApproveKeywordResponseDto, RejectKeywordRequestDto, RejectKeywordResponseDto } from "../../../entities/admin";
import { api } from "../axiosInstance"; // 사전 설정된 Axios 인스턴스 가져오기
import { AxiosError } from "axios";

// axiosInstance.baseURL에 '/api/v1'이 설정되어 있으므로, 여기서는 상대 경로를 사용합니다.
// 즉, 아래 경로들은 '/api/v1' 뒤에 붙게 됩니다.

/**
 * 상태 및 페이지네이션에 따라 키워드 요청 목록을 가져옵니다.
 * @param status 가져올 키워드의 상태 (예: "PENDING", "APPROVED", "REJECTED").
 * @param page 현재 페이지 번호 (0부터 시작).
 * @param size 페이지당 항목 수.
 * @param sort 정렬 기준 (예: "createdDate,desc").
 * @returns AdminKeywordResponseListDto를 resolve하는 Promise.
 */
export const getKeywordRequests = async (
  status: string,
  page: number,
  size: number,
  sort: string
): Promise<AdminKeywordResponseListDto> => {
  try {
    const response = await api.get('/admin/keyword-requests', { // 컨트롤러의 @RequestMapping 경로에 맞춰 수정
      params: { status, page, size, sort },
    });
    return response.data.data; // 응답 데이터의 'data' 필드에서 실제 데이터 반환
  } catch (error) {
    // 백엔드에서 전달하는 에러 메시지를 재던집니다.
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? '키워드 요청 목록을 불러오는데 실패했습니다.';
    throw new Error(message);
  }
};

/**
 * 키워드 요청을 승인합니다.
 * @param requestId 승인할 키워드 요청의 ID.
 * @returns ApproveKeywordResponseDto를 resolve하는 Promise.
 */
export const approveKeywordRequest = async (
  requestId: number
): Promise<ApproveKeywordResponseDto> => {
  try {
    const response = await api.post(`/admin/keyword-requests/${requestId}/approve`); // 컨트롤러 경로에 맞춰 수정
    return response.data.data; // 응답 데이터의 'data' 필드에서 실제 데이터 반환
  } catch (error) {
    // 백엔드에서 전달하는 에러 메시지를 재던집니다.
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? '키워드 승인에 실패했습니다.';
    throw new Error(message);
  }
};

/**
 * 키워드 요청을 거절합니다.
 * @param requestId 거절할 키워드 요청의 ID.
 * @param rejectReason 거절 사유.
 * @returns RejectKeywordResponseDto를 resolve하는 Promise.
 */
export const rejectKeywordRequest = async (
  requestId: number,
  rejectReason: string
): Promise<RejectKeywordResponseDto> => {
  try {
    const response = await api.post(`/admin/keyword-requests/${requestId}/reject`, { rejectReason } as RejectKeywordRequestDto); // 컨트롤러 경로에 맞춰 수정, 요청 본문 타입 캐스팅
    return response.data.data; // 응답 데이터의 'data' 필드에서 실제 데이터 반환
  } catch (error) {
    // 백엔드에서 전달하는 에러 메시지를 재던집니다.
    const err = error as AxiosError<{ error: { message: string } }>;
    const message = err.response?.data?.error?.message ?? '키워드 거절에 실패했습니다.';
    throw new Error(message);
  }
};