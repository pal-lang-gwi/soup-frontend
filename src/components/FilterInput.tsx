import { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

interface FilterInputProps {
    onSearch: (keyword: string) => void;
    defaultValue?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({ onSearch, defaultValue = '' }) => {
    const [keyword, setKeyword] = useState(defaultValue);

    //엔터누르면 검색
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(keyword);
        }
    };

    const handleSearch = () => {
        onSearch(keyword);
    };

    return (
        <StyledWrapper>
            <InputContainer>
                <SearchIcon>
                    <FaSearch />
                </SearchIcon>
                <StyledInput 
                    placeholder="키워드를 입력해주세요" 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                    onKeyDown={handleKeyDown}
                />
                <SearchButton onClick={handleSearch}>
                    검색
                </SearchButton>
            </InputContainer>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    width: 100%;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    padding: 4px;
    box-shadow: 0 2px 8px rgba(72, 187, 120, 0.04);
    transition: all 0.2s ease;
    
    &:focus-within {
        border-color: ${({ theme }) => theme.mainGreen};
        box-shadow: 0 4px 16px rgba(72, 187, 120, 0.12);
    }
`;

const SearchIcon = styled.div`
    color: ${({ theme }) => theme.mainGreen};
    font-size: 1rem;
    margin: 0 12px;
    opacity: 0.7;
`;

const StyledInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 12px 8px;
    background: transparent;
    color: #333;
    
    &::placeholder {
        color: #aaa;
    }
    
    &:focus {
        outline: none;
    }
`;

const SearchButton = styled.button`
    background: ${({ theme }) => theme.mainGreen};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-right: 4px;
    
    &:hover {
        background: ${({ theme }) => theme.mainColor};
        transform: translateY(-1px);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

export default FilterInput;
