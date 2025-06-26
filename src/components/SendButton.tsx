import React, { useCallback } from "react";
import styled from "styled-components";

interface Props {
	children?: React.ReactNode;
	onClick?: () => void;
}

const SendButton: React.FC<Props> = React.memo(({ children, onClick }) => {
	const handleClick = useCallback(() => {
		onClick?.();
	}, [onClick]);

	return (
		<StyledWrapper>
			<button onClick={handleClick}>
				<div className="svg-wrapper-1">
					<div className="svg-wrapper">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
						>
							<path fill="none" d="M0 0h24v24H0z" />
							<path
								fill="currentColor"
								d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
							/>
						</svg>
					</div>
				</div>
				<span>{children ?? "Send"}</span>
			</button>
		</StyledWrapper>
	);
});

SendButton.displayName = "SendButton";

const StyledWrapper = styled.div`
	button {
		font-family: inherit;
		font-size: 20px;
		background: ${({ theme }) => theme.buttonColor};
		color: white;
		padding: 0.7em 1em;
		padding-left: 0.9em;
		display: flex;
		align-items: center;
		border: none;
		border-radius: 16px;
		overflow: hidden;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		min-height: 44px;
		touch-action: manipulation;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		will-change: transform, box-shadow;
		transform: translateZ(0);
	}

	button span {
		display: block;
		margin-left: 0.3em;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: transform;
	}

	button svg {
		display: block;
		transform-origin: center center;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: transform;
	}

	button:hover {
		background: ${({ theme }) => theme.mainGreen};
		transform: translateY(-1px) translateZ(0);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	button:hover .svg-wrapper {
		animation: fly-1 0.6s ease-in-out infinite alternate;
	}

	button:hover svg {
		transform: translateX(1.2em) rotate(45deg) scale(1.1) translateZ(0);
	}

	button:hover span {
		transform: translateX(5em) translateZ(0);
	}

	button:active {
		transform: scale(0.95) translateZ(0);
	}

	@keyframes fly-1 {
		from {
			transform: translateY(0.1em) translateZ(0);
		}

		to {
			transform: translateY(-0.1em) translateZ(0);
		}
	}

	@media (max-width: 768px) {
		button {
			font-size: 18px;
			padding: 0.6em 0.8em;
			padding-left: 0.8em;
			min-height: 48px;
		}

		button:hover span {
			transform: translateX(3em) translateZ(0);
		}

		button:hover svg {
			transform: translateX(0.8em) rotate(45deg) scale(1.1) translateZ(0);
		}
	}

	@media (max-width: 480px) {
		button {
			font-size: 16px;
			padding: 0.5em 0.7em;
			padding-left: 0.7em;
			min-height: 44px;
		}

		button:hover span {
			transform: translateX(2.5em) translateZ(0);
		}

		button:hover svg {
			transform: translateX(0.6em) rotate(45deg) scale(1.1) translateZ(0);
		}
	}
`;

export default SendButton;
