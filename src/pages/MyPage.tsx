import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, getMyKeywords } from "../api/user/user";

const MyPage: React.FC = () => {
  const [page, setPage] = useState(0);

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
    queryKey: ["myKeywords", page],
    queryFn: () => getMyKeywords(page),
  });

  // 로딩
  if (userLoading || keywordsLoading) return <p>로딩 중...</p>;

  // 오류 또는 데이터 없음 처리
  if (userError || keywordError || !user || !keywordData) {
    return (
      <p>
        오류 발생:{" "}
        {(userErrorObj as Error)?.message ||
          (keywordErrorObj as Error)?.message ||
          "유저 정보 또는 키워드 정보를 불러올 수 없습니다."}
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <Section>
          <Title>마이페이지</Title>
          <Subtitle>내 정보</Subtitle>
          <Content>
            <div>이메일: {user.email}</div>
            <div>닉네임: {user.nickname}</div>
            <div>성별: {user.gender}</div>
            <div>생년월일: {user.birthDate}</div>
          </Content>
        </Section>

        <Section>
          <Subtitle>나의 뉴스 구독 현황</Subtitle>
          <KeywordContent>
            {keywordData.myKeywordDtos.length === 0 ? (
              <NoKeywordMsg>구독 중인 키워드가 없습니다.</NoKeywordMsg>
            ) : (
              <KeywordList>
                {keywordData.myKeywordDtos.map((k) => (
                  <KeywordPill key={k.normalizedKeyword}>{k.keyword}</KeywordPill>
                ))}
              </KeywordList>
            )}
            <StyledPagination>
              <PageButton onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                이전
              </PageButton>
              <PageInfo>
                {keywordData.currentPage + 1} / {keywordData.totalPages}
              </PageInfo>
              <PageButton
                onClick={() => setPage((p) => Math.min(keywordData.totalPages - 1, p + 1))}
                disabled={page === keywordData.totalPages - 1}
              >
                다음
              </PageButton>
            </StyledPagination>
          </KeywordContent>
        </Section>

        <Section>
          <Subtitle>설정</Subtitle>
          <Content>비밀번호 변경, 알림 설정 등 사용자가 변경할 수 있는 옵션.</Content>
        </Section>
      </Wrapper>
    </>
  );
};

export default MyPage;



/* ───────── 스타일 ───────── */
const Wrapper = styled.main`
  max-width: 960px;
  margin: 100px auto 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.section`
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 32px 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Content = styled.div`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;

  ul {
    margin-top: 8px;
    padding-left: 20px;
    list-style: disc;
  }
`;

// 스타일 추가
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
  background: ${({ theme }) => theme.mainGreen};
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5em 1.2em;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.08);
  letter-spacing: 0.5px;
  transition: background 0.2s;
  cursor: default;
`;

const NoKeywordMsg = styled.div`
  color: #aaa;
  font-size: 1.1rem;
  margin: 1.5rem 0 0.5rem 0;
  text-align: center;
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1.2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1.2rem;
  background-color: ${({ theme }) => theme.mainGreen};
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.08);

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.buttonColor};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 1rem;
  color: #666;
  font-weight: 500;
`;