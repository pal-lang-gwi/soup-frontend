import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ConfettiEffect from "../components/ConfettiEffect";
import InfoCheck from "../components/InfoCheck";
import KeywordSelect from "../components/KeywordSelect";
import Navbar from "../components/Navbar";
import { initFirstUser, validateNickname } from "../api/user/user";
import { UI_CONSTANTS } from "../constants/ui";
import {
	generateBirthYears,
	generateMonths,
	generateDays,
	formatBirthDate,
	formatDate,
} from "../utils/dateUtils";
import { useAuth } from "../contexts/AuthContext";

function FirstLogin() {
	const [nickname, setNickname] = useState("");
	const [birthYear, setBirthYear] = useState("");
	const [birthMonth, setBirthMonth] = useState("");
	const [birthDay, setBirthDay] = useState("");
	const [gender, setGender] = useState("");

	//정보 확인 모달
	const [isModalOpen, setIsModalOpen] = useState(false);

	//닉네임 중복 검사 유무
	const [isNicknameChecked, setIsNicknameChecked] = useState(false);

	const NicknameCheck = async () => {
		if (nickname.trim() === "") {
			alert("닉네임을 입력해주세요.");
			return;
		}
		// TODO: 닉네임 중복 확인 API 호출
		alert("사용 가능한 닉네임입니다.");
	};

	const handleSubmit = () => {
		if (nickname.trim() === "") {
			alert("닉네임을 입력해주세요.");
			return;
		}
		if (birthYear === "" || birthMonth === "" || birthDay === "") {
			alert("생년월일을 입력해주세요.");
			return;
		}
		if (gender === "") {
			alert("성별을 선택해주세요.");
			return;
		}
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
	const [searchParams] = useSearchParams();
	const { login } = useAuth();
	const [isProcessing, setIsProcessing] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const processLogin = async () => {
			try {
				// URL 파라미터에서 토큰과 사용자 정보 확인
				const token = searchParams.get("token");
				const userInfo = searchParams.get("user");

				if (!token) {
					setError("로그인 토큰이 없습니다.");
					setIsProcessing(false);
					return;
				}

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
				setIsProcessing(false);
			}
		};

		processLogin();
	}, [searchParams, login, navigate]);

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

	// 키워드 선택 완료 시 컨페티 효과
	useEffect(() => {
		if (isKeywordSelected) {
			setFireTrigger(true);
			setTimeout(() => setFireTrigger(false), UI_CONSTANTS.ANIMATION_DELAY_MS);
		}
	}, [isKeywordSelected]);

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
								maxLength={UI_CONSTANTS.FORM.MAX_NICKNAME_LENGTH}
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
									{generateBirthYears().map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</Select>
								<Select
									value={birthMonth}
									onChange={(e) => setBirthMonth(e.target.value)}
								>
									<option value="">월</option>
									{generateMonths().map((month) => (
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
									{generateDays().map((day) => (
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
								onKeywordSelected={() => setIsKeywordSelected(true)}
							/>
						</KeyWordSection>
					</div>
				</Section>
				<Section ref={welcomeRef}>
					{/* 컨페티 터지게 */}
					<ConfettiEffect fireTrigger={fireTrigger} />
					<h2>가입이 완료되었습니다!</h2>
					<h4>내일부터 메일이 발송될거에요</h4>
					<HomeButtonWrapper onClick={() => navigate("/")}>
						홈으로 돌아가기
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
							birthDate={formatBirthDate(birthYear, birthMonth, birthDay)}
							gender={gender}
							onCancel={() => setIsModalOpen(false)}
							onConfirm={async () => {
								setIsModalOpen(false);

								const birthDate = formatBirthDate(
									birthYear,
									birthMonth,
									birthDay
								);
								try {
									await initFirstUser({
										nickname,
										birthDate,
										gender,
									});

									console.log("전송할 데이터:", {
										nickname,
										birthDate,
										gender,
									});
									setIsSubmitted(true);
									console.log("초기 유저 정보 전송 완료");

									//키워드 선택 쪽으로 자동 스크롤
									setTimeout(() => {
										keywordRef.current?.scrollIntoView({ behavior: "smooth" });
									}, UI_CONSTANTS.SCROLL_DELAY_MS);
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

const Section = styled.section`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 1;
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
	border: 1px solid ${({ theme }) => theme.mainGreen};
	border-radius: 8px;
`;

const NicknameCheckButton = styled.button`
	color: white;
	cursor: pointer;
	padding: 10px 8px;
	background-color: ${({ theme }) => theme.mainGreen};
	border: none;
	border-radius: 8px;
`;

const BirthWrapper = styled.div`
	display: flex;
	gap: 8px;
`;

const Select = styled.select`
	flex: 1;
	padding: 10px;
	border: 1px solid ${({ theme }) => theme.mainGreen};
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
	background-color: ${({ theme }) => theme.mainGreen};
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
	background-color: rgba(0, 0, 0, 0.2);
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
`;

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
			rgba(194, 216, 105, 1) 49%,
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
	margin-bottom: 20px;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const CurrentTime = styled.p`
	margin-top: 20px;
`;
