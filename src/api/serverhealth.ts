import { api } from "./axiosInstance";

export const axiosServerHealth = () => {
	return api.get("/health");
};
