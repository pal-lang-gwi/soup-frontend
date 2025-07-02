import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AdditionalInfoModal from "./AdditionalInfoModal";

interface AdditionalInfoGuardProps {
	children: React.ReactNode;
}

const AdditionalInfoGuard: React.FC<AdditionalInfoGuardProps> = ({
	children,
}) => {
	const { user, userInfo } = useAuth();
	const [showModal, setShowModal] = useState(false);

	// 사용자 정보 로드 후 추가 정보 확인
	useEffect(() => {
		if (userInfo) {
			const hasAdditionalInfo =
				userInfo.nickname && userInfo.gender && userInfo.birthDate;
			if (!hasAdditionalInfo) {
				setShowModal(true);
			}
		}
	}, [userInfo]);

	// 사용자가 없으면 children을 렌더링
	if (!user) {
		return <>{children}</>;
	}

	return (
		<>
			{children}
			<AdditionalInfoModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			/>
		</>
	);
};

export default AdditionalInfoGuard;
