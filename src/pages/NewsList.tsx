import { useEffect, useState } from "react";
import styled from "styled-components";
import { getNewsList } from "../api/news";
import FilterInput from "../components/FilterInput";
import Navbar from "../components/Navbar";
import { NewsDtos } from "../types/news";
import { UI_CONSTANTS } from "../constants/ui";
import { extractDateFromISO } from "../utils/dateUtils";

function NewsList() {
	//뉴스 조회 시에 필요한 데이터
	//키워드, 조회 시작일자, 종료일자, 페이지
	const [keyword, setKeyword] = useState("");
	//TODO: 나중에 초기값 넣어주기 -> 조회하는 오늘 날짜로 해도 될듯?
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [page, setPage] = useState<number>(
		UI_CONSTANTS.PAGINATION.DEFAULT_PAGE
	);

	//가져올 것
	//뉴스 데이터, 현재페이지/총페이지
	const [data, setData] = useState<NewsDtos[]>([]);
	const [totalPage, setTotalPage] = useState(0);

	const getData = async () => {
		console.log(keyword);
		try {
			const res = await getNewsList({ keyword, startDate, endDate, page });
			setData(res.data.data.newsDtos);
			setTotalPage(res.data.data.totalPages);
		} catch (error) {
			console.log("뉴스 리스트 조회 에러 :", error);
		}
	};
	useEffect(() => {
		getData();
	}, [page]);

	//다음페이지 이전페이지
	const handlePrev = () => {
		if (page > 0) setPage(page - 1);
		else alert("첫번째 페이지에요!😉");
	};
	const handleNext = () => {
		if (page + 1 < totalPage) setPage(page + 1);
		else alert("마지막 페이지에요!🥲");
	};

	return (
		<>
			<Navbar />
			<Background>
				<OuterContentWrapper>
					<Header>✉️뉴스 조회✉️</Header>
					<ContentWrapper>
						<Sidebar>
							{/* //TODO: 나의키워드 불러오는 로직 필요 */}
							나의 키워드
						</Sidebar>
						<NewsListWrapper>
							<FilterSection>
								{/* //TODO: 키워드로 검색 */}
								<FilterInput
									onSearch={(value) => {
										setKeyword(value);
										setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
									}}
								/>
								{/* //! 캘린더 UI 너무 구림 변경 필수!! */}
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
									<SearchButton
										onClick={() => {
											setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
											getData();
										}}
									>
										조회
									</SearchButton>
								</CalendarInput>
							</FilterSection>
							{/* //TODO: 페이지 조회 */}
							<NewsSection>
								{data.length === 0 ? (
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
							{/* //이전, 다음 버튼 */}
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

const Sidebar = styled.div`
	width: ${UI_CONSTANTS.SIDEBAR_WIDTH}px;
	max-height: 56.7vh;
	padding: 1rem;
	background-color: white;
	border-radius: 12px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
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

const SearchButton = styled.button`
	padding: 8px 16px;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
`;

const CalendarInput = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	input {
		width: 100px;
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
