import styled from "styled-components";
import googleLong from "../assets/logo_google_long.png";
import Logo from "./Logo";

const GOOGLE_LOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URL;
// const NAVER_LOGIN_URL = 'https://naver.com' //TODO: 추가 필요

const LoginForm = () => {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };
  // const handleNaverLogin = () => {
  //     window.location.href = NAVER_LOGIN_URL;
  // }
  return (
    <Background>
      <Logo />
      <Title>SOUP에 로그인하세요</Title>
      <Subtitle>구독 서비스를 이용하려면 로그인이 필요합니다</Subtitle>
      <GoogleButton onClick={handleGoogleLogin} />
      {/* <NaverButton onClick={handleNaverLogin}>
            네이버 로그인
        </NaverButton> */}
      {/* <GoogleLogin /> */}
    </Background>
  );
};
export default LoginForm;

const Background = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 20px 0 10px 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin: 16px 0 8px 0;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 25px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const GoogleButton = styled.button`
  width: 200px;
  height: 40px;
  border: none;
  cursor: pointer;
  background: url(${googleLong}) center/contain no-repeat;
  transition: transform 0.2s ease;
  min-height: 44px;
  touch-action: manipulation;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 36px;
    min-height: 48px;
  }

  @media (max-width: 480px) {
    width: 160px;
    height: 32px;
    min-height: 44px;
  }
`;

// const NaverButton = styled.button`
//     padding: 12px 20px;
//     background-color:${({theme}) => theme.mainGreen};
//     border: none;
//     font-family:${({theme})=>theme.mainFont};
//     color: white;
//     font-size: 16px;
//     border-radius: 10px;
//     cursor: pointer;
//     margin-top: 20px;
// `;
