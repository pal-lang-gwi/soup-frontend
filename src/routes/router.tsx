import { Route, Routes } from "react-router";
import NewsPage from "../components/NewsPage";
import FirstLogin from "../pages/FirstLogin";
import HealthCheck from "../pages/HealthCheck";
import HomePage from "../pages/HomePage";
import NewsList from "../pages/NewsList";
import AdminPage from "../pages/AdminPage";
import AdminGuard from "../components/AdminGuard";
import LoggedInHomePage from "../components/LoggedInHomePage";
import AdditionalInfoGuard from "../components/AdditionalInfoGuard";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route
			path="/home"
			element={
				<AdditionalInfoGuard>
					<LoggedInHomePage />
				</AdditionalInfoGuard>
			}
		/>
		<Route path="/signup" element={<FirstLogin />} />
		<Route
			path="/news"
			element={
				<AdditionalInfoGuard>
					<NewsList />
				</AdditionalInfoGuard>
			}
		/>
		<Route
			path="/todaynews"
			element={
				<AdditionalInfoGuard>
					<NewsPage />
				</AdditionalInfoGuard>
			}
		/>
		<Route path="/health" element={<HealthCheck />} />
		<Route
			path="/admin"
			element={
				<AdminGuard>
					<AdditionalInfoGuard>
						<AdminPage />
					</AdditionalInfoGuard>
				</AdminGuard>
			}
		/>
	</Routes>
);
export default AppRoutes;
