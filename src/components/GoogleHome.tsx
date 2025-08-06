import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { searchKeywords, subscribeKeywords, unsubscribeKeyword, requestKeyword } from "../api/keywords";
import { searchKeywordDto } from "../types/keyword";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  showError, 
  showLoginRequired,
  showKeywordSubscribed,
  showKeywordUnsubscribed,
  showKeywordRequested,
  showNoKeywordResults
} from "../utils/sweetAlert";

export default function GoogleHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<searchKeywordDto[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<number | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const debouncedSearch = (term: string) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = window.setTimeout(async () => {
      if (term.trim().length >= 1) {
        setIsSearching(true);
        try {
          const response = await searchKeywords(term, 0, 10);
          if (response.data.success) {
            console.log(response.data.data.keywords);
            setSearchResults(response.data.data.keywords);
            setShowResults(true);
            
            // 검색 결과가 없을 때
            if (response.data.data.keywords.length === 0) {
              showNoKeywordResults(term);
            }
          }
        } catch (e) {
          console.error("검색 실패", e);
          setSearchResults([]);
          showNoKeywordResults(term);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
  };

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".search-container")) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeywordClick = async (keyword: searchKeywordDto) => {
    if (!isAuthenticated) {
      showLoginRequired();
      return;
    }

    try {
      const latest = await searchKeywords(keyword.name, 0, 1);
      const match = latest.data.data.keywords.find(k => k.id === keyword.id);
      const isActuallySubscribed = match?.isSubscribed ?? false;

      if (isActuallySubscribed) {
        await unsubscribeKeyword(keyword.id);
        showKeywordUnsubscribed(keyword.name);
      } else {
        await subscribeKeywords([keyword.name]);
        showKeywordSubscribed(keyword.name);
      }

      const refetch = await searchKeywords(searchTerm, 0, 10);
      if (refetch.data.success) setSearchResults(refetch.data.data.keywords);

      navigate(`/news?keyword=${encodeURIComponent(keyword.name)}`);
    } catch (e) {
      console.error("구독/해제 실패", e);
      showError("키워드 구독 설정에 실패했어요. 다시 시도해주세요! 😅");
    }
  };

  const handleAddKeyword = async (term: string) => {
    if (!isAuthenticated) {
      showLoginRequired();
      return;
    }

    try {
      await requestKeyword(term);
      showKeywordRequested(term);
      navigate(`/news?keyword=${encodeURIComponent(term)}`);
    } catch (e) {
      console.error("키워드 추가 실패", e);
      showError("키워드 등록 요청에 실패했어요. 다시 시도해주세요! 😅");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/news?keyword=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <Root>
      <MainCopy>
        관심 키워드로 나만의 뉴스 큐레이션을 만들어보세요
      </MainCopy>
      
      <SubCopy>
        구독한 키워드의 핫한 뉴스를 놓치지 마세요
      </SubCopy>

      <SearchContainer className="search-container">
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <SvgGlass viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14zM4 9.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0z" />
            </SvgGlass>

            <SearchInput
              type="text"
              placeholder="키워드를 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.trim() && setShowResults(true)}
            />

            {isSearching && <LoadingSpinner>⏳</LoadingSpinner>}
          </InputWrapper>
        </Form>

        {showResults && (searchResults.length > 0 || isSearching || searchTerm.trim().length > 0) && (
          <SearchResults>
            {isSearching ? (
              <LoadingItem>검색 중...</LoadingItem>
            ) : searchResults.length > 0 ? (
              searchResults.map((k) => (
                <SearchResultItem 
                  key={k.id}
                  onClick={() => navigate(`/news?keyword=${encodeURIComponent(k.name)}`)}
                >
                  <KeywordName>
                    {k.name}
                  </KeywordName>
                  <SubscribeButton
                    isSubscribed={k.isSubscribed}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKeywordClick(k);
                    }}
                  >
                    {k.isSubscribed ? "구독 중" : "구독하기"}
                  </SubscribeButton>
                </SearchResultItem>
              ))
            ) : (
              <SearchResultItem onClick={() => handleAddKeyword(searchTerm)}>
                <KeywordName>"{searchTerm}" 직접 추가하기</KeywordName>
              </SearchResultItem>
            )}
          </SearchResults>
        )}
      </SearchContainer>

      <Footer>SOUP - 나만의 뉴스 큐레이션</Footer>
    </Root>
  );
}


