import { Navigate, useOutlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import styles from './layouts.module.css';
import { ROUTE_PATH } from '@/constants/routePath.constant';
import SideBar from '../SidebarLayout/SidebarLayout';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';

function ProtectedLayout() {
	const outlet = useOutlet();
	// const dispatch = useAppDispatch();
	// const { user } = useAppSelector(selectUser);
	const user = true;

	if (!user) {
		return <Navigate to={ROUTE_PATH.AUTH.LOGIN} />;
	}

	return (
		<Box className={styles.container}>
			<SideBar />
			<Stack
				sx={{
					width: '100%'
				}}
			>
				<HeaderAdmin />
				<Stack
					sx={{
						margin: '1rem 0 0 0',
						padding: '0 10px'
					}}
				>
					<Box sx={{ mb: '1rem' }}> {outlet}</Box>
				</Stack>
			</Stack>
		</Box>
	);
}

export default ProtectedLayout;
