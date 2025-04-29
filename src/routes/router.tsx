import { Route, Routes } from "react-router";
import FirstLogin from "../pages/FirstLogin";
import HomePage from "../pages/HomePage";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<FirstLogin />} />
    </Routes>
)
export default AppRoutes;