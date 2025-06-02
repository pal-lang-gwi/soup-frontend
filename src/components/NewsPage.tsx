import React from 'react';
import styled from 'styled-components';
import { NewsDtos } from '../types/news';
import Navbar from './Navbar';
import StarPoint from './StarPoint';

const NewsPage: React.FC = () => {
    //TODO: 더미데이터 지우고 props로 바꾸기
    const dummyData: NewsDtos = {
        keyword: 'AI',
        longSummary: '2025년 기준 AI 산업은...',
        createdDate: '2025-04-10T08:00:00Z',
        articles: [
            {
            title: '생성형 AI, 2025년 산업 주도',
            url: 'https://news.site/article1',
            summary: '생성형 AI가 여러 산업에 빠르게 확산되고 있으며...',
            },
            {
            title: 'AI 기술, 인프라 투자의 핵심으로',
            url: 'https://news.site/article2',
            summary: '최근 AI 반도체에 대한 투자 규모가 증가하고 있음...',
            },
        ],
        };
    
    const { keyword, longSummary, createdDate, articles } = dummyData;
        return (
            <>
        <Navbar  />
        <Background>
        <GradientOverlay />
        <ContentWrapper>
        <Container>
        <Header>
            <KeywordTag>{keyword}</KeywordTag>
            {/* //TODO: 날짜 노출 방식 변경 */}
            <Date>{createdDate}</Date>
        </Header>
        <Summary>{longSummary}</Summary>
        <ArticleList>
            {articles.map((article, idx) => (
            <ArticleCard key={idx}>
                <ArticleTitle href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
                </ArticleTitle>
                <ArticleSummary>{article.summary}</ArticleSummary>
            </ArticleCard>
            ))}
        </ArticleList>
        <Rating>
            <StarPoint />
        </Rating>
        </Container>
        </ContentWrapper>
        </Background>
        </>
    );
};

export default NewsPage;

const Background = styled.div`
    position: relative;
    background-color: white;
    height: 100vh;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.mainColor} 0%,
        #ffffff 100%
    );
    z-index: 0;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    // align-items: flex-start;
    padding-top: 10vh;
    min-height: 90vh;
    position: relative;
    z-index: 1;
`;
const Container = styled.div`
    width: calc(100% - 200px);
    max-width: 95%
    min-height: 30vh;
    max-height: 75vh;
    margin: 0 auto;
    padding: 2rem 1rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    @media (max-width: 480px) {
        width: calc(100% - 32px);
        padding: 1.5rem;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
`;

const KeywordTag = styled.span`
    background-color: ${({ theme }) => theme.mainGreen};
    color: white;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: bold;
`;

const Date = styled.span`
    color: gray;
    font-size: 0.85rem;
`;

const Summary = styled.p`
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
    text-align: left;
`;

const ArticleList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const ArticleCard = styled.div`
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    text-align: left;
`;

const ArticleTitle = styled.a`
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const ArticleSummary = styled.p`
    font-size: 0.95rem;
    color: #555;
    margin-top: 0.5rem;
`;

const Rating = styled.div`
    padding-top: 2%;
    display: flex;
    justify-content: flex-end;
`
