import React, { useState } from 'react';
import styled from 'styled-components';
import KeywordSelect from './KeywordSelect';

const KeywordPost: React.FC = () => {

  //! 더미데이터 지우기
  const [keywords, setKeywords] = useState<string[]>([
    'AI', '핀테크', '스마트홈'
  ]);
    const handleDelete = (target: string) => {
    setKeywords((prev) => prev.filter((kw) => kw !== target));
  };

  return (
    <Container>
      <Title>💚 구독중인 키워드</Title>
      <KeywordList>
        {keywords.map((kw) => (
          <KeywordItem key={kw}>
            {kw}
            <DeleteButton onClick={() => handleDelete(kw)}>×</DeleteButton>
          </KeywordItem>
        ))}
      </KeywordList>
      
      <Title>💚 구독 키워드 추가하기</Title>
      <KeywordSelectWrapper>
      <KeywordSelect />
      </KeywordSelectWrapper>
      
    </Container>
  );
};

export default KeywordPost;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Title = styled.h3`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: left;
`

const KeywordSelectWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`

const KeywordList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
`;

const KeywordItem = styled.li`
  background-color:${({theme}) => theme.mainColor};
  color: black;
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  font-size: 16px;
  color: #888;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;