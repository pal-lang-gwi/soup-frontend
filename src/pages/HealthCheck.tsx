import { useState } from "react";
import styled from "styled-components";
import { axiosServerHealth } from "../api/serverhealth";
import Navbar from "../components/Navbar";
import RecheckButton from "../components/RecheckButton";

function HealthCheck() {
	const [message, setMessage] = useState("");

	const handleHealthCheck = async () => {
		try {
			const response = await axiosServerHealth();
			setMessage(response.data);
		} catch (error) {
			setMessage("서버 쉬는 중");
			console.error("Healt Check 실패 :", error);
		}
	};

	return (
		<>
			<Navbar />
			<Background>
				<ContentWrapper>
					<RecheckButton onClick={handleHealthCheck}>서버야!</RecheckButton>
					{message && <Message>{message}</Message>}
				</ContentWrapper>
			</Background>
		</>
	);
}

export default HealthCheck;

const Background = styled.div`
	position: relative;
	background-color: white;
	height: 100vh;
	overflow: hidden;
`;

const ContentWrapper = styled.div`
	display: flex;
	margin-top: 10vh;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	min-height: 20vh;
	position: relative;
	z-index: 1;
`;

const Message = styled.div`
	margin-top: 1rem;
	font-size: 1.1rem;
	color: #333;
`;
