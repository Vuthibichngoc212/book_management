import { useState } from 'react';
import {
	Box,
	Typography,
	Paper,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Menu,
	MenuItem,
	IconButton,
	Tooltip
} from '@mui/material';
import Header from '@/components/layout/Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noData from '@/assets/image/empty-order.png';
import { useGetAllOrdersUserQuery, useReceivedOrderMutation } from '@/api/api.caller';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moreIcon from '@/assets/icon/more-icon.svg';
import FormModal from '../components/FormModal/FormModal';
import DialogCancel from '../components/DialogCancel/DialogCancel';

const OrderHistory = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

	const { data: orderData, isLoading, isError, refetch } = useGetAllOrdersUserQuery(undefined);
	const orders = orderData?.data?.elements || [];

	const [receivedOrder] = useReceivedOrderMutation();

	const filteredOrders = orders.filter(() => {
		return true;
	});

	const handleStatusClick = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
		setAnchorEl(event.currentTarget);
		setSelectedOrderId(orderId);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOpenModal = (orderId: number) => {
		setSelectedOrderId(orderId);
		setIsOpenModal(true);
	};

	const handleStatusChange = async (status: string) => {
		try {
			if (status === 'Delivering') {
				await receivedOrder(selectedOrderId);
				toast.success('Đã nhận hàng thành công', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
				refetch();
			} else if (status === 'Canceled') {
				setIsOpenModal(true);
			}
		} catch (error) {
			toast.error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		} finally {
			handleClose();
		}
	};

	const handleOpenCancelDialog = (orderId: number) => {
		setSelectedOrderId(orderId);
		setIsCancelDialogOpen(true);
	};

	const handleCloseCancelDialog = () => {
		setIsCancelDialogOpen(false);
	};

	const getStatusStyle = (status: any) => {
		switch (status) {
			case 'CANCELLED':
				return { backgroundColor: '#ffebee', color: '#c62828' };
			case 'Delivering':
				return { backgroundColor: '#e8f5e9', color: '#2e7d32' };
			case 'Completed':
				return { backgroundColor: '#e3f2fd', color: '#1565c0' };
			case 'Pending':
				return { backgroundColor: '#fff3e0', color: '#ef6c00' };
			default:
				return { backgroundColor: '#f5f5f5', color: '#616161' };
		}
	};

	return (
		<>
			<ToastContainer />
			<Header />
			<Box sx={{ margin: '100px 24px 24px 24px' }}>
				<Typography sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
					Đơn hàng của tôi
				</Typography>

				<Paper
					elevation={3}
					sx={{
						padding: '16px',
						borderRadius: '8px',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
						marginTop: '16px'
					}}
				>
					{isLoading ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100vh'
							}}
						>
							<CircularProgress />
						</Box>
					) : isError ? (
						<Typography>Có lỗi xảy ra khi tải dữ liệu.</Typography>
					) : filteredOrders.length === 0 ? (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								height: '300px',
								borderRadius: '8px'
							}}
						>
							<img
								src={noData}
								alt="No orders"
								style={{ width: '200px', height: '200px', marginBottom: '16px' }}
							/>
							<Typography sx={{ color: 'rgb(128, 128, 137)', fontSize: '16px' }}>
								Chưa có đơn hàng
							</Typography>
						</Box>
					) : (
						<TableContainer
							component={Paper}
							sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}
						>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold' }}>Mã đơn hàng</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Khách hàng</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Ngày đặt</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Lý do hủy</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
										<TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredOrders.map((order: any) => (
										<TableRow key={order.id}>
											<TableCell>Đơn hàng #{order.id}</TableCell>
											<TableCell>{order.customerName}</TableCell>
											<TableCell>{order.email}</TableCell>
											<TableCell>{order.orderDate}</TableCell>
											<TableCell>{order.totalAmount.toLocaleString('vi-VN')} đ</TableCell>
											<TableCell>{order.note}</TableCell>
											<TableCell>
												{order.status === 'Pending' ? (
													<Button
														variant="outlined"
														size="small"
														onClick={(e) => handleStatusClick(e, order.id)}
														sx={{
															color: '#ef6c00',
															borderRadius: '8px',
															border: 'none',
															backgroundColor: '#fff3e0',
															textTransform: 'none',
															'&:hover': {
																backgroundColor: '#fff3e0',
																color: '#ef6c00',
																border: 'none'
															}
														}}
													>
														Đang chờ
														<ExpandMoreIcon
															sx={{ marginLeft: '4px', width: '20px', height: '20px' }}
														/>
													</Button>
												) : order.status === 'Delivering' ? (
													<Button
														variant="contained"
														color="primary"
														size="small"
														onClick={(e) => handleStatusClick(e, order.id)}
														sx={{
															color: '#2e7d32',
															borderRadius: '8px',
															border: 'none',
															backgroundColor: '#e8f5e9',
															textTransform: 'none',
															'&:hover': {
																backgroundColor: '#e8f5e9',
																color: '#2e7d32',
																border: 'none'
															}
														}}
													>
														Delivering
														<ExpandMoreIcon
															sx={{ marginLeft: '4px', width: '20px', height: '20px' }}
														/>
													</Button>
												) : (
													<Typography
														variant="body2"
														sx={{
															padding: '4px 8px',
															borderRadius: '8px',
															backgroundColor: getStatusStyle(order.status).backgroundColor,
															color: getStatusStyle(order.status).color,
															textAlign: 'center',
															display: 'inline-block',
															cursor: 'pointer'
														}}
													>
														{order.status}
													</Typography>
												)}

												<Menu
													id="simple-menu"
													anchorEl={anchorEl}
													keepMounted
													open={Boolean(anchorEl) && selectedOrderId === order.id}
													onClose={handleClose}
												>
													{order.status === 'Pending' && (
														<MenuItem onClick={() => handleOpenCancelDialog(order.id)}>
															Từ chối
														</MenuItem>
													)}
													{order.status === 'Delivering' && (
														<MenuItem onClick={() => handleStatusChange('Delivering')}>
															Đã nhận hàng
														</MenuItem>
													)}
												</Menu>
											</TableCell>
											<TableCell>
												<Tooltip title="Xem chi tiết đơn hàng">
													<IconButton color="primary" onClick={() => handleOpenModal(order.id)}>
														<img alt="Xem chi tiết" src={moreIcon} />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Paper>
			</Box>

			<FormModal
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
				headerTitle="Xem chi tiết đơn hàng"
				orderId={selectedOrderId}
			/>

			<DialogCancel
				isOpen={isCancelDialogOpen}
				onClose={handleCloseCancelDialog}
				orderId={selectedOrderId}
			/>
		</>
	);
};

export default OrderHistory;
