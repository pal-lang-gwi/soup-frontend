import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from "./styles/theme";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoggedInHomePage from "./components/LoggedInHomePage";
import NewsList from "./pages/NewsList";
import HealthCheck from "./pages/HealthCheck";
import FirstLogin from "./pages/FirstLogin";
import AdminPage from "./pages/AdminPage";
import AdminGuard from "./components/AdminGuard";
import "./App.css";
import "./index.css";

// React Query 클라이언트 생성
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

// 인증이 필요한 컴포넌트를 감싸는 래퍼
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <div>로딩 중...</div>;
	}

	return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

// 로그인하지 않은 사용자만 접근 가능한 컴포넌트를 감싸는 래퍼
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <div>로딩 중...</div>;
	}

	return !isAuthenticated ? <>{children}</> : <Navigate to="/home" replace />;
};

const AppRoutes: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Router>
			<Routes>
				{/* 로그인하지 않은 사용자를 위한 홈페이지 */}
				<Route
					path="/"
					element={
						<PublicRoute>
							<HomePage />
						</PublicRoute>
					}
				/>

				{/* 로그인한 사용자를 위한 홈페이지 */}
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<LoggedInHomePage />
						</ProtectedRoute>
					}
				/>

				{/* 기타 보호된 라우트들 */}
				<Route
					path="/news"
					element={
						<ProtectedRoute>
							<NewsList />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/health"
					element={
						<ProtectedRoute>
							<HealthCheck />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/first-login"
					element={
						<ProtectedRoute>
							<FirstLogin />
						</ProtectedRoute>
					}
				/>

				{/* 관리자 페이지 - 로그인 + 관리자 권한 필요 */}
				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<AdminGuard>
								<AdminPage />
							</AdminGuard>
						</ProtectedRoute>
					}
				/>

				{/* 기본 리다이렉트 */}
				<Route
					path="*"
					element={<Navigate to={isAuthenticated ? "/home" : "/"} replace />}
				/>
			</Routes>
		</Router>
	);
};

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<AppRoutes />
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
