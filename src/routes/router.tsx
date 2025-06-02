import { Route, Routes } from "react-router";
import NewsPage from "../components/NewsPage";
import FirstLogin from "../pages/FirstLogin";
import HealthCheck from "../pages/HealthCheck";
import HomePage from "../pages/HomePage";
import NewsList from "../pages/NewsList";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<FirstLogin />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/todaynews" element={<NewsPage />} />
        <Route path="/health" element={<HealthCheck />} />
    </Routes>
)
export default AppRoutes;