import { useState } from 'react';
import { useGetAllCustomersQuery } from '@/api/api.caller';
import { SaveAlt } from '@mui/icons-material';
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
	Button,
	CircularProgress,
	TablePagination
} from '@mui/material';

const Customer = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { data: usersData, isLoading, error } = useGetAllCustomersQuery(undefined);
	const users = usersData?.data?.elements || [];

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
		return <Typography color="error">Có lỗi xảy ra khi lấy danh sách khách hàng</Typography>;
	}

	return (
		<>
			<Box>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
					<Button
						startIcon={<SaveAlt />}
						sx={{
							padding: '5px 15px',
							backgroundColor: '#485CC7',
							color: '#fff',
							textTransform: 'none',
							'&:hover': {
								backgroundColor: '#3a4c99'
							}
						}}
					>
						Xuất file
					</Button>
				</Box>

				<TableContainer
					component={Paper}
					elevation={3}
					sx={{ maxWidth: '100%', margin: 'auto', height: '400px', overflowY: 'auto' }}
				>
					<Table>
						<TableHead>
							<TableRow sx={{ backgroundColor: '#EBF3FF' }}>
								<TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Họ tên</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Số điện thoại</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Địa chỉ</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Ngày tạo</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((user: any, index: number) => (
									<TableRow
										key={user.id}
										sx={{ backgroundColor: user.id % 2 === 0 ? '#F7F7F8' : 'white' }}
									>
										<TableCell>{index + 1 + page * rowsPerPage}</TableCell>{' '}
										<TableCell>{user.username}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.fullName}</TableCell>
										<TableCell>{user.phoneNumber}</TableCell>
										<TableCell>{user.address}</TableCell>
										<TableCell>{user.createdDate}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>

				<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
					<TablePagination
						rowsPerPageOptions={[10, 25, 50]}
						component="div"
						count={users.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Box>
			</Box>
		</>
	);
};

export default Customer;
