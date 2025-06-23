import styled from "styled-components";

const SearchInput = ({ value, onChange }: { value: string; onChange: (v: string)=>void }) => (
    <StyledInput
        type="text"
        placeholder="키워드 검색"
        value={value}
        onChange={e => onChange(e.target.value)}
        />
    );

const StyledInput = styled.input`
    margin-top: 16px;
    width: 100%;
    max-width: 300px;
    padding: 12px 16px;
    border: 2px solid ${({ theme }) => theme.buttonColor};
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s ease;
    background-color: white;

    &:focus {
        border-color: ${({ theme }) => theme.mainGreen};
        box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.2);
    }

    &::placeholder {
        color: #999;
    }

    @media (max-width: 768px) {
        max-width: 280px;
        padding: 10px 14px;
        font-size: 0.95rem;
        margin-top: 12px;
    }

    @media (max-width: 480px) {
        max-width: 260px;
        padding: 8px 12px;
        font-size: 0.9rem;
        margin-top: 10px;
    }
`;
    
export default SearchInput;
