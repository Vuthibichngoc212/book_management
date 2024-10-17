import { useNavigate, useParams } from 'react-router-dom';
import {
	Typography,
	Box,
	CardMedia,
	Grid,
	Rating,
	Button,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	IconButton,
	Tooltip,
	Divider,
	// Link,
	// LinearProgress,
	CircularProgress
} from '@mui/material';
import {
	useCreateCartMutation,
	useGetAllCartsQuery,
	useGetAllCommentsQuery,
	useGetBookDetailByIdQuery
} from '@/api/api.caller';
import Header from '@/components/layout/Header/Header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import PeopleIcon from '@mui/icons-material/People';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DiscountIcon from '@mui/icons-material/Discount';
import Footer from '@/components/layout/Footer/Footer';
import Dialog from '@/components/common/Diaglog/Dialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/slices/cart.slice';
// import EditIcon from '@mui/icons-material/Edit';
import FormModal from '../FormModal/FormModal';
import Comments from './components/Comments/Comments';

const discounts = [
	{ id: 1, text: 'Mã giảm 10k - đơn 100k' },
	{ id: 2, text: 'Mã giảm 25k - đơn 250k' },
	{ id: 3, text: 'Vnpay: giảm 5k cho đơn từ 50k' },
	{ id: 4, text: 'Shopeepay: giảm 10k cho đơn từ 100k' }
];

const BookDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState(1);
	const [openDialog, setOpenDialog] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { data: bookData, isLoading, isError } = useGetBookDetailByIdQuery(id);
	const { data: commnets } = useGetAllCommentsQuery(id);
	const [createCart] = useCreateCartMutation();
	const { refetch } = useGetAllCartsQuery(undefined);

	const handleOpenModal = () => {
		setIsOpenModal(true);
	};

	useEffect(() => {
		const token = localStorage.getItem('userToken');
		setIsLoggedIn(!!token);
	}, []);

	if (isLoading)
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress />
			</Box>
		);
	if (isError || !bookData) return <Typography>Error loading book details</Typography>;

	const book = bookData.data;

	const handleIncreaseQuantity = () => setQuantity((prev: any) => prev + 1);
	const handleDecreaseQuantity = () => setQuantity((prev: any) => Math.max(1, prev - 1));

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	const handleAddToCart = async (bookId: number, quantity: number, navigateToCart = false) => {
		const userToken = localStorage.getItem('userToken');

		if (userToken) {
			try {
				const payload = {
					bookId: book.id,
					newQuantity: quantity
				};
				await createCart(payload).unwrap();
				dispatch(addToCart({ bookId: bookId, quantity: quantity }));
				refetch();
				toast.success('Sản phẩm đã được thêm vào giỏ hàng', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});

				if (navigateToCart) {
					navigate('/carts');
				}
			} catch (error) {
				toast.error('Thêm sản phẩm vào giỏ hàng thất bại.', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
			}
		} else {
			handleOpenDialog();
		}
	};

	const averageRating = commnets?.averageRating || 0;
	const totalReviews = commnets?.data?.totalElements || 0;

	return (
		<>
			<ToastContainer />
			<Header />
			<Box sx={{ margin: '100px 24px 24px 24px' }}>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={5}>
						<Paper
							elevation={3}
							sx={{
								padding: '16px',
								borderRadius: '8px',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
							}}
						>
							<CardMedia
								component="img"
								alt={book.title}
								image={book.image}
								sx={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: '200px' }}
							/>

							<Box sx={{ margin: '24px 0px 16px 0px', display: 'flex', justifyContent: 'center' }}>
								<Button
									variant="contained"
									startIcon={<ShoppingCartIcon />}
									fullWidth
									onClick={() => handleAddToCart(book.id, quantity)}
									sx={{
										marginRight: '8px',
										textTransform: 'none',
										backgroundColor: '#fff',
										color: '#c92127',
										borderRadius: '8px',
										border: '2px solid #c92127',
										'&:hover': { backgroundColor: '#ffffff' }
									}}
								>
									Thêm vào giỏ hàng
								</Button>
								<Button
									variant="contained"
									fullWidth
									onClick={() => handleAddToCart(book.id, 1, true)}
									sx={{
										backgroundColor: '#c92127',
										color: '#fff',
										textTransform: 'none',
										border: 'none',
										borderRadius: '8px',
										'&:hover': { backgroundColor: '#a51c22' }
									}}
								>
									Mua ngay
								</Button>
							</Box>

							<Box>
								<Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
									Chính sách ưu đãi của Book Heaven
								</Typography>
								<List>
									<ListItem>
										<ListItemIcon>
											<LocalShippingOutlinedIcon sx={{ color: '#a51c22' }} />
										</ListItemIcon>
										<ListItemText
											primary={
												<>
													<span style={{ fontWeight: 'bold' }}>Thời gian giao hàng:</span>{' '}
													<span style={{ fontSize: '14px' }}>Giao nhanh và uy tín</span>
												</>
											}
										/>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<SwapHorizontalCircleIcon sx={{ color: '#a51c22' }} />
										</ListItemIcon>
										<ListItemText
											primary={
												<>
													<span style={{ fontWeight: 'bold' }}>Chính sách đổi trả:</span>{' '}
													<span style={{ fontSize: '14px' }}>Đổi trả miễn phí toàn quốc</span>
												</>
											}
										/>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<PeopleIcon sx={{ color: '#a51c22' }} />
										</ListItemIcon>
										<ListItemText
											primary={
												<>
													<span style={{ fontWeight: 'bold' }}>Chính sách khách sỉ:</span>{' '}
													<span style={{ fontSize: '14px' }}>Ưu đãi khi mua số lượng lớn</span>
												</>
											}
										/>
									</ListItem>
								</List>
							</Box>
						</Paper>
					</Grid>

					<Grid item xs={12} sm={7}>
						<Paper
							elevation={3}
							sx={{
								padding: '16px',
								marginBottom: '16px',
								borderRadius: '8px',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
							}}
						>
							<Box>
								<Typography sx={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '21px' }}>
									{book.title}
								</Typography>

								<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
									<Typography sx={{ fontSize: '12px' }}>
										Nhà xuất bản:
										<span style={{ fontWeight: 'bold', marginLeft: '8px', fontSize: '12px' }}>
											{book.publisher}
										</span>
									</Typography>
									<Typography sx={{ fontSize: '12px' }}>
										Tác giả:
										<span style={{ fontWeight: 'bold', marginLeft: '8px', fontSize: '12px' }}>
											{book.author}
										</span>
									</Typography>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
									<Rating value={book.averageRating} precision={0.5} readOnly size="small" />
									<Typography
										sx={{
											marginLeft: '8px',
											color: '#75787B',
											fontWeight: 'bold',
											fontSize: '13px'
										}}
									>
										{book.averageRating.toFixed(1)} ({book.purchaseCount} đã bán)
									</Typography>
								</Box>
								<Typography variant="h5" sx={{ color: '#ff424e', fontWeight: 'bold' }}>
									{book.price} đ
								</Typography>
							</Box>
						</Paper>

						<Paper
							elevation={3}
							sx={{
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
							}}
						>
							<Box sx={{ marginBottom: '16px' }}>
								<Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
									Thông tin vận chuyển
								</Typography>
								<Typography sx={{ fontSize: '16px' }}>
									Giao hàng đến
									<span style={{ fontWeight: 'bold', marginLeft: '8px', fontSize: '14px' }}>
										Phường Yên Nghĩa, Hà Đông, Hà Nội
									</span>
								</Typography>

								<Typography
									sx={{
										display: 'flex',
										alignItems: 'center',
										marginTop: '8px',
										fontWeight: 'bold',
										fontSize: '16px'
									}}
								>
									<LocalShippingOutlinedIcon sx={{ marginRight: '8px', color: 'green' }} />
									Giao hàng tiêu chuẩn
								</Typography>
								<Typography sx={{ marginLeft: '32px', marginTop: '8px', fontSize: '14px' }}>
									Dự kiến giao
									<span style={{ fontWeight: 'bold', marginLeft: '8px', fontSize: '14px' }}>
										Thứ hai - 07/10
									</span>
								</Typography>
							</Box>
							<Box sx={{ marginBottom: '16px', marginTop: '16px' }}>
								<Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
									Ưu đãi liên quan{' '}
									<span
										style={{
											textDecoration: 'none',
											color: '#0073e6',
											fontSize: '14px',
											marginLeft: '12px'
										}}
									>
										Xem thêm
									</span>
								</Typography>
								<Box sx={{ display: 'flex', overflowX: 'auto', gap: '8px', marginTop: '8px' }}>
									{discounts.map((discount) => (
										<Tooltip key={discount.id} title={discount.text}>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													padding: '4px 8px',
													border: '1px solid #ccc',
													borderRadius: '4px',
													cursor: 'pointer',
													backgroundColor: discount.id <= 2 ? '#FFF8E1' : '#E3F2FD',
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis'
												}}
											>
												<DiscountIcon
													sx={{
														marginRight: '8px',
														color: discount.id <= 2 ? '#FFB300' : '#42A5F5'
													}}
												/>
												<Typography
													variant="body2"
													sx={{
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'ellipsis'
													}}
												>
													{discount.text}
												</Typography>
											</Box>
										</Tooltip>
									))}
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
									<Typography sx={{ marginRight: '50px', fontWeight: 'bold' }}>
										Số lượng:
									</Typography>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											border: '1px solid #ccc',
											borderRadius: '4px',
											padding: '0px 8px'
										}}
									>
										<IconButton onClick={handleDecreaseQuantity} size="small">
											<RemoveIcon />
										</IconButton>
										<Typography sx={{ margin: '0 8px', fontWeight: 'bold' }}>{quantity}</Typography>
										<IconButton onClick={handleIncreaseQuantity} size="small">
											<AddIcon />
										</IconButton>
									</Box>
								</Box>
							</Box>
						</Paper>

						<Paper
							elevation={3}
							sx={{
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
							}}
						>
							<Box sx={{ marginBottom: '16px' }}>
								<Typography sx={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>
									Thông tin chi tiết
								</Typography>
								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns: '200px 1fr',
										rowGap: '16px',
										alignItems: 'center'
									}}
								>
									<Typography sx={{ color: '#777', fontSize: '14px' }}>Mã hàng</Typography>
									<Typography sx={{ fontSize: '14px' }}>8935325009730</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>Tên Nhà Cung Cấp</Typography>
									<Typography sx={{ fontSize: '14px' }}>AZ Việt Nam</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>Tác giả</Typography>
									<Typography sx={{ fontSize: '14px' }}>{book.author}</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>NXB</Typography>
									<Typography sx={{ fontSize: '14px' }}>{book.publisher}</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>Năm XB</Typography>
									<Typography sx={{ fontSize: '14px' }}>{book.publishedDate}</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>Ngôn Ngữ</Typography>
									<Typography sx={{ fontSize: '14px' }}>Tiếng Việt</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>Trọng lượng (gr)</Typography>
									<Typography sx={{ fontSize: '14px' }}>200</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>
										Kích Thước Bao Bì
									</Typography>
									<Typography sx={{ fontSize: '14px' }}>24 x 19 x 1 cm</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>Số trang</Typography>
									<Typography sx={{ fontSize: '14px' }}>104</Typography>

									<Typography sx={{ color: '#777', fontSize: '14px' }}>Hình thức</Typography>
									<Typography sx={{ fontSize: '14px' }}>Bìa Mềm</Typography>
								</Box>
								<Divider sx={{ marginY: '6px' }} />
								<Typography sx={{ fontSize: '14px' }}>
									Giá sản phẩm trên BookHeaven.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó,
									tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi
									phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...
								</Typography>
								<Typography sx={{ fontSize: '14px', color: 'red' }}>
									Chính sách khuyến mãi trên BookHeaven.com không áp dụng cho Hệ thống Nhà sách
									BookHeaven trên toàn quốc
								</Typography>
							</Box>
						</Paper>

						<Paper
							elevation={3}
							sx={{
								padding: '16px',
								marginTop: '16px',
								borderRadius: '8px',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
							}}
						>
							<Box sx={{ marginBottom: '16px' }}>
								<Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
									Mô tả sản phẩm
								</Typography>
								<Typography sx={{ fontSize: '14px', marginTop: '8px' }} component="div">
									{book.description.split('\n').map((line: any, index: number) => (
										<React.Fragment key={index}>
											{line}
											<br />
										</React.Fragment>
									))}
								</Typography>
							</Box>
						</Paper>
					</Grid>
				</Grid>

				<Comments
					commnets={commnets}
					averageRating={averageRating}
					totalReviews={totalReviews}
					isLoggedIn={isLoggedIn}
					handleOpenModal={handleOpenModal}
					navigate={navigate}
				/>
			</Box>

			<Dialog
				open={openDialog}
				title="Thông báo"
				message="Bạn cần "
				onClose={handleCloseDialog}
				confirmButtonText="Đăng nhập"
				confirmButtonColor="primary"
			/>
			<FormModal
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
				headerTitle={'Viết đánh giá sản phẩm'}
				cancelButtonLabel="Hủy"
				submitButtonLabel={'Gửi nhận xét'}
			/>
			<Footer />
		</>
	);
};

export default BookDetail;
