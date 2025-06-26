import { useState } from "react";
import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import { theme } from "../styles/theme";
import { useKeywords } from "../hooks/useKeywords";
import { subscribeKeywords } from "../api/keywords";

// const KEYWORDS = [
//     { id: 1, name: 'AI' },
//     { id: 2, name: '블록체인' },
//     { id: 3, name: '핀테크' },
//     { id: 4, name: '자율주행' },
//     { id: 5, name: '스마트홈' },
// ];

interface Props {
	onSubmit?: (selected: string[]) => void;
	scrollToNextRef?: React.RefObject<HTMLDivElement | null>;
	onKeywordSelected?: () => void;
}

const KeywordSelect: React.FC<Props> = ({ onSubmit, scrollToNextRef, onKeywordSelected }) => {
	// 서버에서 데이터 받아지는지 확인 기능 추가
	const { data: keywords = [], isLoading, error } = useKeywords();

	//임시 데이터 사용
	// const isLoading = false;
	// const error = false;
	// const keywords = KEYWORDS;

	const [selected, setSelected] = useState<string[]>([]);
	const [search, setSearch] = useState("");

	//체크박스
	const toggle = (kw: string) =>
		setSelected((prev) =>
			prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
		);

	//검색창 필터링
	const visible = search
		? keywords.filter((k) =>
				k?.name?.toLowerCase().includes(search.toLowerCase())
		  )
		: keywords;

	const handleSave = async () => {
		try {
			// 백엔드에 구독 요청
			await subscribeKeywords(selected);
			console.log("요청 성공");
			// 성공 시 부모 컴포넌트에 알림
			onSubmit?.(selected);
			onKeywordSelected?.();

			// 스크롤
			if (scrollToNextRef?.current) {
				scrollToNextRef.current.scrollIntoView({ behavior: "smooth" });
			}
		} catch (error) {
			// 에러 처리 로직 추가 필요
			console.error("키워드 구독 실패:", error);
		}
	};

	//에러메세지 표기
	if (isLoading) return <Info>키워드를 불러오는 중...🩷</Info>;
	if (error) {
		console.log(keywords);
		return <Info>키워드를 가져오지 못했어요 😢</Info>;
	}

	return (
		<MainMent>
			<h2>관심있는 키워드를 선택해주세요!</h2>
			<h4>
				매일 선택한 키워드 기반 뉴스를 메일로 받아볼 수 있어요😊 <br />
				키워드는 언제든지 변경할 수 있어요!
			</h4>

			{/* 검색창 */}
			<SearchInput value={search} onChange={setSearch} />

			<SelectBox>
				{visible.map((k) => (
					<Label key={k.id}>
						<input
							type="checkbox"
							checked={selected.includes(k.name)}
							onChange={() => toggle(k.name)}
						/>
						<span>{k.name}</span>
					</Label>
				))}
			</SelectBox>
			<SelectCheck>
				현재 <SelectedKeyword>{selected.join(", ")}</SelectedKeyword> 키워드를
				선택했어요
			</SelectCheck>
			<SaveButton disabled={selected.length === 0} onClick={handleSave}>
				저장하기
			</SaveButton>
		</MainMent>
	);
};
export default KeywordSelect;

const MainMent = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 20px;
	max-width: 600px;
	margin: 0 auto;

	h2 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
		text-align: center;

		@media (max-width: 768px) {
			font-size: 1.5rem;
		}

		@media (max-width: 480px) {
			font-size: 1.3rem;
		}
	}

	h4 {
		font-size: 1rem;
		line-height: 1.6;
		text-align: center;
		margin-bottom: 2rem;
		color: #666;

		@media (max-width: 768px) {
			font-size: 0.9rem;
			line-height: 1.5;
			margin-bottom: 1.5rem;
		}

		@media (max-width: 480px) {
			font-size: 0.85rem;
		}
	}

	@media (max-width: 768px) {
		padding: 16px;
	}
`;

const Info = styled.div`
	margin-top: 40px;
	text-align: center;
	font-size: 1rem;

	@media (max-width: 768px) {
		margin-top: 20px;
		font-size: 0.9rem;
	}
`;

const SelectBox = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	width: 100%;
	max-width: 400px;

	@media (max-width: 768px) {
		margin-top: 20px;
		gap: 8px;
	}
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	border-radius: 8px;
	cursor: pointer;
	user-select: none;
	width: 100%;
	max-width: 300px;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(72, 187, 120, 0.1);
	}

	input {
		accent-color: ${({ theme }) => theme.mainGreen};
		width: 18px;
		height: 18px;
	}

	span {
		font-size: 0.95rem;
		flex: 1;
	}

	@media (max-width: 768px) {
		padding: 10px 12px;
		gap: 6px;

		input {
			width: 16px;
			height: 16px;
		}

		span {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 480px) {
		padding: 8px 10px;

		span {
			font-size: 0.85rem;
		}
	}
`;

const SelectCheck = styled.div`
	margin-top: 30px;
	text-align: center;
	font-size: 0.9rem;
	line-height: 1.5;

	@media (max-width: 768px) {
		margin-top: 20px;
		font-size: 0.85rem;
	}
`;

const SelectedKeyword = styled.div`
	color: ${({ theme }) => theme.mainGreen};
	font-weight: 600;
	word-break: break-all;
`;

const SaveButton = styled.button<{ disabled: boolean }>`
	margin-top: 32px;
	padding: 12px 32px;
	border: none;
	border-radius: 999px;
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	background: ${({ disabled }) => (disabled ? "#CBD5E0" : theme.buttonColor)};
	color: #fff;
	opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
	transition: all 0.2s ease;
	min-height: 44px;
	touch-action: manipulation;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	&:hover:not(:disabled) {
		background: ${({ disabled }) => (disabled ? "#CBD5E0" : theme.mainGreen)};
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		margin-top: 24px;
		padding: 10px 28px;
		font-size: 0.95rem;
		min-height: 48px;
	}

	@media (max-width: 480px) {
		padding: 8px 24px;
		font-size: 0.9rem;
		min-height: 44px;
	}
`;
