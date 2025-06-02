export interface Article {
    title: string;
    url: string;
    summary: string;
}

export interface NewsDetailProps {
    keyword: string;
    longSummary: string;
    createdDate: string;
    articles: Article[];
}