import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiUsers, 
  FiTag, 
  FiFileText as FiNewspaper, 
  FiMail, 
  FiCheck, 
  FiX, 
  FiClock,
  FiSearch,
  FiTrendingUp,
  FiActivity,
  FiAlertTriangle
} from 'react-icons/fi';
import Button from './Button';
import Input from './Input';
import Card, { CardHeader, CardBody, CardTitle } from './Card';

interface AdminStats {
  totalUsers: number;
  activeKeywords: number;
  pendingKeywords: number;
  totalArticles: number;
  emailsSent: number;
  userGrowth: number;
}

interface PendingKeyword {
  id: number;
  keyword: string;
  requestedBy: string;
  requestDate: string;
  userEmail: string;
  status: 'PENDING';
  requestReason?: string;
}

interface AdminDashboardProps {
  stats: AdminStats;
  pendingKeywords: PendingKeyword[];
  onApproveKeyword: (keywordId: number) => void;
  onRejectKeyword: (keywordId: number, reason: string) => void;
  isLoading?: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  pendingKeywords = [],
  onApproveKeyword,
  onRejectKeyword,
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'users' | 'content'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState<number | null>(null);

  const handleRejectKeyword = (keywordId: number) => {
    if (rejectReason.trim()) {
      onRejectKeyword(keywordId, rejectReason.trim());
      setRejectReason('');
      setShowRejectModal(null);
    }
  };

