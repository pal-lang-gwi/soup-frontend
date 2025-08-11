import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../../shared/ui/Navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, getMyKeywords } from "../../shared/api/user/user";
import { unsubscribeKeyword } from "../../shared/api/keywords";
import { useQueryClient } from "@tanstack/react-query";
import { FaUserCircle, FaEnvelope, FaVenusMars, FaBirthdayCake, FaLeaf, FaTimes, FaNewspaper } from "react-icons/fa";
import { showError, showKeywordUnsubscribed } from "../../shared/lib/sweetAlert";

const MyPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 키워드 클릭 시 뉴스 페이지로 이동
  const handleKeywordClick = (keyword: string) => {
    navigate(`/news?keyword=${encodeURIComponent(keyword)}`);
  };

  // 구독 해지 핸들러
  const handleUnsubscribe = async (keywordId: number) => {
    try {
      await unsubscribeKeyword(keywordId);
      showKeywordUnsubscribed("키워드");
      queryClient.invalidateQueries({ queryKey: ["myKeywords"] });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "구독 해지에 실패했어요. 다시 시도해주세요! 😅";
      showError(errorMessage);
    }
  };

  const { data: userInfo, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const { data: keywordData, isLoading: keywordLoading, error: keywordError } = useQuery({
    queryKey: ["myKeywords"],
    queryFn: () => getMyKeywords(),
  });

  if (userLoading || keywordLoading) {
    return (
      <PageBackground>
        <Navigation />
        <MainWrapper>
          <SectionCard>
            <SectionTitle>로딩 중...</SectionTitle>
          </SectionCard>
        </MainWrapper>
      </PageBackground>
    );
  }

  if (userError || keywordError) {
    return (
      <PageBackground>
        <Navigation />
        <MainWrapper>
          <SectionCard>
            <SectionTitle>오류가 발생했습니다</SectionTitle>
            <SectionSubtitle>페이지를 새로고침해주세요</SectionSubtitle>
          </SectionCard>
        </MainWrapper>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <Navigation />
      <MainWrapper>
        <SectionCard>
          <SectionTitle>마이페이지</SectionTitle>
          <SectionSubtitle>내 정보</SectionSubtitle>
          <InfoList>
            <InfoRow>
              <FaEnvelope className="icon" />
              <Label>이메일</Label>
              <Value>{userInfo?.email || "정보 없음"}</Value>
            </InfoRow>
            <InfoRow>
              <FaUserCircle className="icon" />
              <Label>닉네임</Label>
              <Value>{userInfo?.nickname || "정보 없음"}</Value>
            </InfoRow>
            <InfoRow>
              <FaVenusMars className="icon" />
              <Label>성별</Label>
              <Value>{userInfo?.gender || "정보 없음"}</Value>
            </InfoRow>
            <InfoRow>
              <FaBirthdayCake className="icon" />
              <Label>생년월일</Label>
              <Value>{userInfo?.birthDate || "정보 없음"}</Value>
            </InfoRow>
          </InfoList>
        </SectionCard>

        <SectionCard>
          <SectionTitle>🔖 구독 중인 키워드</SectionTitle>
          <SectionSubtitle>키워드를 클릭하면 해당 뉴스를 확인할 수 있어요</SectionSubtitle>
          <KeywordContent>
            {keywordData?.myKeywordDtos && keywordData.myKeywordDtos.length > 0 ? (
              <KeywordList>
                {keywordData.myKeywordDtos.map((keyword) => (
                  <KeywordPill 
                    key={keyword.keywordId}
                    onClick={() => handleKeywordClick(keyword.keyword)}
                  >
                    <FaLeaf className="keyword-icon" />
                    <KeywordText>{keyword.keyword}</KeywordText>
                    <UnsubscribeButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnsubscribe(keyword.keywordId);
                      }}
                      title="구독 해지"
                    >
                      <FaTimes />
                    </UnsubscribeButton>
                  </KeywordPill>
                ))}
              </KeywordList>
            ) : (
              <NoKeywordMsg>
                <NoKeywordIcon>🔍</NoKeywordIcon>
                <NoKeywordTitle>구독 중인 키워드가 없습니다</NoKeywordTitle>
                <NoKeywordSubtext>키워드를 구독하여 맞춤 뉴스를 받아보세요!</NoKeywordSubtext>
                <NewsLinkButton onClick={() => navigate('/news')}>
                  <FaNewspaper />
                  뉴스 페이지로 이동
                </NewsLinkButton>
              </NoKeywordMsg>
            )}
          </KeywordContent>
        </SectionCard>
      </MainWrapper>
    </PageBackground>
  );
};

export default MyPage;



/* ───────── 스타일 개선 ───────── */
const PageBackground = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background.gradient.primary};
  padding-top: 80px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding-top: 72px;
  }
`;

const MainWrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto 40px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  
  @media (max-width: 768px) {
    padding: 0 12px;
    gap: 24px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 0 8px;
    gap: 20px;
    margin-bottom: 16px;
  }
`;

const SectionCard = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 32px 24px 24px 24px;
    gap: 24px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 20px 20px 20px;
    gap: 20px;
    border-radius: 16px;
  }
`;

const SectionTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  color: ${({ theme }) => theme.primaryBlue};
  margin-bottom: 12px;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.primaryBlue}, ${({ theme }) => theme.mainGreen});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }
`;

const SectionSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mainGreen};
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, ${({ theme }) => theme.primaryBlue}, ${({ theme }) => theme.mainGreen});
  }
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
  }
  
  .icon {
    color: ${({ theme }) => theme.primaryBlue};
    font-size: 1.3rem;
    transition: transform 0.3s ease;
  }
  
  &:hover .icon {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px;
    
    .icon {
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    padding: 14px;
    
    .icon {
      font-size: 1.1rem;
    }
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  min-width: 80px;
  
  @media (max-width: 768px) {
    min-width: 70px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    min-width: 60px;
    font-size: 0.85rem;
  }
`;

const Value = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const KeywordContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const KeywordPill = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.text.primary};
  padding: 12px 20px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primaryBlue}, ${({ theme }) => theme.mainGreen});
    border-radius: 24px 24px 0 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.15),
      0 4px 16px rgba(72, 187, 120, 0.1);
    transform: translateY(-3px) scale(1.02);
    
    &::before {
      opacity: 1;
    }
  }
  
  .keyword-icon {
    color: ${({ theme }) => theme.primaryBlue};
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.9rem;
    gap: 8px;
    
    .keyword-icon {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.85rem;
    gap: 6px;
    
    .keyword-icon {
      font-size: 0.9rem;
    }
  }
`;

const UnsubscribeButton = styled.button`
  background: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.text.inverse};
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.error};
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
    font-size: 0.65rem;
  }
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
    font-size: 0.6rem;
  }
`;

const KeywordText = styled.span`
  flex: 1;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const NoKeywordMsg = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    padding: 50px 16px;
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 40px 12px;
    gap: 10px;
  }
`;

const NoKeywordIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 4px;
  }
`;

const NoKeywordTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const NoKeywordSubtext = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text.muted};
  margin: 0;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const NewsLinkButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primaryBlue}, ${({ theme }) => theme.mainGreen});
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(49, 130, 246, 0.3);
  margin-top: 16px;

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.hoverBlue}, ${({ theme }) => theme.primaryBlue});
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 24px rgba(49, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0) scale(1);
  }

  svg {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
    gap: 8px;
    
    svg {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.85rem;
    gap: 6px;
    
    svg {
      font-size: 0.85rem;
    }
  }
`;