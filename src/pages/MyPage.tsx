import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, getMyKeywords } from "../api/user/user";
import { unsubscribeKeyword } from "../api/keywords";
import { useQueryClient } from "@tanstack/react-query";
import { FaUserCircle, FaEnvelope, FaVenusMars, FaBirthdayCake, FaLeaf, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showError, showInfo, showKeywordUnsubscribed } from "../utils/sweetAlert";

// 더미 데이터로 마이페이지를 테스트하려면 아래 상수를 true로 바꾸세요!
const USE_DUMMY = false;

// 더미 데이터 정의 (상단에 한 번만)
const dummyUser = {
  email: "testuser@soup.com",
  nickname: "테스트유저",
  gender: "FEMALE",
  birthDate: "1999-01-01",
};
const dummyKeywordData = {
  myKeywordDtos: [
    { keywordId: 1, keyword: "AI", normalizedKeyword: "ai" },
    { keywordId: 2, keyword: "경제", normalizedKeyword: "economy" },
    { keywordId: 3, keyword: "정치", normalizedKeyword: "politics" },
    { keywordId: 4, keyword: "테크", normalizedKeyword: "tech" },
  ],
  currentPage: 0,
  totalPages: 1,
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 구독 해지 핸들러 (더미/실제 모두 대응)
  const handleUnsubscribe = async (keywordId: number) => {
    if (USE_DUMMY) {
      showInfo(`ID: ${keywordId} 키워드 구독을 해지할게요! 👋`);
      return;
    }
    try {
      await unsubscribeKeyword(keywordId);
      showKeywordUnsubscribed("키워드"); // 실제로는 키워드 이름을 가져와야 함
      queryClient.invalidateQueries({ queryKey: ["myKeywords"] });
    } catch (e: any) {
      showError(e.message || "구독 해지에 실패했어요. 다시 시도해주세요! 😅");
    }
  };

  // 더미 데이터 강제 사용
  if (USE_DUMMY) {
    return (
      <PageBackground>
        <Navbar />
        <MainWrapper>
          <SectionCard>
            <SectionTitle>마이페이지 (임시 테스트용)</SectionTitle>
            <SectionSubtitle>내 정보</SectionSubtitle>
            <InfoList>
              <InfoRow><FaEnvelope className="icon" /> <Label>이메일</Label> <Value>{dummyUser.email}</Value></InfoRow>
              <InfoRow><FaUserCircle className="icon" /> <Label>닉네임</Label> <Value>{dummyUser.nickname}</Value></InfoRow>
              <InfoRow><FaVenusMars className="icon" /> <Label>성별</Label> <Value>{dummyUser.gender}</Value></InfoRow>
              <InfoRow><FaBirthdayCake className="icon" /> <Label>생년월일</Label> <Value>{dummyUser.birthDate}</Value></InfoRow>
            </InfoList>
          </SectionCard>

          <CenteredSectionCard>
            <SectionSubtitle>나의 뉴스 구독 현황</SectionSubtitle>
            <KeywordContent>
              <KeywordList>
                {dummyKeywordData.myKeywordDtos.map((k) => (
                  <KeywordPill key={k.keywordId}>
                    {k.keyword}
                    <UnsubscribeButton
                      onClick={e => {
                        e.stopPropagation();
                        handleUnsubscribe(k.keywordId);
                      }}
                      title="구독 해지"
                    >
                      <FaTimes />
                    </UnsubscribeButton>
                  </KeywordPill>
                ))}
              </KeywordList>
            </KeywordContent>
          </CenteredSectionCard>

          {/* <SectionCard>
            <SectionSubtitle>설정</SectionSubtitle>
            <SettingContent>
              <SettingRow>
                <FaCog className="icon" />
                <span>비밀번호 변경, 알림 설정 등 사용자가 변경할 수 있는 옵션.</span>
              </SettingRow>
              <SettingButton>설정 바로가기</SettingButton>
            </SettingContent>
          </SectionCard> */}
        </MainWrapper>
      </PageBackground>
    );
  }

  // 실제 API 호출
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error: userErrorObj,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const {
    data: keywordData,
    isLoading: keywordsLoading,
    isError: keywordError,
    error: keywordErrorObj,
  } = useQuery({
    queryKey: ["myKeywords"],
    queryFn: () => getMyKeywords(),
  });

  // 로딩
  if (userLoading || keywordsLoading) return <p>로딩 중...</p>;

  // 오류 또는 데이터 없음 처리
  if (userError || keywordError || !user || !keywordData) {
    return (
      <p>
        오류 발생: { (userErrorObj as Error)?.message || (keywordErrorObj as Error)?.message || "유저 정보 또는 키워드 정보를 불러올 수 없습니다." }
      </p>
    );
  }

  // 정상 렌더링
  return (
    <PageBackground>
      <Navbar />
      <MainWrapper>
        <SectionCard>
          <SectionTitle>마이페이지</SectionTitle>
          <SectionSubtitle>내 정보</SectionSubtitle>
          <InfoList>
            <InfoRow><FaEnvelope className="icon" /> <Label>이메일</Label> <Value>{user.email}</Value></InfoRow>
            <InfoRow><FaUserCircle className="icon" /> <Label>닉네임</Label> <Value>{user.nickname}</Value></InfoRow>
            <InfoRow><FaVenusMars className="icon" /> <Label>성별</Label> <Value>{user.gender}</Value></InfoRow>
            <InfoRow><FaBirthdayCake className="icon" /> <Label>생년월일</Label> <Value>{user.birthDate}</Value></InfoRow>
          </InfoList>
        </SectionCard>

        <CenteredSectionCard>
          <SectionSubtitle>나의 뉴스 구독 현황</SectionSubtitle>
          <KeywordContent>
            {keywordData.myKeywordDtos.length === 0 ? (
              <NoKeywordMsg>
                <FaLeaf style={{ fontSize: "2rem", color: "#48BB78", marginBottom: 8 }} />
                구독 중인 키워드가 없습니다.
              </NoKeywordMsg>
            ) : (
              <KeywordList>
                {keywordData.myKeywordDtos.map((k) => (
                  <KeywordPill
                    key={k.keywordId}
                    onClick={() => navigate(`/news?keyword=${encodeURIComponent(k.keyword)}`)}
                  >
                    {k.keyword}
                    <UnsubscribeButton
                      onClick={e => {
                        e.stopPropagation();
                        handleUnsubscribe(k.keywordId);
                      }}
                      title="구독 해지"
                    >
                      <FaTimes />
                    </UnsubscribeButton>
                  </KeywordPill>
                ))}
              </KeywordList>
            )}
          </KeywordContent>
        </CenteredSectionCard>

        {/* <SectionCard>
          <SectionSubtitle>설정</SectionSubtitle>
          <SettingContent>
            <SettingRow>
              <FaCog className="icon" />
              <span>비밀번호 변경, 알림 설정 등 사용자가 변경할 수 있는 옵션.</span>
            </SettingRow>
            <SettingButton>설정 바로가기</SettingButton>
          </SettingContent>
        </SectionCard> */}
      </MainWrapper>
    </PageBackground>
  );
};

