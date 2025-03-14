import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		// proxy: {
		// 	'api':{
		// 		target: '8888',
		// 		changeOrigin: true,
		// 		secure: false,
		// 	}
		// }
	}
});
