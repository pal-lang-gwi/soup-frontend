import styled from "styled-components";
import logo from '../assets/logo.png';

const Logo = () => {
    return (
        <LogoStyle src={logo} alt="SOUP Logo" />
    );
}

export default Logo;

const LogoStyle = styled.img`
    width: 60px;
    height: auto;
`