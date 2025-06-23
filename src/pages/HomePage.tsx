import { useState } from 'react';
import styled from 'styled-components';
import KeywordSelect from '../components/KeywordSelect';
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
                        구독하기 버튼 눌러주세요!
                </h1>
                <SubGreeting>
                    아래 구독하기 버튼만 누르면 매일 이슈가 당신의 이메일로! <br />
                    빨리 누르세요!!
                </SubGreeting>
                <ButtonStyle>
                    <SendButton onClick={openModal}>구독하기</SendButton>
                </ButtonStyle>
                <KeywordWrapper>
                    <KeywordSelect />
                </KeywordWrapper>
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
    background-color: #f8f9fa;
    min-height: 100vh;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
    display: none;
`;

const BottomGradient = styled.div`
    display: none;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
    z-index: 1;
    padding: 20px;
    box-sizing: border-box;
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 18px;
    border: 1.5px solid rgba(255,255,255,0.25);
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);

    @media (max-width: 768px) {
        padding: 16px;
        min-height: calc(100vh - 60px);
    }
`;

const MainGreeting = styled.div`
    font-family: ${({ theme }) => theme.mainFont};
    margin-top: 20vh;
    text-align: center;
    max-width: 800px;
    width: 100%;
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 18px;
    border: 1.5px solid rgba(255,255,255,0.18);
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    padding: 2rem 1rem;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        line-height: 1.3;
        color: #2c3e50;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        @media (max-width: 768px) {
            font-size: 1.8rem;
            line-height: 1.4;
        }

        @media (max-width: 480px) {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        margin-top: 15vh;
    }
`;

const SubGreeting = styled.div`
    font-family: ${({ theme }) => theme.mainFont};
    text-align: center;
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #34495e;

    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

const ButtonStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3vh;
    margin-bottom: 4vh;

    @media (max-width: 768px) {
        margin-top: 2vh;
        margin-bottom: 3vh;
    }
`;

const KeywordWrapper = styled.div`
    margin-top: 6vh;

    @media (max-width: 768px) {
        margin-top: 4vh;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
`;

const ModalContent = styled.div`
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 18px;
    border: 1.5px solid rgba(255,255,255,0.25);
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    z-index: 1002;
    width: 400px;
    max-width: 90vw;
    max-height: 80vh;
    padding: 30px;

    @media (max-width: 768px) {
        padding: 20px;
        margin: 20px;
        width: calc(100vw - 40px);
    }
`;