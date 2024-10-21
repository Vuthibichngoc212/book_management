import CRUDModal from '@/components/common/CRUDModal/CRUDModal';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';
import { IComments } from '@/types/comments';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commentsSchema } from '../helpers/validationSchema.helpers';
import { Box, Rating } from '@mui/material';
import { useCreateCommentMutation } from '@/api/api.caller';

const FormModal = ({
	isOpenModal,
	setIsOpenModal,
	headerTitle,
	cancelButtonLabel,
	submitButtonLabel,
	bookId
}: any) => {
	const methods = useForm<IComments>({
		resolver: yupResolver(commentsSchema)
	});

	const [createComment] = useCreateCommentMutation();

	const handleSubmitForm = async (data: any) => {
		console.log('Submitting for bookId:', bookId);
		try {
			await createComment({
				id: bookId,
				data: {
					content: data.comment,
					rating: data.rating
				}
			}).unwrap();
			toast.success('Đánh giá sản phẩm thành công', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
			setIsOpenModal(false);
		} catch (error) {
			toast.error('Đánh giá sản phẩm thất bại.', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		}
	};

	return (
		<CRUDModal
			isOpenModal={isOpenModal}
			setIsOpenModal={setIsOpenModal}
			headerTitle={headerTitle}
			cancelButtonLabel={cancelButtonLabel}
			submitButtonLabel={submitButtonLabel}
			onSubmit={methods.handleSubmit(handleSubmitForm)}
		>
			<>
				<ToastContainer />
				<FormProvider {...methods}>
					<Box sx={{ minWidth: '400px' }}>
						<Box sx={{ textAlign: 'center' }}>
							<Controller
								name="rating"
								control={methods.control}
								defaultValue={null}
								render={({ field }) => (
									<Rating
										{...field}
										onChange={(event, newValue) => field.onChange(newValue)}
										value={Number(field.value)}
									/>
								)}
							/>
						</Box>
						<CustomTextField
							label="Nhận xét"
							placeholder="Nhập nhận xét của bạn về sản phẩm"
							name="comment"
							control={methods.control}
							required
						/>
					</Box>
				</FormProvider>
			</>
		</CRUDModal>
	);
};

export default FormModal;
