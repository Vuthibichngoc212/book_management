import { Box, Typography, Divider } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { useGetAllCategoriesQuery } from '@/api/api.caller';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import categoryDefault from '@/assets/image/bup-sen-xanh.webp';
import categoryAlt from '@/assets/image/category.webp';

import { Navigation } from 'swiper/modules';

const CategoryList = () => {
	const { data: categoriesData, isLoading, isError } = useGetAllCategoriesQuery(undefined);

	if (isLoading) return <Typography>Loading...</Typography>;
	if (isError) return <Typography>Error loading categories</Typography>;

	const categories = categoriesData?.data?.elements || [];

	return (
		<Box
			sx={{
				padding: '16px',
				borderRadius: '8px',
				margin: '16px 34px',
				backgroundColor: '#fff'
			}}
		>
			<Box sx={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
				<CategoryIcon sx={{ marginRight: '8px' }} />
				<Typography
					variant="h6"
					sx={{
						fontWeight: 'bold',
						color: 'text.primary'
					}}
				>
					Danh mục sản phẩm
				</Typography>
			</Box>
			<Divider />

			<Swiper modules={[Navigation]} spaceBetween={16} slidesPerView={5} navigation>
				{categories.map((category: any, index: number) => (
					<SwiperSlide key={index}>
						<Box
							sx={{
								textAlign: 'center',
								margin: '8px',
								cursor: 'pointer'
							}}
						>
							<img
								src={category.image || (index % 2 === 0 ? categoryDefault : categoryAlt)}
								alt={category.categoryName}
								style={{
									width: '80px',
									height: '80px',
									objectFit: 'contain',
									marginBottom: '8px'
								}}
							/>
							<Typography variant="body2">{category.categoryName}</Typography>
						</Box>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};

export default CategoryList;
