import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled, { keyframes } from "styled-components";
import { getFilteredNews, DailyNewsRequestDto } from "../api/news";
import FilterInput from "../components/FilterInput";
import Navbar from "../components/Navbar";
import { UI_CONSTANTS } from "../constants/ui";
import { useSearchParams } from "react-router-dom";
import ExpandableNewsCard from "../components/ExpandableCardNews";
import { FaNewspaper, FaSearch, FaChevronLeft, FaChevronRight, FaRss } from "react-icons/fa";

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

function NewsList() {
  /* ---------------- URL 쿼리 → 초기 키워드 ---------------------------- */
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") ?? "";

  /* ---------------- 상태 --------------------------------------------- */
  const [keyword, setKeyword] = useState(initialKeyword);
  const [page, setPage] = useState<number>(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);

  /* URL이 바뀌면 keyword 초기화 (뒤로가기 등) --------------------------- */
  useEffect(() => setKeyword(initialKeyword), [initialKeyword]);

  /* ---------------- React Query -------------------------------------- */
  const { data: newsData, isLoading, error } = useQuery({
    queryKey: ["news", keyword, page],
    queryFn: () => {
      const params: DailyNewsRequestDto = {};
      if (keyword) params.keyword = keyword;
      return getFilteredNews(params, page, 20);
    },
    enabled: true,
  });

  /* ---------------- 페이지 이동 -------------------------------------- */
  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
    else alert("첫번째 페이지에요!😉");
  };
  const handleNext = () => {
    if (newsData && page + 1 < newsData.totalPages) setPage(page + 1);
    else alert("마지막 페이지에요!🥲");
  };

  /* ---------------- 로딩/에러 --------------------------------------- */
  if (isLoading) return <LoadingSkeleton />;
  if (error)    return <ErrorState error={error} />;

  /* ---------------- 실제 화면 ---------------------------------------- */
  return (
    <>
      <Navbar />
      <PageBackground>
        <MainWrapper>
          <HeaderSection>
            <HeaderTitle>
              <FaNewspaper className="header-icon" />
              뉴스 조회
            </HeaderTitle>
            <HeaderSubtitle>관심 키워드의 최신 뉴스를 확인해보세요</HeaderSubtitle>
            <StatsBadge>
              <FaRss className="stats-icon" />
              {newsData ? `${newsData.totalElements}개의 뉴스` : '뉴스 로딩 중...'}
            </StatsBadge>
          </HeaderSection>

          <ContentCard>
            {/* -------- 필터 입력 섹션 ------------------------------- */}
            <FilterSection>
              <FilterLabel>
                <FaSearch className="filter-icon" />
                키워드 검색
              </FilterLabel>
              <FilterInput
                onSearch={(v) => {
                  setKeyword(v);
                  setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
                }}
                defaultValue={keyword}
              />
            </FilterSection>

            {/* -------- 뉴스 카드 목록 ------------------------------- */}
            <NewsSection>
              {!newsData || newsData.newsDtos.length === 0 ? (
                <NoDataMessage>
                  <div className="no-data-icon-wrapper">
                    <FaNewspaper className="no-data-icon" />
                  </div>
                  <NoDataTitle>조회된 뉴스가 없습니다</NoDataTitle>
                  <NoDataSubtext>다른 키워드로 검색해보세요</NoDataSubtext>
                </NoDataMessage>
              ) : (
                <NewsCardGrid>
                  {newsData.newsDtos.map((item, idx) => (
                    <ExpandableNewsCard key={idx} data={item} />
                  ))}
                </NewsCardGrid>
              )}
            </NewsSection>

            {/* -------- 페이지 네비게이션 ---------------------------- */}
            {newsData && newsData.totalPages > 1 && (
              <PaginationSection>
                <PaginationButton 
                  onClick={handlePrev} 
                  disabled={page === 0}
                  className="prev-btn"
                >
                  <FaChevronLeft />
                  이전
                </PaginationButton>
                <PageInfo>
                  <PageNumber>{page + 1}</PageNumber>
                  <PageDivider>/</PageDivider>
                  <TotalPages>{newsData.totalPages}</TotalPages>
                </PageInfo>
                <PaginationButton 
                  onClick={handleNext} 
                  disabled={page + 1 === newsData.totalPages}
                  className="next-btn"
                >
                  다음
                  <FaChevronRight />
                </PaginationButton>
              </PaginationSection>
            )}
          </ContentCard>
        </MainWrapper>
      </PageBackground>
    </>
  );
}

export default NewsList;

/* ---------------- 개선된 로딩 스켈레톤 ------------------------------- */
function LoadingSkeleton() {
  return (
    <>
      <Navbar />
      <PageBackground>
        <MainWrapper>
          <HeaderSection>
            <HeaderTitle>
              <FaNewspaper className="header-icon" />
              뉴스 조회
            </HeaderTitle>
            <HeaderSubtitle>관심 키워드의 최신 뉴스를 확인해보세요</HeaderSubtitle>
          </HeaderSection>
          <ContentCard>
            <FilterSection>
              <FilterLabel>
                <FaSearch className="filter-icon" />
                키워드 검색
              </FilterLabel>
              <SkeletonInput />
            </FilterSection>
            <NewsSection>
              <SkeletonGrid>
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </SkeletonGrid>
            </NewsSection>
          </ContentCard>
        </MainWrapper>
      </PageBackground>
    </>
  );
}

function SkeletonCard() {
  return (
    <SkeletonCardWrapper>
      <SkeletonHeader>
        <SkeletonBadge />
        <SkeletonDate />
      </SkeletonHeader>
      <SkeletonContent>
        <SkeletonLine width="100%" />
        <SkeletonLine width="80%" />
        <SkeletonLine width="60%" />
      </SkeletonContent>
    </SkeletonCardWrapper>
  );
}

