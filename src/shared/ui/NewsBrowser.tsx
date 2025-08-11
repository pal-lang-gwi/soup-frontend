import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiSearch, 
  FiExternalLink, 
  FiChevronDown,
  FiChevronUp,
  FiTag,
  FiClock,
  FiBookmark,
  FiShare2
} from 'react-icons/fi';
import Button from './Button';
import Input from './Input';
import Card, { CardHeader, CardBody } from './Card';
import { NewsDtos } from '../../types/news';

interface NewsBrowserProps {
  news: NewsDtos[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  currentPage?: number;
  totalPages?: number;
}

const NewsBrowser: React.FC<NewsBrowserProps> = ({
  news = [],
  isLoading = false,
  onLoadMore,
  hasMore = false,
  currentPage = 1,
  totalPages = 1
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'relevance'>('newest');
  const [selectedKeyword, setSelectedKeyword] = useState<string>('all');
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());

  // Get unique keywords for filter
  const availableKeywords = Array.from(new Set(news.map(item => item.keyword)));

  // Filter and sort news
  const filteredNews = news
    .filter(item => {
      const matchesSearch = item.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.longSummary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKeyword = selectedKeyword === 'all' || item.keyword === selectedKeyword;
      return matchesSearch && matchesKeyword;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'oldest':
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        case 'relevance':
          return a.keyword.localeCompare(b.keyword);
        default:
          return 0;
      }
    });

