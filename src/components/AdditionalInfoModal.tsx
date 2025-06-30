import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import {
	initUserAdditionalInfo,
	UserAdditionalInfoRequestDto,
} from "../api/user";
import { useAuth } from "../contexts/AuthContext";

interface AdditionalInfoModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AdditionalInfoModal: React.FC<AdditionalInfoModalProps> = ({
	isOpen,
	onClose,
}) => {
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		nickname: "",
		gender: "MALE" as "MALE" | "FEMALE",
		birthDate: "",
	});

	const initMutation = useMutation({
		mutationFn: initUserAdditionalInfo,
		onSuccess: (data) => {
			// 사용자 정보 업데이트
			login(data);
			alert("사용자 정보가 설정되었습니다!");
			onClose();
		},
		onError: (error: Error) => {
			alert(`설정 실패: ${error.message}`);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.nickname.trim()) {
			alert("닉네임을 입력해주세요.");
			return;
		}

		if (!formData.birthDate) {
			alert("생년월일을 입력해주세요.");
			return;
		}

		const request: UserAdditionalInfoRequestDto = {
			nickname: formData.nickname.trim(),
			gender: formData.gender,
			birthDate: formData.birthDate,
		};

		initMutation.mutate(request);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	if (!isOpen) return null;

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<Title>추가 정보 입력</Title>
				<Subtitle>서비스 이용을 위해 추가 정보를 입력해주세요.</Subtitle>

				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="nickname">닉네임 *</Label>
						<Input
							type="text"
							id="nickname"
							name="nickname"
							value={formData.nickname}
							onChange={handleInputChange}
							placeholder="닉네임을 입력하세요"
							maxLength={20}
							required
						/>
					</FormGroup>

					<FormGroup>
						<Label htmlFor="gender">성별 *</Label>
						<Select
							id="gender"
							name="gender"
							value={formData.gender}
							onChange={handleInputChange}
							required
						>
							<option value="MALE">남성</option>
							<option value="FEMALE">여성</option>
						</Select>
					</FormGroup>

					<FormGroup>
						<Label htmlFor="birthDate">생년월일 *</Label>
						<Input
							type="date"
							id="birthDate"
							name="birthDate"
							value={formData.birthDate}
							onChange={handleInputChange}
							required
						/>
					</FormGroup>

					<ButtonGroup>
						<CancelButton type="button" onClick={onClose}>
							나중에
						</CancelButton>
						<SubmitButton type="submit" disabled={initMutation.isPending}>
							{initMutation.isPending ? "설정 중..." : "설정 완료"}
						</SubmitButton>
					</ButtonGroup>
				</Form>
			</ModalContent>
		</ModalOverlay>
	);
};

export default AdditionalInfoModal;

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
	z-index: 1000;
`;

const ModalContent = styled.div`
	background: white;
	padding: 2rem;
	border-radius: 12px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 400px;
	margin: 1rem;
`;

const Title = styled.h1`
	text-align: center;
	color: #333;
	margin-bottom: 0.5rem;
	font-size: 1.8rem;
`;

const Subtitle = styled.p`
	text-align: center;
	color: #666;
	margin-bottom: 2rem;
	font-size: 0.9rem;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Label = styled.label`
	font-weight: 600;
	color: #333;
	font-size: 0.9rem;
`;

const Input = styled.input`
	padding: 0.75rem;
	border: 1px solid #ddd;
	border-radius: 6px;
	font-size: 1rem;
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.mainGreen};
	}
`;

const Select = styled.select`
	padding: 0.75rem;
	border: 1px solid #ddd;
	border-radius: 6px;
	font-size: 1rem;
	background-color: white;
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.mainGreen};
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;
`;

const CancelButton = styled.button`
	flex: 1;
	padding: 1rem;
	background-color: #f8f9fa;
	color: #666;
	border: 1px solid #ddd;
	border-radius: 6px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #e9ecef;
	}
`;

const SubmitButton = styled.button`
	flex: 1;
	padding: 1rem;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 6px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover:not(:disabled) {
		background-color: ${({ theme }) => theme.buttonColor};
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;
