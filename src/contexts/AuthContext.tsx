import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { api } from "../api/axiosInstance";

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

	// 서버에 로그인 상태 확인 요청
	const checkAuthStatus = async () => {
		try {
			const response = await api.get("/api/v1/users");
			if (response.status === 200) {
				setIsAuthenticated(true);
				setUser(response.data.data);
			}
		} catch (error) {
			// 401, 403 등 인증 실패 시 로그아웃 상태로 설정
			setIsAuthenticated(false);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// 앱 시작 시 서버에 로그인 상태 확인
		checkAuthStatus();
	}, []);

	const login = (userData: any) => {
		setIsAuthenticated(true);
		setUser(userData);
	};

	const logout = async () => {
		try {
			// 서버에 로그아웃 요청 (HttpOnly 쿠키 제거)
			await api.post("/api/v1/auth/logout");
		} catch (error) {
			console.error("로그아웃 API 호출 실패:", error);
		} finally {
			// 클라이언트 상태 초기화
			setIsAuthenticated(false);
			setUser(null);
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
