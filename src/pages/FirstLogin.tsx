import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

function FirstLogin() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { login } = useAuth();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const processLogin = async () => {
			try {
				// URL 파라미터에서 사용자 정보 확인
				const userInfo = searchParams.get("user");

				if (!userInfo) {
					setError("사용자 정보가 없습니다.");
					return;
				}

				// 사용자 정보 파싱
				try {
					const userData = JSON.parse(decodeURIComponent(userInfo));
					login(userData);
				} catch (parseError) {
					console.error("사용자 정보 파싱 실패:", parseError);
					// 기본 사용자 정보 생성
					login({ id: "user", email: "user@example.com", role: "USER" });
				}

				// 로그인 성공 후 홈페이지로 리다이렉트
				setTimeout(() => {
					navigate("/home", { replace: true });
				}, 1000);
			} catch (error) {
				console.error("로그인 처리 실패:", error);
				setError("로그인 처리 중 오류가 발생했습니다.");
			}
		};

		processLogin();
	}, [searchParams, login, navigate]);

	if (error) {
		return (
			<Container>
				<ErrorCard>
					<ErrorIcon>❌</ErrorIcon>
					<ErrorTitle>로그인 실패</ErrorTitle>
					<ErrorMessage>{error}</ErrorMessage>
					<RetryButton onClick={() => (window.location.href = "/")}>
						다시 시도
					</RetryButton>
				</ErrorCard>
			</Container>
		);
	}

	return (
		<Container>
			<WelcomeCard>
				<WelcomeIcon>🎉</WelcomeIcon>
				<WelcomeTitle>SOUP에 오신 것을 환영합니다!</WelcomeTitle>
				<WelcomeSubtitle>
					로그인이 완료되었습니다. 곧 홈페이지로 이동합니다.
				</WelcomeSubtitle>
				<LoadingSpinner />
			</WelcomeCard>
		</Container>
	);
}

export default FirstLogin;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const ErrorCard = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	text-align: center;
`;

const ErrorIcon = styled.div`
	font-size: 2rem;
	margin-bottom: 10px;
`;

const ErrorTitle = styled.h1`
	font-size: 1.5rem;
	margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
	margin-bottom: 20px;
`;

const RetryButton = styled.button`
	padding: 10px 20px;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
`;

const WelcomeCard = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	text-align: center;
`;

const WelcomeIcon = styled.div`
	font-size: 2rem;
	margin-bottom: 10px;
`;

const WelcomeTitle = styled.h1`
	font-size: 1.5rem;
	margin-bottom: 10px;
`;

const WelcomeSubtitle = styled.p`
	margin-bottom: 20px;
`;

const LoadingSpinner = styled.div`
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-top: 4px solid ${({ theme }) => theme.mainGreen};
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;
	margin: 0 auto;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
