import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { theme } from "../styles/theme";
import { UI_CONSTANTS } from "../constants/ui";

const AdminPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState("dashboard");

	// 더미 데이터
	const stats = {
		totalUsers: 1250,
		totalKeywords: 89,
		totalNews: 456,
		activeSubscriptions: 890,
	};

	const recentUsers = [
		{
			id: 1,
			email: "user1@example.com",
			nickname: "사용자1",
			role: "USER",
			joinDate: "2024-01-15",
		},
		{
			id: 2,
			email: "user2@example.com",
			nickname: "사용자2",
			role: "USER",
			joinDate: "2024-01-14",
		},
		{
			id: 3,
			email: "admin@example.com",
			nickname: "관리자",
			role: "ADMIN",
			joinDate: "2024-01-13",
		},
	];

	const recentKeywords = [
		{ id: 1, name: "AI", subscribers: 45, isActive: true },
		{ id: 2, name: "블록체인", subscribers: 32, isActive: true },
		{ id: 3, name: "핀테크", subscribers: 28, isActive: false },
	];

	return (
		<>
			<Navbar />
			<Container>
				<Header>
					<Title>관리자 대시보드</Title>
					<Subtitle>SOUP 서비스 관리 및 모니터링</Subtitle>
				</Header>

				<TabContainer>
					<TabButton
						$active={activeTab === "dashboard"}
						onClick={() => setActiveTab("dashboard")}
					>
						📊 대시보드
					</TabButton>
					<TabButton
						$active={activeTab === "users"}
						onClick={() => setActiveTab("users")}
					>
						👥 사용자 관리
					</TabButton>
					<TabButton
						$active={activeTab === "keywords"}
						onClick={() => setActiveTab("keywords")}
					>
						🔑 키워드 관리
					</TabButton>
					<TabButton
						$active={activeTab === "news"}
						onClick={() => setActiveTab("news")}
					>
						📰 뉴스 관리
					</TabButton>
				</TabContainer>

				<ContentArea>
					{activeTab === "dashboard" && (
						<DashboardTab>
							<StatsGrid>
								<StatCard>
									<StatIcon>👥</StatIcon>
									<StatNumber>{stats.totalUsers.toLocaleString()}</StatNumber>
									<StatLabel>전체 사용자</StatLabel>
								</StatCard>
								<StatCard>
									<StatIcon>🔑</StatIcon>
									<StatNumber>{stats.totalKeywords}</StatNumber>
									<StatLabel>등록된 키워드</StatLabel>
								</StatCard>
								<StatCard>
									<StatIcon>📰</StatIcon>
									<StatNumber>{stats.totalNews.toLocaleString()}</StatNumber>
									<StatLabel>수집된 뉴스</StatLabel>
								</StatCard>
								<StatCard>
									<StatIcon>📧</StatIcon>
									<StatNumber>
										{stats.activeSubscriptions.toLocaleString()}
									</StatNumber>
									<StatLabel>활성 구독</StatLabel>
								</StatCard>
							</StatsGrid>

							<SectionGrid>
								<Section>
									<SectionTitle>최근 가입 사용자</SectionTitle>
									<UserList>
										{recentUsers.map((user) => (
											<UserItem key={user.id}>
												<UserInfo>
													<UserEmail>{user.email}</UserEmail>
													<UserNickname>{user.nickname}</UserNickname>
												</UserInfo>
												<UserRole $role={user.role}>
													{user.role === "ADMIN" ? "관리자" : "일반"}
												</UserRole>
												<UserDate>{user.joinDate}</UserDate>
											</UserItem>
										))}
									</UserList>
								</Section>

								<Section>
									<SectionTitle>인기 키워드</SectionTitle>
									<KeywordList>
										{recentKeywords.map((keyword) => (
											<KeywordItem key={keyword.id}>
												<KeywordInfo>
													<KeywordName>{keyword.name}</KeywordName>
													<KeywordSubscribers>
														구독자 {keyword.subscribers}명
													</KeywordSubscribers>
												</KeywordInfo>
												<KeywordStatus $active={keyword.isActive}>
													{keyword.isActive ? "활성" : "비활성"}
												</KeywordStatus>
											</KeywordItem>
										))}
									</KeywordList>
								</Section>
							</SectionGrid>
						</DashboardTab>
					)}

					{activeTab === "users" && (
						<UsersTab>
							<SectionTitle>사용자 관리</SectionTitle>
							<ComingSoon>사용자 관리 기능은 준비 중입니다.</ComingSoon>
						</UsersTab>
					)}

					{activeTab === "keywords" && (
						<KeywordsTab>
							<SectionTitle>키워드 관리</SectionTitle>
							<ComingSoon>키워드 관리 기능은 준비 중입니다.</ComingSoon>
						</KeywordsTab>
					)}

					{activeTab === "news" && (
						<NewsTab>
							<SectionTitle>뉴스 관리</SectionTitle>
							<ComingSoon>뉴스 관리 기능은 준비 중입니다.</ComingSoon>
						</NewsTab>
					)}
				</ContentArea>
			</Container>
		</>
	);
};

