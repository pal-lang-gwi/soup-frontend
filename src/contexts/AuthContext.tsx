import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { logout as logoutApi } from "../api/auth";

interface AuthContextType {
	isAuthenticated: boolean;
	user: any | null;
	login: (userData: any) => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 로컬 스토리지에서 인증 상태 확인
		const token = localStorage.getItem("accessToken");
		const userData = localStorage.getItem("user");

		if (token && userData) {
			setIsAuthenticated(true);
			setUser(JSON.parse(userData));
		}

		setLoading(false);
	}, []);

	const login = (userData: any) => {
		setIsAuthenticated(true);
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = async () => {
		try {
			// 서버에 로그아웃 요청
			await logoutApi();
		} catch (error) {
			console.error("로그아웃 API 호출 실패:", error);
			// API 호출이 실패해도 클라이언트에서는 로그아웃 처리
		} finally {
			// 클라이언트 상태 정리
			setIsAuthenticated(false);
			setUser(null);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("user");
		}
	};

	const value = {
		isAuthenticated,
		user,
		login,
		logout,
		loading,
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
