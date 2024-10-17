import CRUDModal from '@/components/common/CRUDModal/CRUDModal';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';
import { IComments } from '@/types/comments';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { commentsSchema } from '../helpers/validationSchema.helpers';
import { Box, Rating } from '@mui/material';
import { useState } from 'react';

const FormModal = ({
	isOpenModal,
	setIsOpenModal,
	headerTitle,
	cancelButtonLabel,
	submitButtonLabel
}: any) => {
	const methods = useForm<IComments>({
		resolver: yupResolver(commentsSchema)
	});

	const [rating, setRating] = useState<number | null>(null);

	return (
		<CRUDModal
			isOpenModal={isOpenModal}
			setIsOpenModal={setIsOpenModal}
			headerTitle={headerTitle}
			cancelButtonLabel={cancelButtonLabel}
			submitButtonLabel={submitButtonLabel}
			// onSubmit={methods.handleSubmit(handleSubmitForm)}
		>
			<>
				<ToastContainer />
				<FormProvider {...methods}>
					<Box sx={{ minWidth: '400px' }}>
						<Box sx={{ textAlign: 'center' }}>
							<Rating
								name="product-rating"
								value={rating}
								onChange={(event, newValue) => {
									setRating(newValue);
								}}
							/>
						</Box>
						<CustomTextField
							label="Họ tên"
							placeholder="Nhập nhận sẽ hiển thị khi đánh giá"
							name="fullName"
							control={methods.control}
						/>
						<CustomTextField
							label="Nhận xét"
							placeholder="Nhập nhận xét của bạn về sản phẩm"
							name="comment"
							control={methods.control}
						/>
					</Box>
				</FormProvider>
			</>
		</CRUDModal>
	);
};

export default FormModal;
