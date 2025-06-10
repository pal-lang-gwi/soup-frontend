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
    padding: 8px 12px;
    border: 2px solid ${({ theme }) => theme.mainGreen};
    border-radius: 8px;
    font-size: 0.95rem;
`;
    
export default SearchInput;