/* ─────────── 스타일 ─────────── */
const Root = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	font-family: "Roboto", "Noto Sans KR", sans-serif;
`;

const MainCopy = styled.p`
	font-size: 20px;
	color: ${({ theme }) => theme.text.primary};
	text-align: center;
	margin-bottom: 10px;
`;

const SubCopy = styled.p`
	font-size: 16px;
	color: ${({ theme }) => theme.text.secondary};
	text-align: center;
`;

const SearchContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

/* ── 검색창 ─────────────────────────── */
const InputWrapper = styled.div`
	position: relative;
	width: 90%;
	max-width: 580px;
	height: 44px;
	border: 1px solid ${({ theme }) => theme.border.primary};
	border-radius: 22px;
	display: flex;
	align-items: center;
	padding: 0 14px;
	background: ${({ theme }) => theme.background.primary};
	box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
	transition: box-shadow 0.2s ease-in-out;

	&:hover {
		box-shadow: 0 1px 8px rgba(32, 33, 36, 0.35);
	}
	&:focus-within {
		border-color: ${({ theme }) => theme.icon.primary};
	}
`;

const SearchInput = styled.input`
	flex: 1;
	height: 100%;
	font-size: 16px;
	line-height: 1;
	border: none;
	border-radius: 22px;
	outline: none;
	padding-left: 40px;
	padding-top: 2px;
	color: ${({ theme }) => theme.text.primary};
	
	&::placeholder {
		color: ${({ theme }) => theme.text.muted};
	}
`;

const iconCss = css`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
`;

const SvgGlass = styled.svg`
	${iconCss}
	left: 16px;
	width: 20px;
	height: 20px;
	fill: ${({ theme }) => theme.text.muted};
`;

const LoadingSpinner = styled.div`
	${iconCss}
	right: 16px;
	font-size: 16px;
	animation: spin 1s linear infinite;
	
	@keyframes spin {
		from { transform: translateY(-50%) rotate(0deg); }
		to { transform: translateY(-50%) rotate(360deg); }
	}
`;

/* ── 검색 결과 드롭다운 ────────────────── */
const SearchResults = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: ${({ theme }) => theme.background.primary};
	border: 1px solid ${({ theme }) => theme.border.primary};
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	max-height: 300px;
	overflow-y: auto;
	z-index: 1000;
	margin-top: 8px;
`;

const SearchResultItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 16px;
	cursor: pointer;
	border-bottom: 1px solid ${({ theme }) => theme.border.secondary};
	transition: background-color 0.2s ease;
	
	&:hover {
		background-color: ${({ theme }) => theme.background.secondary};
	}
	
	&:last-child {
		border-bottom: none;
	}
`;

const KeywordName = styled.span`
	font-size: 14px;
	color: ${({ theme }) => theme.text.primary};
	font-weight: 500;
`;

const SubscribeButton = styled.button<{ isSubscribed: boolean }>`
	background-color: ${(props) => (props.isSubscribed ? props.theme.background.tertiary : props.theme.background.secondary)};
	color: ${(props) => (props.isSubscribed ? props.theme.success : props.theme.text.secondary)};
	border: 1px solid ${(props) => 
		props.isSubscribed ? props.theme.success : props.theme.border.secondary};
	border-radius: 6px;
	padding: 4px 8px;
	font-size: 12px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	
	&:hover {
		background-color: ${(props) => 
			props.isSubscribed ? props.theme.success : props.theme.background.tertiary};
		color: ${(props) => (props.isSubscribed ? props.theme.text.inverse : props.theme.text.primary)};
	}
`;

const LoadingItem = styled.div`
	padding: 16px;
	text-align: center;
	color: #5f6368;
	font-size: 14px;
`;

/* ── 푸터 ────────────────────────────── */
const Footer = styled.footer`
	margin-top: auto;
	width: 100%;
	padding: 15px 30px;
	font-size: 14px;
	background: #f2f2f2;
	color: #70757a;
	text-align: left;
`;
