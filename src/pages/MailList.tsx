import styled from "styled-components";
import Navbar from "../components/Navbar";

function MailList(){

    return(
        <>
        <Navbar />
        <Background>
        <GradientOverlay />
        <ContentWrapper>
        여기에 메일 조회
        {/* //TODO: 날짜별 조회 */}
        {/* //TODO: 페이지 조회 */}

        
        </ContentWrapper>
        </Background>
        </>
    );
}

export default MailList;

const Background = styled.div`
    position: relative;
    background-color: white;
    height: 100vh;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.mainColor} 0%,
        #ffffff 100%
    );
    z-index: 0;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20vh;
    position: relative;
    z-index: 1;
`;