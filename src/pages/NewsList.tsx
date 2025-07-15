import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getFilteredNews, DailyNewsRequestDto } from "../api/news";
import FilterInput from "../components/FilterInput";
import Navbar from "../components/Navbar";
import { UI_CONSTANTS } from "../constants/ui";
import { useSearchParams } from "react-router-dom";
import ExpandableNewsCard from "../components/ExpandableCardNews";

function NewsList() {
  /* ---------------- URL 쿼리 → 초기 키워드 ---------------------------- */
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") ?? "";

  /* ---------------- 상태 --------------------------------------------- */
  const [keyword, setKeyword] = useState(initialKeyword);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState<number>(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);

  /* URL이 바뀌면 keyword 초기화 (뒤로가기 등) --------------------------- */
  useEffect(() => setKeyword(initialKeyword), [initialKeyword]);

  /* ---------------- React Query -------------------------------------- */
  const { data: newsData, isLoading, error } = useQuery({
    queryKey: ["news", keyword, page],
    queryFn: () => {
      const params: DailyNewsRequestDto = {};
      if (keyword) params.keyword = keyword;
      // if (startDate) params.startDate = startDate;
      // if (endDate) params.endDate = endDate;
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
      <Background>
        <OuterContentWrapper>
          <Header>✉️뉴스 조회✉️</Header>

          <ContentWrapper>
            <NewsListWrapper>
              {/* -------- 필터 입력 섹션 ------------------------------- */}
              <FilterSection>
                <FilterInput
                  onSearch={(v) => {
                    setKeyword(v);
                    setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
                  }}
                  defaultValue={keyword}
                />
                {/* 
                <CalendarInput>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={endDate || undefined}
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || undefined}
                  />
                  <SearchButton onClick={() => setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE)}>
                    조회
                  </SearchButton>
                </CalendarInput> */}
              </FilterSection>

              {/* -------- 뉴스 카드 목록 ------------------------------- */}
              <NewsSection>
                {!newsData || newsData.newsDtos.length === 0 ? (
                  <NoData>조회된 뉴스가 없습니다.</NoData>
                ) : (
                  newsData.newsDtos.map((item, idx) => (
                    <ExpandableNewsCard key={idx} data={item} />
                  ))
                )}
              </NewsSection>


              {/* -------- 페이지 네비게이션 ---------------------------- */}
              {newsData && newsData.totalPages > 1 && (
                <NextPrev>
                  <button onClick={handlePrev} disabled={page === 0}>
                    이전
                  </button>
                  <span>
                    {page + 1} / {newsData.totalPages}
                  </span>
                  <button onClick={handleNext} disabled={page + 1 === newsData.totalPages}>
                    다음
                  </button>
                </NextPrev>
              )}
            </NewsListWrapper>
          </ContentWrapper>
        </OuterContentWrapper>
      </Background>
    </>
  );
}

export default NewsList;

/* ---------------- 공통 스켈레톤 ------------------------------- */
function Skeleton({ text, isError = false }: { text: string; isError?: boolean }) {
  return (
    <>
      <Navbar />
      <Background>
        <OuterContentWrapper>
          <Header>✉️뉴스 조회✉️</Header>
          <div style={{ textAlign: "center", padding: "20px", color: isError ? "red" : undefined }}>
            {text}
          </div>
        </OuterContentWrapper>
      </Background>
    </>
  );
}

const Background = styled.div`
	position: relative;
	background-color: white;
	min-height: 100vh;
	overflow-x: hidden;
`;

const OuterContentWrapper = styled.div`
	position: relative;
	z-index: 1;
	padding-top: 10vh;
`;

const ContentWrapper = styled.div`
	width: calc(100% - ${UI_CONSTANTS.CONTENT_PADDING}px);
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	gap: 2rem;
	height: 70vh;
`;

const Header = styled.h1`
	text-align: center;
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 10vh;
	color: #333;
`;

const NewsListWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	max-height: calc(80vh);
	overflow: hidden;
`;

const FilterSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;

	input {
		padding: 8px;
		border: 1px solid ${({ theme }) => theme.mainGreen};
		border-radius: 6px;
	}
`;

const NewsSection = styled.div`
	flex: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: white;
	border-radius: 12px;
	padding: 1rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const NoData = styled.div`
	text-align: center;
	color: gray;
	margin-top: 2rem;
`;

const NextPrev = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
	gap: 1rem;

	button {
		padding: 0.5rem 1rem;
		background-color: ${({ theme }) => theme.buttonColor};
		border: none;
		border-radius: 6px;
		cursor: pointer;

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
`;