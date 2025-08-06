import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";

// 애니메이션 정의
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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
                <InputWrapper>
                    <SearchIcon>
                        <FaSearch />
                    </SearchIcon>
                    <Input 
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
                </InputWrapper>
            </InputContainer>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    width: 100%;
    animation: ${slideIn} 0.4s ease-out;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.background.primary};
  border: 2px solid ${({ theme }) => theme.border.primary};
  border-radius: 12px;
  padding: 0 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  &:hover {
    border-color: ${({ theme }) => theme.mainGreen};
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.1);
  }
  
  &:focus-within {
    border-color: ${({ theme }) => theme.mainGreen};
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    transform: translateY(-1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${({ theme }) => theme.mainGreen}, #4ade80);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:focus-within::after {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    padding: 0 14px;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
    border-radius: 8px;
  }
`;

const SearchIcon = styled.div`
  color: ${({ theme }) => theme.text.muted};
  font-size: 1.1rem;
  margin-right: 12px;
  display: flex;
  align-items: center;
  animation: ${pulse} 2s infinite;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-right: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-right: 8px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: ${({ theme }) => theme.text.primary};
  padding: 16px 0;
  font-weight: 500;
  
  &::placeholder {
    color: ${({ theme }) => theme.text.muted};
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 14px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 12px 0;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.muted};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: 8px;
  
  &:hover {
    background: ${({ theme }) => theme.background.secondary};
    color: ${({ theme }) => theme.text.primary};
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    padding: 6px;
    margin-left: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 5px;
    margin-left: 4px;
  }
`;

const SearchButton = styled.button<{ hasKeyword: boolean }>`
  background: ${({ hasKeyword, theme }) => 
    hasKeyword 
      ? `linear-gradient(135deg, ${theme.mainGreen}, #4ade80)` 
      : theme.background.secondary};
  color: ${({ hasKeyword, theme }) => 
    hasKeyword ? theme.text.inverse : theme.text.muted};
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${({ hasKeyword }) => hasKeyword ? 'pointer' : 'not-allowed'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: ${({ hasKeyword }) => hasKeyword ? 1 : 0.6};
  
  &:hover {
    ${({ hasKeyword, theme }) => hasKeyword && `
      background: linear-gradient(135deg, ${theme.mainColor}, ${theme.mainGreen});
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
    `}
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.85rem;
    margin-left: 10px;
    gap: 4px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.8rem;
    margin-left: 8px;
    gap: 3px;
  }
`;

export default FilterInput;
