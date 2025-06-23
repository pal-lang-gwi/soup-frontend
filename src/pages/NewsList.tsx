import { useEffect, useState } from "react";
import styled from "styled-components";
import FilterInput from "../components/FilterInput";
import Navbar from "../components/Navbar";
import KeywordToggle from "../components/KeywordToggle";
import { NewsDtos } from "../types/news";
import { UI_CONSTANTS } from "../constants/ui";
import { extractDateFromISO } from "../utils/dateUtils";
import { getNewsList } from "../api/news";

// 나의 키워드 더미 데이터
const myKeywords = [
	{ id: 1, name: "자바", isActive: true },
	{ id: 2, name: "자바스크립트", isActive: true },
	{ id: 3, name: "파이썬", isActive: false },
	{ id: 4, name: "리액트", isActive: true },
	{ id: 5, name: "스프링", isActive: false },
];

function NewsList() {
	const [keyword, setKeyword] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [page, setPage] = useState<number>(
		UI_CONSTANTS.PAGINATION.DEFAULT_PAGE
	);
	const [data, setData] = useState<NewsDtos[]>([]);
	const [totalPage, setTotalPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [keywords, setKeywords] = useState(myKeywords);

	const fetchNews = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await getNewsList({
				keyword,
				startDate,
				endDate,
				page,
				size: 10,
				sort: "createdDate,DESC",
			});
			if (res.data.success) {
				setData(res.data.data.newsDtos);
				setTotalPage(res.data.data.totalPages);
			} else {
				setError("뉴스를 불러오지 못했습니다.");
			}
		} catch (e: any) {
			setError(e.message || "뉴스를 불러오지 못했습니다.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNews();
		// eslint-disable-next-line
	}, [page]);

	const handlePrev = () => {
		if (page > 0) setPage(page - 1);
		else alert("첫번째 페이지에요!😉");
	};
	const handleNext = () => {
		if (page + 1 < totalPage) setPage(page + 1);
		else alert("마지막 페이지에요!🥲");
	};

	const handleSearch = (value: string) => {
		setKeyword(value);
		setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
		// 검색 시 바로 조회
		fetchNews();
	};

	const handleDateSearch = () => {
		setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
		fetchNews();
	};

	const handleToggleKeyword = async (keywordId: number) => {
		try {
			// 실제 API 호출 (현재는 더미 데이터로 시뮬레이션)
			// await toggleKeywordActive(keywordId);

			// 로컬 상태 업데이트
			setKeywords((prev) =>
				prev.map((kw) =>
					kw.id === keywordId ? { ...kw, isActive: !kw.isActive } : kw
				)
			);
		} catch (error) {
			console.error("키워드 상태 변경 실패:", error);
			alert("키워드 상태 변경에 실패했습니다.");
		}
	};

	const handleDeleteKeyword = async (keywordId: number) => {
		try {
			// 실제 API 호출 (현재는 더미 데이터로 시뮬레이션)
			// await deleteKeyword(keywordId);

			// 로컬 상태 업데이트
			setKeywords((prev) => prev.filter((kw) => kw.id !== keywordId));
		} catch (error) {
			console.error("키워드 삭제 실패:", error);
			alert("키워드 삭제에 실패했습니다.");
		}
	};

	return (
		<>
			<Navbar />
			<Background>
				<OuterContentWrapper>
					<Header>✉️뉴스 조회✉️</Header>
					<ContentWrapper>
						<Sidebar>
							<SidebarTitle>나의 키워드</SidebarTitle>
							<KeywordList>
								{keywords.map((keyword) => (
									<KeywordItem key={keyword.id} $isActive={keyword.isActive}>
										<KeywordInfo>
											<KeywordName>{keyword.name}</KeywordName>
											<KeywordStatus $isActive={keyword.isActive}>
												{keyword.isActive ? "활성" : "비활성"}
											</KeywordStatus>
										</KeywordInfo>
										<KeywordToggle
											isActive={keyword.isActive}
											onToggle={() => handleToggleKeyword(keyword.id)}
											onDelete={() => handleDeleteKeyword(keyword.id)}
											keywordName={keyword.name}
										/>
									</KeywordItem>
								))}
							</KeywordList>
							<AddKeywordButton>+ 키워드 추가</AddKeywordButton>
						</Sidebar>
						<NewsListWrapper>
							<FilterSection>
								<FilterInput onSearch={handleSearch} />
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
									<SearchButton onClick={handleDateSearch}>조회</SearchButton>
								</CalendarInput>
							</FilterSection>
							<NewsSection>
								{loading ? (
									<NoData>뉴스를 불러오는 중...</NoData>
								) : error ? (
									<NoData>{error}</NoData>
								) : data.length === 0 ? (
									<NoData>조회된 뉴스가 없습니다.</NoData>
								) : (
									data.map((item, idx) => (
										<NewsCard key={idx}>
											<strong>{item.keyword}</strong>
											<small>{extractDateFromISO(item.createdDate)}</small>
											<p>{item.longSummary}</p>
											{item.articles.map((article, i) => (
												<a
													key={i}
													href={article.url}
													target="_blank"
													rel="noreferrer"
												>
													- {article.title}
												</a>
											))}
										</NewsCard>
									))
								)}
							</NewsSection>
							<NextPrev>
								<button onClick={handlePrev} disabled={page === 0}>
									이전
								</button>
								<span>
									{page + 1} / {totalPage}
								</span>
								<button onClick={handleNext} disabled={page + 1 === totalPage}>
									다음
								</button>
							</NextPrev>
						</NewsListWrapper>
					</ContentWrapper>
				</OuterContentWrapper>
			</Background>
		</>
	);
}

