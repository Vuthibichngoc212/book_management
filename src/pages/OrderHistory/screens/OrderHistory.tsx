import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, Divider, CircularProgress } from '@mui/material';
import Header from '@/components/layout/Header/Header';
import { ToastContainer } from 'react-toastify';
import noData from '@/assets/image/empty-order.png';
import { useGetAllOrdersUserQuery } from '@/api/api.caller';

const OrderHistory = () => {
	const [tabIndex, setTabIndex] = useState(0);

	const { data: orderData, isLoading, isError } = useGetAllOrdersUserQuery(undefined);

	const handleChangeTab = (newValue: any) => {
		setTabIndex(newValue);
	};

	const orders = orderData?.data?.elements || [];

	const filteredOrders = orders.filter((order: any) => {
		if (tabIndex === 0) return true;
		if (tabIndex === 1) return order.status === 'Chờ thanh toán';
		if (tabIndex === 2) return order.status === 'Đang xử lý';
		if (tabIndex === 3) return order.status === 'Đang vận chuyển';
		if (tabIndex === 4) return order.status === 'Đã giao';
		if (tabIndex === 5) return order.status === 'Đã hủy';
		return true;
	});

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
						borderRadius: '8px',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
					}}
				>
					<Tabs
						value={tabIndex}
						onChange={handleChangeTab}
						variant="fullWidth"
						textColor="primary"
						indicatorColor="primary"
						sx={{ marginBottom: '16px' }}
					>
						<Tab label="Tất cả đơn" sx={{ textTransform: 'none', fontSize: '16px' }} />
						<Tab label="Chờ thanh toán" sx={{ textTransform: 'none', fontSize: '16px' }} />
						<Tab label="Đang xử lý" sx={{ textTransform: 'none', fontSize: '16px' }} />
						<Tab label="Đang vận chuyển" sx={{ textTransform: 'none', fontSize: '16px' }} />
						<Tab label="Đã giao" sx={{ textTransform: 'none', fontSize: '16px' }} />
						<Tab label="Đã hủy" sx={{ textTransform: 'none', fontSize: '16px' }} />
					</Tabs>
				</Paper>

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
						<Box>
							{filteredOrders.map((order: any) => (
								<Box key={order.id} sx={{ marginBottom: '16px' }}>
									<Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
										Đơn hàng #{order.id}
									</Typography>
									<Typography>Khách hàng: {order.customerName}</Typography>
									<Typography>Email: {order.email}</Typography>
									<Typography>Ngày đặt: {order.orderDate}</Typography>
									<Typography>Tổng tiền: {order.totalAmount.toLocaleString('vi-VN')} đ</Typography>
									<Typography>Trạng thái: {order.status}</Typography>
									<Divider sx={{ marginY: '12px' }} />
								</Box>
							))}
						</Box>
					)}
				</Paper>
			</Box>
		</>
	);
};

export default OrderHistory;
