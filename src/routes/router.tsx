import { Route, Routes } from "react-router";
import NewsPage from "../components/NewsPage";
import FirstLogin from "../pages/FirstLogin";
import HealthCheck from "../pages/HealthCheck";
import HomePage from "../pages/HomePage";
import NewsList from "../pages/NewsList";
import AdminPage from "../pages/AdminPage";
import AdminGuard from "../components/AdminGuard";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<FirstLogin />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/todaynews" element={<NewsPage />} />
        <Route path="/health" element={<HealthCheck />} />
        <Route path="/admin" element={
            <AdminGuard>
                <AdminPage />
            </AdminGuard>
        } />
    </Routes>
)
export default AppRoutes;