import { useState } from "react";
import styled from "styled-components";
import { extractDateFromISO } from "../utils/dateUtils";
import { NewsDto } from "../api/news";
import { FaNewspaper, FaChevronDown, FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";

const ExpandableNewsCard = ({ data }: { data: NewsDto }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NewsCard>
      <CardHeader onClick={() => setIsOpen((prev) => !prev)}>
        <HeaderContent>
          <KeywordBadge>{data.keyword}</KeywordBadge>
          <DateText>{extractDateFromISO(data.createdDate)}</DateText>
        </HeaderContent>
        <ExpandIcon>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </ExpandIcon>
      </CardHeader>

      {isOpen && (
        <CardContent>
          <SummarySection>
            <SummaryTitle>
              <FaNewspaper className="summary-icon" />
              요약
            </SummaryTitle>
            <SummaryText>{data.longSummary}</SummaryText>
          </SummarySection>
          
          <ArticlesSection>
            <ArticlesTitle>관련 기사</ArticlesTitle>
            <ArticlesList>
              {data.articles.map((article, i) => (
                <ArticleItem key={i}>
                  <ArticleLink
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArticleTitle>{article.title}</ArticleTitle>
                    <ExternalLinkIcon>
                      <FaExternalLinkAlt />
                    </ExternalLinkIcon>
                  </ArticleLink>
                </ArticleItem>
              ))}
            </ArticlesList>
          </ArticlesSection>
        </CardContent>
      )}
    </NewsCard>
  );
};

export default ExpandableNewsCard;

const NewsCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(72, 187, 120, 0.06);
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 20px rgba(72, 187, 120, 0.12);
    transform: translateY(-1px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  background: #f8fdf9;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f0faf4;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const KeywordBadge = styled.span`
  background: ${({ theme }) => theme.mainGreen};
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 20px;
  display: inline-block;
  letter-spacing: 0.5px;
`;

const DateText = styled.span`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ExpandIcon = styled.div`
  color: ${({ theme }) => theme.mainGreen};
  font-size: 1.1rem;
  transition: transform 0.2s ease;
  
  ${NewsCard}:hover & {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mainGreen};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .summary-icon {
    font-size: 1rem;
  }
`;

const SummaryText = styled.p`
  color: #333;
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
  background: #f8fdf9;
  padding: 16px;
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.mainGreen};
`;

const ArticlesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ArticlesTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ArticlesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ArticleItem = styled.li`
  margin: 0;
`;

const ArticleLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8fdf9;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  
  &:hover {
    background: #f0faf4;
    border-color: ${({ theme }) => theme.mainGreen};
    transform: translateX(4px);
  }
`;

const ArticleTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
  flex: 1;
`;

const ExternalLinkIcon = styled.span`
  color: ${({ theme }) => theme.mainGreen};
  font-size: 0.8rem;
  margin-left: 8px;
  opacity: 0.7;
  
  ${ArticleLink}:hover & {
    opacity: 1;
  }
`;
