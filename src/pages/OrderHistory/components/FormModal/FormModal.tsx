import { useGetOrderDetailUserByIdQuery } from '@/api/api.caller';
import CRUDModal from '@/components/common/CRUDModal/CRUDModal';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

const FormModal = ({ isOpenModal, setIsOpenModal, headerTitle, orderId }: any) => {
	const methods = useForm({
		resolver: yupResolver()
	});

	const { data: orderDetail, isLoading } = useGetOrderDetailUserByIdQuery(orderId);

	return (
		<CRUDModal
			isOpenModal={isOpenModal}
			setIsOpenModal={setIsOpenModal}
			headerTitle={headerTitle}
			showActions={false}
		>
			<FormProvider {...methods}>
				<Box sx={{ minWidth: '500px' }}>
					{isLoading ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: 'auto'
							}}
						>
							<CircularProgress />
						</Box>
					) : (
						<Box style={{ maxHeight: '400px', overflow: 'auto' }}>
							{' '}
							{orderDetail?.data.map((book: any, index: number) => (
								<Box
									key={index}
									sx={{
										padding: '16px',
										border: '1px solid #ccc',
										borderRadius: '8px',
										mt: index > 0 ? 2 : 0
									}}
								>
									<Typography sx={{ color: '#E76F51', fontSize: '18px', fontWeight: '600', mb: 2 }}>
										Thông tin sách
									</Typography>
									<CustomTextField
										fullWidth
										label="Tên sách"
										name={`bookName${index}`}
										control={methods.control}
										value={book.bookName}
										disabled
									/>
									<Grid container spacing={2} sx={{ mt: 1 }}>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="Số lượng"
												name={`quantity${index}`}
												control={methods.control}
												value={book.quantity}
												disabled
											/>
										</Grid>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="Giá cuốn sách"
												name={`pricePerBook${index}`}
												control={methods.control}
												value={book.pricePerBook.toLocaleString('vi-VN')}
												disabled
											/>
										</Grid>
									</Grid>
								</Box>
							))}
						</Box>
					)}
				</Box>
			</FormProvider>
		</CRUDModal>
	);
};

export default FormModal;
