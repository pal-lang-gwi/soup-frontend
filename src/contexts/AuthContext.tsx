import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { logout as logoutApi } from "../api/auth";
import { getUserInfo, UserResponseDto } from "../api/user";
import { api } from "../api/axiosInstance";

interface AuthContextType {
	isAuthenticated: boolean;
	user: "ROLE_ADMIN" | "USER" | "ROLE_USER" | "ADMIN";
	userInfo: UserResponseDto | null;
	login: (userData: any) => void;
	logout: () => void;
	loading: boolean;
	refetchUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<any | null>(null);
	const [userInfo, setUserInfo] = useState<UserResponseDto | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchUserInfo = async () => {
		try {
			const userData = await getUserInfo();
			setUserInfo(userData);
			setUser(userData.role);
			return userData;
		} catch (error) {
			console.error("사용자 정보 조회 실패:", error);
			throw error;
		}
	};

	const refetchUserInfo = async () => {
		await fetchUserInfo();
	};

	useEffect(() => {
		const verifyAuthStatus = async () => {
			try {
				// 백엔드의 보호된 엔드포인트에 요청하여 인증 상태 확인
				// 브라우저가 HttpOnly access_token 쿠키를 자동으로 첨부합니다.
				const response = await api.get("/users", { withCredentials: true });

				// 요청이 성공했다면 (200 OK 등), 사용자는 인증된 상태
				setIsAuthenticated(true);
				setUser(response.data.data.role); // 서버에서 받은 최신 사용자 정보로 업데이트
				setUserInfo(response.data.data); // 사용자 정보도 저장

				// 중요: 인증이 확인되었으므로, 사용자 정보를 로컬 스토리지에 저장합니다.
				localStorage.setItem("user", JSON.stringify(response.data));
			} catch (error) {
				// 요청 실패 (예: 401 Unauthorized)는 인증되지 않았음을 의미
				console.error("인증 상태 확인 실패:", error);
				setIsAuthenticated(false);
				setUser(null);
				setUserInfo(null);
				// 중요: 에러 발생 시 localStorage의 사용자 정보도 반드시 제거합니다.
				localStorage.removeItem("user");
			} finally {
				setLoading(false);
			}
		};

		verifyAuthStatus();
	}, []);

	// ... (login 및 logout 함수는 이전과 동일하게 유지)
	const login = (userData: any) => {
		setIsAuthenticated(true);
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = async () => {
		try {
			console.log("사용자 권한 : ", user.role);
			await logoutApi(); // 백엔드에 로그아웃 요청 (여기서 쿠키가 무효화되어야 함)

			console.log("로그아웃 호출");
			console.log("로그인이 되어있나?", isAuthenticated);
		} catch (error) {
			console.error("로그아웃 API 호출 실패:", error);
			// API 호출 실패하더라도 클라이언트 상태는 로그아웃으로 처리
		} finally {
			// 이 부분이 핵심입니다!
			setIsAuthenticated(false); // ✅ isAuthenticated 상태를 false로 설정
			setUser(null);
			setUserInfo(null);
			localStorage.removeItem("user");
		}
	};

	const value = {
		isAuthenticated,
		user,
		userInfo,
		login,
		logout,
		loading,
		refetchUserInfo,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
