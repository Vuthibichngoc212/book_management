import Header from '@/components/layout/Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Grid,
	Paper,
	Typography,
	Button,
	Box,
	Divider,
	IconButton,
	CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import DeleteIcon from '@/assets/icon/delete-icon.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import giftIcon from '@/assets/icon/chose_gift.webp';
import CouponIcon from '@/assets/icon/ico_coupon.svg';
import Footer from '@/components/layout/Footer/Footer';
import {
	useDeleteCartMutation,
	useGetAllCartsQuery,
	useUpdateCartMutation
} from '@/api/api.caller';
import { useNavigate } from 'react-router-dom';

const CartItem = () => {
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState<number[]>([]);
	const { data: cartData, isLoading, refetch } = useGetAllCartsQuery(undefined);
	const [deleteCart] = useDeleteCartMutation();
	const [updateCart] = useUpdateCartMutation();

	const updateQuantity = async (index: number, changeAmount: number) => {
		const currentQuantity = quantity[index] || cartItems[index].quantity;
		const newQuantity = Math.max(1, currentQuantity + changeAmount);

		const payload = {
			bookId: cartItems[index].bookId,
			newQuantity
		};

		try {
			await updateCart(payload).unwrap();

			setQuantity((prev) => {
				const newQuantities = [...prev];
				newQuantities[index] = newQuantity;
				return newQuantities;
			});

			toast.success('Cập nhật giỏ hàng thành công!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
			refetch();
		} catch (error: any) {
			if (error?.data?.error === 'Not enough quantity') {
				toast.error('Số lượng trong kho không đủ!', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
			} else {
				toast.error('Cập nhật giỏ hàng thất bại!', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
			}
		}
	};

	const handleIncreaseQuantity = (index: number) => updateQuantity(index, 1);
	const handleDecreaseQuantity = (index: number) => updateQuantity(index, -1);

	const handleDeleteCart = async (bookId: string) => {
		try {
			await deleteCart(bookId).unwrap();
			toast.success('Xóa sản phẩm thành công!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
			refetch();
		} catch (error) {
			toast.error('Xóa sản phẩm thất bại!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		}
	};

	if (isLoading) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress />
			</Box>
		);
	}

	const cartItems = cartData?.data?.cartResponses || [];
	const totalPayment = cartData?.data?.totalPayment || 0;
	const totalItems = cartData?.data?.totalItem || 0;

	return (
		<>
			<ToastContainer />
			<Header />

			<Box sx={{ marginTop: '80px' }}>
				<Box sx={{ padding: '24px' }}>
					<Box>
						<Typography sx={{ fontSize: '18px', fontWeight: '500' }}>
							GIỎ HÀNG ({totalItems} sản phẩm)
						</Typography>
					</Box>

					<Grid container spacing={3} sx={{ '&.MuiGrid-root': { margin: 0, width: '100%' } }}>
						<Grid item xs={8} sx={{ '&.MuiGrid-item': { padding: 0 }, marginTop: '10px' }}>
							{cartItems.map((item: any, index: number) => (
								<Paper
									key={item.cartId}
									elevation={1}
									sx={{
										padding: 2,
										borderRadius: '8px',
										boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
										marginBottom: '20px'
									}}
								>
									<Grid container alignItems="center">
										<Grid item xs={2}>
											<img
												src={item.imageUrl}
												alt={item.title}
												style={{ width: '100%', height: 'auto' }}
											/>
										</Grid>
										<Grid item xs={3} sx={{ padding: '0px 10px' }}>
											<Typography sx={{ fontSize: '14px' }}>{item.title}</Typography>
											<Typography variant="h6" sx={{ color: 'red' }}>
												{item.price.toLocaleString()} đ
											</Typography>
										</Grid>
										<Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													border: '1px solid #ccc',
													borderRadius: '4px',
													height: '25px'
												}}
											>
												<IconButton onClick={() => handleDecreaseQuantity(index)} size="small">
													<RemoveIcon sx={{ fontSize: '16px' }} />
												</IconButton>
												<Typography sx={{ margin: '0 8px', fontWeight: 'bold', fontSize: '14px' }}>
													{quantity[index] || item.quantity}
												</Typography>
												<IconButton onClick={() => handleIncreaseQuantity(index)} size="small">
													<AddIcon sx={{ fontSize: '16px' }} />
												</IconButton>
											</Box>
										</Grid>
										<Grid item xs={2} sx={{ textAlign: 'center' }}>
											<Typography sx={{ color: '#C92127', fontSize: '14px', fontWeight: '600' }}>
												{item.rowTotal.toLocaleString()} đ
											</Typography>
										</Grid>
										<Grid item xs={1} sx={{ textAlign: 'center' }}>
											<Button color="error" onClick={() => handleDeleteCart(item.bookId)}>
												<img src={DeleteIcon} alt="Delete" />
											</Button>
										</Grid>
									</Grid>
								</Paper>
							))}
						</Grid>

						<Grid item xs={4} sx={{ '&.MuiGrid-item': { paddingTop: 0 }, marginTop: '10px' }}>
							<Paper
								elevation={1}
								sx={{
									padding: 2,
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
									borderRadius: '8px',
									border: '1px solid #E0E0E0'
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<img src={CouponIcon} alt="CouponIcon" />
										<Typography
											sx={{
												fontSize: '16px',
												fontWeight: '500',
												marginLeft: '10px',
												color: '#2489F4'
											}}
										>
											KHUYẾN MÃI
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography
											sx={{
												fontSize: '12px',
												color: '#2489F4',
												marginRight: 1,
												fontWeight: '500',
												cursor: 'pointer'
											}}
										>
											Xem thêm
										</Typography>
										<ArrowForwardIosIcon sx={{ fontSize: '12px', color: '#2489F4' }} />
									</Box>
								</Box>

								<Divider sx={{ my: 1 }} />

								<Box my={1}>
									<Typography sx={{ fontSize: '16px', fontWeight: '500', marginBottom: '5px' }}>
										MÃ FREESHIP 20K CHO ĐƠN HÀNG TỪ 250K
									</Typography>
									<Typography variant="caption" sx={{ color: 'gray' }}>
										Áp dụng duy nhất ngày 10.10
									</Typography>
								</Box>
								<Divider />
								<Typography sx={{ fontSize: '12px', color: '#000', marginTop: '10px' }}>
									Có thể áp dụng đồng thời nhiều mã
								</Typography>
							</Paper>

							<Paper
								elevation={1}
								sx={{
									padding: '10px',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
									marginTop: 2,
									borderRadius: '8px',
									backgroundImage: 'linear-gradient(to right, #E7E7FF, #FFFFFF)'
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<img
											src={giftIcon}
											alt="giftIcon"
											style={{ width: 24, height: 24, marginRight: 8, marginBottom: '6px' }}
										/>
										<Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Nhận quà</Typography>
									</Box>

									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography sx={{ fontSize: '12px', color: '#2489F4', marginRight: 1 }}>
											Chọn quà
										</Typography>
										<ArrowForwardIosIcon sx={{ fontSize: '12px', color: '#2489F4' }} />
									</Box>
								</Box>
							</Paper>

							<Paper
								elevation={1}
								sx={{
									padding: 2,
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
									marginTop: 2,
									borderRadius: '8px'
								}}
							>
								<Box
									sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
								>
									<Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
										Tổng Số Tiền (gồm VAT)
									</Typography>
									<Typography sx={{ fontSize: '18px', color: '#C92127', fontWeight: '600' }}>
										{totalPayment.toLocaleString()} đ
									</Typography>
								</Box>
								<Button
									variant="contained"
									fullWidth
									onClick={() => {
										navigate('/checkoutcarts');
									}}
									sx={{
										borderRadius: '8px',
										marginTop: 2,
										backgroundColor: '#E76F51',
										fontWeight: '600',
										'&:hover': {
											backgroundColor: '#E76F51'
										}
									}}
								>
									THANH TOÁN
								</Button>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Footer />
		</>
	);
};

export default CartItem;
