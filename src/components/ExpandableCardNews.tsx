import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { extractDateFromISO } from "../utils/dateUtils";
import { NewsDto } from "../api/news";
import { FaNewspaper, FaChevronDown, FaExternalLinkAlt, FaCalendarAlt, FaTag, FaTimes } from "react-icons/fa";

// 애니메이션 정의
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

const modalFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ExpandableNewsCard = ({ data }: { data: NewsDto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <NewsCard onClick={() => setIsModalOpen(true)}>
        <CardHeader>
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
          <ExpandIcon>
            <FaChevronDown />
          </ExpandIcon>
        </CardHeader>

        <CardPreview>
          <PreviewTitle>요약</PreviewTitle>
          <PreviewText>{truncateText(data.longSummary, 150)}</PreviewText>
          <PreviewFooter>
            <PreviewInfo>
              <span>📄</span> {data.articles.length}개 기사
            </PreviewInfo>
            <PreviewButton>자세히 보기</PreviewButton>
          </PreviewFooter>
        </CardPreview>
      </NewsCard>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <FaNewspaper className="modal-icon" />
                뉴스 상세보기
              </ModalTitle>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <ModalKeywordBadge>
                <FaTag className="badge-icon" />
                {data.keyword}
              </ModalKeywordBadge>
              
              <ModalDateText>
                <FaCalendarAlt className="date-icon" />
                {extractDateFromISO(data.createdDate)}
              </ModalDateText>

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
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
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
  cursor: pointer;
  
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
  
  @media (max-width: 768px) {
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    border-radius: 14px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  background: linear-gradient(135deg, #f8fdf9 0%, #f0faf4 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  
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
  
  @media (max-width: 768px) {
    padding: 20px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 6px 12px;
    gap: 4px;
    
    .badge-icon {
      font-size: 0.75rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 5px 10px;
    gap: 3px;
    
    .badge-icon {
      font-size: 0.7rem;
    }
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
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    gap: 4px;
    
    .date-icon {
      font-size: 0.75rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 3px;
    
    .date-icon {
      font-size: 0.7rem;
    }
  }
`;

const ExpandIcon = styled.div`
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
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 1rem;
  }
`;

const CardPreview = styled.div`
  padding: 24px 28px;
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
  
  @media (max-width: 768px) {
    padding: 20px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

const PreviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.mainGreen};
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 6px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    gap: 4px;
    margin-bottom: 8px;
  }
`;

const PreviewText = styled.p`
  color: #333;
  line-height: 1.6;
  margin: 0 0 16px 0;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.4;
    margin-bottom: 12px;
  }
`;

const PreviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

const PreviewInfo = styled.span`
  color: #666;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const PreviewButton = styled.span`
  color: ${({ theme }) => theme.mainGreen};
  font-size: 0.9rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${modalFadeIn} 0.3s ease-out;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${modalFadeIn} 0.3s ease-out;
  
  @media (max-width: 768px) {
    border-radius: 16px;
    max-height: 95vh;
  }
  
  @media (max-width: 480px) {
    border-radius: 14px;
    max-height: 98vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid #eee;
  background: linear-gradient(135deg, #f8fdf9 0%, #f0faf4 100%);
  
  @media (max-width: 768px) {
    padding: 20px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.mainGreen};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  
  .modal-icon {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    gap: 8px;
    
    .modal-icon {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    gap: 6px;
    
    .modal-icon {
      font-size: 1rem;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f5f5f5;
    color: #333;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 5px;
  }
`;

const ModalBody = styled.div`
  padding: 28px;
  overflow-y: auto;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const ModalKeywordBadge = styled(KeywordBadge)`
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    margin-bottom: 14px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const ModalDateText = styled(DateText)`
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
  
  @media (max-width: 768px) {
    gap: 14px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 20px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    gap: 8px;
    
    .summary-icon {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    gap: 6px;
    
    .summary-icon {
      font-size: 0.9rem;
    }
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
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 16px;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 14px;
    line-height: 1.5;
  }
`;

const ArticlesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    gap: 14px;
  }
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
  
  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 6px;
    
    &::before {
      height: 18px;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    gap: 4px;
    
    &::before {
      height: 16px;
    }
  }
`;

const ArticlesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
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
  
  @media (max-width: 768px) {
    padding: 14px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 14px;
  }
`;

const ArticleTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  flex: 1;
  color: #2d3748;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
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
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-left: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-left: 8px;
  }
`;