  const filteredPendingKeywords = pendingKeywords.filter(keyword =>
    keyword.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    keyword.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminContainer>
      {/* Header */}
      <AdminHeader>
        <HeaderContent>
          <HeaderTitle>관리자 대시보드</HeaderTitle>
          <HeaderDescription>
            SOUP 서비스의 전반적인 현황과 사용자 요청을 관리하세요
          </HeaderDescription>
        </HeaderContent>
      </AdminHeader>

      {/* Stats Cards */}
      <StatsGrid>
        <StatCard variant="default">
          <CardBody>
            <StatContent>
              <StatInfo>
                <StatNumber>{stats.totalUsers?.toLocaleString() || 0}</StatNumber>
                <StatLabel>총 사용자</StatLabel>
              </StatInfo>
              <StatIcon variant="users">
                <FiUsers size={24} />
              </StatIcon>
            </StatContent>
            <StatGrowth positive={stats.userGrowth >= 0}>
              <FiTrendingUp size={14} />
              {stats.userGrowth >= 0 ? '+' : ''}{stats.userGrowth}% 이번 달
            </StatGrowth>
          </CardBody>
        </StatCard>

        <StatCard variant="default">
          <CardBody>
            <StatContent>
              <StatInfo>
                <StatNumber>{stats.activeKeywords?.toLocaleString() || 0}</StatNumber>
                <StatLabel>활성 키워드</StatLabel>
              </StatInfo>
              <StatIcon variant="keywords">
                <FiTag size={24} />
              </StatIcon>
            </StatContent>
            <StatMeta>
              <PendingCount>
                <FiClock size={12} />
                {stats.pendingKeywords || 0}개 승인 대기
              </PendingCount>
            </StatMeta>
          </CardBody>
        </StatCard>

        <StatCard variant="default">
          <CardBody>
            <StatContent>
              <StatInfo>
                <StatNumber>{stats.totalArticles?.toLocaleString() || 0}</StatNumber>
                <StatLabel>생성된 기사</StatLabel>
              </StatInfo>
              <StatIcon variant="articles">
                <FiNewspaper size={24} />
              </StatIcon>
            </StatContent>
            <StatMeta>
              <span>이번 주 처리량</span>
            </StatMeta>
          </CardBody>
        </StatCard>

        <StatCard variant="default">
          <CardBody>
            <StatContent>
              <StatInfo>
                <StatNumber>{stats.emailsSent?.toLocaleString() || 0}</StatNumber>
                <StatLabel>발송된 이메일</StatLabel>
              </StatInfo>
              <StatIcon variant="emails">
                <FiMail size={24} />
              </StatIcon>
            </StatContent>
            <StatMeta>
              <span>이번 달 누적</span>
            </StatMeta>
          </CardBody>
        </StatCard>
      </StatsGrid>

      {/* Tabs */}
      <TabsContainer>
        <TabsList>
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            <FiActivity size={16} />
            개요
          </TabButton>
          <TabButton 
            active={activeTab === 'keywords'} 
            onClick={() => setActiveTab('keywords')}
          >
            <FiTag size={16} />
            키워드 승인 ({pendingKeywords.length})
          </TabButton>
          <TabButton 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
          >
            <FiUsers size={16} />
            사용자 관리
          </TabButton>
          <TabButton 
            active={activeTab === 'content'} 
            onClick={() => setActiveTab('content')}
          >
            <FiNewspaper size={16} />
            콘텐츠 관리
          </TabButton>
        </TabsList>
      </TabsContainer>

      {/* Tab Content */}
      <TabContent>
        {activeTab === 'overview' && (
          <OverviewPanel>
            <PanelGrid>
              <Card variant="default" padding="lg">
                <CardHeader>
                  <CardTitle>시스템 상태</CardTitle>
                </CardHeader>
                <CardBody>
                  <StatusList>
                    <StatusItem status="healthy">
                      <FiCheck size={16} />
                      <span>AI 서비스 정상 운영</span>
                    </StatusItem>
                    <StatusItem status="healthy">
                      <FiCheck size={16} />
                      <span>이메일 발송 정상</span>
                    </StatusItem>
                    <StatusItem status="warning">
                      <FiAlertTriangle size={16} />
                      <span>뉴스 수집 지연 (2분)</span>
                    </StatusItem>
                  </StatusList>
                </CardBody>
              </Card>

              <Card variant="default" padding="lg">
                <CardHeader>
                  <CardTitle>최근 활동</CardTitle>
                </CardHeader>
                <CardBody>
                  <ActivityList>
                    <ActivityItem>
                      <ActivityIcon><FiUsers /></ActivityIcon>
                      <ActivityText>
                        <strong>새 사용자 가입</strong>
                        <span>김철수님이 가입했습니다</span>
                      </ActivityText>
                      <ActivityTime>5분 전</ActivityTime>
                    </ActivityItem>
                    <ActivityItem>
                      <ActivityIcon><FiTag /></ActivityIcon>
                      <ActivityText>
                        <strong>키워드 요청</strong>
                        <span>"웹3" 키워드 승인 요청</span>
                      </ActivityText>
                      <ActivityTime>1시간 전</ActivityTime>
                    </ActivityItem>
                    <ActivityItem>
                      <ActivityIcon><FiNewspaper /></ActivityIcon>
                      <ActivityText>
                        <strong>뉴스 생성 완료</strong>
                        <span>25개 키워드 뉴스 생성</span>
                      </ActivityText>
                      <ActivityTime>3시간 전</ActivityTime>
                    </ActivityItem>
                  </ActivityList>
                </CardBody>
              </Card>
            </PanelGrid>
          </OverviewPanel>
        )}

        {activeTab === 'keywords' && (
          <KeywordsPanel>
            <PanelHeader>
              <SearchSection>
                <Input
                  placeholder="키워드 또는 요청자로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<FiSearch />}
                  size="md"
                  fullWidth
                />
              </SearchSection>
            </PanelHeader>

            {filteredPendingKeywords.length > 0 ? (
              <KeywordList>
                {filteredPendingKeywords.map((keyword) => (
                  <KeywordRequestCard key={keyword.id} variant="default">
                    <CardBody>
                      <KeywordRequestContent>
                        <KeywordInfo>
                          <KeywordName>"{keyword.keyword}"</KeywordName>
                          <KeywordMeta>
                            <MetaItem>
                              <FiUsers size={14} />
                              요청자: {keyword.requestedBy}
                            </MetaItem>
                            <MetaItem>
                              <FiMail size={14} />
                              {keyword.userEmail}
                            </MetaItem>
                            <MetaItem>
                              <FiClock size={14} />
                              {new Date(keyword.requestDate).toLocaleDateString('ko-KR')}
                            </MetaItem>
                          </KeywordMeta>
                          {keyword.requestReason && (
                            <RequestReason>
                              <strong>요청 사유:</strong> {keyword.requestReason}
                            </RequestReason>
                          )}
                        </KeywordInfo>
                        <KeywordActions>
                          <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<FiCheck />}
                            onClick={() => onApproveKeyword(keyword.id)}
                          >
                            승인
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<FiX />}
                            onClick={() => setShowRejectModal(keyword.id)}
                          >
                            거절
                          </Button>
                        </KeywordActions>
                      </KeywordRequestContent>
                    </CardBody>
                  </KeywordRequestCard>
                ))}
              </KeywordList>
            ) : (
              <EmptyState>
                <EmptyIcon>✅</EmptyIcon>
                <EmptyTitle>모든 키워드 요청이 처리되었습니다</EmptyTitle>
                <EmptyDescription>
                  새로운 키워드 요청이 들어오면 여기에 표시됩니다
                </EmptyDescription>
              </EmptyState>
            )}
          </KeywordsPanel>
        )}

        {activeTab === 'users' && (
          <UsersPanel>
            <EmptyState>
              <EmptyIcon>👥</EmptyIcon>
              <EmptyTitle>사용자 관리</EmptyTitle>
              <EmptyDescription>
                사용자 관리 기능은 추후 업데이트 예정입니다
              </EmptyDescription>
            </EmptyState>
          </UsersPanel>
        )}

        {activeTab === 'content' && (
          <ContentPanel>
            <EmptyState>
              <EmptyIcon>📰</EmptyIcon>
              <EmptyTitle>콘텐츠 관리</EmptyTitle>
              <EmptyDescription>
                콘텐츠 관리 기능은 추후 업데이트 예정입니다
              </EmptyDescription>
            </EmptyState>
          </ContentPanel>
        )}
      </TabContent>

      {/* Reject Modal */}
      {showRejectModal && (
        <ModalOverlay onClick={() => setShowRejectModal(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>키워드 요청 거절</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <ModalDescription>
                키워드 요청을 거절하는 이유를 입력해주세요. 
                사용자에게 피드백으로 전달됩니다.
              </ModalDescription>
              <Input
                placeholder="거절 사유를 입력하세요..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                fullWidth
                multiline
              />
            </ModalBody>
            <ModalActions>
              <Button variant="ghost" onClick={() => setShowRejectModal(null)}>
                취소
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleRejectKeyword(showRejectModal!)}
                disabled={!rejectReason.trim()}
              >
                거절하기
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}

      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>데이터를 불러오는 중...</LoadingText>
        </LoadingOverlay>
      )}
    </AdminContainer>
  );
};

