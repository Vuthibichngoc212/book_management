import {
	Box,
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
	Divider,
	Grid,
	Card,
	CardContent,
	// CardMedia,
	Paper
} from '@mui/material';
import momoIcon from '@/assets/image/momo.jpg';
import byPayIcon from '@/assets/image/byPay.png';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
	useCheckoutCartMutation,
	useGetAllCartsQuery,
	useGetInfoUserQuery
} from '@/api/api.caller';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CheckoutCart = () => {
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(false);

	const { data: userData } = useGetInfoUserQuery(undefined);
	const userInfo = userData?.data;
	const [checkoutCart] = useCheckoutCartMutation();

	const { data: cartData } = useGetAllCartsQuery(undefined);
	const cartItems = cartData?.data?.cartResponses || [];
	const totalPayment = cartData?.data?.totalPayment || 0;
	const totalItems = cartData?.data?.totalItem || 0;

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	const shippingCost = 30000;
	const total = totalPayment + shippingCost;

	const handleCheckoutCart = async () => {
		try {
			await checkoutCart(undefined);
			toast.success('Mua hàng thành công!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
			setTimeout(() => {
				navigate('/home');
			}, 1000);
		} catch (error) {
			toast.error('Mua hàng thất bại!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		}
	};

	return (
		<>
			<ToastContainer />
			<Box sx={{ padding: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={8}>
						<Paper
							sx={{ padding: 2, borderRadius: '8px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)' }}
						>
							<Typography variant="h6" gutterBottom sx={{ fontWeight: '600', marginBottom: 2 }}>
								Chọn hình thức giao hàng
							</Typography>
							<Box
								sx={{
									border: '1px solid rgb(194, 225, 255)',
									padding: 2,
									borderRadius: '10px',
									background: 'rgb(240, 248, 255)',
									width: '497px'
								}}
							>
								<RadioGroup defaultValue="giaoTietKiem" name="shipping-method">
									<FormControlLabel
										value="giaoTietKiem"
										control={<Radio />}
										label="Giao tiết kiệm"
										sx={{ '& .MuiTypography-root': { fontSize: '14px' } }}
									/>
								</RadioGroup>
							</Box>

							<Divider sx={{ marginY: 2 }} />

							<Card variant="outlined" sx={{ borderRadius: '12px', padding: '12px' }}>
								<CardContent sx={{ padding: '0 !important' }}>
									<Grid
										container
										spacing={2}
										sx={{
											'&.MuiGrid-root': { marginTop: 0 },
											'& > .MuiGrid-item': { paddingTop: '0px' }
										}}
									>
										<Grid item xs={8}>
											<Box
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													marginBottom: '8px'
												}}
											>
												<Typography variant="body2" sx={{ color: 'gray' }}>
													GIAO TIẾT KIỆM
												</Typography>
												<Typography variant="body2" sx={{ fontWeight: 'bold' }}>
													30.000 đ
												</Typography>
											</Box>
											{cartItems.map((item: any, index: number) => (
												<>
													<Grid container spacing={2}>
														<Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
															<img
																src={item.imageUrl}
																alt="Product Image"
																style={{ width: '100%', borderRadius: '4px', objectFit: 'contain' }}
															/>
														</Grid>

														<Grid item xs={9}>
															<Typography
																sx={{
																	color: 'rgb(128, 128, 137)',
																	marginBottom: '4px',
																	fontSize: '14px'
																}}
															>
																{item.title}
															</Typography>
															<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
																<Typography
																	variant="body2"
																	color="textSecondary"
																	sx={{ marginBottom: '4px' }}
																>
																	SL: x{item.quantity}
																</Typography>

																<Typography
																	variant="body2"
																	color="error"
																	sx={{ fontWeight: 'bold' }}
																>
																	{item.rowTotal.toLocaleString('vi-VN')} đ
																</Typography>
															</Box>
														</Grid>
													</Grid>
													{index < cartItems.length - 1 && <Divider sx={{ marginY: 2 }} />}
												</>
											))}
										</Grid>

										<Grid
											item
											xs={4}
											sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
										>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													backgroundColor: 'rgb(245, 245, 250)',
													padding: '8px',
													borderRadius: '8px'
												}}
											>
												<Typography
													variant="body2"
													color="textSecondary"
													sx={{ textAlign: 'right', color: 'rgb(128, 128, 137)', fontSize: '14px' }}
												>
													<LocalShippingIcon
														sx={{
															marginRight: '4px',
															color: 'gray',
															fontSize: '18px'
														}}
													/>
													Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)
												</Typography>
											</Box>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Paper>

						<Paper
							sx={{
								padding: 2,
								borderRadius: '8px',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
								marginTop: 2
							}}
						>
							<Typography variant="h6" gutterBottom sx={{ fontWeight: '600', marginBottom: 2 }}>
								Chọn hình thức Thanh toán
							</Typography>
							<Box>
								<RadioGroup defaultValue="thanhToanTienMat" name="byPay">
									<FormControlLabel
										value="thanhToanTienMat"
										control={<Radio />}
										label={
											<Box sx={{ display: 'flex', alignItems: 'center' }}>
												<img
													src={byPayIcon}
													alt="Tiền mặt"
													style={{ marginRight: 8, width: 20, height: 20 }}
												/>
												<Typography sx={{ fontSize: '14px' }}>Thanh toán tiền mặt</Typography>
											</Box>
										}
									/>
									<FormControlLabel
										value="viMomo"
										control={<Radio />}
										label={
											<Box sx={{ display: 'flex', alignItems: 'center' }}>
												<img
													src={momoIcon}
													alt="Momo"
													style={{ marginRight: 8, width: 20, height: 20 }}
												/>
												<Typography sx={{ fontSize: '14px' }}>Ví Momo</Typography>
											</Box>
										}
									/>
								</RadioGroup>
							</Box>
						</Paper>
					</Grid>

					<Grid item xs={12} md={4}>
						<Paper
							sx={{ padding: 2, borderRadius: '8px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)' }}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: '10px'
								}}
							>
								<Typography sx={{ color: 'rgb(128, 128, 137)' }}>Giao tới</Typography>
								<Typography sx={{ color: 'rgb(11, 116, 229)', fontSize: '14.5px' }}>
									Thay đổi
								</Typography>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
								<Typography sx={{ fontWeight: '600', color: 'rgb(56, 56, 61)', fontSize: '14px' }}>
									{userInfo?.fullName}
								</Typography>
								<Divider orientation="vertical" flexItem sx={{ marginX: 1, height: '20px' }} />
								<Typography sx={{ fontWeight: '600', color: 'rgb(56, 56, 61)', fontSize: '14px' }}>
									{userInfo?.phoneNumber}
								</Typography>
							</Box>
							<Typography sx={{ color: 'rgb(128, 128, 137)', fontSize: '14px' }}>
								<span
									style={{
										color: 'rgb(0, 171, 86)',
										backgroundColor: 'rgb(239, 255, 244)',
										padding: '0px 6px',
										marginRight: '4px'
									}}
								>
									Nhà
								</span>
								{userInfo?.address}
							</Typography>
						</Paper>

						<Paper
							sx={{
								padding: 2,
								borderRadius: '8px',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
								marginTop: 2
							}}
						>
							<Typography sx={{ fontWeight: '600' }}>Đơn hàng</Typography>

							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Typography
									variant="body2"
									sx={{ color: 'rgb(128, 128, 137)', marginRight: '4px' }}
								>
									{totalItems} sản phẩm.
								</Typography>
								<Typography
									variant="body2"
									onClick={handleToggle}
									sx={{
										color: 'rgb(11, 116, 229)',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center'
									}}
								>
									{isExpanded ? 'Thu gọn' : 'Xem thông tin'}
									{isExpanded ? (
										<ExpandLessIcon sx={{ marginLeft: '4px', width: '20px', height: '20px' }} />
									) : (
										<ExpandMoreIcon sx={{ marginLeft: '4px', width: '20px', height: '20px' }} />
									)}
								</Typography>
							</Box>

							{isExpanded && (
								<>
									<Divider sx={{ marginY: 1 }} />
									{cartItems.map((item: any) => (
										<Grid
											container
											alignItems="center"
											spacing={2}
											sx={{
												'&.MuiGrid-root': { marginTop: 0 },
												'& > .MuiGrid-item': { paddingTop: '0px' }
											}}
										>
											<Grid item xs={2}>
												<Typography sx={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
													{item.quantity} x
												</Typography>
											</Grid>
											<Grid item xs={7}>
												<Typography sx={{ fontSize: '12px', wordWrap: 'break-word' }}>
													{item.title}
												</Typography>
											</Grid>
											<Grid item xs={3}>
												<Typography
													sx={{ fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'right' }}
												>
													{item.rowTotal.toLocaleString('vi-VN')} đ
												</Typography>
											</Grid>
										</Grid>
									))}
								</>
							)}

							<Divider sx={{ marginY: 1 }} />

							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
								<Typography variant="body2" sx={{ color: 'rgb(128, 128, 137)' }}>
									Tạm tính
								</Typography>
								<Typography variant="body2">{totalPayment.toLocaleString('vi-VN')}đ</Typography>
							</Box>

							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
								<Typography variant="body2" sx={{ color: 'rgb(128, 128, 137)' }}>
									Phí vận chuyển
								</Typography>
								<Typography variant="body2">{shippingCost.toLocaleString('vi-VN')}đ</Typography>
							</Box>

							<Divider sx={{ marginY: 1 }} />

							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
								<Typography sx={{}}>Tổng tiền</Typography>
								<Typography variant="h6" sx={{ color: 'rgb(255, 66, 78)', fontWeight: '600' }}>
									{total.toLocaleString('vi-VN')}đ
								</Typography>
							</Box>

							<Typography variant="caption" color="textSecondary">
								(Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh
								khác)
							</Typography>

							<Button
								variant="contained"
								color="error"
								fullWidth
								onClick={() => handleCheckoutCart()}
								sx={{ marginTop: 1, textTransform: 'none', fontSize: '16px' }}
							>
								Đặt hàng
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default CheckoutCart;