export default MyPage;



/* ───────── 스타일 개선 ───────── */
const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e6f4ea 100%);
  padding-top: 80px;
`;

const MainWrapper = styled.main`
  max-width: 900px;
  margin: 0 auto 40px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const SectionCard = styled.section`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(72, 187, 120, 0.08);
  padding: 36px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 600px) {
    padding: 20px 8px;
  }
`;

// '나의 뉴스 구독 현황'만 중앙 정렬 스타일 적용
const CenteredSectionCard = styled(SectionCard)`
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.mainColor};
  margin-bottom: 10px;
  text-align: left;
`;

const SectionSubtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mainGreen};
  margin-bottom: 18px;
`;

const InfoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.08rem;
  background: #f6fdf8;
  border-radius: 12px;
  padding: 12px 18px;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.04);
  .icon {
    font-size: 1.2em;
    color: ${({ theme }) => theme.mainGreen};
    min-width: 24px;
  }
`;
const Label = styled.span`
  font-weight: 600;
  color: #333;
  min-width: 70px;
`;
const Value = styled.span`
  color: #555;
  font-weight: 400;
`;

const KeywordContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;
const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  margin-top: 0.5rem;
`;
const KeywordPill = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.mainGreen};
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5em 1.2em;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.08);
  letter-spacing: 0.5px;
  transition: background 0.2s;
  cursor: pointer;
  position: relative; /* Added for UnsubscribeButton positioning */
`;
const NoKeywordMsg = styled.div`
  color: #aaa;
  font-size: 1.1rem;
  margin: 1.5rem 0 0.5rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 스타일 추가
const UnsubscribeButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  margin-left: 8px;
  font-size: 1.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  &:hover {
    color: #ff6b6b;
  }
`;