export default NewsList;

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

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding-top: 5vh;
	}
`;

const ContentWrapper = styled.div`
	width: calc(100% - ${UI_CONSTANTS.CONTENT_PADDING}px);
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	gap: 2rem;
	height: 70vh;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		width: calc(100% - 32px);
		flex-direction: column;
		height: auto;
		gap: 1rem;
	}
`;

const Header = styled.h1`
	text-align: center;
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 10vh;
	color: #333;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1.5rem;
		margin-bottom: 5vh;
	}
`;

const Sidebar = styled.div`
	width: ${UI_CONSTANTS.SIDEBAR_WIDTH}px;
	max-height: 56.7vh;
	padding: 1rem;
	background-color: white;
	border-radius: 12px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		width: 100%;
		max-height: none;
		padding: 0.8rem;
	}
`;

const NewsListWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	max-height: calc(80vh);
	overflow: hidden;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		max-height: none;
		gap: 1rem;
	}
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

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		flex-direction: column;
		align-items: stretch;
		gap: 0.8rem;
	}
`;

const SearchButton = styled.button`
	padding: 8px 16px;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 10px 16px;
		font-size: 1rem;
	}
`;

const CalendarInput = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	input {
		width: 100px;
	}

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		flex-direction: column;
		gap: 0.5rem;

		input {
			width: 100%;
			padding: 10px;
		}
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

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 0.8rem;
		gap: 0.8rem;
	}
`;

const NoData = styled.div`
	text-align: center;
	color: gray;
	margin-top: 2rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		margin-top: 1rem;
		font-size: 0.9rem;
	}
`;

const NewsCard = styled.div`
	padding: 1rem;
	border: 1px solid #eee;
	border-radius: 8px;

	strong {
		font-size: 1.1rem;
		color: #333;
	}

	small {
		color: #999;
		margin-left: 0.5rem;
	}

	p {
		margin: 0.5rem 0;
		color: #555;
	}

	a {
		display: block;
		color: #0077cc;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 0.8rem;

		strong {
			font-size: 1rem;
		}

		small {
			display: block;
			margin-left: 0;
			margin-top: 0.3rem;
		}

		p {
			margin: 0.4rem 0;
			font-size: 0.9rem;
		}

		a {
			font-size: 0.9rem;
			margin-top: 0.3rem;
		}
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

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		margin-top: 1rem;
		gap: 0.8rem;

		button {
			padding: 0.8rem 1.2rem;
			font-size: 0.9rem;
		}

		span {
			font-size: 0.9rem;
		}
	}
`;

const SidebarTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 1rem;
	color: #333;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1.3rem;
		margin-bottom: 0.8rem;
	}
`;

const KeywordList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const KeywordItem = styled.div<{ $isActive: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
	margin-bottom: 8px;
	background-color: ${({ $isActive }) => ($isActive ? "#F0FFF4" : "#F7FAFC")};
	border: 1px solid ${({ $isActive }) => ($isActive ? "#C6F6D5" : "#E2E8F0")};
	border-radius: 8px;
	transition: all 0.2s ease;

	&:hover {
		background-color: ${({ $isActive }) => ($isActive ? "#E6FFFA" : "#EDF2F7")};
	}

	@media (max-width: 768px) {
		padding: 10px 12px;
		margin-bottom: 6px;
	}
`;

const KeywordInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
`;

const KeywordName = styled.span`
	font-size: 1rem;
	font-weight: bold;
	margin-right: 0.5rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 0.9rem;
	}
`;

const KeywordStatus = styled.span<{ $isActive: boolean }>`
	font-size: 0.8rem;
	color: ${({ $isActive }) => ($isActive ? "#0077cc" : "#999")};

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 0.7rem;
	}
`;

const AddKeywordButton = styled.button`
	padding: 0.5rem 1rem;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	margin-top: 1rem;
	width: 100%;

	&:hover {
		background-color: ${({ theme }) => theme.buttonColor};
	}

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 0.8rem 1.2rem;
		font-size: 0.9rem;
		margin-top: 0.8rem;
	}
`;
