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
          <Content>
            {keywordData.myKeywordDtos.length === 0 ? (
              <p>구독 중인 키워드가 없습니다.</p>
            ) : (
              <ul>
                {keywordData.myKeywordDtos.map((k) => (
                  <li key={k.normalizedKeyword}>{k.keyword}</li>
                ))}
              </ul>
            )}
            <PaginationWrapper>
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                이전
              </button>
              <span>
                {keywordData.currentPage + 1} / {keywordData.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(keywordData.totalPages - 1, p + 1))}
                disabled={page === keywordData.totalPages - 1}
              >
                다음
              </button>
            </PaginationWrapper>
          </Content>
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

const PaginationWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    padding: 4px 12px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    font-weight: 500;
  }
`;