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
	IconButton,
	Button,
	Tooltip,
	CircularProgress,
	TablePagination
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useDeleteBookMutation, useGetAllBooksQuery } from '@/api/api.caller';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import FormModal from '../components/FormModal/FormModal';
import NoDataCommon from '@/components/common/NoDataCommon/NoDataCommon';

const MAX_LENGTH = 25;

const BookManagement = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [editRole, setEditRole] = useState(null);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { data: booksData, isLoading, error, refetch } = useGetAllBooksQuery(undefined);

	const [deleteBook] = useDeleteBookMutation();

	const books = booksData?.data?.elements || [];

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

	const truncateText = (text: string, length: number) => {
		if (text.length > length) {
			return text.substring(0, length) + '...';
		}
		return text;
	};

	const handleOpenModal = (book: any = null) => {
		setEditRole(book);
		setIsOpenModal(true);
	};

	const handleDeleteBook = async (bookId: string) => {
		try {
			await deleteBook(bookId).unwrap();
			toast.success('Xóa sách thành công!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
			refetch();
		} catch (error) {
			toast.error('Xóa sách thất bại!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		}
	};

	return (
		<>
			<ToastContainer />
			<Box>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, marginRight: 4 }}>
					<Button
						startIcon={<Add />}
						onClick={() => handleOpenModal()}
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
						Thêm sách
					</Button>
				</Box>

				<TableContainer
					component={Paper}
					elevation={3}
					sx={{
						maxWidth: '100%',
						marginTop: 2,
						height: '400px',
						overflowY: 'auto'
					}}
				>
					<Table>
						<TableHead>
							<TableRow sx={{ backgroundColor: '#EBF3FF' }}>
								<TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Ảnh</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Tiêu đề</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Tác giả</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Thể loại</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Nhà xuất bản</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Năm xuất bản</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Giá</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Mô tả</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{books
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((book: any, index: number) => (
									<TableRow
										key={book.id}
										sx={{ backgroundColor: book.id % 2 === 0 ? '#F7F7F8' : 'white' }}
									>
										<TableCell>{index + 1 + page * rowsPerPage}</TableCell>
										<TableCell>
											<Box
												component="img"
												src={book.image}
												alt={book.title}
												sx={{
													width: '50px',
													height: '50px',
													objectFit: 'cover',
													borderRadius: '4px'
												}}
											/>
										</TableCell>
										<TableCell>
											<Tooltip title={book.title} arrow placement="top">
												<Typography>{truncateText(book.title, MAX_LENGTH)}</Typography>
											</Tooltip>
										</TableCell>
										<TableCell>{book.author}</TableCell>
										<TableCell>{book.categoryName}</TableCell>
										<TableCell>{book.publisher}</TableCell>
										<TableCell>{new Date(book.publishedDate).getFullYear()}</TableCell>
										<TableCell>{book.price.toFixed(2)}</TableCell>
										<TableCell>{book.quantity}</TableCell>
										<TableCell>
											<Tooltip title={book.description} arrow placement="top">
												<Typography>{truncateText(book.description, MAX_LENGTH)}</Typography>
											</Tooltip>
										</TableCell>
										<TableCell>
											<Box sx={{ display: 'flex' }}>
												<IconButton color="primary" onClick={() => handleOpenModal(book)}>
													<Edit />
												</IconButton>
												<IconButton color="error" onClick={() => handleDeleteBook(book.id)}>
													<Delete />
												</IconButton>
											</Box>
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
				headerTitle={editRole ? 'Sửa Sách' : 'Thêm Sách'}
				cancelButtonLabel="Hủy"
				submitButtonLabel={editRole ? 'Cập nhật' : 'Thêm'}
				editRole={editRole}
			/>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component="div"
					count={books.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Box>
		</>
	);
};

export default BookManagement;
