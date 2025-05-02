import { useState } from "react";
import styled from "styled-components";
import InfoCheck from "../components/InfoCheck";
import Navbar from "../components/Navbar";

function FirstLogin() {
    const [nickname, setNickname] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [gender, setGender] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const NicknameCheck = () => {
        //띄어쓰기만 있는 경우도 거르기
        const trimNickname = nickname.trim();
        //공란이면 닉네임 만들라고 하기
        if(!trimNickname){
            alert("닉네임을 입력해주세요🥲");
            return;
        }
        // TODO: 랜덤 닉네임 생성버튼
        // TODO: 백엔드에서 중복체크하고 응답받기
    }

    const handleSubmit = () => {
        const trimNickname = nickname.trim();
        //데이터 없으면 없다고 에러창 띄우기
        if(!trimNickname || !birthYear || !birthMonth || !birthDay || !gender){
            alert("모든 항목을 입력해주세요🥲");
            return;
        }
        //모달 창 띄워서 한번 더 확인시키기
        setIsModalOpen(true);
    };
    
    return (
        <>
        <Navbar />
        <Background>
        <GradientOverlay />
        <BottomGradient />
        <StyleWrapper>
            <MainMent>추가정보를 입력해주세요!</MainMent>
            <SubMent>당신을 위한 스프를 요리할게요🍽️</SubMent>
            <InputWrapper>
            <Field>
            <Label>닉네임</Label>
                <Input
                    type="text"
                    placeholder="닉네임을 입력해주세요"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <NicknameCheckButton onClick={NicknameCheck}>중복 확인</NicknameCheckButton>
            </Field>

            <Field>
            <Label>생년월일</Label>
                <BirthWrapper>
                    <Select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
                        <option value="">년</option>
                        {Array.from({ length: 106 }, (_, i) => 2025 - i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                    <Select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
                        <option value="">월</option>
                        {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
                        <option value="">일</option>
                        {Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                </BirthWrapper>
            </Field>
            <Field>
                <Label>성별</Label>
                <GenderWrapper>
                    <label>
                        <Radio
                            type="radio"
                            name="gender"
                            value="MALE"
                            checked={gender === 'MALE'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        남자
                    </label>
                    <label>
                        <Radio
                            type="radio"
                            name="gender"
                            value="FEMALE"
                            checked={gender === 'FEMALE'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        여자
                    </label>
                </GenderWrapper>
                </Field>
                <SubmitButton onClick={handleSubmit}>저장하기</SubmitButton>
            </InputWrapper>
        </StyleWrapper>
        </Background>

        {isModalOpen && (
            <ModalOverlay onClick={() => setIsModalOpen(false)}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                <InfoCheck
                    nickname={nickname}
                    birthDate={`${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`}
                    gender={gender}
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={() => {
                        setIsModalOpen(false);
                        // TODO: 백엔드로 전송
                        console.log("전송할 데이터:", {
                        nickname,
                        birthDate: `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`,
                        gender,
                        });
                    }}
                    />
                </ModalContent>
            </ModalOverlay>
        )}
        </>
    );
}

export default FirstLogin;

const Background = styled.div`
    position: relative;
    background-color: white;
    height: 300vh;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.mainColor} 0%,
        #ffffff 100%
    );
    z-index: 0;
`;

const BottomGradient = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: linear-gradient(
    to top,
    ${({ theme }) => theme.mainColor} 0%,
    #ffffff 100%
    );
    z-index: 0;
`;

const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; //TODO: 나중에 스크롤로 수정하기
    padding: 20px;
    position: relative;
    z-index: 1;
`;

const MainMent = styled.div`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 16px;
    text-align: center;
    color: black;
`;

const SubMent = styled.div`
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
    padding-bottom: 50px;
`;
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 350px;
`;
const Field = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Label = styled.div`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid ${({theme}) => theme.mainGreen};
    border-radius: 8px;
`;

const NicknameCheckButton = styled.button`
    color: white;
    cursor: pointer;
    padding: 10px 8px;
    background-color: ${({theme}) => theme.mainGreen};
    border: none;
    border-radius: 8px;
`

const BirthWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

const Select = styled.select`
    flex: 1;
    padding: 10px;
    border: 1px solid ${({theme}) => theme.mainGreen};
    border-radius: 8px;
`;

const GenderWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const Radio = styled.input`
    margin-right: 10px;
`;

const SubmitButton = styled.button`
    margin-top: 20px;
    padding: 12px 24px;
    background-color: ${({theme}) => theme.mainGreen};
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
`;
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    z-index: 1001;
    max-width: 90%;
`;
