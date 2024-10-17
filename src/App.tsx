import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store, { persistor } from '@/redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoute from '@/routes/AppRoute.tsx';

function App() {
	return (
		<SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<AppRoute />
				</PersistGate>
			</Provider>
		</SnackbarProvider>
	);
}

export default App;
