import { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import SendButton from '../components/SendButton';

function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <Navbar />
            <Background>
            <GradientOverlay />
            <BottomGradient />
            <ContentWrapper>
                <MainGreeting>
                <h1>
                    안녕 여기가 SOUP의 메인 페이지! <br />
                    ❣️구독하기 버튼 눌러주세요!❣️
                </h1>
                <SubGreeting>
                    아래 구독하기 버튼만 누르면 매일 이슈가 당신의 이메일로! <br />
                    빨리 누르세요!!
                </SubGreeting>
                <ButtonStyle>
                    <SendButton onClick={openModal}>구독하기</SendButton>
                </ButtonStyle>
                </MainGreeting>
            </ContentWrapper>
            </Background>

            {isModalOpen && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <LoginForm />
                    </ModalContent>

                </ModalOverlay>
            )}
        </>
        );
    }

export default HomePage;

const Background = styled.div`
    position: relative;
    background-color: white;
    height: 300vh;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.mainColor} 0%,
        #ffffff 100%
    );
    z-index: 0;
`;

const BottomGradient = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: linear-gradient(
    to top,
    ${({ theme }) => theme.mainColor} 0%,
    #ffffff 100%
    );
    z-index: 0;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    z-index: 1;
`;

const MainGreeting = styled.div`
    font-family: ${({ theme }) => theme.mainFont};
    text-align: center;
`;

const SubGreeting = styled.div`
    font-family: ${({ theme }) => theme.mainFont};
    text-align: center;
`;

const ButtonStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
`;

const ModalContent = styled.div`
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    z-index: 1002;

    width: 400px;
    max-width: 60vw;
    max-height: 80vh;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;