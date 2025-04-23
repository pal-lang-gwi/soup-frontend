import { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

//TODO: 
const KEYWORDS = [
    'AI',
    '블록체인',
    '핀테크',
    '자율주행',
    '스마트홈',
];

interface Props {
    onSubmit?: (selected: string[]) => void;
}

const KeywordSelect: React.FC<Props> = ({ onSubmit }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (keyword: string) => {
        setSelected((prev) =>
        prev.includes(keyword)
            ? prev.filter((k) => k !== keyword)
            : [...prev, keyword]
        );
    };
    
    const handleSave = () => {
        //TODO:  백엔드 연결
        console.log('선택 키워드:', selected);
        onSubmit?.(selected);
    };

    return(
        <MainMent>
        <h3>관심있는 키워드를 선택해주세요!</h3>
        <h4>매일 선택한 키워드 기반 뉴스를 메일로 받아볼 수 있어요😊</h4>
        <h4>키워드는 언제든지 변경할 수 있어요!</h4>
        <SelectBox>
        {KEYWORDS.map((kw) => (
            <Label key={kw}>
                <input
                type="checkbox"
                checked={selected.includes(kw)}
                onChange={() => toggle(kw)}
                />
                <span>{kw}</span>
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