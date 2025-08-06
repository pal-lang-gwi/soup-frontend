import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SendButton from "./SendButton";
import { UI_CONSTANTS } from "../constants/ui";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const navigate = useNavigate();
	const { isAuthenticated, user, logout } = useAuth();

	const isAdmin = user === "ADMIN";

	const handleNavClick = (path: string) => {
		navigate(path);
		setIsMobileMenuOpen(false);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<Nav>
			<NavContainer>
				<Logo />

				{/* 데스크톱 네비게이션 */}
				<NavList>
					{/* <NavLink onClick={() => handleNavClick("/my-news")}>나의 뉴스 조회</NavLink> */}
					{isAdmin && (
						<>
							<NavLink onClick={() => handleNavClick("/health")}>헬스체크</NavLink>
							<NavLink onClick={() => handleNavClick("/admin")}>관리자</NavLink>
						</>
					)}
				</NavList>

				<ButtonStyle>
					{isAuthenticated && (
						<>
						<NavLink onClick={() => handleNavClick("/mypage")}>마이페이지</NavLink>
						<LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
						</>
					)}
					{!isAuthenticated && <SendButton onClick={openModal}>구독하기</SendButton>}
				</ButtonStyle>


				{/* 모바일 햄버거 메뉴 버튼 */}
				<MobileMenuButton
					onClick={toggleMobileMenu}
					$isOpen={isMobileMenuOpen}
					aria-label="메뉴 열기/닫기"
				>
					<span></span>
					<span></span>
					<span></span>
				</MobileMenuButton>
			</NavContainer>

			{/* 모바일 메뉴 */}
			<MobileMenu $isOpen={isMobileMenuOpen}>
				<MobileMenuHeader>
					<MobileLogo>
						<Logo />
					</MobileLogo>
					<MobileCloseButton onClick={toggleMobileMenu}>
						<span>×</span>
					</MobileCloseButton>
				</MobileMenuHeader>

				<MobileNavLinks>
					<MobileNavLink onClick={() => handleNavClick("/my-news")}> <span>📄</span> 나의 뉴스 조회 </MobileNavLink>
					<MobileNavLink onClick={() => handleNavClick("/mypage")}> <span>👤</span> 마이페이지 </MobileNavLink>
					{isAdmin && (
						<>
							<MobileNavLink onClick={() => handleNavClick("/health")}> <span>💚</span> 헬스체크 </MobileNavLink>
							<MobileNavLink onClick={() => handleNavClick("/admin")}> <span>⚙️</span> 관리자 </MobileNavLink>
						</>
					)}
				</MobileNavLinks>

				<MobileButtonWrapper>
					{isAuthenticated ? (
						<MobileLogoutButton onClick={handleLogout}>로그아웃</MobileLogoutButton>
					) : (
						<SendButton onClick={openModal}>구독하기</SendButton>
					)}
				</MobileButtonWrapper>
			</MobileMenu>

			{/* 로그인 모달 */}
			{isModalOpen && (
				<ModalOverlay onClick={closeModal}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<LoginForm />
					</ModalContent>
				</ModalOverlay>
			)}
		</Nav>
	);
};

export default Navbar;

const Nav = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(20px);
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	z-index: 1000;
	padding: 0 24px;
	
	@media (max-width: 768px) {
		padding: 0 16px;
	}
	
	@media (max-width: 480px) {
		padding: 0 12px;
	}
`;

const NavContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80px;
	
	@media (max-width: 768px) {
		height: 60px;
	}
	
	@media (max-width: 480px) {
		height: 50px;
	}
`;

const Logo = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
	color: ${({ theme }) => theme.mainGreen};
	cursor: pointer;
	
	@media (max-width: 768px) {
		font-size: 1.3rem;
	}
	
	@media (max-width: 480px) {
		font-size: 1.2rem;
	}
`;

const NavList = styled.div`
	display: flex;
	gap: 30px;
	margin-left: 2rem;
	align-items: center;

	@media (max-width: 768px) {
		display: none;
	}
