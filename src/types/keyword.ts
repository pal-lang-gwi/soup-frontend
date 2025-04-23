export interface Keyword {
    id: number;
    name: string;
    }
    
export interface KeywordsApiResponse {
    status: number;
    message: string;
    data: {
    keywords: Keyword[];
    currentPage: number;
    totalPages: number;
    };
}