export interface MyKeywordDto {
  userId: number;
  keywordId: number; // 추가: 키워드 고유 ID
  keyword: string;
  normalizedKeyword: string;
  registeredDate: string;
}

export interface MyKeywordListResponse {
  myKeywordDtos: MyKeywordDto[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
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

export interface UserDeleteRequestDto {
  reason: string;
}

export interface MyKeywordListResponseDto {
  keywords: string[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
