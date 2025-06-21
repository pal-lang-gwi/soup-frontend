import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import ConfettiEffect from "../components/ConfettiEffect";
import InfoCheck from "../components/InfoCheck";
import KeywordSelect from "../components/KeywordSelect";
import Navbar from "../components/Navbar";
import { initFirstUser, validateNickname } from "../api/user/user";

function FirstLogin() {
    const [nickname, setNickname] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [gender, setGender] = useState('');

    //정보 확인 모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    //닉네임 중복 검사 유무
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);

    const NicknameCheck = async () => {
        //띄어쓰기만 있는 경우도 거르기
        const trimNickname = nickname.trim();
        //공란이면 닉네임 만들라고 하기
        if(!trimNickname){
            alert("닉네임을 입력해주세요🥲");
            return;
        }
        // TODO: 랜덤 닉네임 생성버튼

        // 닉네임 중복체크
        try {
            const availableNickname = await validateNickname({ nickname: trimNickname });
            if (!availableNickname) {
                alert("이미 사용 중인 닉네임입니다 😢");
                setIsNicknameChecked(false);
            } else {
                alert("사용 가능한 닉네임입니다 😊");
                setIsNicknameChecked(true);
            }
        } catch (error) {
            //닉네임이 규칙에 맞지 않을 경우
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("알 수 없는 에러가 발생했습니다.");
            }
            setIsNicknameChecked(false);
        }
    
    }

    const handleSubmit = () => {
        const trimNickname = nickname.trim();
        //데이터 없으면 없다고 에러창 띄우기
        if(!trimNickname || !birthYear || !birthMonth || !birthDay || !gender){
            alert("모든 항목을 입력해주세요🥲");
            return;
        }

        // 닉네임 중복 확인이 되어있지 않은 경우 에러창 띄우기
        if (!isNicknameChecked) {
            alert("닉네임 중복 확인을 먼저 해주세요🥲");
            return;
        }

        //모달 창 띄워서 한번 더 확인시키기
        setIsModalOpen(true);
    };

    //키워드 스크롤
    const keywordRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const welcomeRef = useRef<HTMLDivElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isKeywordSelected, setIsKeywordSelected] = useState(false);

    //완료 시 홈으로 돌아가기
    const navigate = useNavigate();
    const handleDone = () => {
        if (!isSubmitted) {
            alert("정보를 입력해주세요 🥲");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!isKeywordSelected) {
            alert("키워드를 등록하지 않으셨어요!\n키워드는 나중에 수정이 가능해요!😊");
            keywordRef.current?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        navigate('/');
        window.scrollTo(0, 0)
    }
    //컨페티
    const [fireTrigger, setFireTrigger] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setFireTrigger(true);
            }
        },
        { threshold: 0.5 } // 50% 이상 보여질 때 발사
        );
    
        if (welcomeRef.current) {
        observer.observe(welcomeRef.current);
        }
    
        return () => {
        if (welcomeRef.current) {
            observer.unobserve(welcomeRef.current);
        }
        };
    }, []);

    //닉네임을 바꿨을 때 isNicknameChecked를 다시 false로 바꿔주기기
    useEffect(() => {
        setIsNicknameChecked(false);
    }, [nickname]);

    return (
        <>
        <Navbar />
        <Background isSubmitted={isSubmitted} ref={containerRef}>
        <GradientOverlay />
        <BottomGradient />
        {/* <StyleWrapper> */}
            <Section>
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
            </Section>
            <Section>
            <div ref={keywordRef}>
                <KeyWordSection>
            <KeywordSelect
                scrollToNextRef={welcomeRef}
                onKeywordSelected={() => {
                    console.log("onKeywordSelected called!");
                    setIsKeywordSelected(true);
                }}
            />
            </KeyWordSection>
            </div>
            </Section>
            <Section ref ={welcomeRef}>
                {/* 컨페티 터지게 */}
                <ConfettiEffect fireTrigger={fireTrigger} />
                <h2>가입이 완료되었습니다!</h2>
                <h4>내일부터 메일이 발송될거에요</h4>
                <HomeButtonWrapper onClick={handleDone}>홈으로 돌아가기
                    <HoverEffect>
                        <div />
                    </HoverEffect>
                </HomeButtonWrapper>
            </Section>
        {/* </StyleWrapper> */}
        </Background>

        {isModalOpen && (
            <ModalOverlay onClick={() => setIsModalOpen(false)}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                <InfoCheck
                    nickname={nickname}
                    birthDate={`${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`}
                    gender={gender}
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={async () => {
                        setIsModalOpen(false);

                        const birthDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
                        try {
                            await initFirstUser({
                                nickname,
                                birthDate,
                                gender
                            })

                            console.log("전송할 데이터:", {
                            nickname,
                            birthDate: `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`,
                            gender,
                        });
                        setIsSubmitted(true);
                        console.log("초기 유저 정보 전송 완료");

                        //키워드 선택 쪽으로 자동 스크롤
                        setTimeout(() => {
                            keywordRef.current?.scrollIntoView({ behavior: 'smooth'});
                        }, 100);
                        } catch (error) {
                            if (error instanceof Error) {
                                alert(`전송 실패 : ${error.message}`);
                            }
                        }
                    }}
                    />
                </ModalContent>
            </ModalOverlay>
        )}

        
        </>
    );
}

export default FirstLogin;

const Background = styled.div<{ isSubmitted: boolean }>`
    position: relative;
    background-color: white;
    height: 300vh;
    overflow-y: ${({ isSubmitted }) => (isSubmitted ? "auto" : "hidden")};
    scroll-behavior: smooth;
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

const Section = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1,
`;

// const StyleWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
//     padding: 20px;
//     position: relative;
//     z-index: 1;
// `;

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

const KeyWordSection = styled.div`
    margin-top: 30%;
`

const HomeButtonWrapper = styled.button`
    margin-top: 10%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 30px;
    border: 0;
    position: relative;
    overflow: hidden;
    border-radius: 10rem;
    transition: all 0.02s;
    font-weight: bold;
    cursor: pointer;
    color: rgb(37, 37, 37);
    z-index: 0;
    box-shadow: 0 0px 7px -5px rgba(0, 0, 0, 0.5);

    &:hover {
        background: rgb(248, 232, 193);
        color: rgb(33, 0, 85);
    }

    &:active {
        transform: scale(0.97);
    }
`;

const HoverEffect = styled.div`
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    div {
        background: linear-gradient(
        90deg,
        rgba(253, 218, 110, 1) 0%,
        rgba(194, 216, 105,1) 49%,
        rgba(248, 232, 193, 1) 100%
        );
        border-radius: 40rem;
        width: 10rem;
        height: 10rem;
        transition: 0.4s;
        filter: blur(20px);
        animation: effect infinite 3s linear;
        opacity: 0.5;
    }

    ${HomeButtonWrapper}:hover & div {
        width: 8rem;
        height: 8rem;
    }

    @keyframes effect {
        0% {
        transform: rotate(0deg);
        }

        100% {
        transform: rotate(360deg);
        }
    }
`;