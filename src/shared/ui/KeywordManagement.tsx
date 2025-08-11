import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiPlus, 
  FiSearch, 
  FiX, 
  FiCheck, 
  FiClock, 
  FiAlertCircle,
  FiTrash2,
  FiTag
} from 'react-icons/fi';
import Button from './Button';
import Input from './Input';
import Card, { CardBody } from './Card';
import { searchKeywordDto } from '../../types/keyword';

interface MyKeywordDto {
  userId: number;
  keywordId: number;
  keyword: string;
  normalizedKeyword: string;
  registeredDate: string;
}

interface KeywordManagementProps {
  myKeywords: MyKeywordDto[];
  availableKeywords: searchKeywordDto[];
  pendingRequests: any[];
  onSubscribe: (keywordId: number) => void;
  onUnsubscribe: (keywordId: number) => void;
  onRequestKeyword: (keyword: string) => void;
  onSearchKeywords: (query: string) => void;
  isLoading?: boolean;
}

const KeywordManagement: React.FC<KeywordManagementProps> = ({
  myKeywords = [],
  availableKeywords = [],
  pendingRequests = [],
  onSubscribe,
  onUnsubscribe,
  onRequestKeyword,
  onSearchKeywords,
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState<'my-keywords' | 'discover' | 'pending'>('my-keywords');
  const [searchQuery, setSearchQuery] = useState('');
  const [newKeywordRequest, setNewKeywordRequest] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearchKeywords(value);
  };

  const handleRequestKeyword = () => {
    if (newKeywordRequest.trim()) {
      onRequestKeyword(newKeywordRequest.trim());
      setNewKeywordRequest('');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PENDING: { icon: FiClock, label: '승인 대기', variant: 'warning' as const },
      APPROVED: { icon: FiCheck, label: '승인됨', variant: 'success' as const },
      REJECTED: { icon: FiX, label: '거절됨', variant: 'error' as const },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    if (!statusInfo) return null;
    
    const { icon: Icon, label, variant } = statusInfo;
    
    return (
      <StatusBadge variant={variant}>
        <Icon size={12} />
        {label}
      </StatusBadge>
    );
  };

  return (
    <KeywordContainer>
      {/* Header */}
      <KeywordHeader>
        <HeaderContent>
          <HeaderTitle>키워드 관리</HeaderTitle>
          <HeaderDescription>
            관심있는 키워드를 구독하고 맞춤형 뉴스를 받아보세요
          </HeaderDescription>
        </HeaderContent>
      </KeywordHeader>

      {/* Tabs */}
      <TabsContainer>
        <TabsList>
          <TabButton 
            active={activeTab === 'my-keywords'} 
            onClick={() => setActiveTab('my-keywords')}
          >
            <FiTag size={16} />
            구독 중인 키워드 ({myKeywords.length})
          </TabButton>
          <TabButton 
            active={activeTab === 'discover'} 
            onClick={() => setActiveTab('discover')}
          >
            <FiSearch size={16} />
            키워드 찾기
          </TabButton>
          <TabButton 
            active={activeTab === 'pending'} 
            onClick={() => setActiveTab('pending')}
          >
            <FiClock size={16} />
            승인 대기 ({pendingRequests.length})
          </TabButton>
        </TabsList>
      </TabsContainer>

      {/* Tab Content */}
      <TabContent>
        {activeTab === 'my-keywords' && (
          <TabPanel>
            {myKeywords.length > 0 ? (
              <KeywordGrid>
                {myKeywords.map((keyword) => (
                  <KeywordCard key={keyword.keywordId} variant="default" hoverable>
                    <CardBody>
                      <KeywordInfo>
                        <KeywordName>{keyword.keyword}</KeywordName>
                        <KeywordMeta>
                          구독일: {new Date(keyword.registeredDate).toLocaleDateString('ko-KR')}
                        </KeywordMeta>
                      </KeywordInfo>
                      <KeywordActions>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<FiTrash2 />}
                          onClick={() => onUnsubscribe(keyword.keywordId)}
                        >
                          구독 취소
                        </Button>
                      </KeywordActions>
                    </CardBody>
                  </KeywordCard>
                ))}
              </KeywordGrid>
            ) : (
              <EmptyState>
                <EmptyIcon>🔍</EmptyIcon>
                <EmptyTitle>아직 구독 중인 키워드가 없어요</EmptyTitle>
                <EmptyDescription>
                  '키워드 찾기' 탭에서 관심있는 키워드를 찾아 구독해보세요
                </EmptyDescription>
                <Button 
                  variant="primary" 
                  onClick={() => setActiveTab('discover')}
                >
                  키워드 찾아보기
                </Button>
              </EmptyState>
            )}
          </TabPanel>
        )}

        {activeTab === 'discover' && (
          <TabPanel>
            <SearchSection>
              <SearchInputWrapper>
                <Input
                  placeholder="키워드를 검색해보세요 (예: AI, 스타트업, 블록체인)"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  leftIcon={<FiSearch />}
                  size="lg"
                  fullWidth
                />
              </SearchInputWrapper>
              
              <RequestSection>
                <RequestTitle>원하는 키워드가 없나요?</RequestTitle>
                <RequestForm>
                  <Input
                    placeholder="새로운 키워드를 요청해보세요"
                    value={newKeywordRequest}
                    onChange={(e) => setNewKeywordRequest(e.target.value)}
                    size="md"
                    fullWidth
                  />
                  <Button
                    variant="primary"
                    leftIcon={<FiPlus />}
                    onClick={handleRequestKeyword}
                    disabled={!newKeywordRequest.trim()}
                  >
                    키워드 요청
                  </Button>
                </RequestForm>
              </RequestSection>
            </SearchSection>

            {availableKeywords.length > 0 ? (
              <KeywordGrid>
                {availableKeywords.map((keyword) => (
                  <KeywordCard key={keyword.id} variant="default" hoverable>
                    <CardBody>
                      <KeywordInfo>
                        <KeywordName>{keyword.name}</KeywordName>
                        <KeywordMeta>
                          정규화된 이름: {keyword.normalized}
                        </KeywordMeta>
                      </KeywordInfo>
                      <KeywordActions>
                        {keyword.isSubscribed ? (
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<FiCheck />}
                            onClick={() => onUnsubscribe(keyword.id)}
                          >
                            구독 중
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<FiPlus />}
                            onClick={() => onSubscribe(keyword.id)}
                          >
                            구독하기
                          </Button>
                        )}
                      </KeywordActions>
                    </CardBody>
                  </KeywordCard>
                ))}
              </KeywordGrid>
            ) : searchQuery ? (
              <EmptyState>
                <EmptyIcon>🔍</EmptyIcon>
                <EmptyTitle>검색 결과가 없어요</EmptyTitle>
                <EmptyDescription>
                  다른 키워드로 검색해보시거나, 새로운 키워드를 요청해보세요
                </EmptyDescription>
              </EmptyState>
            ) : (
              <EmptyState>
                <EmptyIcon>✨</EmptyIcon>
                <EmptyTitle>키워드를 검색해보세요</EmptyTitle>
                <EmptyDescription>
                  관심있는 주제의 키워드를 검색하여 구독할 수 있어요
                </EmptyDescription>
              </EmptyState>
            )}
          </TabPanel>
        )}

        {activeTab === 'pending' && (
          <TabPanel>
            {pendingRequests.length > 0 ? (
              <KeywordGrid>
                {pendingRequests.map((request, index) => (
                  <KeywordCard key={index} variant="outlined">
                    <CardBody>
                      <KeywordInfo>
                        <KeywordNameWithStatus>
                          <KeywordName>{request.keyword}</KeywordName>
                          {getStatusBadge(request.status)}
                        </KeywordNameWithStatus>
                        <KeywordMeta>
                          요청일: {new Date(request.requestDate).toLocaleDateString('ko-KR')}
                        </KeywordMeta>
                        {request.rejectReason && (
                          <RejectReason>
                            <FiAlertCircle size={14} />
                            거절 사유: {request.rejectReason}
                          </RejectReason>
                        )}
                      </KeywordInfo>
                    </CardBody>
                  </KeywordCard>
                ))}
              </KeywordGrid>
            ) : (
              <EmptyState>
                <EmptyIcon>📝</EmptyIcon>
                <EmptyTitle>승인 대기 중인 키워드가 없어요</EmptyTitle>
                <EmptyDescription>
                  새로운 키워드를 요청하면 관리자 승인 후 이용하실 수 있어요
                </EmptyDescription>
              </EmptyState>
            )}
          </TabPanel>
        )}
      </TabContent>

      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>키워드를 불러오는 중...</LoadingText>
        </LoadingOverlay>
      )}
    </KeywordContainer>
  );
};

