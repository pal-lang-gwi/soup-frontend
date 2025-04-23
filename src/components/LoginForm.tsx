import styled from "styled-components";
import googleLong from '../assets/logo_google_long.png';
import Logo from "./Logo";

const GOOGLE_LOGIN_URL = 'http://localhost:8080/oauth2/authorization/google';
// const NAVER_LOGIN_URL = 'https://naver.com' //TODO: 추가 필요

const LoginForm = () => {
    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_LOGIN_URL;
    }
    // const handleNaverLogin = () => {
    //     window.location.href = NAVER_LOGIN_URL;
    // }
    return (
        <Background>
        <Logo />
        <GoogleButton onClick={handleGoogleLogin} />
        {/* <NaverButton onClick={handleNaverLogin}>
            네이버 로그인
        </NaverButton> */}
        {/* <GoogleLogin /> */}
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
    width: 200px;
    height: 40px;
    border: none;
    cursor: pointer;
    background: url(${googleLong}) center/contain no-repeat;
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