import React, { useCallback } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface KeywordToggleProps {
	isActive: boolean;
	onToggle: () => void;
	onDelete: () => void;
	keywordName: string;
}

const KeywordToggle: React.FC<KeywordToggleProps> = React.memo(
	({ isActive, onToggle, onDelete, keywordName }) => {
		const handleDelete = useCallback(
			(e: React.MouseEvent) => {
				e.stopPropagation();
				if (window.confirm(`"${keywordName}" 키워드를 삭제하시겠습니까?`)) {
					onDelete();
				}
			},
			[keywordName, onDelete]
		);

		const handleToggle = useCallback(() => {
			onToggle();
		}, [onToggle]);

		return (
			<Container>
				<ToggleButton
					$isActive={isActive}
					onClick={handleToggle}
					title={isActive ? "비활성화" : "활성화"}
				>
					<ToggleSlider $isActive={isActive} />
				</ToggleButton>
				<DeleteButton onClick={handleDelete} title="삭제">
					<DeleteIcon viewBox="0 0 24 24">
						<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
					</DeleteIcon>
				</DeleteButton>
			</Container>
		);
	}
);

KeywordToggle.displayName = "KeywordToggle";

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
	position: relative;
	width: 44px;
	height: 24px;
	border-radius: 12px;
	border: none;
	cursor: pointer;
	background-color: ${({ $isActive }) =>
		$isActive ? theme.mainGreen : "#CBD5E0"};
	transition: background-color 0.2s ease;
	padding: 0;

	&:hover {
		background-color: ${({ $isActive }) => ($isActive ? "#5A9C6B" : "#A0AEC0")};
	}

	&:focus {
		outline: 2px solid ${theme.mainGreen};
		outline-offset: 2px;
	}
`;

const ToggleSlider = styled.div<{ $isActive: boolean }>`
	position: absolute;
	top: 2px;
	left: ${({ $isActive }) => ($isActive ? "22px" : "2px")};
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: white;
	transition: left 0.2s ease;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const DeleteButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	border: none;
	border-radius: 4px;
	background-color: transparent;
	cursor: pointer;
	color: #e53e3e;
	transition: all 0.2s ease;

	&:hover {
		background-color: #fed7d7;
		color: #c53030;
	}

	&:focus {
		outline: 2px solid #e53e3e;
		outline-offset: 2px;
	}
`;

const DeleteIcon = styled.svg`
	width: 16px;
	height: 16px;
	fill: currentColor;
`;

export default KeywordToggle;
