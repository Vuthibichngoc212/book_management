import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from '@/api/api.caller';
import { Add, Delete, Edit } from '@mui/icons-material';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	IconButton,
	CircularProgress,
	TablePagination
} from '@mui/material';
import FormModal from '../components/FormModal/FormModal';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeletePopUp from '@/components/common/DeletePopUp/DeletePopUp';
import NoDataCommon from '@/components/common/NoDataCommon/NoDataCommon';

const Categories = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [editRole, setEditRole] = useState(null);
	const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
	const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);

	const [deleteCategory] = useDeleteCategoryMutation();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleOpenModal = (categoriy: any = null) => {
		setEditRole(categoriy);
		setIsOpenModal(true);
	};

	const handleOpenDeletePopup = (categoryId: string) => {
		setDeleteCategoryId(categoryId);
		setIsDeletePopupOpen(true);
	};

	const { data: categoriesData, isLoading, error, refetch } = useGetAllCategoriesQuery(undefined);
	const categories = categoriesData?.data?.elements || [];

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

	const handleAfterSubmit = () => {
		refetch();
	};

	const handleConfirmDelete = async () => {
		if (!deleteCategoryId) return;

		try {
			await deleteCategory(deleteCategoryId).unwrap();
			toast.success('Xóa danh mục thành công!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
			refetch();
		} catch (error) {
			toast.error('Xóa danh mục thất bại!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		} finally {
			setIsDeletePopupOpen(false);
			setDeleteCategoryId(null);
		}
	};

	return (
		<>
			<ToastContainer />
			<Box>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
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
						Thêm danh mục
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
								<TableCell sx={{ fontWeight: 'bold' }}>Tên danh mục</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Mô tả</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{categories.map((category: any, index: number) => (
								<TableRow
									key={category.id}
									sx={{ backgroundColor: category.id % 2 === 0 ? '#F7F7F8' : 'white' }}
								>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{category.categoryName}</TableCell>
									<TableCell>{category.description}</TableCell>
									<TableCell>
										<IconButton color="primary" onClick={() => handleOpenModal(category)}>
											<Edit />
										</IconButton>
										<IconButton color="error" onClick={() => handleOpenDeletePopup(category.id)}>
											<Delete />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
					<TablePagination
						rowsPerPageOptions={[10, 25, 50]}
						component="div"
						count={categories.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Box>
			</Box>

			<FormModal
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
				headerTitle={editRole ? 'Cập nhật danh mục' : 'Thêm danh mục'}
				cancelButtonLabel="Hủy"
				submitButtonLabel={editRole ? 'Cập nhật' : 'Thêm'}
				onSubmit={handleAfterSubmit}
				editRole={editRole}
			/>
			<DeletePopUp
				open={isDeletePopupOpen}
				onClose={() => setIsDeletePopupOpen(false)}
				onConfirm={handleConfirmDelete}
				title="Xác nhận xóa"
				content="Bạn có chắc chắn muốn xóa danh mục này không?"
			/>
		</>
	);
};

export default Categories;
