import React, { useRef, useEffect } from "react";
import canvasConfetti, { CreateTypes } from "canvas-confetti";
import { UI_CONSTANTS } from "../constants/ui";

interface ConfettiEffectProps {
	fireTrigger: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ fireTrigger }) => {
	const confettiRef = useRef<CreateTypes | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		confettiRef.current = canvasConfetti.create(canvasRef.current, {
			resize: true,
			useWorker: true,
		});
	}, []);

	useEffect(() => {
		if (!fireTrigger || !confettiRef.current) return;

		const confetti = confettiRef.current;
		const { CONFETTI } = UI_CONSTANTS;

		// 왼쪽 아래에서 발사
		confetti({
			particleCount: CONFETTI.PARTICLE_COUNT,
			angle: 60,
			spread: CONFETTI.SPREAD,
			startVelocity: CONFETTI.START_VELOCITY,
			gravity: CONFETTI.GRAVITY,
			ticks: CONFETTI.TICKS,
			origin: { x: 0, y: 1 },
			colors: ["#FFD700", "#FF69B4", "#87CEFA", "#32CD32"],
			scalar: CONFETTI.SCALAR,
		});

		// 오른쪽 아래에서 발사
		confetti({
			particleCount: CONFETTI.PARTICLE_COUNT,
			angle: 120,
			spread: CONFETTI.SPREAD,
			startVelocity: CONFETTI.START_VELOCITY,
			gravity: CONFETTI.GRAVITY,
			ticks: CONFETTI.TICKS,
			origin: { x: 1, y: 1 },
			colors: ["#FFD700", "#FF69B4", "#87CEFA", "#32CD32"],
			scalar: CONFETTI.SCALAR,
		});
	}, [fireTrigger]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				pointerEvents: "none",
				zIndex: UI_CONSTANTS.Z_INDEX.CONFETTI,
			}}
		/>
	);
};

export default ConfettiEffect;
