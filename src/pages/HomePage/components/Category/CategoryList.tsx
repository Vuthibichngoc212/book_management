import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { useGetAllCategoriesQuery, useGetBooksQuery } from '@/api/api.caller';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import categoryDefault from '@/assets/image/bup-sen-xanh.webp';
import categoryAlt from '@/assets/image/category.webp';

import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CategoryList = () => {
	const navigate = useNavigate();
	const { data: categoriesData, isLoading, isError } = useGetAllCategoriesQuery(undefined);

	const [selectedCategory, setSelectedCategory] = useState('');

	const {
		data: booksData,
		refetch,
		isFetching
	} = useGetBooksQuery(`category=${selectedCategory}`, {
		skip: !selectedCategory
	});

	useEffect(() => {
		if (selectedCategory) {
			refetch();
		}
	}, [selectedCategory, refetch]);

	useEffect(() => {
		if (!isFetching && booksData && selectedCategory) {
			navigate('/filter-books-search', {
				state: {
					books: booksData?.data?.elements || [],
					selectedCategory
				}
			});
		}
	}, [isFetching, booksData, selectedCategory, navigate]);

	const handleCategoryClick = (categoryId: string) => {
		setSelectedCategory(categoryId);
	};

	if (isLoading)
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress />
			</Box>
		);
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
				<CategoryIcon sx={{ marginRight: '8px', color: '#E76F51' }} />
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
							onClick={() => handleCategoryClick(category.id)}
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
