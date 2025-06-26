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
				// URL 파라미터에서 토큰과 사용자 정보 확인
				const token = searchParams.get("token");
				const userInfo = searchParams.get("user");

				if (!token) {
					setError("로그인 토큰이 없습니다.");
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
				// 토큰을 로컬 스토리지에 저장
				localStorage.setItem("accessToken", token);

				// 사용자 정보가 있으면 파싱하여 저장
				if (userInfo) {
					try {
						const userData = JSON.parse(decodeURIComponent(userInfo));
						login(userData);
					} catch (parseError) {
						console.error("사용자 정보 파싱 실패:", parseError);
						// 기본 사용자 정보 생성
						login({ id: "user", email: "user@example.com" });
					}
				} else {
					// 기본 사용자 정보로 로그인
					login({ id: "user", email: "user@example.com" });
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
