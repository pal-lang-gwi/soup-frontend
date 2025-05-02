import styled from 'styled-components';
import Logo from './Logo';

interface InfoCheckProps {
    nickname: string;
    birthDate: string;
    gender: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const InfoCheck = ({ nickname, birthDate, gender, onConfirm, onCancel }: InfoCheckProps) => {

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
                    <ValueText>{gender === 'MALE' ? '남자' : '여자'}</ValueText>
                </InfoRow>
            </div>
            <ButtonGroup>
                <CancelButton onClick={onCancel}>취소</CancelButton>
                <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
            </ButtonGroup>
        </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
.container {
    max-width: 350px;
    background:rgba(248, 249, 253, 0.89);
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(248, 232, 193, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px;
}

.heading {
    text-align: center;
    font-weight: 900;
    font-size: 20px;
    color: ${({theme})=> theme.mainGreen};
}

.info-box {
    margin-top: 30px;
    font-size: 16px;
    line-height: 1.6;
    color: #333;


}`;
const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding-bottom: 3px;
    border-bottom: 1px dashed ${({theme}) => theme.buttonColor};
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
    background: linear-gradient(45deg, #C2D869 0%, #dceda3 100%);
    color: white;
    padding: 12px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        transform: scale(1.03);
        box-shadow: rgba(194, 216, 105, 0.6) 0px 12px 10px -8px;
    }

    &:active {
        transform: scale(0.95);
    }
`;

const CancelButton = styled.button`
    flex: 1;
    font-weight: bold;
    background: linear-gradient(45deg, #F8E8C1 0%, #fff3df 100%);
    color: black;
    padding: 12px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        transform: scale(1.03);
        box-shadow: rgba(248, 232, 193, 0.6) 0px 12px 10px -8px;
    }

    &:active {
        transform: scale(0.95);
    }
`;


export default InfoCheck;
