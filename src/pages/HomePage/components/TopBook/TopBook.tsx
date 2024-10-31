import { useGetAllTopBooksQuery } from '@/api/api.caller';
import NoDataCommon from '@/components/common/NoDataCommon/NoDataCommon';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { useNavigate } from 'react-router-dom';

const TopBook = () => {
	const navigate = useNavigate();
	const {
		data: topBooksData,
		isLoading: isLoadingBooks,
		isError: isErrorBooks
	} = useGetAllTopBooksQuery(undefined);

	const topBooks = [...(topBooksData?.data || [])]
		.sort((a: any, b: any) => b.totalBooksSold - a.totalBooksSold)
		.slice(0, 5);

	const handleBookClick = (bookId: number) => {
		navigate(`/books/${bookId}`);
	};

	if (isLoadingBooks) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (isErrorBooks || !topBooksData) {
		return (
			<Box>
				<Typography>Top cuốn sách bán chạy</Typography>
				<NoDataCommon />
			</Box>
		);
	}

	return (
		<Box sx={{ margin: '0px 34px', cursor: 'pointer' }}>
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
					Top cuốn sách bán chạy
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
				<Grid container spacing={3}>
					{topBooks.map((book: any) => (
						<Grid item xs={12} md={2.4} key={book.id}>
							<Paper
								onClick={() => handleBookClick(book.bookID)}
								sx={{
									padding: '8px',
									borderRadius: '8px',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
								}}
							>
								<Box
									sx={{
										width: '100%',
										height: '200px',
										overflow: 'hidden',
										borderRadius: '8px'
									}}
								>
									<img
										src={book.image}
										alt={book.title}
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover'
										}}
									/>
								</Box>
								<Typography
									sx={{
										color: '#75787B',
										fontSize: '14px',
										display: 'flex',
										alignItems: 'center',
										marginTop: '8px'
									}}
								>
									<BadgeOutlinedIcon
										sx={{
											width: '17px',
											height: '17px',
											marginRight: '5px'
										}}
									/>
									{book.author}
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
							</Paper>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default TopBook;
