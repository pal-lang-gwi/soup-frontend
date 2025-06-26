import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
					router: ["react-router", "react-router-dom"],
					styled: ["styled-components"],
					query: ["@tanstack/react-query"],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},
	optimizeDeps: {
		include: ["react", "react-dom", "styled-components"],
	},
});
