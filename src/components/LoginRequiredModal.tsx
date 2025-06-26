import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { UI_CONSTANTS } from "../constants/ui";

const LoginRequiredModal: React.FC = () => {
	const navigate = useNavigate();

	const handleClose = () => {
		navigate("/", { replace: true });
	};

	return (
		<>
			<ModalOverlay onClick={handleClose}>
				<ModalContent onClick={(e) => e.stopPropagation()}>
					<ModalHeader>
						<ModalTitle>로그인이 필요합니다</ModalTitle>
						<CloseButton onClick={handleClose}>×</CloseButton>
					</ModalHeader>

					<ModalBody>
						<LoginIcon>🔐</LoginIcon>
						<ModalDescription>
							이 페이지에 접근하려면 로그인이 필요합니다.
							<br />
							아래에서 로그인해주세요.
						</ModalDescription>

						<LoginForm />

						<CancelButton onClick={handleClose}>나중에 하기</CancelButton>
					</ModalBody>
				</ModalContent>
			</ModalOverlay>
		</>
	);
};

export default LoginRequiredModal;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: ${UI_CONSTANTS.Z_INDEX.MODAL_OVERLAY};
`;

const ModalContent = styled.div`
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
	border-radius: 20px;
	border: 1.5px solid rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	width: 90%;
	max-width: 500px;
	max-height: 90vh;
	overflow-y: auto;
	animation: modalSlideIn 0.3s ease-out;

	@keyframes modalSlideIn {
		from {
			opacity: 0;
			transform: translateY(-20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		width: 95%;
		max-width: none;
		margin: 20px;
	}
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem 2rem 1rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 1rem 1.5rem 0.5rem;
	}
`;

const ModalTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 600;
	color: ${({ theme }) => theme.mainColor};
	margin: 0;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 1.3rem;
	}
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	font-size: 1.5rem;
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
		background-color: rgba(0, 0, 0, 0.1);
		color: #333;
	}
`;

const ModalBody = styled.div`
	padding: 1rem 2rem 2rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		padding: 0.5rem 1.5rem 1.5rem;
	}
`;

const LoginIcon = styled.div`
	font-size: 3rem;
	text-align: center;
	margin-bottom: 1rem;
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const ModalDescription = styled.p`
	text-align: center;
	color: #666;
	line-height: 1.6;
	margin-bottom: 2rem;
	font-size: 1rem;

	@media (max-width: ${UI_CONSTANTS.BREAKPOINTS.MOBILE}px) {
		font-size: 0.9rem;
		margin-bottom: 1.5rem;
	}
`;

const CancelButton = styled.button`
	width: 100%;
	padding: 0.8rem;
	background: none;
	border: 1px solid #ddd;
	color: #666;
	border-radius: 8px;
	cursor: pointer;
	font-size: 0.9rem;
	margin-top: 1rem;
	transition: all 0.2s ease;

	&:hover {
		background-color: #f5f5f5;
		border-color: #ccc;
		color: #333;
	}
`;
