import styled from "styled-components";
import Logo from "./Logo";

const GOOGLE_LOGIN_URL = 'https://google.com'; //TODO: 추가 필요
const NAVER_LOGIN_URL = 'https://naver.com'

const LoginForm = () => {
    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_LOGIN_URL;
    }
    const handleNaverLogin = () => {
        window.location.href = NAVER_LOGIN_URL;
    }
    return (
        <Background>
        <Logo />
        <GoogleButton onClick={handleGoogleLogin}>
            구글 로그인
        </GoogleButton>
        <NaverButton onClick={handleNaverLogin}>
            네이버 로그인
        </NaverButton>
        </Background>

    );
}
export default LoginForm;

const Background = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100&;
    padding: 40px;
    //height:100vh;
`;

const GoogleButton = styled.button`
    padding: 12px 20px;
    background-color: #4285f4;
    border: none;
    color: white;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
`;

const NaverButton = styled.button`
    padding: 12px 20px;
    background-color:${({theme}) => theme.mainGreen};
    border: none;
    font-family:${({theme})=>theme.mainFont};
    color: white;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
`;