export default AdminPage;

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
`;

const Header = styled.div`
	text-align: center;
	margin-bottom: 3rem;
`;

const Title = styled.h1`
	font-size: 2.5rem;
	color: ${theme.mainColor};
	margin-bottom: 0.5rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 2rem;
	}
`;

const Subtitle = styled.p`
	font-size: 1.2rem;
	color: #666;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1rem;
	}
`;

const TabContainer = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 2rem;
	border-bottom: 2px solid #e2e8f0;
	padding-bottom: 1rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		flex-wrap: wrap;
		gap: 0.5rem;
	}
`;

const TabButton = styled.button<{ $active: boolean }>`
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 8px;
	background-color: ${({ $active }) =>
		$active ? theme.mainGreen : "transparent"};
	color: ${({ $active }) => ($active ? "white" : "#666")};
	cursor: pointer;
	font-weight: ${({ $active }) => ($active ? "600" : "400")};
	transition: all 0.2s ease;

	&:hover {
		background-color: ${({ $active }) =>
			$active ? theme.mainGreen : "#f7fafc"};
	}

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
	}
`;

const ContentArea = styled.div`
	background-color: white;
	border-radius: 12px;
	padding: 2rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 1rem;
	}
`;

const DashboardTab = styled.div``;

const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1.5rem;
	margin-bottom: 3rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
`;

const StatCard = styled.div`
	background: linear-gradient(135deg, ${theme.mainGreen}, #5a9c6b);
	color: white;
	padding: 1.5rem;
	border-radius: 12px;
	text-align: center;
	box-shadow: 0 4px 12px rgba(72, 187, 120, 0.2);
`;

const StatIcon = styled.div`
	font-size: 2rem;
	margin-bottom: 0.5rem;
`;

const StatNumber = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
	font-size: 0.9rem;
	opacity: 0.9;
`;

const SectionGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
`;

const Section = styled.div``;

const SectionTitle = styled.h2`
	font-size: 1.5rem;
	color: #2d3748;
	margin-bottom: 1rem;
	border-bottom: 2px solid #e2e8f0;
	padding-bottom: 0.5rem;
`;

const UserList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

const UserItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem;
	background-color: #f7fafc;
	border-radius: 8px;
	border: 1px solid #e2e8f0;
`;

const UserInfo = styled.div`
	flex: 1;
`;

const UserEmail = styled.div`
	font-weight: 500;
	color: #2d3748;
	font-size: 0.9rem;
`;

const UserNickname = styled.div`
	color: #718096;
	font-size: 0.8rem;
	margin-top: 0.25rem;
`;

const UserRole = styled.span<{ $role: string }>`
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 500;
	background-color: ${({ $role }) =>
		$role === "ADMIN" ? "#fed7d7" : "#c6f6d5"};
	color: ${({ $role }) => ($role === "ADMIN" ? "#c53030" : "#22543d")};
	margin: 0 0.5rem;
`;

const UserDate = styled.div`
	color: #a0aec0;
	font-size: 0.8rem;
`;

const KeywordList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

const KeywordItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem;
	background-color: #f7fafc;
	border-radius: 8px;
	border: 1px solid #e2e8f0;
`;

const KeywordInfo = styled.div`
	flex: 1;
`;

const KeywordName = styled.div`
	font-weight: 500;
	color: #2d3748;
`;

const KeywordSubscribers = styled.div`
	color: #718096;
	font-size: 0.8rem;
	margin-top: 0.25rem;
`;

const KeywordStatus = styled.span<{ $active: boolean }>`
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 500;
	background-color: ${({ $active }) => ($active ? "#c6f6d5" : "#fed7d7")};
	color: ${({ $active }) => ($active ? "#22543d" : "#c53030")};
`;

const UsersTab = styled.div``;
const KeywordsTab = styled.div``;
const NewsTab = styled.div``;

const ComingSoon = styled.div`
	text-align: center;
	padding: 3rem;
	color: #718096;
	font-size: 1.1rem;
`;
