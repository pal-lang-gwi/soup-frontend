import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./styles/theme";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoggedInHomePage from "./components/LoggedInHomePage";
import NewsList from "./pages/NewsList";
import HealthCheck from "./pages/HealthCheck";
import FirstLogin from "./pages/FirstLogin";
import AdminPage from "./pages/AdminPage";
import UserInit from "./pages/UserInit";
import AdditionalInfoGuard from "./components/AdditionalInfoGuard";
import "./App.css";
import "./index.css";
import MyPage from "./pages/MyPage";

// React Query 클라이언트 생성
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// 한 번 가져온 유저 정보는 5분간 유지
			staleTime: 300000,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
});

const AppRoutes: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* 모든 페이지에 자유롭게 접근 가능 */}
				<Route path="/" element={<HomePage />} />
				<Route path="/user-init" element={<UserInit />} />
				<Route path="/first-login" element={<FirstLogin />} />
				<Route path="/health" element={<HealthCheck />} />

				{/* 인증이 필요한 페이지들 */}
				<Route
					path="/home"
					element={
						<AdditionalInfoGuard>
							<LoggedInHomePage />
						</AdditionalInfoGuard>
					}
				/>
				<Route
					path="/news"
					element={
						<AdditionalInfoGuard>
							<NewsList />
						</AdditionalInfoGuard>
					}
				/>

				<Route
					path="/mypage"
					element={
						<AdditionalInfoGuard>
						<MyPage />
						</AdditionalInfoGuard>
					}
				/>

				<Route
					path="/admin"
					element={
						<AdditionalInfoGuard>
							<AdminPage />
						</AdditionalInfoGuard>
					}
				/>

				{/* 기본 리다이렉트 */}
				<Route path="*" element={<Navigate to="/" replace />} />
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
