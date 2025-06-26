import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Logo from "./Logo";
import SendButton from "./SendButton";
import { UI_CONSTANTS } from "../constants/ui";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const openModal = useCallback(() => setIsModalOpen(true), []);
	const closeModal = useCallback(() => setIsModalOpen(false), []);
	const navigate = useNavigate();
	const { isAuthenticated, logout, isAdmin } = useAuth();

	const handleNavClick = useCallback(
		(path: string) => {
			navigate(path);
			setIsMobileMenuOpen(false);
		},
		[navigate]
	);

	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	}, [isMobileMenuOpen]);

	const handleLogout = useCallback(() => {
		logout();
		window.location.href = "/";
	}, [logout]);

	return (
		<Nav>
			<NavContainer>
				<Logo />

				{/* 데스크톱 네비게이션 */}
				<NavList>
					<NavLink onClick={() => handleNavClick("/news")}>게시판</NavLink>
					<NavLink onClick={() => handleNavClick("/health")}>헬스체크</NavLink>
					{isAuthenticated && isAdmin() && (
						<NavLink onClick={() => handleNavClick("/admin")}>관리자</NavLink>
					)}
				</NavList>

				<ButtonStyle>
					{!isAuthenticated && (
						<SendButton onClick={openModal}>구독하기</SendButton>
					)}
				</ButtonStyle>

				{isAuthenticated && (
					<LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
				)}

				{/* 모바일 햄버거 메뉴 버튼 */}
				<MobileMenuButton
					onClick={toggleMobileMenu}
					isOpen={isMobileMenuOpen}
					aria-label="메뉴 열기/닫기"
				>
					<span></span>
					<span></span>
					<span></span>
				</MobileMenuButton>
			</NavContainer>

			{/* 모바일 메뉴 */}
			<MobileMenu isOpen={isMobileMenuOpen}>
				<MobileMenuHeader>
					<MobileLogo>
						<Logo />
					</MobileLogo>
					<MobileCloseButton onClick={toggleMobileMenu}>
						<span>×</span>
					</MobileCloseButton>
				</MobileMenuHeader>

				<MobileNavLinks>
					<MobileNavLink onClick={() => handleNavClick("/news")}>
						<span>📋</span>
						게시판
					</MobileNavLink>
					<MobileNavLink onClick={() => handleNavClick("/health")}>
						<span>💚</span>
						헬스체크
					</MobileNavLink>
					{isAuthenticated && isAdmin() && (
						<MobileNavLink onClick={() => handleNavClick("/admin")}>
							<span>⚙️</span>
							관리자
						</MobileNavLink>
					)}
				</MobileNavLinks>

				<MobileButtonWrapper>
					{!isAuthenticated && (
						<SendButton onClick={openModal}>구독하기</SendButton>
					)}
					{isAuthenticated && (
						<MobileLogoutButton onClick={handleLogout}>
							로그아웃
						</MobileLogoutButton>
					)}
				</MobileButtonWrapper>
			</MobileMenu>

			{/* 모바일 메뉴 오버레이 */}
			<MobileOverlay isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

			{/* 로그인 모달 */}
			{isModalOpen && (
				<ModalOverlay onClick={closeModal}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<CloseButton onClick={closeModal}>×</CloseButton>
						<LoginForm />
					</ModalContent>
				</ModalOverlay>
			)}
		</Nav>
	);
};

export default Navbar;

const Nav = styled.nav`
	height: ${UI_CONSTANTS.MOBILE_NAVBAR_HEIGHT}px;
	background-color: rgba(255, 255, 255, 0.8);
	display: flex;
	position: fixed;
	align-items: center;
	top: 0px;
	width: 100%;
	padding: 0 2rem;
	box-sizing: border-box;
	z-index: ${UI_CONSTANTS.Z_INDEX.NAVBAR};
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
	box-sizing: border-box;

	@media (max-width: 768px) {
		padding: 0 16px;
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

	&:hover {
		color: ${({ theme }) => theme.mainGreen};
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

const MobileMenuButton = styled.button<{ isOpen: boolean }>`
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
			props.isOpen ? "rotate(45deg) translate(6px, 6px)" : "rotate(0)"};
	}

	span:nth-child(2) {
		opacity: ${(props) => (props.isOpen ? "0" : "1")};
		transform: ${(props) =>
			props.isOpen ? "translateX(-20px)" : "translateX(0)"};
	}

	span:nth-child(3) {
		transform: ${(props) =>
			props.isOpen ? "rotate(-45deg) translate(6px, -6px)" : "rotate(0)"};
	}
`;

const MobileOverlay = styled.div<{ isOpen: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 998;
	opacity: ${(props) => (props.isOpen ? "1" : "0")};
	visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
	transition: all 0.3s ease;

	@media (min-width: 769px) {
		display: none;
	}
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
	position: fixed;
	top: 0;
	right: ${(props) => (props.isOpen ? "0" : "-100%")};
	width: 280px;
	height: 100vh;
	background: rgba(255, 255, 255, 0.18);
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
	border-left: 1.5px solid rgba(255, 255, 255, 0.25);
	box-shadow: -2px 0 10px rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
	transition: right 0.3s ease;
	z-index: 999;

	@media (min-width: 769px) {
		display: none;
	}
`;

const MobileMenuHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid #eee;
`;

const MobileLogo = styled.div`
	display: flex;
	align-items: center;
`;

const MobileCloseButton = styled.button`
	background: none;
	border: none;
	font-size: 24px;
	color: #666;
	cursor: pointer;
	padding: 0;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.2s ease;

	&:hover {
		background-color: #f5f5f5;
		color: #333;
	}
`;

const MobileNavLinks = styled.div`
	flex: 1;
	padding: 20px 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
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
		display: none;
	}
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

const CloseButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	background: none;
	border: none;
	font-size: 24px;
	color: #666;
	cursor: pointer;
	padding: 0;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.2s ease;

	&:hover {
		background-color: #f5f5f5;
		color: #333;
	}
`;
