import { useState } from 'react';
import {
	Typography,
	Box,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	Rating,
	Button
} from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useGetAllBooksQuery } from '@/api/api.caller';
import { useNavigate } from 'react-router-dom';

const PopularBooks = () => {
	const navigate = useNavigate();
	const { data: booksData, isLoading, isError } = useGetAllBooksQuery(undefined);
	const [showMore, setShowMore] = useState(false);

	if (isLoading) return <Typography>Loading...</Typography>;
	if (isError) return <Typography>Error loading books</Typography>;

	const books = booksData?.data?.elements || [];

	const handleBookClick = (bookId: number) => {
		navigate(`/books/${bookId}`);
	};

	// Hiển thị 1 hoặc 2 hàng sách, mỗi hàng có 4 cuốn
	const visibleBooks = showMore ? books : books.slice(0, 8); // Hiển thị 8 cuốn sách ban đầu

	const handleShowMore = () => {
		setShowMore(true);
	};

	return (
		<Box sx={{ margin: '0px 34px' }}>
			<Box sx={{ position: 'relative', display: 'inline-block', margin: '48px 0px 8px 0px' }}>
				<Typography
					sx={{
						color: '#485bc7',
						fontSize: '34px',
						fontWeight: 'bold',
						position: 'relative',
						paddingBottom: '10px'
					}}
				>
					Các cuốn sách bán chạy
				</Typography>
				<Box
					sx={{
						position: 'absolute',
						left: 0,
						bottom: 0,
						width: '80px',
						height: '4px',
						backgroundColor: '#6AC539',
						borderRadius: '2px'
					}}
				/>
			</Box>
			<Box>
				<Grid container spacing={3} sx={{ marginTop: '15px' }}>
					{visibleBooks.map((book: any) => (
						<Grid item xs={12} sm={6} md={3} key={book.id}>
							<Card
								onClick={() => handleBookClick(book.id)}
								sx={{
									padding: '0px',
									position: 'relative',
									height: '100%',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
									borderRadius: '8px'
								}}
							>
								<CardMedia
									component="img"
									alt={book.title}
									height="140"
									image={book.image}
									sx={{ objectFit: 'fill' }}
								/>
								<CardContent>
									<Typography
										sx={{
											color: '#75787B',
											fontSize: '14px',
											display: 'flex',
											alignItems: 'center'
										}}
									>
										<BadgeOutlinedIcon
											sx={{
												width: '17px',
												height: '17px',
												marginRight: '5px',
												marginBottom: '8px'
											}}
										/>{' '}
										{book.publisher}
									</Typography>
									<Typography
										gutterBottom
										sx={{
											color: '#485CC7 !important',
											fontWeight: 'bold',
											fontSize: '16px',
											minHeight: '48px'
										}}
									>
										{book.title}
									</Typography>

									<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
										<Rating value={book.averageRating} precision={0.5} readOnly size="small" />
										<Typography sx={{ marginLeft: '8px', color: '#75787B', fontWeight: 'bold' }}>
											{book.averageRating.toFixed(1)} ({book.purchaseCount} đã bán)
										</Typography>
									</Box>

									<Typography
										sx={{
											fontWeight: 'bold',
											color: '#485CC7',
											marginBottom: '16px',
											marginTop: '24px',
											fontSize: '20px'
										}}
									>
										{book.price} VND
									</Typography>
									<Divider />
									<Box
										sx={{
											marginTop: '16px',
											display: 'flex',
											justifyContent: 'space-between',
											color: '#75787B'
										}}
									>
										<Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
											<img
												src="https://www.masterkorean.vn/images/icon/book.png"
												alt=""
												style={{ marginRight: '5px', width: 'unset', height: 'unset' }}
											/>
											{book.quantity} Sách
										</Typography>
										<Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
											<CalendarMonthOutlinedIcon
												sx={{ width: '17px', height: '17px', marginRight: '5px' }}
											/>
											{book.publishedDate}
										</Typography>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>

				{!showMore && (
					<Box sx={{ textAlign: 'center', marginTop: '16px' }}>
						<Button
							variant="contained"
							onClick={handleShowMore}
							sx={{
								textTransform: 'none',
								borderRadius: '8px',
								backgroundColor: '#E76F51',
								'&:hover': {
									backgroundColor: '#E76F51'
								}
							}}
						>
							Xem thêm
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default PopularBooks;
