import React from 'react';
import styled from 'styled-components';
import KeywordSelect from './KeywordSelect';

const KeywordPost: React.FC = () => {

  return (
    <Container>
      <Title>💚 구독중인 키워드</Title>
      

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
  text-align: left;
`