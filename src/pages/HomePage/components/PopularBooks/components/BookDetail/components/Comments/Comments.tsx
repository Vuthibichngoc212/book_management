import {
	Typography,
	Grid,
	Rating,
	Box,
	Button,
	Divider,
	Link,
	LinearProgress,
	Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Comments = ({
	commnets,
	averageRating,
	totalReviews,
	isLoggedIn,
	handleOpenModal,
	navigate,
	enableComment
}: any) => {
	return (
		<>
			<Paper
				elevation={3}
				sx={{
					padding: '16px',
					borderRadius: '8px',
					marginTop: '16px',
					boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
				}}
			>
				<Typography sx={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '18px' }}>
					Đánh giá sản phẩm
				</Typography>

				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={3}
						sx={{ textAlign: 'center', '&.MuiGrid-item': { paddingLeft: 0 } }}
					>
						<Typography sx={{ fontWeight: 'bold', color: '#c92127', fontSize: '28px' }}>
							{averageRating} <span style={{ fontSize: '16px' }}>trên 5</span>
						</Typography>
						<Rating value={averageRating} precision={0.5} readOnly sx={{ fontSize: '24px' }} />
						<Typography sx={{ color: '#75787B' }}>({totalReviews} đánh giá)</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						sm={3}
						sx={{ textAlign: 'center', '&.MuiGrid-item': { paddingLeft: 0 } }}
					>
						{commnets?.detailRating.length > 0
							? Array.from({ length: 5 }, (_, index) => {
									const review = commnets?.detailRating.find((r: any) => r.rating === 5 - index);
									return (
										<Box
											key={5 - index}
											sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
										>
											<Typography sx={{ width: '60px', color: '#75787B' }}>
												{5 - index} sao
											</Typography>
											<LinearProgress
												variant="determinate"
												value={review ? review.percentage : 0}
												sx={{ flexGrow: 1, margin: '0 8px', height: '8px', borderRadius: '4px' }}
											/>
											<Typography sx={{ width: '30px', textAlign: 'right', color: '#75787B' }}>
												{review ? review.percentage : 0}%
											</Typography>
										</Box>
									);
								})
							: Array.from({ length: 5 }, (_, index) => (
									<Box
										key={index + 1}
										sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
									>
										<Typography sx={{ width: '60px', color: '#75787B' }}>
											{5 - index} sao
										</Typography>
										<LinearProgress
											variant="determinate"
											value={0}
											sx={{ flexGrow: 1, margin: '0 8px', height: '8px', borderRadius: '4px' }}
										/>
										<Typography sx={{ width: '30px', textAlign: 'right', color: '#75787B' }}>
											0%
										</Typography>
									</Box>
								))}
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
						sx={{
							display: 'flex',
							alignItems: 'center',
							'&.MuiGrid-item': { paddingLeft: '60px' }
						}}
					>
						{/* {isLoggedIn ? ( */}
						{isLoggedIn && enableComment ? (
							// {enableComment ? (
							<>
								<Box sx={{}}>
									<Button
										variant="contained"
										size="medium"
										onClick={() => handleOpenModal()}
										sx={{
											textTransform: 'none',
											border: ' 1px solid #E76F51',
											background: '#FFF',
											color: '#E76F51',
											boxShadow: 'none',
											'&:hover': { backgroundColor: '#FAFAFA', boxShadow: 'none' }
										}}
										startIcon={<EditIcon />}
									>
										Viết đánh giá
									</Button>
								</Box>
							</>
						) : (
							<>
								{enableComment ? (
									<Typography variant="body2" sx={{ color: '#75787B', textAlign: 'center' }}>
										Chỉ có thành viên đã mua hàng mới có thể viết nhận xét. Vui lòng{' '}
										<Link
											href=""
											sx={{ color: '#1e88e5', textDecoration: 'none' }}
											onClick={() => navigate('/')}
										>
											đăng nhập
										</Link>{' '}
										hoặc{' '}
										<Link
											href=""
											sx={{ color: '#1e88e5', textDecoration: 'none' }}
											onClick={() => navigate('/')}
										>
											đăng ký
										</Link>
									</Typography>
								) : (
									<>Chức năng viết nhận xét hiện không khả dụng</>
								)}
							</>
						)}
					</Grid>

					<Grid item xs={12}>
						<Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
					</Grid>

					<Grid item xs={12}>
						{commnets?.data?.elements?.map((comment: any, index: number) => (
							<Box key={index} sx={{ marginBottom: '16px' }}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={3}>
										<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
											{comment.fullName}
										</Typography>
										<Typography variant="body2" sx={{ color: '#75787B' }}>
											Đã tham gia {''}
											{new Date(comment.createdAt).toLocaleDateString()}
										</Typography>
									</Grid>

									<Grid item xs={12} sm={9}>
										<Rating value={comment.rating} readOnly size="small" />
										<Typography sx={{ marginTop: '8px' }}>{comment.comment}</Typography>
									</Grid>
								</Grid>

								{index < commnets?.data?.elements.length - 1 && (
									<Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
								)}
							</Box>
						))}
					</Grid>
				</Grid>
			</Paper>
		</>
	);
};

export default Comments;
