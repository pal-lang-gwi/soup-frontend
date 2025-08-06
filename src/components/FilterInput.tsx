import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

// 애니메이션 정의
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

    const handleClear = () => {
        setKeyword('');
        onSearch('');
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
                {keyword && (
                    <ClearButton onClick={handleClear}>
                        <FaTimes />
                    </ClearButton>
                )}
                <SearchButton onClick={handleSearch} hasKeyword={!!keyword}>
                    검색
                </SearchButton>
            </InputContainer>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    width: 100%;
    animation: ${slideIn} 0.4s ease-out;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid #e2e8f0;
    border-radius: 16px;
    padding: 6px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, transparent, rgba(72, 187, 120, 0.02));
        border-radius: 16px;
        pointer-events: none;
    }
    
    &:focus-within {
        border-color: ${({ theme }) => theme.mainGreen};
        box-shadow: 0 8px 24px rgba(72, 187, 120, 0.15);
        transform: translateY(-2px);
        
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, ${({ theme }) => theme.mainGreen}, #4ade80);
            border-radius: 0 0 16px 16px;
        }
    }
`;

const SearchIcon = styled.div`
    color: ${({ theme }) => theme.mainGreen};
    font-size: 1.1rem;
    margin: 0 16px;
    opacity: 0.8;
    transition: all 0.3s ease;
    
    ${InputContainer}:focus-within & {
        opacity: 1;
        animation: ${pulse} 2s infinite;
    }
`;

const StyledInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 14px 8px;
    background: transparent;
    color: #2d3748;
    font-weight: 500;
    
    &::placeholder {
        color: #a0aec0;
        font-weight: 400;
    }
    
    &:focus {
        outline: none;
    }
`;

const ClearButton = styled.button`
    background: rgba(160, 174, 192, 0.2);
    color: #718096;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 8px;
    font-size: 0.8rem;
    
    &:hover {
        background: rgba(160, 174, 192, 0.3);
        color: #4a5568;
        transform: scale(1.1);
    }
`;

const SearchButton = styled.button<{ hasKeyword: boolean }>`
    background: ${({ hasKeyword, theme }) => 
        hasKeyword 
            ? `linear-gradient(135deg, ${theme.mainGreen}, #4ade80)` 
            : `linear-gradient(135deg, #e2e8f0, #cbd5e0)`
    };
    color: ${({ hasKeyword }) => hasKeyword ? 'white' : '#718096'};
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: ${({ hasKeyword }) => hasKeyword ? 'pointer' : 'not-allowed'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-right: 4px;
    box-shadow: ${({ hasKeyword }) => 
        hasKeyword 
            ? '0 4px 12px rgba(72, 187, 120, 0.2)' 
            : '0 2px 4px rgba(0, 0, 0, 0.1)'
    };
    
    &:hover {
        ${({ hasKeyword, theme }) => hasKeyword && `
            background: linear-gradient(135deg, ${theme.mainColor}, ${theme.mainGreen});
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(72, 187, 120, 0.3);
        `}
    }
    
    &:active {
        transform: translateY(0);
    }
`;

export default FilterInput;
