import React from "react";
import styled from "styled-components";
import Navbar from "../widgets/header/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, getMyKeywords } from "../shared/api/user/user";
import { unsubscribeKeyword } from "../shared/api/keywords";
import { useQueryClient } from "@tanstack/react-query";
import { FaUserCircle, FaEnvelope, FaVenusMars, FaBirthdayCake, FaLeaf, FaTimes } from "react-icons/fa";
import { showError, showKeywordUnsubscribed } from "../shared/lib/sweetAlert";

const MyPage: React.FC = () => {
  const queryClient = useQueryClient();

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
      <Navbar />
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
          <SectionTitle>구독 중인 키워드</SectionTitle>
          <KeywordContent>
            {keywordData?.myKeywordDtos && keywordData.myKeywordDtos.length > 0 ? (
              <KeywordList>
                {keywordData.myKeywordDtos.map((keyword) => (
                  <KeywordPill key={keyword.keywordId}>
                    <FaLeaf className="keyword-icon" />
                    {keyword.keyword}
                    <UnsubscribeButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnsubscribe(keyword.keywordId);
                      }}
                    >
                      <FaTimes />
                    </UnsubscribeButton>
                  </KeywordPill>
                ))}
              </KeywordList>
            ) : (
              <NoKeywordMsg>구독 중인 키워드가 없습니다.</NoKeywordMsg>
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
  background: ${({ theme }) => theme.background.gradient.secondary};
  padding-top: 80px;
  
  @media (max-width: 768px) {
    padding-top: 60px;
  }
  
  @media (max-width: 480px) {
    padding-top: 50px;
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
  background: ${({ theme }) => theme.background.primary};
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(72, 187, 120, 0.08);
  padding: 36px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    padding: 24px 20px 20px 20px;
    gap: 20px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 16px 16px 16px;
    gap: 16px;
    border-radius: 14px;
  }
`;

const SectionTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.mainColor};
  margin-bottom: 10px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 6px;
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
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.background.tertiary};
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.mainGreen};
  
  .icon {
    color: ${({ theme }) => theme.mainGreen};
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    gap: 10px;
    padding: 12px;
    
    .icon {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    padding: 10px;
    
    .icon {
      font-size: 1rem;
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
  gap: 8px;
  background: ${({ theme }) => theme.background.tertiary};
  color: ${({ theme }) => theme.text.primary};
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid ${({ theme }) => theme.border.accent};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.background.secondary};
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.85rem;
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.8rem;
    gap: 4px;
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

const NoKeywordMsg = styled.div`
  color: ${({ theme }) => theme.text.muted};
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-top: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-top: 0.6rem;
  }
`;