  const toggleArticleExpansion = (newsId: string) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(newsId)) {
      newExpanded.delete(newsId);
    } else {
      newExpanded.add(newsId);
    }
    setExpandedArticles(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return '오늘';
    } else if (diffDays === 2) {
      return '어제';
    } else if (diffDays <= 7) {
      return `${diffDays - 1}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  return (
    <NewsContainer>
      {/* Header */}
      <NewsHeader>
        <HeaderContent>
          <HeaderTitle>뉴스 브라우저</HeaderTitle>
          <HeaderDescription>
            AI가 큐레이션한 최신 뉴스를 키워드별로 확인해보세요
          </HeaderDescription>
        </HeaderContent>
      </NewsHeader>

      {/* Filters */}
      <FiltersSection>
        <SearchRow>
          <SearchInputWrapper>
            <Input
              placeholder="뉴스 검색하기..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<FiSearch />}
              size="md"
              fullWidth
            />
          </SearchInputWrapper>
        </SearchRow>

        <FilterRow>
          <FilterGroup>
            <FilterLabel>키워드 필터</FilterLabel>
            <FilterSelect value={selectedKeyword} onChange={(e) => setSelectedKeyword(e.target.value)}>
              <option value="all">전체 키워드</option>
              {availableKeywords.map(keyword => (
                <option key={keyword} value={keyword}>{keyword}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>정렬</FilterLabel>
            <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="newest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="relevance">키워드순</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>

        <ResultsInfo>
          총 <strong>{filteredNews.length}</strong>개의 뉴스가 있습니다
        </ResultsInfo>
      </FiltersSection>

      {/* News List */}
      <NewsContent>
        {filteredNews.length > 0 ? (
          <NewsList>
            {filteredNews.map((newsItem, index) => {
              const newsId = `${newsItem.keyword}-${newsItem.createdDate}-${index}`;
              const isExpanded = expandedArticles.has(newsId);
              
              return (
                <NewsCard key={newsId} variant="default">
                  <CardHeader>
                    <NewsCardHeader>
                      <NewsMetadata>
                        <KeywordTag>
                          <FiTag size={12} />
                          {newsItem.keyword}
                        </KeywordTag>
                        <NewsDate>
                          <FiClock size={12} />
                          {formatDate(newsItem.createdDate)}
                        </NewsDate>
                      </NewsMetadata>
                      <NewsActions>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<FiBookmark />}
                        >
                          저장
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<FiShare2 />}
                        >
                          공유
                        </Button>
                      </NewsActions>
                    </NewsCardHeader>
                  </CardHeader>

                  <CardBody>
                    <NewsSummarySection>
                      <SummaryTitle>AI 요약</SummaryTitle>
                      <SummaryText>{newsItem.longSummary}</SummaryText>
                    </NewsSummarySection>

                    {newsItem.articles && newsItem.articles.length > 0 && (
                      <ArticlesSection>
                        <ArticlesHeader>
                          <ArticlesTitle>
                            관련 기사 ({newsItem.articles.length}개)
                          </ArticlesTitle>
                          <ToggleButton
                            variant="ghost"
                            size="sm"
                            rightIcon={isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                            onClick={() => toggleArticleExpansion(newsId)}
                          >
                            {isExpanded ? '접기' : '펼치기'}
                          </ToggleButton>
                        </ArticlesHeader>

                        {isExpanded && (
                          <ArticlesList>
                            {newsItem.articles.map((article, articleIndex) => (
                              <ArticleItem key={articleIndex}>
                                <ArticleContent>
                                  <ArticleTitle>{article.title}</ArticleTitle>
                                  <ArticleSummary>{article.summary}</ArticleSummary>
                                </ArticleContent>
                                <ArticleActions>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    rightIcon={<FiExternalLink />}
                                    as="a"
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    원문 보기
                                  </Button>
                                </ArticleActions>
                              </ArticleItem>
                            ))}
                          </ArticlesList>
                        )}
                      </ArticlesSection>
                    )}
                  </CardBody>
                </NewsCard>
              );
            })}
          </NewsList>
        ) : (
          <EmptyState>
            <EmptyIcon>📰</EmptyIcon>
            <EmptyTitle>뉴스가 없어요</EmptyTitle>
            <EmptyDescription>
              {searchQuery || selectedKeyword !== 'all' 
                ? '다른 검색어나 필터를 시도해보세요'
                : '아직 생성된 뉴스가 없습니다. 키워드를 구독하고 잠시 기다려보세요!'
              }
            </EmptyDescription>
          </EmptyState>
        )}

        {/* Load More */}
        {hasMore && onLoadMore && (
          <LoadMoreSection>
            <Button
              variant="outline"
              size="lg"
              onClick={onLoadMore}
              isLoading={isLoading}
              fullWidth
            >
              더 많은 뉴스 보기
            </Button>
            <PageInfo>
              {currentPage} / {totalPages} 페이지
            </PageInfo>
          </LoadMoreSection>
        )}
      </NewsContent>

      {isLoading && filteredNews.length === 0 && (
        <LoadingState>
          <LoadingSpinner />
          <LoadingText>뉴스를 불러오는 중...</LoadingText>
        </LoadingState>
      )}
    </NewsContainer>
  );
};

// Styled Components
const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const NewsHeader = styled.div`
  text-align: center;
`;

const HeaderContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const HeaderDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const FiltersSection = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const SearchRow = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SearchInputWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  flex: 1;
`;

const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const ResultsInfo = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin: 0;
`;

const NewsContent = styled.div`
  /* Content styles */
`;

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const NewsCard = styled(Card)`
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
    border-color: ${({ theme }) => theme.colors.primary[200]};
  }
`;

const NewsCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const NewsMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
`;

const KeywordTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  background-color: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[700]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const NewsDate = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const NewsActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const NewsSummarySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const SummaryTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const SummaryText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const ArticlesSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-top: ${({ theme }) => theme.spacing[5]};
`;

const ArticlesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ArticlesTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const ToggleButton = styled(Button)`
  /* Toggle button styles */
`;

const ArticlesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  animation: fadeIn ${({ theme }) => theme.transition.duration.normal} ease-out;
`;

const ArticleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const ArticleContent = styled.div`
  flex: 1;
`;

const ArticleTitle = styled.h5`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const ArticleSummary = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const ArticleActions = styled.div`
  flex-shrink: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const EmptyDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 400px;
  margin: 0;
`;

const LoadMoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const PageInfo = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[4]};
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${({ theme }) => theme.colors.primary[100]};
  border-top-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export default NewsBrowser;