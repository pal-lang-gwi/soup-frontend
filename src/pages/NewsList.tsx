import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getFilteredNews, DailyNewsRequestDto } from "../api/news";
import FilterInput from "../components/FilterInput";
import Navbar from "../components/Navbar";
import { UI_CONSTANTS } from "../constants/ui";
import { useSearchParams } from "react-router-dom";
import ExpandableNewsCard from "../components/ExpandableCardNews";
import { FaNewspaper, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  if (isLoading) return <Skeleton text="로딩 중..." />;
  if (error)    return <Skeleton text={`에러: ${error.message}`} isError />;

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
                  <FaNewspaper className="no-data-icon" />
                  조회된 뉴스가 없습니다.
                  <NoDataSubtext>다른 키워드로 검색해보세요</NoDataSubtext>
                </NoDataMessage>
              ) : (
                <NewsCardList>
                  {newsData.newsDtos.map((item, idx) => (
                    <ExpandableNewsCard key={idx} data={item} />
                  ))}
                </NewsCardList>
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
                  {page + 1} / {newsData.totalPages}
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

/* ---------------- 공통 스켈레톤 ------------------------------- */
function Skeleton({ text, isError = false }: { text: string; isError?: boolean }) {
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
            <div style={{ 
              textAlign: "center", 
              padding: "40px", 
              color: isError ? "#e53e3e" : "#666",
              fontSize: "1.1rem"
            }}>
              {text}
            </div>
          </ContentCard>
        </MainWrapper>
      </PageBackground>
    </>
  );
}

/* ───────── 마이페이지 테마 기반 스타일 ───────── */
const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e6f4ea 100%);
  padding-top: 80px;
`;

const MainWrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto 40px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.mainColor};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  .header-icon {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.mainGreen};
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0;
`;

const ContentCard = styled.section`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(72, 187, 120, 0.08);
  padding: 36px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 600px) {
    padding: 24px 16px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const FilterLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mainGreen};
  display: flex;
  align-items: center;
  gap: 8px;
  
  .filter-icon {
    font-size: 1rem;
  }
`;

const NewsSection = styled.div`
  flex: 1;
  min-height: 400px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: #888;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  .no-data-icon {
    font-size: 3rem;
    color: #ddd;
    margin-bottom: 8px;
  }
`;

const NoDataSubtext = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  margin: 0;
`;

const NewsCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PaginationSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.mainGreen};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.15);

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.mainColor};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #ccc;
  }
`;

const PageInfo = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 1rem;
  min-width: 60px;
  text-align: center;
`;