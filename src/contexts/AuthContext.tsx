import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	ReactNode,
} from "react";
import { getCurrentUser } from "../api/auth/login";
import { User } from "../types/auth";

interface AuthContextType {
	isAuthenticated: boolean;
	user: User | null;
	login: (userData: User) => void;
	logout: () => void;
	loading: boolean;
	isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 앱 시작 시 현재 사용자 정보 조회
		const checkAuthStatus = async () => {
			try {
				const userData = await getCurrentUser();
				if (userData) {
					setUser(userData);
					setIsAuthenticated(true);
				}
			} catch (error) {
				console.error("인증 상태 확인 실패:", error);
			} finally {
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	const login = useCallback((userData: User) => {
		setIsAuthenticated(true);
		setUser(userData);
	}, []);

	const logout = useCallback(() => {
		setIsAuthenticated(false);
		setUser(null);
		// 로그아웃은 서버에서 쿠키 만료 처리
	}, []);

	const isAdmin = useCallback((): boolean => {
		return user?.role === "ADMIN";
	}, [user?.role]);

	const value = {
		isAuthenticated,
		user,
		login,
		logout,
		loading,
		isAdmin,
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