function SkeletonInput() {
  return <SkeletonInputWrapper />;
}

/* ---------------- 에러 상태 ------------------------------- */
function ErrorState({ error }: { error: any }) {
  return (
    <>
      <Navbar />
      <PageBackground>
        <MainWrapper>
          <HeaderSection>
            <HeaderTitle>
              <FaNewspaper className="header-icon" />
              뉴스 조회
            </HeaderTitle>
          </HeaderSection>
          <ContentCard>
            <ErrorContainer>
              <ErrorIcon>⚠️</ErrorIcon>
              <ErrorTitle>오류가 발생했습니다</ErrorTitle>
              <ErrorMessage>{error.message}</ErrorMessage>
            </ErrorContainer>
          </ContentCard>
        </MainWrapper>
      </PageBackground>
    </>
  );
}

/* ───────── 개선된 스타일 ───────── */
const PageBackground = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background.gradient.primary};
  padding-top: 80px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
`;

const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 12px;
    gap: 24px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 0 8px;
    gap: 20px;
    margin-bottom: 16px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .header-icon {
    font-size: 2rem;
    color: #ffd700;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    gap: 12px;
    margin-bottom: 10px;
    
    .header-icon {
      font-size: 1.6rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    gap: 10px;
    margin-bottom: 8px;
    
    .header-icon {
      font-size: 1.4rem;
    }
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 16px 0;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const StatsBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  
  .stats-icon {
    font-size: 0.8rem;
    color: #ffd700;
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
    
    .stats-icon {
      font-size: 0.7rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.75rem;
    
    .stats-icon {
      font-size: 0.65rem;
    }
  }
`;

const ContentCard = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    padding: 24px 20px 20px 20px;
    gap: 24px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 16px 16px 16px;
    gap: 20px;
    border-radius: 16px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 2px solid #f0f0f0;
  
  @media (max-width: 768px) {
    gap: 12px;
    padding-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    padding-bottom: 16px;
  }
`;

const FilterLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  
  .filter-icon {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.mainGreen};
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    gap: 8px;
    
    .filter-icon {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    gap: 6px;
    
    .filter-icon {
      font-size: 0.9rem;
    }
  }
`;

const NewsSection = styled.div`
  flex: 1;
  min-height: 400px;
  
  @media (max-width: 768px) {
    min-height: 300px;
  }
  
  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  
  .no-data-icon-wrapper {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  
  .no-data-icon {
    font-size: 2.5rem;
    color: #ccc;
  }
  
  @media (max-width: 768px) {
    padding: 60px 16px;
    gap: 12px;
    
    .no-data-icon-wrapper {
      width: 60px;
      height: 60px;
    }
    
    .no-data-icon {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 40px 12px;
    gap: 10px;
    
    .no-data-icon-wrapper {
      width: 50px;
      height: 50px;
    }
    
    .no-data-icon {
      font-size: 1.8rem;
    }
  }
`;

const NoDataTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const NoDataSubtext = styled.p`
  font-size: 1rem;
  color: #888;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const NewsCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const PaginationSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-top: 32px;
  border-top: 2px solid #f0f0f0;
  
  @media (max-width: 768px) {
    gap: 16px;
    padding-top: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    padding-top: 20px;
  }
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, ${({ theme }) => theme.mainGreen}, ${({ theme }) => theme.lightGreen});
  color: ${({ theme }) => theme.text.inverse};
  border: none;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.2);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${({ theme }) => theme.mainColor}, ${({ theme }) => theme.mainGreen});
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(72, 187, 120, 0.3);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: ${({ theme }) => theme.text.muted};
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 0.9rem;
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.85rem;
    gap: 4px;
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
  min-width: 80px;
  justify-content: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    min-width: 70px;
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    min-width: 60px;
    gap: 4px;
  }
`;

const PageNumber = styled.span`
  color: ${({ theme }) => theme.icon.primary};
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PageDivider = styled.span`
  color: #ccc;
`;

const TotalPages = styled.span`
  color: #666;
`;

// 스켈레톤 스타일
const SkeletonCardWrapper = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.border.secondary};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SkeletonBadge = styled.div`
  width: 80px;
  height: 24px;
  background: linear-gradient(90deg, ${({ theme }) => theme.skeleton.primary} 25%, ${({ theme }) => theme.skeleton.secondary} 50%, ${({ theme }) => theme.skeleton.primary} 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 12px;
`;

const SkeletonDate = styled.div`
  width: 60px;
  height: 16px;
  background: linear-gradient(90deg, ${({ theme }) => theme.skeleton.primary} 25%, ${({ theme }) => theme.skeleton.secondary} 50%, ${({ theme }) => theme.skeleton.primary} 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonLine = styled.div<{ width: string }>`
  height: 12px;
  width: ${props => props.width};
  background: linear-gradient(90deg, ${({ theme }) => theme.skeleton.primary} 25%, ${({ theme }) => theme.skeleton.secondary} 50%, ${({ theme }) => theme.skeleton.primary} 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 6px;
`;

const SkeletonInputWrapper = styled.div`
  height: 48px;
  background: linear-gradient(90deg, ${({ theme }) => theme.skeleton.primary} 25%, ${({ theme }) => theme.skeleton.secondary} 50%, ${({ theme }) => theme.skeleton.primary} 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 12px;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

// 에러 상태 스타일
const ErrorContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 8px;
`;

const ErrorTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.error};
  margin: 0;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text.secondary};
  margin: 0;
  max-width: 400px;
`;