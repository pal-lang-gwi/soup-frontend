import { useState } from "react";
import styled from "styled-components";
import SearchInput from "../components/SearchInput";
import { useKeywords } from "../hooks/useKeywords";
import { theme } from "../styles/theme";

// const KEYWORDS = [
//     'AI',
//     '블록체인',
//     '핀테크',
//     '자율주행',
//     '스마트홈',
// ];

interface Props {
    onSubmit?: (selected: string[]) => void;
}

const KeywordSelect: React.FC<Props> = ({ onSubmit }) => {
    // 서버에서 데이터 받아지는지 확인 기능 추가
    const { data: keywords = [], isLoading, error } = useKeywords();
    const [selected, setSelected] = useState<string[]>([]);
    const [search, setSearch]   = useState('');

    //체크박스스
    const toggle = (kw: string) =>
    setSelected(prev =>
        prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]
    );

    //검색창 필터링
    const visible = search
    ? keywords.filter((k) =>
        k?.name?.toLowerCase().includes(search.toLowerCase())
        )
    : keywords;

    const handleSave = () => {
        console.log(selected);

        //TODO: 백엔드 전송 로직 추가 필요
        onSubmit?.(selected);
    }

    //에러메세지 표기
    if (isLoading) return <Info>키워드를 불러오는 중...🩷</Info>;
    if (error) {
        console.log(keywords)
        return <Info>키워드를 가져오지 못했어요 😢</Info>;}

    return(
        <MainMent>
        <h2>관심있는 키워드를 선택해주세요!</h2>
        <h4>매일 선택한 키워드 기반 뉴스를 메일로 받아볼 수 있어요😊 <br/>
        키워드는 언제든지 변경할 수 있어요!</h4>

        {/* 검색창 */}
        <SearchInput value={search} onChange={setSearch} />

        <SelectBox>
        {visible.map(k => (
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

        <SaveButton disabled={selected.length === 0} onClick={handleSave}>
            저장하기
        </SaveButton>

        </MainMent>
    )
};
export default KeywordSelect;

const MainMent = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100&;
    padding: 10px;
`;

const Info = styled.div`
    margin-top: 40px;
    text-align: center;
    font-size: 1rem;
`;


const SelectBox = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    input {
        accent-color: ${({theme})=>theme.buttonColor};
    }
    span {
        font-size: 0.95rem;
    }
`;

const SaveButton = styled.button<{ disabled: boolean }>`
    margin-top: 32px;
    padding: 10px 28px;
    border: none;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
    background: ${({ disabled }) => (disabled ? '#ccc' : theme.mainGreen)};
    color: #fff;
    opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;