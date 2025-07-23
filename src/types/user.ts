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
