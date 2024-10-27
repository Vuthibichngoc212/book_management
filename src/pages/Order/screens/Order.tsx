import { useConfirmOrderMutation, useGetAllOrdersQuery } from '@/api/api.caller';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	CircularProgress,
	Menu,
	MenuItem,
	Button,
	IconButton,
	Tooltip,
	TablePagination
} from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moreIcon from '@/assets/icon/more-icon.svg';
import FormModal from '../components/FormModal/FormModal';
import DialogCancel from '../components/DialogCancel/DialogCancel';
import NoDataCommon from '@/components/common/NoDataCommon/NoDataCommon';

const Order = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { data: ordersData, isLoading, error, refetch } = useGetAllOrdersQuery(undefined);
	const orders = ordersData?.data?.elements || [];

	const [confirmOrder] = useConfirmOrderMutation();

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

	const handleOpenCancelDialog = (orderId: number) => {
		setSelectedOrderId(orderId);
		setIsCancelDialogOpen(true);
	};

	const handleCloseCancelDialog = () => {
		setIsCancelDialogOpen(false);
	};

	const handleStatusChange = async (status: string) => {
		try {
			if (status === 'Completed') {
				await confirmOrder(selectedOrderId);
				toast.success('Đơn hàng đã được xác nhận', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
				refetch();
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

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
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

	if (error) {
		return (
			<Box>
				<NoDataCommon />
			</Box>
		);
	}

	const getStatusStyle = (status: string) => {
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
			<Box>
				<TableContainer
					component={Paper}
					elevation={3}
					sx={{ maxWidth: '100%', marginTop: '16px', height: '400px', overflow: 'auto' }}
				>
					<Table>
						<TableHead>
							<TableRow sx={{ backgroundColor: '#EBF3FF' }}>
								<TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Tên khách hàng</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Ngày đặt hàng</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Lý do hủy</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((order: any, index: number) => (
									<TableRow
										key={order.id}
										sx={{ backgroundColor: order.id % 2 === 0 ? '#F7F7F8' : 'white' }}
									>
										<TableCell>{index + 1 + page * rowsPerPage}</TableCell>
										<TableCell>{order.customerName}</TableCell>
										<TableCell>{order.email}</TableCell>
										<TableCell>{order.orderDate}</TableCell>
										<TableCell>{order.totalAmount.toFixed(2)}</TableCell>
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
												anchorEl={anchorEl}
												open={Boolean(anchorEl) && selectedOrderId === order.id}
												onClose={handleClose}
												anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
												transformOrigin={{ vertical: 'top', horizontal: 'right' }}
											>
												<MenuItem onClick={() => handleStatusChange('Completed')}>
													Xác nhận
												</MenuItem>
												<MenuItem onClick={() => handleOpenCancelDialog(order.id)}>
													Từ chối
												</MenuItem>
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

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component="div"
					count={orders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Box>
		</>
	);
};

export default Order;
