import { useState } from 'react';
import styled from 'styled-components';
import FixProfile from '../components/FixProfile';
import KeywordPost from '../components/KeywordPost';
import LookUpProfile from '../components/LookUpProfile';
import Navbar from "../components/Navbar";

type TabType = 'lookupprofile' | 'fixprofile' | 'keywords';

function MyPage(){
    const [activeTab, setActiveTab] = useState<TabType>('lookupprofile');

    return(
        <>

        <Background>
        <GradientOverlay />
        <ContentWrapper>
            <Navbar />
            <Sidebar>
            <Title>마이페이지</Title>
            <SidebarButton
              $active={activeTab === 'lookupprofile'}
              onClick={() => setActiveTab('lookupprofile')}
            >
              나의 정보
            </SidebarButton>
            <SidebarButton
              $active={activeTab === 'fixprofile'}
              onClick={() => setActiveTab('fixprofile')}
            >
              회원정보 수정
            </SidebarButton>
            <SidebarButton
              $active={activeTab === 'keywords'}
              onClick={() => setActiveTab('keywords')}
            >
              키워드 변경
            </SidebarButton>
          </Sidebar>
          <MainContent>
            {activeTab === 'lookupprofile' && <LookUpProfile />}
            {activeTab === 'fixprofile' && <FixProfile />}
            {activeTab === 'keywords' && <KeywordPost />}
          </MainContent>
        </ContentWrapper>
        </Background>
        </>
    );
}

export default MyPage;


const Background = styled.div`
    position: relative;
    background-color: white;
    height: 100vh;
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
        ${({ theme }) => theme.buttonColor} 0%,
        #ffffff 100%
    );
    z-index: 0;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
    min-height: 20vh;
    position: relative;
    z-index: 1;
`;

const Sidebar = styled.aside`
  width: 200px;
  background-color: #fff5cc;
  padding: 60px 16px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 24px;
`;

const SidebarButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  margin-bottom: 8px;
  border: none;
  background-color: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#000' : '#555')};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  text-align: left;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 80px;
  overflow-y: auto;
  background-color: #ffffff;
`;
