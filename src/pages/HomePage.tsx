import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import SendButton from "../components/SendButton";
import { UI_CONSTANTS } from "../constants/ui";
import { useAuth } from "../contexts/AuthContext"; // ✅ 추가
import GoogleHome from "../components/GoogleHome";

function HomePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const { isAuthenticated } = useAuth(); // ✅ 로그인 상태

	return (
		<>
			<Navbar />
			<PageContainer>
				{/* ───────── 로그인 X : 기존 웰컴 ───────── */}
				{!isAuthenticated && (
					<WelcomeSection>
						<WelcomeContent>
							<WelcomeTitle>SOUP에 오신 것을 환영합니다! 🍲</WelcomeTitle>
							<WelcomeSubtitle>
								매일 업데이트되는 뉴스를 이메일로 받아보세요 <br />
								관심 있는 키워드를 구독하고 맞춤형 뉴스를 만나보세요!
							</WelcomeSubtitle>
							<ButtonStyle>
								<SendButton onClick={openModal}>시작하기</SendButton>
							</ButtonStyle>
						</WelcomeContent>
					</WelcomeSection>
				)}

				{isAuthenticated && <GoogleHome />}
			</PageContainer>

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

/* ──────────────────
   기존 스타일 모두 그대로
────────────────── */

const PageContainer = styled.div`
	position: relative;
	background-color: #f8f9fa;
	overflow: hidden;
`;

const WelcomeSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	position: relative;
	z-index: 1;
	padding: 20px;
	box-sizing: border-box;
	background: rgba(255, 255, 255, 0.18);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border-radius: 18px;
	border: 1.5px solid rgba(255, 255, 255, 0.25);
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 16px;
		min-height: calc(100vh - ${UI_CONSTANTS.NAVBAR_HEIGHT}px);
	}
`;

const WelcomeContent = styled.div`
	font-family: ${({ theme }) => theme.mainFont};
	text-align: center;
	max-width: 800px;
	width: 100%;
	background: rgba(255, 255, 255, 0.18);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border-radius: 18px;
	border: 1.5px solid rgba(255, 255, 255, 0.18);
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
	padding: 2rem 1rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		max-width: 100%;
	}
`;

const WelcomeTitle = styled.h1`
	font-size: 2.5rem;
	margin-bottom: 1rem;
	line-height: 1.3;
	color: #2c3e50;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1.8rem;
		line-height: 1.4;
	}

	@media (max-width: 480px) {
		font-size: 1.5rem;
	}
`;

const WelcomeSubtitle = styled.div`
	font-family: ${({ theme }) => theme.mainFont};
	text-align: center;
	font-size: 1.2rem;
	line-height: 1.6;
	margin-bottom: 2rem;
	color: #34495e;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1rem;
		line-height: 1.5;
		margin-bottom: 1.5rem;
	}

	@media (max-width: 480px) {
		font-size: 0.9rem;
	}
`;

const ButtonStyle = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 3vh;
	margin-bottom: 4vh;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		margin-top: 2vh;
		margin-bottom: 3vh;
	}
`;

const FeatureSection = styled.div<{ $variant?: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	position: relative;
	z-index: 1;
	padding: 20px;
	box-sizing: border-box;
	background: ${({ $variant }) => {
		switch ($variant) {
			case "news":
				return "rgba(255, 255, 255, 0.18)";
			case "search":
				return "rgba(72, 187, 120, 0.1)";
			case "email":
				return "rgba(52, 152, 219, 0.1)";
			default:
				return "rgba(255, 255, 255, 0.18)";
		}
	}};
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border-radius: 18px;
	border: 1.5px solid rgba(255, 255, 255, 0.25);
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 16px;
		min-height: calc(100vh - ${UI_CONSTANTS.NAVBAR_HEIGHT}px);
	}
`;

const FeatureContent = styled.div`
	text-align: center;
	padding: 3rem 2rem;
	background: rgba(255, 255, 255, 0.15);
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	width: 100%;
	max-width: 500px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
	}

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 2rem 1.5rem;
		max-width: 100%;
	}
`;

const FeatureIcon = styled.div`
	font-size: 4rem;
	margin-bottom: 1.5rem;
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 3rem;
		margin-bottom: 1rem;
	}
`;

const FeatureTitle = styled.h3`
	font-size: 1.8rem;
	font-weight: 700;
	color: ${({ theme }) => theme.mainColor};
	margin-bottom: 1rem;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1.5rem;
	}
`;

const FeatureDescription = styled.p`
	font-size: 1.2rem;
	color: #555;
	line-height: 1.6;
	font-weight: 400;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1rem;
	}
`;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: ${UI_CONSTANTS.Z_INDEX.MODAL_OVERLAY};
`;

const ModalContent = styled.div`
	background: rgba(255, 255, 255, 0.18);
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
	border-radius: 18px;
	border: 1.5px solid rgba(255, 255, 255, 0.25);
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
	z-index: ${UI_CONSTANTS.Z_INDEX.MODAL_CONTENT};
	width: 400px;
	max-width: 90vw;
	max-height: 80vh;
	padding: 30px;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 20px;
		margin: 20px;
		width: calc(100vw - 40px);
	}
`;