// Styled Components
const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  position: relative;
`;

const AdminHeader = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const StatCard = styled(Card)`
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const StatContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const StatInfo = styled.div`
  /* Stat info styles */
`;

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const StatIcon = styled.div<{ variant: 'users' | 'keywords' | 'articles' | 'emails' }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  
  ${({ variant, theme }) => {
    const variants = {
      users: `background: linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[400]});`,
      keywords: `background: linear-gradient(135deg, ${theme.colors.success[500]}, ${theme.colors.success[400]});`,
      articles: `background: linear-gradient(135deg, ${theme.colors.warning[500]}, ${theme.colors.warning[400]});`,
      emails: `background: linear-gradient(135deg, ${theme.colors.info[500]}, ${theme.colors.info[400]});`
    };
    return variants[variant];
  }}
`;

const StatGrowth = styled.div<{ positive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, positive }) => 
    positive ? theme.colors.success[600] : theme.colors.error[600]};
`;

const StatMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const PendingCount = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const TabsContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const TabsList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  overflow-x: auto;
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
`;

const TabContent = styled.div`
  min-height: 500px;
`;

const OverviewPanel = styled.div`
  /* Overview panel styles */
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const StatusItem = styled.div<{ status: 'healthy' | 'warning' | 'error' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  ${({ status, theme }) => {
    const statusStyles = {
      healthy: `
        background-color: ${theme.colors.success[50]};
        color: ${theme.colors.success[700]};
      `,
      warning: `
        background-color: ${theme.colors.warning[50]};
        color: ${theme.colors.warning[700]};
      `,
      error: `
        background-color: ${theme.colors.error[50]};
        color: ${theme.colors.error[700]};
      `
    };
    return statusStyles[status];
  }}
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
  
  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const ActivityTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  flex-shrink: 0;
`;

const KeywordsPanel = styled.div`
  /* Keywords panel styles */
`;

const PanelHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SearchSection = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const KeywordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const KeywordRequestCard = styled(Card)`
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
`;

const KeywordRequestContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const KeywordInfo = styled.div`
  flex: 1;
`;

const KeywordName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const KeywordMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const RequestReason = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const KeywordActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-shrink: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: flex-end;
  }
`;

const UsersPanel = styled.div`
  /* Users panel styles */
`;

const ContentPanel = styled.div`
  /* Content panel styles */
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.elevated};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.boxShadow['2xl']};
  width: 100%;
  max-width: 500px;
  margin: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]} 0;
`;

const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const ModalDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: 0 ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]};
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
  margin: 0;
`;

export default AdminDashboard;