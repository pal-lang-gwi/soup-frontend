import canvasConfetti, { CreateTypes } from "canvas-confetti";
import { useEffect, useRef } from "react";

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
        if (fireTrigger && confettiRef.current) {
        const confetti = confettiRef.current;

        // 왼쪽 아래
        confetti({
            particleCount: 300,
            angle: 60,
            spread: 100,
            startVelocity: 70,
            gravity: 0.5,
            ticks: 300,
            origin: { x: 0, y: 1 },
            colors: ["#FFD700", "#FF69B4", "#87CEFA", "#32CD32"],
            scalar: 0.9,
        });

        // 오른쪽 아래
        confetti({
            particleCount: 300,
            angle: 120,
            spread: 100,
            startVelocity: 70,
            gravity: 0.5,
            ticks: 300,
            origin: { x: 1, y: 1 },
            colors: ["#FFD700", "#FF69B4", "#87CEFA", "#32CD32"],
            scalar: 0.9,
        });
        }
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
            zIndex: 9999,
        }}
        />
    );
};

export default ConfettiEffect;
