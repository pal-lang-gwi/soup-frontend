import React from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AdminRouteProps {
	children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
	const { isAuthenticated, isAdmin, loading } = useAuth();
	const navigate = useNavigate();

	if (loading) {
		return <LoadingContainer>로딩 중...</LoadingContainer>;
	}

	if (!isAuthenticated) {
		return <AccessDeniedContainer>로그인이 필요합니다.</AccessDeniedContainer>;
	}

	if (!isAdmin()) {
		return (
			<AccessDeniedContainer>
				<AccessDeniedIcon>🚫</AccessDeniedIcon>
				<AccessDeniedTitle>접근 권한이 없습니다</AccessDeniedTitle>
				<AccessDeniedMessage>
					관리자 권한이 필요한 페이지입니다.
					<br />
					관리자 계정으로 로그인해주세요.
				</AccessDeniedMessage>
				<BackButton onClick={() => navigate("/home")}>
					홈으로 돌아가기
				</BackButton>
			</AccessDeniedContainer>
		);
	}

	return <>{children}</>;
};

export default AdminRoute;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	font-size: 1.2rem;
	color: #666;
`;

const AccessDeniedContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f7fafc;
	padding: 2rem;
	text-align: center;
`;

const AccessDeniedIcon = styled.div`
	font-size: 4rem;
	margin-bottom: 1rem;
`;

const AccessDeniedTitle = styled.h1`
	font-size: 2rem;
	color: #2d3748;
	margin-bottom: 1rem;
`;

const AccessDeniedMessage = styled.p`
	font-size: 1.1rem;
	color: #718096;
	line-height: 1.6;
	margin-bottom: 2rem;
`;

const BackButton = styled.button`
	padding: 0.75rem 1.5rem;
	background-color: #48bb78;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #38a169;
	}
`;
