import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import AvatarI from '@/assets/image/avatar-icon.png';

const feedbacks = [
	{
		id: 1,
		name: 'Emily Thompson',
		avatar: AvatarI,
		rating: 5,
		comment: 'A heaven for book lovers!'
	},
	{
		id: 2,
		name: 'Michael Chen',
		avatar: AvatarI,
		rating: 5,
		comment: 'Great collection and cozy atmosphere.'
	},
	{
		id: 3,
		name: 'Sofia Rodriguez',
		avatar: AvatarI,
		rating: 5,
		comment: 'Best bookstore experience ever!'
	}
];

const FeedbackSection = () => {
	return (
		<Box sx={{ margin: '50px 0' }}>
			<Typography
				sx={{
					fontSize: '30px',
					fontWeight: 'bold',
					color: '#000',
					textAlign: 'center',
					marginBottom: '30px'
				}}
			>
				Phản hồi của người mua
			</Typography>
			<Swiper
				spaceBetween={30}
				slidesPerView={3}
				pagination={{ clickable: true }}
				navigation
				modules={[Pagination, Navigation]}
				style={{ padding: '0 50px' }}
			>
				{feedbacks.map((feedback) => (
					<SwiperSlide key={feedback.id}>
						<Card
							sx={{
								padding: '20px',
								boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
								borderRadius: '8px',
								textAlign: 'center',
								minHeight: '200px'
							}}
						>
							<CardContent>
								<Avatar
									alt={feedback.name}
									src={feedback.avatar}
									sx={{ width: 56, height: 56, margin: '0 auto 10px' }}
								/>
								<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
									{feedback.name}
								</Typography>
								<Typography
									sx={{
										color: '#FFD700',
										fontSize: '20px',
										margin: '10px 0'
									}}
								>
									{'★'.repeat(feedback.rating)}
								</Typography>
								<Typography variant="body2" sx={{ color: '#757575' }}>
									{feedback.comment}
								</Typography>
							</CardContent>
						</Card>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};

export default FeedbackSection;
