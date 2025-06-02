export interface Article {
    title: string;
    url: string;
    summary: string;
}

export interface NewsDtos {
    keyword: string;
    longSummary: string;
    createdDate: string;
    articles: Article[];
}

export interface NewsListResponse{
    success: boolean;
    data: {
        newsDtos: NewsDtos[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
    }
}