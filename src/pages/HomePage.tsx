import { useState } from "react";
import styled from "styled-components";
import { FiArrowRight, FiMail, FiTrendingUp, FiShield } from "react-icons/fi";
import Navigation from "../shared/ui/Navigation";
import Button from "../shared/ui/Button";
import Card, { CardHeader, CardBody, CardTitle, CardDescription } from "../shared/ui/Card";
import LoginForm from "../features/auth/LoginForm";
import GoogleHome from "../widgets/keyword-search/GoogleHome";
import { useAuth } from "../features/auth";

function HomePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const { isAuthenticated } = useAuth();

	return (
		<>
			<Navigation />
			<PageContainer>
				{!isAuthenticated ? (
					<>
						{/* Hero Section */}
						<HeroSection>
							<HeroContent>
								<HeroText>
									<HeroTitle>
										맞춤형
										<HeroHighlight> AI 뉴스 큐레이션</HeroHighlight>
										으로 똑똑하게 정보를 받아보세요
									</HeroTitle>
									<HeroSubtitle>
										SOUP는 여러분의 관심사에 맞는 일일 뉴스 요약을 제공합니다. 
										키워드를 구독하고 AI가 엄선한 스마트한 뉴스 다이제스트를 받아보세요.
									</HeroSubtitle>
									<HeroActions>
										<Button 
											variant="primary" 
											size="lg" 
											rightIcon={<FiArrowRight />}
											onClick={openModal}
										>
											무료로 시작하기
										</Button>
										<Button 
											variant="ghost" 
											size="lg"
											onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
										>
											자세히 알아보기
										</Button>
									</HeroActions>
								</HeroText>
								<HeroVisual>
									<HeroCard variant="elevated" hoverable>
										<CardBody>
											<NewsPreview>
												<NewsHeader>
													<NewsIcon>📧</NewsIcon>
													<NewsTitle>오늘의 SOUP</NewsTitle>
													<NewsDate>오늘</NewsDate>
												</NewsHeader>
												<NewsSummary>
													<NewsItem>
														<NewsTag>AI</NewsTag>
														<NewsContent>인공지능 분야의 최신 혁신 기술 동향...</NewsContent>
													</NewsItem>
													<NewsItem>
														<NewsTag>스타트업</NewsTag>
														<NewsContent>2025년 스타트업 투자 트렌드 분석...</NewsContent>
													</NewsItem>
													<NewsItem>
														<NewsTag>과학</NewsTag>
														<NewsContent>기후 연구에서 나타난 희망적인 결과들...</NewsContent>
													</NewsItem>
												</NewsSummary>
											</NewsPreview>
										</CardBody>
									</HeroCard>
								</HeroVisual>
							</HeroContent>
						</HeroSection>

						{/* Features Section */}
						<FeaturesSection id="features">
							<Container>
								<SectionHeader>
									<SectionTitle>왜 SOUP를 선택해야 할까요?</SectionTitle>
									<SectionSubtitle>
										시간을 절약하고 정보를 놓치지 않는 스마트한 뉴스 큐레이션 서비스
									</SectionSubtitle>
								</SectionHeader>
								<FeaturesGrid>
									<FeatureCard variant="default" padding="lg">
										<CardHeader>
											<FeatureIcon><FiTrendingUp /></FeatureIcon>
											<CardTitle>AI 기반 스마트 요약</CardTitle>
										</CardHeader>
										<CardBody>
											<CardDescription>
												AI가 수천 개의 뉴스 소스를 분석하여 여러분의 관심사에 
												맞는 간결하고 핵심적인 뉴스 요약을 제공합니다.
											</CardDescription>
										</CardBody>
									</FeatureCard>
									
									<FeatureCard variant="default" padding="lg">
										<CardHeader>
											<FeatureIcon><FiMail /></FeatureIcon>
											<CardTitle>매일 아침 이메일 배송</CardTitle>
										</CardHeader>
										<CardBody>
											<CardDescription>
												매주 평일 아침마다 개인 맞춤형 뉴스 다이제스트를 
												깔끔하게 정리된 형태로 받아보실 수 있습니다.
											</CardDescription>
										</CardBody>
									</FeatureCard>
									
									<FeatureCard variant="default" padding="lg">
										<CardHeader>
											<FeatureIcon><FiShield /></FeatureIcon>
											<CardTitle>검증된 품질 관리</CardTitle>
										</CardHeader>
										<CardBody>
											<CardDescription>
												관리자가 직접 승인하는 키워드 시스템으로 고품질 콘텐츠를 
												보장하고 스팸이나 무관한 주제를 차단합니다.
											</CardDescription>
										</CardBody>
									</FeatureCard>
								</FeaturesGrid>
							</Container>
						</FeaturesSection>

						{/* Stats Section */}
						<StatsSection>
							<Container>
								<StatsGrid>
									<StatItem>
										<StatNumber>10K+</StatNumber>
										<StatLabel>처리된 기사 수</StatLabel>
									</StatItem>
									<StatItem>
										<StatNumber>500+</StatNumber>
										<StatLabel>활성 키워드</StatLabel>
									</StatItem>
									<StatItem>
										<StatNumber>95%</StatNumber>
										<StatLabel>사용자 만족도</StatLabel>
									</StatItem>
									<StatItem>
										<StatNumber>24시간</StatNumber>
										<StatLabel>뉴스 모니터링</StatLabel>
									</StatItem>
								</StatsGrid>
							</Container>
						</StatsSection>

						{/* CTA Section */}
						<CTASection>
							<Container>
								<CTAContent>
									<CTATitle>스마트한 정보 습득을 시작하세요</CTATitle>
									<CTASubtitle>
										이미 수천 명의 전문가들이 매일 SOUP를 통해 필수 뉴스를 받아보고 있습니다.
									</CTASubtitle>
									<Button 
										variant="primary" 
										size="lg" 
										rightIcon={<FiArrowRight />}
										onClick={openModal}
									>
										무료 체험 시작하기
									</Button>
								</CTAContent>
							</Container>
						</CTASection>
					</>
				) : (
					<GoogleHome />
				)}
			</PageContainer>

			{/* Login Modal */}
			{isModalOpen && (
				<ModalOverlay onClick={closeModal}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<LoginForm />
					</ModalContent>
				</ModalOverlay>
			)}
		</>
	);
}

