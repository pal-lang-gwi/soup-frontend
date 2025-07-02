import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/user";
import { useAuth } from "../contexts/AuthContext";
import AdditionalInfoModal from "./AdditionalInfoModal";

interface AdditionalInfoGuardProps {
	children: React.ReactNode;
}

const AdditionalInfoGuard: React.FC<AdditionalInfoGuardProps> = ({
	children,
}) => {
	const { user } = useAuth();
	const [showModal, setShowModal] = useState(false);

	// 사용자 정보 조회
	const { data: userInfo, isLoading } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
		enabled: !!user,
		staleTime: 5 * 60 * 1000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	// 사용자 정보 로드 후 추가 정보 확인
	useEffect(() => {
		if (userInfo && !isLoading) {
			const hasAdditionalInfo =
				userInfo.nickname && userInfo.gender && userInfo.birthDate;
			if (!hasAdditionalInfo) {
				setShowModal(true);
			}
		}
	}, [userInfo, isLoading]);

	// 로딩 중이거나 사용자가 없으면 children을 렌더링
	if (isLoading || !user) {
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
