import { useRef, useState } from 'react';
import styled from 'styled-components';
import FixProfile from '../components/FixProfile';
import KeywordPost from '../components/KeywordPost';
import LookUpProfile from '../components/LookUpProfile';
import Navbar from "../components/Navbar";
import { User } from '../types/auth';

type TabType = 'lookupprofile' | 'fixprofile' | 'keywords';

function MyPage(){
    const [activeTab, setActiveTab] = useState<TabType>('lookupprofile');
    const [user, setUser] = useState<User | null>(null);

    //TODO: 백엔드 조회 로직 추가
    // useEffect(() => {
    // axiosUser().then(setUser).catch((err) => {
    //   console.error('유저 정보 조회 실패:', err);
    // });
  // }, []);

    //프로필 이미지 변경
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
      fileInputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUser((prev) => prev ? { ...prev, profileImageUrl: reader.result as string } : null);
        };
        reader.readAsDataURL(file);
      }
    };

    return(
        <>

        <Background>
        <GradientOverlay />
        <ContentWrapper>
            <Navbar />
            <Sidebar>
            <ProfileImageWrapper onClick={handleImageClick}>
              <ProfileImage src={user?.profileImageUrl || '/assets/sample.jpg'} />
              <ImageOverlay>프로필 변경하기</ImageOverlay>
              </ProfileImageWrapper>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
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

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  &:hover div {
    opacity: 1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(120, 120, 120, 0.5);
  color: white;
  font-size: 19px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
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
