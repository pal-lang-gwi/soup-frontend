import React from 'react';
import styled from 'styled-components';

const LookUpProfile: React.FC = () => {
  // TODO: 백엔드에서 Email 가져오기

    return (
        <Container>
        <Title>💚 회원정보 수정</Title>
            <ContentWrapper>
            
            </ContentWrapper>

        
        </Container>
    );
};

export default LookUpProfile;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`;

const ContentWrapper =styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: left;
`
