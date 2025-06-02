import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from "styled-components";
import LoginForm from '../components/LoginForm';
import Logo from "./Logo";
import SendButton from "./SendButton";



const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const navigate = useNavigate();
    return (
        <Nav>
            <Logo />
            <NavList>
                <NavLink onClick={() => navigate('/news')}>게시판</NavLink>
                <NavLink onClick={() => navigate('/todaynews')}>오늘의뉴스</NavLink>
                <NavLink onClick={() => navigate('/health')}>헬스체크</NavLink>
            </NavList>
            
            <ButtonStyle>
            <SendButton onClick={openModal}>구독하기</SendButton>
            </ButtonStyle>
            {isModalOpen && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <LoginForm />
                    </ModalContent>

                </ModalOverlay>
            )}
        </Nav>
        

    );
}

export default Navbar;

const Nav = styled.nav`
    height: 60px;
    background-color:rgba(255,255,255,0.8);
    display:flex;
    position:fixed;
    align-items: center;
    top:0px;
    width:100%;
    padding: 10px;
    box-sizing: border-box;
    z-index:1000;
`;

const NavList = styled.div`
    display: flex;
    gap: 30px;
    margin-left: 2rem;
    align-items: center;
`;

const NavLink = styled.button`
    background: none;
    border: none;
    font-size: 1rem;
    color: #333;
    cursor: pointer;
    padding: 8px 12px;
    transition: background-color 0.2s ease;

    &:hover {
        color: ${({theme}) => theme.mainGreen};
    }
`;
const ButtonStyle = styled.div`
    margin-left:auto;
        button {
        padding: 10px 15px;
        font-size: 0.9rem;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
`;

const ModalContent = styled.div`
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    z-index: 1002;

    width: 400px;
    max-width: 60vw;
    max-height: 80vh;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;