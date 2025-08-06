import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { extractDateFromISO } from "../utils/dateUtils";
import { NewsDto } from "../api/news";
import { FaNewspaper, FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaCalendarAlt, FaTag } from "react-icons/fa";

// 애니메이션 정의
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ExpandableNewsCard = ({ data }: { data: NewsDto }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NewsCard>
      <CardHeader onClick={() => setIsOpen((prev) => !prev)}>
        <HeaderContent>
          <KeywordBadge>
            <FaTag className="badge-icon" />
            {data.keyword}
          </KeywordBadge>
          <DateText>
            <FaCalendarAlt className="date-icon" />
            {extractDateFromISO(data.createdDate)}
          </DateText>
        </HeaderContent>
        <ExpandIcon isOpen={isOpen}>
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
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.mainGreen}, #4ade80);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
    
    &::before {
      opacity: 1;
    }
  }
  
  animation: ${fadeIn} 0.4s ease-out;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  cursor: pointer;
  background: linear-gradient(135deg, #f8fdf9 0%, #f0faf4 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: linear-gradient(135deg, #f0faf4 0%, #e6f7ed 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.mainGreen}, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const KeywordBadge = styled.span`
  background: linear-gradient(135deg, ${({ theme }) => theme.mainGreen}, #4ade80);
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.2);
  transition: all 0.3s ease;
  
  .badge-icon {
    font-size: 0.8rem;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
  }
`;

const DateText = styled.span`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  
  .date-icon {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.mainGreen};
  }
`;

const ExpandIcon = styled.div<{ isOpen: boolean }>`
  color: ${({ theme }) => theme.mainGreen};
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(72, 187, 120, 0.1);
  
  ${NewsCard}:hover & {
    background: rgba(72, 187, 120, 0.15);
    transform: scale(1.1);
  }
  
  ${({ isOpen }) => isOpen && `
    transform: rotate(180deg);
    background: rgba(72, 187, 120, 0.2);
  `}
`;

const CardContent = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  animation: ${slideDown} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.mainGreen};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  
  .summary-icon {
    font-size: 1.1rem;
  }
`;

const SummaryText = styled.p`
  color: #333;
  line-height: 1.7;
  margin: 0;
  font-size: 1rem;
  background: linear-gradient(135deg, #f8fdf9 0%, #f0faf4 100%);
  padding: 20px;
  border-radius: 16px;
  border-left: 4px solid ${({ theme }) => theme.mainGreen};
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent, rgba(72, 187, 120, 0.02));
    border-radius: 16px;
    pointer-events: none;
  }
`;

const ArticlesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ArticlesTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: linear-gradient(135deg, ${({ theme }) => theme.mainGreen}, #4ade80);
    border-radius: 2px;
  }
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
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8fdf9 0%, #f0faf4 100%);
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(72, 187, 120, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #f0faf4 0%, #e6f7ed 100%);
    border-color: ${({ theme }) => theme.mainGreen};
    transform: translateX(8px);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.15);
    
    &::before {
      left: 100%;
    }
  }
`;

const ArticleTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  flex: 1;
  color: #2d3748;
`;

const ExternalLinkIcon = styled.span`
  color: ${({ theme }) => theme.mainGreen};
  font-size: 0.9rem;
  margin-left: 12px;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  ${ArticleLink}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }
`;
