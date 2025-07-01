// GoogleHome.tsx
import styled, { css } from "styled-components";

export default function GoogleHome() {
  return (
    <Root>
      <Logo>
        <span className="g">S</span>
        <span className="o1">O</span>
        <span className="o2">U</span>
        <span className="g">P</span>
      </Logo>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: 검색 로직 연결
        }}
      >
        <InputWrapper>
          <SvgGlass viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14zM4 9.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0z" />
          </SvgGlass>
          <SearchInput type="text" placeholder="검색어를 입력하세요…" />
          <MicIcon>🎤</MicIcon>
        </InputWrapper>

        <BtnRow>
          <GButton type="submit">Soup 검색</GButton>
          <GButton type="button">I'm Feeling Hungry</GButton>
        </BtnRow>
      </Form>

      <Footer>대한민국</Footer>
    </Root>
  );
}

/* ─────────── 스타일 ─────────── */
const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-family: "Roboto", "Noto Sans KR", sans-serif;
`;

const Logo = styled.h1`
  font-size: 92px;
  margin-top: 15vh;
  margin-bottom: 40px;
  font-weight: 600;
  line-height: 1;

  span {
    user-select: none;
  }
  .g {
    color: #4285f4;
  }
  .o1 {
    color: #db4437;
  }
  .o2 {
    color: #f4b400;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

/* ── 검색창 ─────────────────────────── */
const InputWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 580px;
  height: 44px;
  border: 1px solid #dfe1e5;
  border-radius: 22px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  background: #fff; /* ← 흰색 배경 */
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 1px 8px rgba(32, 33, 36, 0.35);
  }
  &:focus-within {
    border-color: #4285f4;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  font-size: 16px;
  line-height: 1;
  border: none;
  border-radius: 22px;
  outline: none;
  padding-left: 40px; /* ← 돋보기와 겹치지 않도록 여백 확보 */
  padding-top: 2px;
`;

const iconCss = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const SvgGlass = styled.svg`
  ${iconCss};
  left: 16px;
  width: 20px;
  height: 20px;
  fill: #9aa0a6;
`;

const MicIcon = styled.span`
  ${iconCss};
  right: 16px;
  font-size: 20px;
`;

/* ── 버튼 ────────────────────────────── */
const BtnRow = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const GButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #f8f9fa;
  padding: 10px 16px;
  font-size: 14px;
  color: #3c4043;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border: 1px solid #dadce0;
  }
  &:active {
    background: #eee;
  }
`;

/* ── 푸터 ────────────────────────────── */
const Footer = styled.footer`
  margin-top: auto;
  width: 100%;
  padding: 15px 30px;
  font-size: 14px;
  background: #f2f2f2;
  color: #70757a;
  text-align: left;
`;
