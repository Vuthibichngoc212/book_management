import { Button, Modal, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCancelOrderMutation, useGetAllOrdersUserQuery } from '@/api/api.caller';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStyles } from './DialogCancel.styles';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';

const validationSchema = Yup.object().shape({
	note: Yup.string().required('Lý do không được để trống')
});

const DialogCancel = ({ isOpen, onClose, orderId }: any) => {
	const classes = useStyles();
	const [cancelOrder] = useCancelOrderMutation();
	const { refetch } = useGetAllOrdersUserQuery(undefined);

	const methods = useForm({
		resolver: yupResolver(validationSchema)
	});

	const { handleSubmit, reset } = methods;

	const onSubmit = async (data: any) => {
		try {
			await cancelOrder({ id: orderId, note: data.note }).unwrap();
			toast.success('Đơn hàng đã bị hủy', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
			refetch();
			onClose();
			reset();
		} catch (error) {
			toast.error('Có lỗi xảy ra khi hủy đơn hàng', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		}
	};

	return (
		<>
			<ToastContainer />
			<Modal open={isOpen} onClose={onClose}>
				<Box className={classes.boxWrapper}>
					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Box sx={{ display: 'grid' }}>
								<HeaderTitle
									title={'Hủy đơn hàng'}
									customStyle={{
										'& .MuiTypography-root': { color: '#000', fontSize: '20px', fontWeight: '600' },
										textAlign: 'center',
										marginBottom: '1.6rem',
										gridColumn: '2/3'
									}}
								/>
								<Box sx={{ gridColumn: '3', textAlign: 'end' }}>
									<CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
								</Box>
							</Box>
							<Divider sx={{ mb: '1.6rem' }} />
							<Box sx={{ minWidth: '400px' }}>
								<CustomTextField
									fullWidth
									label="Lý do hủy"
									name="note"
									control={methods.control}
									required
								/>
								<Box sx={{ display: 'flex', justifyContent: 'end', gap: '1.6rem' }}>
									<Button
										variant="outlined"
										size="medium"
										onClick={onClose}
										sx={{ textTransform: 'none' }}
									>
										Hủy
									</Button>
									<Button
										type="submit"
										variant="contained"
										size="medium"
										sx={{ textTransform: 'none' }}
									>
										Xác nhận
									</Button>
								</Box>
							</Box>
						</form>
					</FormProvider>
				</Box>
			</Modal>
		</>
	);
};

export default DialogCancel;
