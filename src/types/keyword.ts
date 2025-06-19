export interface Keyword {
    id: number;
    name: string;
    normalizedName: string;
}

export interface SearchKeywordDto {
    id: number;
    name: string;
    normalized: string;
    isSubscribed: boolean;
}

export interface SearchKeywordsResponseDto {
    success: boolean;
    data: {
        keywords: SearchKeywordDto[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
    }
}
    
export interface KeywordListResponseDto {
    success: boolean;
    data: {
        KeywordResponseDtos: Keyword[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
    };
}