`;

const NavLink = styled.button`
	background: none;
	border: none;
	font-size: 1rem;
	color: #333;
	cursor: pointer;
	padding: 8px 12px;
	transition: background-color 0.2s ease;
	position: relative;
	
	&:hover {
		color: ${({ theme }) => theme.mainGreen};
	}
	
	&::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		right: 0;
		height: 2px;
		background: ${({ theme }) => theme.mainGreen};
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}
	
	&:hover::after {
		transform: scaleX(1);
	}
	
	@media (max-width: 768px) {
		font-size: 0.9rem;
	}
	
	@media (max-width: 480px) {
		font-size: 0.85rem;
	}
`;

const ButtonStyle = styled.div`
	margin-left: auto;

	button {
		padding: 10px 15px;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		display: none;
	}
`;

const LogoutButton = styled.button`
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 6px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${({ theme }) => theme.buttonColor};
	}

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 0.4rem 0.8rem;
		font-size: 0.8rem;
	}
`;

const MobileMenuButton = styled.button<{ $isOpen: boolean }>`
	display: none;
	flex-direction: column;
	justify-content: space-around;
	width: 30px;
	height: 30px;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	margin-left: auto;
	transition: all 0.3s ease;

	@media (max-width: 768px) {
		display: flex;
	}

	span {
		width: 100%;
		height: 3px;
		background-color: #333;
		border-radius: 2px;
		transition: all 0.3s ease;
		transform-origin: center;
	}

	span:nth-child(1) {
		transform: ${(props) =>
			props.$isOpen ? "rotate(45deg) translate(6px, 6px)" : "rotate(0)"};
	}

	span:nth-child(2) {
		opacity: ${(props) => (props.$isOpen ? "0" : "1")};
		transform: ${(props) =>
			props.$isOpen ? "translateX(-20px)" : "translateX(0)"};
	}

	span:nth-child(3) {
		transform: ${(props) =>
			props.$isOpen ? "rotate(-45deg) translate(6px, -6px)" : "rotate(0)"};
	}
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: white;
	z-index: 1001;
	transform: ${(props) => (props.$isOpen ? "translateX(0)" : "translateX(100%)")};
	transition: transform 0.3s ease-in-out;
	display: flex;
	flex-direction: column;
`;

const MobileMenuHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid #eee;
`;

const MobileLogo = styled.div`
	font-size: 1.2rem;
	font-weight: 700;
	color: ${({ theme }) => theme.mainGreen};
`;

const MobileCloseButton = styled.button`
	background: none;
	border: none;
	font-size: 2rem;
	cursor: pointer;
	color: #666;
	padding: 0;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #f5f5f5;
	}
`;

const MobileNavLinks = styled.div`
	flex: 1;
	padding: 20px 0;
`;

const MobileNavLink = styled.button`
	background: none;
	border: none;
	font-size: 1.1rem;
	color: #333;
	cursor: pointer;
	padding: 16px 20px;
	transition: all 0.2s ease;
	text-align: left;
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;

	span:first-child {
		font-size: 1.2rem;
		width: 24px;
		text-align: center;
	}

	&:hover {
		color: ${({ theme }) => theme.mainGreen};
		background-color: rgba(72, 187, 120, 0.1);
	}

	&:active {
		background-color: rgba(72, 187, 120, 0.2);
	}
`;

const MobileButtonWrapper = styled.div`
	padding: 20px;
	border-top: 1px solid #eee;

	button {
		width: 100%;
		padding: 12px 20px;
		font-size: 1rem;
		min-height: 48px;
	}
`;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: ${UI_CONSTANTS.Z_INDEX.MODAL_OVERLAY};
`;

const ModalContent = styled.div`
	background-color: white;
	border-radius: 12px;
	padding: 30px;
	z-index: ${UI_CONSTANTS.Z_INDEX.MODAL_CONTENT};
	width: 400px;
	max-width: 60vw;
	max-height: 80vh;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const MobileLogoutButton = styled.button`
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 6px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${({ theme }) => theme.buttonColor};
	}

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 0.4rem 0.8rem;
		font-size: 0.8rem;
	}
`;
