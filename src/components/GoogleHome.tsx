import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { 
  FiSearch, 
  FiTrendingUp, 
  FiPlus, 
  FiCheck, 
  FiClock,
  FiTag,
  FiArrowRight,
  FiStar
} from "react-icons/fi";
import { searchKeywords, subscribeKeywords, unsubscribeKeyword, requestKeyword } from "../api/keywords";
import { searchKeywordDto } from "../types/keyword";
import { useAuth } from "../features/auth";
import { useNavigate } from "react-router-dom";
import { 
  showError, 
  showLoginRequired,
  showKeywordSubscribed,
  showKeywordUnsubscribed,
  showKeywordRequested
} from "../utils/sweetAlert";
import Button from "./ui/Button";
import Navigation from "./ui/Navigation";

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
        } catch (error) {
          setSearchResults([]);
          setShowResults(true);
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
      <Navigation />
      
      <MainContent>
        <HeroSection>
          <HeroTitle>
            관심 키워드로 나만의 뉴스를 발견하세요
          </HeroTitle>
          
          <HeroSubtitle>
            구독한 키워드의 최신 뉴스를 놓치지 마세요
          </HeroSubtitle>

          <SearchContainer className="search-container">
            <SearchForm onSubmit={handleSubmit}>
              <SearchInputWrapper>
                <FiSearch size={20} />
                <ModernSearchInput
                  type="text"
                  placeholder="키워드를 검색해보세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.trim() && setShowResults(true)}
                />
                {isSearching && (
                  <LoadingIndicator>
                    <FiClock className="spin" />
                  </LoadingIndicator>
                )}
              </SearchInputWrapper>
            </SearchForm>

            {showResults && (searchResults.length > 0 || isSearching || searchTerm.trim().length > 0) && (
              <ModernSearchResults>
                {isSearching ? (
                  <ResultsCard>
                    <LoadingState>
                      <FiClock className="spin" />
                      <span>검색 중...</span>
                    </LoadingState>
                  </ResultsCard>
                ) : searchResults.length > 0 ? (
                  <ResultsCard>
                    {searchResults.map((k) => (
                      <KeywordResultItem 
                        key={k.id}
                        onClick={() => navigate(`/news?keyword=${encodeURIComponent(k.name)}`)}
                      >
                        <KeywordInfo>
                          <FiTag size={16} />
                          <KeywordText>{k.name}</KeywordText>
                        </KeywordInfo>
                        <Button
                          variant={k.isSubscribed ? "secondary" : "outline"}
                          size="sm"
                          leftIcon={k.isSubscribed ? <FiCheck size={14} /> : <FiPlus size={14} />}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleKeywordClick(k);
                          }}
                        >
                          {k.isSubscribed ? "구독 중" : "구독하기"}
                        </Button>
                      </KeywordResultItem>
                    ))}
                  </ResultsCard>
                ) : (
                  <ResultsCard>
                    <AddKeywordItem onClick={() => handleAddKeyword(searchTerm)}>
                      <KeywordInfo>
                        <FiPlus size={16} />
                        <KeywordText>"{searchTerm}" 직접 추가하기</KeywordText>
                      </KeywordInfo>
                      <FiArrowRight size={16} />
                    </AddKeywordItem>
                  </ResultsCard>
                )}
              </ModernSearchResults>
            )}
          </SearchContainer>
        </HeroSection>

        <QuickActions>
          <SectionTitle>빠른 바로가기</SectionTitle>
          <ActionGrid>
            <ActionCard onClick={() => navigate('/news')}>
              <ActionIcon>
                <FiTrendingUp size={24} />
              </ActionIcon>
              <ActionTitle>인기 뉴스</ActionTitle>
              <ActionDescription>지금 가장 핫한 뉴스를 확인하세요</ActionDescription>
            </ActionCard>
            
            <ActionCard onClick={() => navigate('/mypage')}>
              <ActionIcon>
                <FiStar size={24} />
              </ActionIcon>
              <ActionTitle>내 구독</ActionTitle>
              <ActionDescription>구독한 키워드를 관리하세요</ActionDescription>
            </ActionCard>
          </ActionGrid>
        </QuickActions>
      </MainContent>
    </Root>
  );
}


/* ─────────── 스타일 ─────────── */
const Root = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.background.primary} 0%, 
    ${({ theme }) => theme.colors.secondary[50]} 100%
  );
`;

const MainContent = styled.main`
  max-width: ${({ theme }) => theme.layout.container.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.elevated};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  gap: ${({ theme }) => theme.spacing[3]};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[200]};
    box-shadow: ${({ theme }) => theme.boxShadow.xl};
  }
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary[100]};
  }
  
  svg {
    color: ${({ theme }) => theme.colors.text.tertiary};
    flex-shrink: 0;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  }
`;

const ModernSearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const LoadingIndicator = styled.div`
  color: ${({ theme }) => theme.colors.primary[500]};
  
  .spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ModernSearchResults = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing[2]});
  left: 0;
  right: 0;
  z-index: 1000;
`;

const ResultsCard = styled.div`
  background: ${({ theme }) => theme.colors.background.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.boxShadow.xl};
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;
`;

const KeywordResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary[50]};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const KeywordInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  
  svg {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const KeywordText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  .spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const AddKeywordItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[50]};
    
    svg {
      color: ${({ theme }) => theme.colors.primary[600]};
    }
  }
  
  svg {
    color: ${({ theme }) => theme.colors.text.tertiary};
    transition: color ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  }
`;

const QuickActions = styled.section`
  margin-top: ${({ theme }) => theme.spacing[16]};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  max-width: 800px;
  margin: 0 auto;
`;

const ActionCard = styled.div`
  background: ${({ theme }) => theme.colors.background.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
    border-color: ${({ theme }) => theme.colors.primary[200]};
  }
`;

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary[500]}, 
    ${({ theme }) => theme.colors.primary[600]}
  );
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin: 0 auto ${({ theme }) => theme.spacing[4]};
  color: white;
`;

const ActionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ActionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;
