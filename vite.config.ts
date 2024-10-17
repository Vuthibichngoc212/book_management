import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react(), svgr(), viteTsconfigPaths()],
		define: {
			'process.env': process.env
		},
		resolve: {
			alias: [
				{
					find: '@',
					replacement: path.resolve(__dirname, './src')
				}
			]
		},
		server: {
			host: 'localhost',
			open: true,
			port: parseInt(env.VITE_REACT_PORT, 10),
			proxy: {
				'/api/v1': {
					target: env.VITE_REACT_APP_URL,
					secure: false,
					changeOrigin: true
				}
			}
		},
		esbuild: {
			drop: mode !== 'development' ? ['console', 'debugger'] : []
		}
	};
});
