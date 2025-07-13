export interface MyKeywordDto {
  userId: number;
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
