export interface keyword {
    id: number;
    name: string;
    normalizedName: string;
}

export interface searchKeywordDto {
    id: number;
    name: string;
    normalized: string;
    isSubscribed: boolean;
}

export interface searchKeywordsResponseDto {
    success: boolean;
    data: {
        keywords: searchKeywordDto[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
    }
}
    
export interface keywordListResponseDto {
    success: boolean;
    data: {
        keywordResponseDtos: keyword[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
    };
}
