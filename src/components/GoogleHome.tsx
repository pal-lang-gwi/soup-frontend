import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { searchKeywords, subscribeKeywords, unsubscribeKeyword } from "../api/keywords";
import { searchKeywordDto } from "../types/keyword";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
            setSearchResults(response.data.data.keywords);
            setShowResults(true);
          }
        } catch (e) {
          console.error("검색 실패", e);
          setSearchResults([]);
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
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const latest = await searchKeywords(keyword.name, 0, 1);
      const match = latest.data.data.keywords.find(k => k.id === keyword.id);
      const isActuallySubscribed = match?.isSubscribed ?? false;

      if (isActuallySubscribed) {
        await unsubscribeKeyword(keyword.id);
        alert(`${keyword.name} 구독을 해지했습니다.`);
      } else {
        await subscribeKeywords([keyword.name]);
        alert(`${keyword.name} 구독을 시작했습니다.`);
      }

      const refetch = await searchKeywords(searchTerm, 0, 10);
      if (refetch.data.success) setSearchResults(refetch.data.data.keywords);

      navigate(`/news?keyword=${encodeURIComponent(keyword.name)}`);
    } catch (e) {
      console.error("구독/해제 실패", e);
      alert("키워드 구독/구독해제에 실패했습니다.");
    }
  };

  const handleAddKeyword = async (term: string) => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await subscribeKeywords([term]);
      alert(`"${term}" 키워드를 구독했습니다.`);
      navigate(`/news?keyword=${encodeURIComponent(term)}`);
    } catch (e) {
      console.error("키워드 추가 실패", e);
      alert("키워드 추가에 실패했습니다.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/news?keyword=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <Root>
      <Logo>
        <span className="g">S</span>
        <span className="o1">O</span>
        <span className="o2">U</span>
        <span className="g">P</span>
      </Logo>

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
            <MicIcon>🎤</MicIcon>
          </InputWrapper>
        </Form>

        {showResults && (searchResults.length > 0 || isSearching || searchTerm.trim().length > 0) && (
          <SearchResults>
            {isSearching ? (
              <LoadingItem>검색 중...</LoadingItem>
            ) : searchResults.length > 0 ? (
              searchResults.map((k) => (
                <SearchResultItem key={k.id}>
                  <KeywordName onClick={() => navigate(`/news?keyword=${encodeURIComponent(k.name)}`)}>
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

      <Footer>대한민국</Footer>
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

const Logo = styled.h1`
	font-size: 92px;
	margin-top: 15vh;
	margin-bottom: 40px;
	font-weight: 600;
	line-height: 1;

	span {
		user-select: none;
	}
	.g {
		color: #4285f4;
	}
	.o1 {
		color: #db4437;
	}
	.o2 {
		color: #f4b400;
	}
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
	border: 1px solid #dfe1e5;
	border-radius: 22px;
	display: flex;
	align-items: center;
	padding: 0 14px;
	background: #fff;
	box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
	transition: box-shadow 0.2s ease-in-out;

	&:hover {
		box-shadow: 0 1px 8px rgba(32, 33, 36, 0.35);
	}
	&:focus-within {
		border-color: #4285f4;
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
`;

const iconCss = css`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
`;

const SvgGlass = styled.svg`
	${iconCss};
	left: 16px;
	width: 20px;
	height: 20px;
	fill: #9aa0a6;
`;

const MicIcon = styled.span`
	${iconCss};
	right: 16px;
	font-size: 20px;
`;

const LoadingSpinner = styled.span`
	${iconCss};
	right: 50px;
	font-size: 16px;
	animation: spin 1s linear infinite;

	@keyframes spin {
		from {
			transform: translateY(-50%) rotate(0deg);
		}
		to {
			transform: translateY(-50%) rotate(360deg);
		}
	}
`;

/* ── 검색 결과 드롭다운 ────────────────── */
const SearchResults = styled.div`
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
	max-width: 580px;
	background: white;
	border: 1px solid #dfe1e5;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(32, 33, 36, 0.28);
	max-height: 300px;
	overflow-y: auto;
	z-index: 1000;
	margin-top: 8px;
`;

const SearchResultItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
	cursor: pointer;
	border-bottom: 1px solid #f1f3f4;
	transition: background-color 0.2s;

	&:hover {
		background-color: #f8f9fa;
	}

	&:last-child {
		border-bottom: none;
	}
`;

const KeywordName = styled.span`
	font-size: 14px;
	color: #202124;
	font-weight: 500;
`;

const SubscribeButton = styled.button<{ isSubscribed: boolean }>`
	font-size: 12px;
	padding: 4px 8px;
	border-radius: 12px;
	background-color: ${(props) => (props.isSubscribed ? "#e8f5e8" : "#f1f3f4")};
	color: ${(props) => (props.isSubscribed ? "#137333" : "#5f6368")};
	font-weight: 500;
	border: none;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background-color: ${(props) =>
			props.isSubscribed ? "#d4edda" : "#e9ecef"};
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
