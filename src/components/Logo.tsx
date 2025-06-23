import { useNavigate } from 'react-router-dom'; // 또는 'react-router'가 아닌 경우
import styled from "styled-components";
import logo from '../assets/logo.svg';

const Logo = () => {
    const navigate = useNavigate();

    return (
        <LogoStyle
            src={logo}
            alt="SOUP Logo"
            onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
            }}
        />
    );
};

export default Logo;

const LogoStyle = styled.img`
    width: 60px;
    height: auto;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        width: 50px;
    }

    @media (max-width: 480px) {
        width: 45px;
    }
`;
