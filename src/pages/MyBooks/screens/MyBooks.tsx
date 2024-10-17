import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import { Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';

const MyBooks = () => {
	return (
		<>
			<ToastContainer />
			<Header />
			<Box sx={{ marginTop: '80px' }}>
				<Typography>aaaaaaa</Typography>
			</Box>
			<Footer />
		</>
	);
};

export default MyBooks;
