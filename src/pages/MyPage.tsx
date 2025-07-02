import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

/**
 * MyPage 기본 템플릿
 * - 상단에는 기존 Navbar 재사용
 * - Wrapper 내부에 "프로필", "구독 현황", "설정" 섹션을 더미 컨텐츠로 배치
 *   (실제 데이터 연결은 이후 단계에서 로직 추가)
 */
const MyPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <Section>
          <Title>마이페이지</Title>
          <Subtitle>내 정보</Subtitle>
          <Content>프로필 정보가 여기에 표시됩니다.</Content>
        </Section>

        <Section>
          <Subtitle>나의 뉴스 구독 현황</Subtitle>
          <Content>
            현재 구독 중인 키워드 · 카테고리 목록을 보여줄 예정입니다.
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
  margin: 100px auto 40px; /* Navbar 높이 고려 여백 */
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

const Content = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;
