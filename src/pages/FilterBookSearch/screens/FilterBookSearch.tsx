import {
	useGetAllCategoriesQuery,
	useGetBookPublishersQuery,
	useGetBooksQuery
} from '@/api/api.caller';
import NoDataCommon from '@/components/common/NoDataCommon/NoDataCommon';
import { Header } from '@/components/layout';
import {
	Box,
	Typography,
	Paper,
	Divider,
	FormControlLabel,
	Checkbox,
	Rating,
	CircularProgress,
	FormControl,
	Select,
	MenuItem
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FilterBookSearch = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [sortOrder, setSortOrder] = useState('');
	const { books } = location.state || { books: [] };
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedPublisher, setSelectedPublisher] = useState('');
	const [priceRange, setPriceRange] = useState('');
	const [currentBooks, setCurrentBooks] = useState(books);
	const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
	const categories = categoriesData?.data?.elements || [];
	const { data: publishersData } = useGetBookPublishersQuery(undefined);
	const publishers = publishersData?.data?.elements || [];

	const buildQuery = () => {
		const params = new URLSearchParams();

		if (selectedCategory) {
			params.append('category', selectedCategory);
		}

		if (selectedPublisher) {
			params.append('publisher', selectedPublisher);
		}

		if (priceRange) {
			const [min, max] = priceRange.split('-');
			params.append('priceMin', min);
			params.append('priceMax', max);
		}

		params.append('sort', sortOrder);

		return params.toString();
	};

	const {
		data: booksData,
		isFetching,
		refetch
	} = useGetBooksQuery(buildQuery(), {
		skip: !selectedCategory && !selectedPublisher && !sortOrder && !priceRange
	});

	const handleBookClick = (bookId: number) => {
		navigate(`/books/${bookId}`);
	};

	useEffect(() => {
		if (booksData) {
			setCurrentBooks(booksData.data.elements);
		}
	}, [booksData]);

	useEffect(() => {
		if (sortOrder || selectedCategory || selectedPublisher || priceRange) {
			refetch();
		}
	}, [sortOrder, selectedCategory, selectedPublisher, priceRange, refetch]);

	const handleChangeSort = (event: any) => {
		setSortOrder(event.target.value);
	};

	const handleCategoryChange = (event: any) => {
		setSelectedCategory(event.target.value);
	};

	const handlePublisherChange = (event: any) => {
		setSelectedPublisher(event.target.value);
	};

	return (
		<>
			<Header />
			<Box
				sx={{
					margin: '100px 24px 24px 24px',
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						sm: '220px 1fr'
					},
					gap: '24px',
					cursor: 'pointer'
				}}
			>
				<Paper
					sx={{
						padding: '16px',
						borderRadius: '8px',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
						width: {
							xs: '100%',
							sm: '195px'
						}
					}}
				>
					<Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#E76F51' }}>
						LỌC THEO
					</Typography>
					<Divider sx={{ marginY: '10px' }} />
					<Box>
						<Typography sx={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>
							Danh mục chính
						</Typography>
						<Box>
							{categories.map((category: any) => (
								<FormControlLabel
									key={category.id}
									control={
										<Checkbox
											value={category.id.toString()}
											checked={selectedCategory === category.id.toString()}
											onChange={handleCategoryChange}
										/>
									}
									label={<Typography sx={{ fontSize: '14px' }}>{category.categoryName}</Typography>}
								/>
							))}
						</Box>
					</Box>
					<Divider sx={{ marginY: '10px' }} />
					<Box>
						<Typography sx={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>
							GIÁ
						</Typography>
						{[
							{ value: '0-150000', label: '0đ - 150,000đ' },
							{ value: '150000-300000', label: '150,000đ - 300,000đ' },
							{ value: '300000-500000', label: '300,000đ - 500,000đ' },
							{ value: '500000-700000', label: '500,000đ - 700,000đ' },
							{ value: '700000-', label: '700,000đ Trở lên' }
						].map((option) => (
							<FormControlLabel
								key={option.value}
								control={
									<Checkbox
										checked={priceRange === option.value}
										onChange={() => setPriceRange(option.value)}
										name="price-range"
									/>
								}
								label={<Typography sx={{ fontSize: '14px' }}>{option.label}</Typography>}
							/>
						))}
					</Box>
					<Divider sx={{ marginY: '10px' }} />
					<Box>
						<Typography
							sx={{
								fontSize: '14px',
								fontWeight: '600',
								textTransform: 'uppercase'
							}}
						>
							Nhà phát hành
						</Typography>
						<Box>
							{publishers.map((publisher: any) => (
								<FormControlLabel
									key={publisher.id}
									control={
										<Checkbox
											value={publisher.name}
											checked={selectedPublisher === publisher.name}
											onChange={handlePublisherChange}
										/>
									}
									label={<Typography sx={{ fontSize: '14px' }}>{publisher.name}</Typography>}
								/>
							))}
						</Box>
					</Box>
				</Paper>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
					<Paper
						sx={{
							padding: '16px',
							borderRadius: '8px',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
							KẾT QUẢ TÌM KIẾM:{' '}
							{isFetching ? (
								<CircularProgress size={14} />
							) : (
								booksData?.data?.totalElements || currentBooks.length
							)}
						</Typography>

						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Typography
								sx={{ marginRight: '8px', fontSize: '16px', color: 'rgb(128, 128, 137)' }}
							>
								Sắp xếp
							</Typography>
							<FormControl sx={{ minWidth: '150px' }}>
								<Select
									id="price-sort"
									value={sortOrder}
									onChange={handleChangeSort}
									displayEmpty
									sx={{
										borderRadius: '8px',
										height: '36px',
										backgroundColor: '#ffffff',
										padding: '0 12px',
										'& .MuiOutlinedInput-notchedOutline': {
											borderColor: '#c4c4c4'
										},
										'&:hover .MuiOutlinedInput-notchedOutline': {
											borderColor: '#3f51b5'
										},
										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: '#3f51b5'
										}
									}}
								>
									<MenuItem value="">Tất cả</MenuItem>
									<MenuItem value="asc">Giá thấp đến cao</MenuItem>
									<MenuItem value="des">Giá cao đến thấp</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Paper>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								sm: 'repeat(2, 1fr)',
								md: 'repeat(4, 1fr)'
							},
							gap: '16px'
						}}
					>
						{currentBooks?.length > 0 ? (
							currentBooks.map((book: any, index: any) => (
								<Paper
									onClick={() => handleBookClick(book.id)}
									key={index}
									sx={{
										padding: '8px',
										borderRadius: '8px',
										boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
									}}
								>
									<img src={book.image} alt={book.title} style={{ width: '100%' }} />
									<Typography
										sx={{ fontSize: '18px', fontWeight: '600', color: '#E76F51', marginTop: '4px' }}
									>
										{book.price} đ
									</Typography>
									<Typography sx={{ fontSize: '14px', fontWeight: '500', marginTop: '3px' }}>
										{book.title}
									</Typography>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											marginTop: '6px'
										}}
									>
										<Rating
											value={book.averageRating}
											precision={0.5}
											readOnly
											size="small"
											sx={{ fontSize: '14px' }}
										/>
										<Typography
											sx={{
												marginLeft: '5px',
												color: '#75787B',
												fontWeight: 'bold',
												fontSize: '14px'
											}}
										>
											({book.purchaseCount} đã bán)
										</Typography>
									</Box>
								</Paper>
							))
						) : (
							<Box
								sx={{
									gridColumn: '1 / -1'
								}}
							>
								<NoDataCommon />
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default FilterBookSearch;