export default HomePage;

// Modern Styled Components
const PageContainer = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.primary} 0%,
    ${({ theme }) => theme.colors.background.secondary} 100%
  );
  min-height: 100vh;
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0 ${({ theme }) => theme.spacing[16]};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[50]} 0%,
    ${({ theme }) => theme.colors.background.primary} 50%,
    ${({ theme }) => theme.colors.secondary[50]} 100%
  );
`;

const HeroContent = styled.div`
  max-width: ${({ theme }) => theme.layout.container.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.container.padding};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[16]};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[12]};
    text-align: center;
  }
`;

const HeroText = styled.div`
  max-width: 600px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: none;
    margin: 0 auto;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

const HeroHighlight = styled.span`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[600]},
    ${({ theme }) => theme.colors.primary[400]}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary[400]},
      ${({ theme }) => theme.colors.primary[600]}
    );
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    
    > * {
      width: 100%;
    }
  }
`;

const HeroVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: -1;
  }
`;

const HeroCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  transform: rotate(-2deg);
  transition: transform ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    transform: rotate(0deg) scale(1.02);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 300px;
  }
`;

const NewsPreview = styled.div`
  /* News preview styles */
`;

const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[3]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const NewsIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const NewsTitle = styled.h3`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
  margin: 0;
`;

const NewsDate = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  background-color: ${({ theme }) => theme.colors.secondary[100]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const NewsSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const NewsItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const NewsTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[700]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  flex-shrink: 0;
`;

const NewsContent = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.container.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.container.padding};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
`;

const FeatureCard = styled(Card)`
  height: 100%;
  transition: all ${({ theme }) => theme.transition.duration.normal} ${({ theme }) => theme.transition.timing.ease};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.boxShadow.xl};
    border-color: ${({ theme }) => theme.colors.primary[200]};
  }
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[500]},
    ${({ theme }) => theme.colors.primary[400]}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[600]},
    ${({ theme }) => theme.colors.primary[500]}
  );
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  text-align: center;
`;

const StatItem = styled.div`
  color: ${({ theme }) => theme.colors.text.inverse};
`;

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  opacity: 0.9;
`;

const CTASection = styled.section`
  padding: ${({ theme }) => theme.spacing[20]} 0;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display.join(', ')};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

const CTASubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
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
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  margin: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;
