import styled from "styled-components";
import Logo from "./Logo";

interface InfoCheckProps {
	nickname: string;
	birthDate: string;
	gender: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const InfoCheck = ({
	nickname,
	birthDate,
	gender,
	onConfirm,
	onCancel,
}: InfoCheckProps) => {
	return (
		<StyledWrapper>
			<div className="container">
				<Logo />
				<div className="heading">아래 정보가 맞으세요?</div>
				<div className="info-box">
					<InfoRow>
						<LabelText>닉네임:</LabelText>
						<ValueText>{nickname}</ValueText>
					</InfoRow>
					<InfoRow>
						<LabelText>생년월일:</LabelText>
						<ValueText>{birthDate}</ValueText>
					</InfoRow>
					<InfoRow>
						<LabelText>성별:</LabelText>
						<ValueText>{gender === "MALE" ? "남자" : "여자"}</ValueText>
					</InfoRow>
				</div>
				<ButtonGroup>
					<CancelButton onClick={onCancel}>취소</CancelButton>
					<ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
				</ButtonGroup>
			</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.container {
		max-width: 350px;
		background: white;
		border-radius: 40px;
		padding: 25px 35px;
		border: 2px solid #e0e0e0;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		margin: 20px;
	}

	.heading {
		text-align: center;
		font-weight: 900;
		font-size: 20px;
		color: ${({ theme }) => theme.mainGreen};
	}

	.info-box {
		margin-top: 30px;
		font-size: 16px;
		line-height: 1.6;
		color: #333;
	}
`;
const InfoRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
	padding-bottom: 3px;
	border-bottom: 1px dashed #e0e0e0;
`;

const LabelText = styled.div`
	text-align: right;
	font-weight: 600;
	width: 100px;
`;

const ValueText = styled.div`
	text-align: left;
	flex: 1;
	padding-left: 12px;
	word-break: break-word;
`;
const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
	margin-top: 20px;
`;

const ConfirmButton = styled.button`
	flex: 1;
	font-weight: bold;
	background: ${({ theme }) => theme.mainGreen};
	color: white;
	padding: 12px;
	border-radius: 20px;
	border: none;
	cursor: pointer;
	transition: 0.2s ease-in-out;

	&:hover {
		transform: scale(1.03);
		background: ${({ theme }) => theme.buttonColor};
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	&:active {
		transform: scale(0.95);
	}
`;

const CancelButton = styled.button`
	flex: 1;
	font-weight: bold;
	background: #f8f9fa;
	color: #333;
	padding: 12px;
	border-radius: 20px;
	border: 1px solid #e0e0e0;
	cursor: pointer;
	transition: 0.2s ease-in-out;

	&:hover {
		transform: scale(1.03);
		background: #e9ecef;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
	}

	&:active {
		transform: scale(0.95);
	}
`;

export default InfoCheck;
