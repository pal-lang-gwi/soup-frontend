import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import ConfettiEffect from "../components/ConfettiEffect";
import KeywordSelect from "../components/KeywordSelect";
import InfoCheck from "../components/InfoCheck";
import { initFirstUser, validateNickname } from "../api/user/user";

function FirstLogin() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { login } = useAuth();
	const [error, setError] = useState<string | null>(null);

	// 상태 관리
	const [nickname, setNickname] = useState("");
	const [birthYear, setBirthYear] = useState("");
	const [birthMonth, setBirthMonth] = useState("");
	const [birthDay, setBirthDay] = useState("");
	const [gender, setGender] = useState("");
	const [isNicknameChecked, setIsNicknameChecked] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isKeywordSelected, setIsKeywordSelected] = useState(false);
	const [fireTrigger, setFireTrigger] = useState(false);

	// refs
	const keywordRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const welcomeRef = useRef<HTMLDivElement>(null);

	// URL 파라미터 처리
	useEffect(() => {
		const processLogin = async () => {
			try {
				const token = searchParams.get("token");
				const userInfo = searchParams.get("user");

				if (!token) {
					setError("로그인 토큰이 없습니다.");
					return;
				}

				// HttpOnly 쿠키는 서버에서 자동으로 설정됨
				// localStorage.setItem("accessToken", token); // 제거

				// 사용자 정보가 있으면 파싱하여 저장
				if (userInfo) {
					try {
						const userData = JSON.parse(decodeURIComponent(userInfo));
						login(userData);
					} catch (parseError) {
						console.error("사용자 정보 파싱 실패:", parseError);
						login({
							id: "user",
							email: "user@example.com",
							username: "user",
							nickname: "사용자",
							role: "USER" as const,
							gender: "MALE" as const,
							birthDate: "1990-01-01",
							providerId: "local",
							profileImageUrl: "",
							userKeywords: { userKeywordList: [] },
						});
					}
				} else {
					login({
						id: "user",
						email: "user@example.com",
						username: "user",
						nickname: "사용자",
						role: "USER" as const,
						gender: "MALE" as const,
						birthDate: "1990-01-01",
						providerId: "local",
						profileImageUrl: "",
						userKeywords: { userKeywordList: [] },
					});
				}
			} catch (error) {
				console.error("로그인 처리 실패:", error);
				setError("로그인 처리 중 오류가 발생했습니다.");
			}
		};

		processLogin();
	}, [searchParams, login]);

	// 닉네임 중복 확인
	const NicknameCheck = async () => {
		if (!nickname.trim()) {
			alert("닉네임을 입력해주세요.");
			return;
		}

		try {
			const isValid = await validateNickname({ nickname: nickname.trim() });
			if (isValid) {
				alert("사용 가능한 닉네임입니다! 😊");
				setIsNicknameChecked(true);
			} else {
				alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.");
				setIsNicknameChecked(false);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(`닉네임 확인 실패: ${error.message}`);
			}
		}
	};

	// 폼 제출 처리
	const handleSubmit = () => {
		// 닉네임 중복 확인이 되어있지 않은 경우 에러창 띄우기
		if (!isNicknameChecked) {
			alert("닉네임 중복 확인을 먼저 해주세요🥲");
			return;
		}

		//모달 창 띄워서 한번 더 확인시키기
		setIsModalOpen(true);
	};

	//완료 시 홈으로 돌아가기
	const handleDone = () => {
		if (!isSubmitted) {
			alert("정보를 입력해주세요 🥲");
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		if (!isKeywordSelected) {
			alert(
				"키워드를 등록하지 않으셨어요!\n키워드는 나중에 수정이 가능해요!😊"
			);
			keywordRef.current?.scrollIntoView({ behavior: "smooth" });
			return;
		}

		navigate("/");
		window.scrollTo(0, 0);
	};

	//컨페티
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

	// 에러 상태 처리
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
		<>
			<Navbar />
			<Background isSubmitted={isSubmitted} ref={containerRef}>
				<GradientOverlay />
				<BottomGradient />
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
							<NicknameCheckButton onClick={NicknameCheck}>
								중복 확인
							</NicknameCheckButton>
						</Field>

						<Field>
							<Label>생년월일</Label>
							<BirthWrapper>
								<Select
									value={birthYear}
									onChange={(e) => setBirthYear(e.target.value)}
								>
									<option value="">년</option>
									{Array.from({ length: 106 }, (_, i) => 2025 - i).map(
										(year) => (
											<option key={year} value={year}>
												{year}
											</option>
										)
									)}
								</Select>
								<Select
									value={birthMonth}
									onChange={(e) => setBirthMonth(e.target.value)}
								>
									<option value="">월</option>
									{Array.from({ length: 12 }, (_, i) =>
										(i + 1).toString().padStart(2, "0")
									).map((month) => (
										<option key={month} value={month}>
											{month}
										</option>
									))}
								</Select>
								<Select
									value={birthDay}
									onChange={(e) => setBirthDay(e.target.value)}
								>
									<option value="">일</option>
									{Array.from({ length: 31 }, (_, i) =>
										(i + 1).toString().padStart(2, "0")
									).map((day) => (
										<option key={day} value={day}>
											{day}
										</option>
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
										checked={gender === "MALE"}
										onChange={(e) => setGender(e.target.value)}
									/>
									남자
								</label>
								<label>
									<Radio
										type="radio"
										name="gender"
										value="FEMALE"
										checked={gender === "FEMALE"}
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
				<Section ref={welcomeRef}>
					{/* 컨페티 터지게 */}
					<ConfettiEffect fireTrigger={fireTrigger} />
					<h2>가입이 완료되었습니다!</h2>
					<h4>내일부터 메일이 발송될거에요</h4>
					<HomeButtonWrapper onClick={handleDone}>
						홈으로 돌아가기
						<HoverEffect>
							<div />
						</HoverEffect>
					</HomeButtonWrapper>
				</Section>
			</Background>

			{isModalOpen && (
				<ModalOverlay onClick={() => setIsModalOpen(false)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<InfoCheck
							nickname={nickname}
							birthDate={`${birthYear}-${birthMonth.padStart(
								2,
								"0"
							)}-${birthDay.padStart(2, "0")}`}
							gender={gender}
							onCancel={() => setIsModalOpen(false)}
							onConfirm={async () => {
								setIsModalOpen(false);

								const birthDate = `${birthYear}-${birthMonth.padStart(
									2,
									"0"
								)}-${birthDay.padStart(2, "0")}`;
								try {
									await initFirstUser({
										nickname,
										birthDate,
										gender,
									});

									console.log("전송할 데이터:", {
										nickname,
										birthDate: `${birthYear}-${birthMonth.padStart(
											2,
											"0"
										)}-${birthDay.padStart(2, "0")}`,
										gender,
									});
									setIsSubmitted(true);
									console.log("초기 유저 정보 전송 완료");

									//키워드 선택 쪽으로 자동 스크롤
									setTimeout(() => {
										keywordRef.current?.scrollIntoView({ behavior: "smooth" });
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

// Styled Components
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

const Background = styled.div<{ isSubmitted: boolean }>`
	position: relative;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	min-height: 100vh;
	overflow-x: hidden;
	transition: all 0.3s ease;

	${({ isSubmitted }) =>
		isSubmitted &&
		`
		background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
	`}
`;

const GradientOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(
		45deg,
		rgba(255, 255, 255, 0.1) 0%,
		rgba(255, 255, 255, 0.05) 100%
	);
	pointer-events: none;
`;

const BottomGradient = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 200px;
	background: linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, transparent 100%);
	pointer-events: none;
`;

const Section = styled.section`
	position: relative;
	z-index: 1;
	padding: 80px 20px;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const MainMent = styled.h1`
	font-size: 2.5rem;
	font-weight: bold;
	color: white;
	text-align: center;
	margin-bottom: 1rem;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

const SubMent = styled.p`
	font-size: 1.2rem;
	color: rgba(255, 255, 255, 0.9);
	text-align: center;
	margin-bottom: 3rem;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const InputWrapper = styled.div`
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20px;
	padding: 2rem;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(10px);
	max-width: 500px;
	width: 100%;
`;

const Field = styled.div`
	margin-bottom: 1.5rem;
`;

const Label = styled.label`
	display: block;
	font-weight: 600;
	color: #333;
	margin-bottom: 0.5rem;
`;

const Input = styled.input`
	width: 100%;
	padding: 12px;
	border: 2px solid #e1e5e9;
	border-radius: 8px;
	font-size: 1rem;
	transition: border-color 0.3s ease;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.mainGreen};
	}
`;

const NicknameCheckButton = styled.button`
	margin-top: 0.5rem;
	padding: 8px 16px;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${({ theme }) => theme.buttonColor};
	}
`;

const BirthWrapper = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const Select = styled.select`
	flex: 1;
	padding: 12px;
	border: 2px solid #e1e5e9;
	border-radius: 8px;
	font-size: 1rem;
	transition: border-color 0.3s ease;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.mainGreen};
	}
`;

const GenderWrapper = styled.div`
	display: flex;
	gap: 2rem;

	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		font-weight: 500;
	}
`;

const Radio = styled.input`
	accent-color: ${({ theme }) => theme.mainGreen};
	width: 18px;
	height: 18px;
`;

const SubmitButton = styled.button`
	width: 100%;
	padding: 15px;
	background-color: ${({ theme }) => theme.mainGreen};
	color: white;
	border: none;
	border-radius: 10px;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.buttonColor};
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}
`;

const KeyWordSection = styled.div`
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20px;
	padding: 2rem;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(10px);
	max-width: 600px;
	width: 100%;
`;

const HomeButtonWrapper = styled.button`
	position: relative;
	padding: 15px 30px;
	background: linear-gradient(45deg, #48bb78, #38a169);
	color: white;
	border: none;
	border-radius: 25px;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: pointer;
	overflow: hidden;
	transition: all 0.3s ease;

	&:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
	}
`;

const HoverEffect = styled.div`
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent,
		rgba(255, 255, 255, 0.2),
		transparent
	);
	transition: left 0.5s;

	${HomeButtonWrapper}:hover & {
		left: 100%;
	}
`;

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
	border-radius: 15px;
	padding: 2rem;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	max-width: 90vw;
	max-height: 90vh;
	overflow-y: auto;
`;
