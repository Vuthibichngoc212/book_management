import { useGetAllOrdersQuery } from '@/api/api.caller';
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
	IconButton
} from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

const Order = () => {
	const { data: ordersData, isLoading, error } = useGetAllOrdersQuery(undefined);
	const orders = ordersData?.data?.elements || [];

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
		return <Typography color="error">Có lỗi xảy ra khi lấy danh sách đơn hàng.</Typography>;
	}

	const getStatusStyle = (status: string) => {
		switch (status) {
			case 'Canceled':
				return { backgroundColor: '#ffebee', color: '#c62828' };
			case 'Delivered':
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
			<Box>
				<TableContainer
					component={Paper}
					elevation={3}
					sx={{ maxWidth: '100%', marginTop: '16px' }}
				>
					<Table>
						<TableHead>
							<TableRow sx={{ backgroundColor: '#EBF3FF' }}>
								<TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Tên khách hàng</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Ngày đặt hàng</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Tổng số tiền</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((order: any, index: number) => (
								<TableRow
									key={order.id}
									sx={{ backgroundColor: order.id % 2 === 0 ? '#F7F7F8' : 'white' }}
								>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{order.customerName}</TableCell>
									<TableCell>{order.email}</TableCell>
									<TableCell>{order.orderDate}</TableCell>
									<TableCell>{order.totalAmount.toFixed(2)}</TableCell>
									<TableCell>
										<Box
											sx={{
												...getStatusStyle(order.status),
												padding: '4px 8px',
												borderRadius: '8px',
												textAlign: 'center',
												display: 'inline-block',
												cursor: 'pointer'
											}}
										>
											{order.status}
										</Box>
									</TableCell>
									<TableCell>
										<IconButton color="primary">
											<Edit />
										</IconButton>
										<IconButton color="error">
											<Delete />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};

export default Order;
