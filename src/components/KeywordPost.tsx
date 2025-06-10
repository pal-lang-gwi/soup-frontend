import React, { useState } from 'react';
import styled from 'styled-components';

const KeywordPost: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>(['AI', 'IoT']);
  const [input, setInput] = useState('');

  const addKeyword = () => {
    if (input.trim() && !keywords.includes(input.trim())) {
      setKeywords([...keywords, input.trim()]);
      setInput('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((kw) => kw !== keywordToRemove));
  };

  return (
    <Container>
      <h3>키워드 변경</h3>
      <KeywordInputArea>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="새 키워드 입력"
        />
        <AddButton onClick={addKeyword}>추가</AddButton>
      </KeywordInputArea>

      <KeywordList>
        {keywords.map((kw) => (
          <KeywordItem key={kw}>
            {kw}
            <RemoveButton onClick={() => removeKeyword(kw)}>×</RemoveButton>
          </KeywordItem>
        ))}
      </KeywordList>
    </Container>
  );
};

export default KeywordPost;

const Container = styled.div`
  max-width: 500px;
  width: 100%;
`;

const KeywordInputArea = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.mainColor};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const KeywordList = styled.ul`
  margin-top: 20px;
  padding-left: 0;
  list-style: none;
`;

const KeywordItem = styled.li`
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: red;
`;
