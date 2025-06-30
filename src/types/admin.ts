// src/types/keyword.ts

export interface KeywordDto {
  keywordId: number;
  name: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; // Assuming these statuses
  requestedDate: string; // ISO 8601 string
  rejectionReason: string | null;
}

export interface UserDto {
  userId: number;
  email: string;
}

export interface AdminKeywordResponseDto {
  requestId: number;
  keyword: KeywordDto;
  requestedBy: UserDto;
}

export interface AdminKeywordResponseListDto {
  adminKeywordResponseDtos: AdminKeywordResponseDto[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

export interface ApproveKeywordResponseDto {
  keyword: string;
  requestedUserCnt: number;
}

export interface RejectKeywordResponseDto {
  keyword: string;
  rejectReason: string;
}

export interface RejectKeywordRequestDto {
  rejectReason: string;
}