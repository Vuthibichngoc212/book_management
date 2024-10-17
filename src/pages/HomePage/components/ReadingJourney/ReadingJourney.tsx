import { Box, Typography, Button } from '@mui/material';

const ReadingJourney = () => {
	return (
		<Box
			sx={{
				backgroundColor: '#F4A261',
				padding: '50px',
				textAlign: 'center',
				marginTop: '50px',
				borderRadius: '8px'
			}}
		>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 'bold',
					color: '#000',
					marginBottom: '16px'
				}}
			>
				Bắt đầu hành trình đọc sách của bạn
			</Typography>
			<Typography
				sx={{
					fontSize: '16px',
					color: '#555',
					marginBottom: '32px'
				}}
			>
				Không cần đăng ký. Bắt đầu khám phá thế giới của những câu chuyện ngay hôm nay.
			</Typography>
			<Button
				variant="contained"
				color="primary"
				sx={{
					backgroundColor: '#E76F51',
					color: '#fff',
					fontWeight: 'bold',
					padding: '10px 20px',
					fontSize: '16px',
					borderRadius: '15px',
					'&:hover': {
						backgroundColor: '#E76F51'
					}
				}}
			>
				Mua sách ngay
			</Button>
		</Box>
	);
};

export default ReadingJourney;
