import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getFilteredNews, DailyNewsRequestDto, NewsDto } from "../api/news";
import FilterInput from "../components/FilterInput";
import Navbar from "../components/Navbar";
import { UI_CONSTANTS } from "../constants/ui";
import { extractDateFromISO } from "../utils/dateUtils";
import { useSearchParams } from "react-router-dom";

function NewsList() {
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") ?? "";

  const [keyword, setKeyword] = useState(initialKeyword);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState<number>(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);

  useEffect(() => setKeyword(initialKeyword), [initialKeyword]);

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

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
    else alert("첫번째 페이지에요!😉");
  };

  const handleNext = () => {
    if (newsData && page + 1 < newsData.totalPages) setPage(page + 1);
    else alert("마지막 페이지에요!🥲");
  };

  if (isLoading) return <Skeleton text="로딩 중..." />;
  if (error) return <Skeleton text={`에러: ${error.message}`} isError />;

  return (
    <>
      <Navbar />
      <Background>
        <OuterContentWrapper>
          <Header>✉️뉴스 조회✉️</Header>

          <ContentWrapper>
            <NewsListWrapper>
              <FilterSection>
                <FilterInput
                  onSearch={(v) => {
                    setKeyword(v);
                    setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
                  }}
                  defaultValue={keyword}
                />

                {/* <CalendarInput>
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

              <NewsSection>
                {!newsData || newsData.newsDtos.length === 0 ? (
                  <NoData>조회된 뉴스가 없습니다.</NoData>
                ) : (
                  newsData.newsDtos.map((item, idx) => (
                    <ExpandableNewsCard key={idx} data={item} />
                  ))
                )}
              </NewsSection>

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

/* ---------------- ExpandableNewsCard 컴포넌트 ---------------- */
function ExpandableNewsCard({ data }: { data: NewsDto }) {
  const [open, setOpen] = useState(false);
  const formattedDate = extractDateFromISO(data.createdDate);

  return (
    <NewsCard>
      <Headline onClick={() => setOpen((prev) => !prev)}>
        <span>{`${data.keyword}의 새로운 소식 - ${formattedDate}`}</span>
        <ToggleIcon>{open ? "▲" : "▼"}</ToggleIcon>
      </Headline>

      {open && (
        <>
          <p>{data.longSummary}</p>
          {data.articles.map((a, i) => (
            <ArticleLink key={i} href={a.url} target="_blank" rel="noopener noreferrer">
              - {a.title}
            </ArticleLink>
          ))}
        </>
      )}
    </NewsCard>
  );
}

/* ---------------- 스타일 ---------------- */
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

const NewsCard = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;

  p {
    margin: 0.5rem 0;
    color: #555;
  }
`;

const Headline = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const ToggleIcon = styled.span`
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const ArticleLink = styled.a`
  display: block;
  color: #0077cc;
  text-decoration: none;
  margin-top: 0.25rem;
  font-size: 0.95rem;

  &:hover {
    text-decoration: underline;
  }
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
