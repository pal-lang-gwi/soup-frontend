import { Route, Routes } from "react-router";
import NewsPage from "../../widgets/news-list/NewsPage";
import HealthCheck from "../../pages/HealthCheck";
import HomePage from "../../pages/HomePage";
import NewsList from "../../pages/NewsList";
import AdminPage from "../../pages/AdminPage";
import AdminGuard from "../../components/AdminGuard";
import LoggedInHomePage from "../../pages/home/LoggedInHomePage";
import AdditionalInfoGuard from "../../features/auth/AdditionalInfoGuard";

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