// Styled Components
const KeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  position: relative;
`;

const KeywordHeader = styled.div`
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

const TabsContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const TabsList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  overflow-x: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, active }) => 
    active ? theme.colors.primary[600] : theme.colors.text.secondary};
  border-bottom: 2px solid ${({ theme, active }) => 
    active ? theme.colors.primary[500] : 'transparent'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    border-bottom-color: ${({ theme }) => theme.colors.primary[300]};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[3]};
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const TabPanel = styled.div`
  animation: fadeIn ${({ theme }) => theme.transition.duration.normal} ease-out;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const SearchInputWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const RequestSection = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const RequestTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  text-align: center;
`;

const RequestForm = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: flex-end;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const KeywordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const KeywordCard = styled(Card)`
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const KeywordInfo = styled.div`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const KeywordName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const KeywordNameWithStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  flex-wrap: wrap;
`;

const KeywordMeta = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0;
`;

const KeywordActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: flex-end;
`;

const StatusBadge = styled.span<{ variant: 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  ${({ variant, theme }) => {
    const variants = {
      success: `
        background-color: ${theme.colors.success[100]};
        color: ${theme.colors.success[700]};
      `,
      warning: `
        background-color: ${theme.colors.warning[100]};
        color: ${theme.colors.warning[700]};
      `,
      error: `
        background-color: ${theme.colors.error[100]};
        color: ${theme.colors.error[700]};
      `
    };
    return variants[variant];
  }}
`;

const RejectReason = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.error[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.error[700]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing[2]};
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
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  max-width: 400px;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.overlay};
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
`;

export default KeywordManagement;