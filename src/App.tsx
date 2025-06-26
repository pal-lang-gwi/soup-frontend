import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoggedInHomePage from "./components/LoggedInHomePage";
import NewsList from "./pages/NewsList";
import HealthCheck from "./pages/HealthCheck";
import FirstLogin from "./pages/FirstLogin";
import AdminPage from "./pages/AdminPage";
import LoginRequiredModal from "./components/LoginRequiredModal";
import AdminRoute from "./components/AdminRoute";
import "./App.css";
import "./index.css";

// 인증이 필요한 컴포넌트를 감싸는 래퍼
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <div>로딩 중...</div>;
	}

	return isAuthenticated ? <>{children}</> : <LoginRequiredModal />;
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

				{/* 어드민 전용 라우트 */}
				<Route
					path="/admin"
					element={
						<AdminRoute>
							<AdminPage />
						</AdminRoute>
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
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
