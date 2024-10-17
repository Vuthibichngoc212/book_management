import { Box, Typography, Paper, Avatar, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { useGetAllRevenueByMonthQuery, useGetAllTopBooksQuery } from '@/api/api.caller';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
	const {
		data: topBooksData,
		isLoading: isLoadingBooks,
		isError: isErrorBooks
	} = useGetAllTopBooksQuery(undefined);
	const {
		data: revenueData,
		isLoading: isLoadingRevenue,
		isError: isErrorRevenue
	} = useGetAllRevenueByMonthQuery(undefined);

	const lineChartData = {
		labels: revenueData?.data.map((item: any) => `${item.month}/${item.year}`) || [],
		datasets: [
			{
				label: 'Total Revenue',
				data: revenueData?.data.map((item: any) => item.totalRevenue) || [],
				borderColor: '#3e95cd',
				fill: false
			}
		]
	};

	if (isLoadingBooks || isLoadingRevenue) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (isErrorBooks || isErrorRevenue || !revenueData || !topBooksData) {
		return 'Không có dữ liệu';
	}

	return (
		<Box sx={{ paddingTop: '10px' }}>
			<Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
				<Paper
					elevation={3}
					sx={{
						padding: '16px',
						flex: 1,
						borderRadius: '8px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between'
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<Avatar sx={{ backgroundColor: '#f5f5f5' }}>💲</Avatar>
						<Typography variant="subtitle1">Total Revenue</Typography>
					</Box>
					<Typography variant="h4" sx={{ marginTop: '10px' }}>
						1200
					</Typography>
					<Typography variant="body2" color="textSecondary">
						5% increase vs last month
					</Typography>
				</Paper>
				<Paper
					elevation={3}
					sx={{
						padding: '16px',
						flex: 1,
						borderRadius: '8px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between'
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<Avatar sx={{ backgroundColor: '#f5f5f5' }}>👥</Avatar>
						<Typography variant="subtitle1">Total Customers</Typography>
					</Box>
					<Typography variant="h4" sx={{ marginTop: '10px' }}>
						200
					</Typography>
					<Typography variant="body2" color="textSecondary">
						5% increase vs last month
					</Typography>
				</Paper>
				<Paper
					elevation={3}
					sx={{
						padding: '16px',
						flex: 1,
						borderRadius: '8px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between'
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<Avatar sx={{ backgroundColor: '#f5f5f5' }}>📦</Avatar>
						<Typography variant="subtitle1">Total Orders</Typography>
					</Box>
					<Typography variant="h4" sx={{ marginTop: '10px' }}>
						1000
					</Typography>
					<Typography variant="body2" color="textSecondary">
						5% increase vs last month
					</Typography>
				</Paper>
			</Box>

			<Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
				<Paper
					elevation={1}
					sx={{
						padding: '16px',
						borderRadius: '8px',
						marginBottom: '20px',
						display: 'flex',
						alignItems: 'center',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
					}}
				>
					<Box sx={{ flex: 1, marginBottom: '30px', height: '400px' }}>
						<Typography sx={{ fontSize: '20px' }}>
							Xu hướng doanh thu: Phân tích theo tháng
						</Typography>
						<Line
							data={lineChartData}
							options={{ responsive: true, maintainAspectRatio: false }}
							height={300}
						/>
					</Box>
				</Paper>

				<Box sx={{ flex: 1, marginBottom: '30px', marginTop: '18px' }}>
					<Typography sx={{ fontSize: '20px' }}>Top cuốn sách bán chạy nhất</Typography>
					{topBooksData?.data.map((item: any, index: number) => (
						<Paper
							key={item.bookID}
							sx={{
								display: 'flex',
								alignItems: 'center',
								padding: '10px',
								marginBottom: '10px',
								backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#ffffff',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
								borderRadius: '8px'
							}}
						>
							<Avatar
								src={item.image}
								alt={item.title}
								sx={{ width: 56, height: 56, marginRight: '15px' }}
							/>
							<Box sx={{ flexGrow: 1 }}>
								<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
									#{index + 1} {item.title}
								</Typography>
								<Typography variant="body2" color="textSecondary">
									{item.author}
								</Typography>
							</Box>
							<Box>
								<Typography variant="subtitle1">{item.totalBooksSold} orders</Typography>
							</Box>
						</Paper>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
