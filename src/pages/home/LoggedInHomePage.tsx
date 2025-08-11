import React, { useState } from "react";
import styled from "styled-components";
import { searchKeywords } from "../../shared/api/keywords";
import { searchKeywordDto } from "../../entities/keyword";
import { UI_CONSTANTS } from "../../constants/ui";

const LoggedInHomePage: React.FC = () => {
	const [searchKeyword, setSearchKeyword] = useState("");
	const [searchResults, setSearchResults] = useState<searchKeywordDto[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const handleSearch = async (keyword: string) => {
		if (!keyword.trim()) return;

		setIsSearching(true);
		try {
			const response = await searchKeywords(keyword, currentPage);
			if (response.data.success) {
				setSearchResults(response.data.data.keywords);
				setTotalPages(response.data.data.totalPages);
			}
		} catch (error) {
			console.error("키워드 검색 실패:", error);
		} finally {
			setIsSearching(false);
		}
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSearch(searchKeyword);
	};

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		handleSearch(searchKeyword);
	};

	return (
		<Container>
			<WelcomeSection>
				<WelcomeTitle>안녕하세요! SOUP에 오신 것을 환영합니다 🍲</WelcomeTitle>
				<WelcomeSubtitle>
					관심 있는 키워드를 검색하고 구독해보세요
				</WelcomeSubtitle>
			</WelcomeSection>

			<SearchSection>
				<SearchForm onSubmit={handleSearchSubmit}>
					<SearchInput
						type="text"
						placeholder="키워드를 검색해보세요..."
						value={searchKeyword}
						onChange={(e) => setSearchKeyword(e.target.value)}
						maxLength={100}
					/>
					<SearchButton type="submit" disabled={isSearching}>
						{isSearching ? "검색 중..." : "검색"}
					</SearchButton>
				</SearchForm>
			</SearchSection>

			{searchResults.length > 0 && (
				<ResultsSection>
					<ResultsTitle>검색 결과</ResultsTitle>
					<ResultsList>
						{searchResults.map((keyword) => (
							<ResultItem key={keyword.id}>
								<KeywordName>{keyword.name}</KeywordName>
								<SubscribeButton
									isSubscribed={keyword.isSubscribed}
									onClick={() => {
										// TODO: 구독/구독 해제 API 호출 구현 필요
										// 현재는 더미 데이터이므로 실제 API 연동 필요
									}}
								>
									{keyword.isSubscribed ? "구독 중" : "구독하기"}
								</SubscribeButton>
							</ResultItem>
						))}
					</ResultsList>

					{totalPages > 1 && (
						<Pagination>
							<PageButton
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 0}
							>
								이전
							</PageButton>
							<PageInfo>
								{currentPage + 1} / {totalPages}
							</PageInfo>
							<PageButton
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage >= totalPages - 1}
							>
								다음
							</PageButton>
						</Pagination>
					)}
				</ResultsSection>
			)}

			{searchKeyword && searchResults.length === 0 && !isSearching && (
				<NoResultsSection>
					<NoResultsText>검색 결과가 없습니다.</NoResultsText>
					<NoResultsSubtext>다른 키워드로 검색해보세요.</NoResultsSubtext>
				</NoResultsSection>
			)}
		</Container>
	);
};

export default LoggedInHomePage;

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
`;

const WelcomeSection = styled.div`
	text-align: center;
	margin-bottom: 3rem;
`;

const WelcomeTitle = styled.h1`
	font-size: 2.5rem;
	color: ${({ theme }) => theme.mainColor};
	margin-bottom: 1rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 2rem;
	}
`;

const WelcomeSubtitle = styled.p`
	font-size: 1.2rem;
	color: #666;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1rem;
	}
`;

const SearchSection = styled.div`
	margin-bottom: 3rem;
`;

const SearchForm = styled.form`
	display: flex;
	gap: 1rem;
	max-width: 600px;
	margin: 0 auto;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		flex-direction: column;
	}
`;

const SearchInput = styled.input`
	flex: 1;
	padding: 1rem;
	border: 2px solid ${({ theme }) => theme.mainGreen};
	border-radius: 8px;
	font-size: 1rem;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.buttonColor};
	}
`;

const SearchButton = styled.button`
	padding: 1rem 2rem;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover:not(:disabled) {
		background-color: ${({ theme }) => theme.buttonColor};
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

const ResultsSection = styled.div`
	margin-top: 2rem;
`;

const ResultsTitle = styled.h2`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.mainColor};
	margin-bottom: 1rem;
`;

const ResultsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const ResultItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	background-color: white;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		flex-direction: column;
		gap: 0.5rem;
		align-items: stretch;
	}
`;

const KeywordName = styled.span`
	font-size: 1.1rem;
	font-weight: 500;
	color: #333;
`;

const SubscribeButton = styled.button<{ isSubscribed: boolean }>`
	padding: 0.5rem 1rem;
	background-color: ${({ isSubscribed, theme }) =>
		isSubscribed ? theme.buttonColor : theme.mainGreen};
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${({ theme }) => theme.buttonColor};
	}
`;

const Pagination = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	margin-top: 2rem;
`;

const PageButton = styled.button`
	padding: 0.5rem 1rem;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;

	&:hover:not(:disabled) {
		background-color: ${({ theme }) => theme.buttonColor};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const PageInfo = styled.span`
	font-size: 1rem;
	color: #666;
`;

const NoResultsSection = styled.div`
	text-align: center;
	margin-top: 3rem;
`;

const NoResultsText = styled.p`
	font-size: 1.2rem;
	color: #666;
	margin-bottom: 0.5rem;
`;

const NoResultsSubtext = styled.p`
	font-size: 1rem;
	color: #999;
`;
