import { FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/api/api.caller';

import CRUDModal from '@/components/common/CRUDModal/CRUDModal';
import { categorySchema } from '../helpers/validationSchema.helpers';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const FormModal = ({
	isOpenModal,
	setIsOpenModal,
	headerTitle,
	cancelButtonLabel,
	submitButtonLabel,
	onSubmit,
	editRole
}: any) => {
	const methods = useForm({
		resolver: yupResolver(categorySchema)
	});

	const [createCategory] = useCreateCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();

	useEffect(() => {
		if (editRole) {
			methods.reset({
				categoryName: editRole.categoryName,
				description: editRole.description
			});
		} else {
			methods.reset({
				categoryName: '',
				description: ''
			});
		}
	}, [editRole, methods]);

	const handleSubmitForm = async (data: any) => {
		try {
			if (editRole) {
				await updateCategory({ id: editRole.id, ...data });
				toast.success('Sửa danh mục thành công', {
					theme: 'colored',
					autoClose: 3000,
					position: 'bottom-right'
				});
			} else {
				await createCategory(data);
				toast.success('Thêm danh mục thành công', {
					theme: 'colored',
					autoClose: 3000,
					position: 'bottom-right'
				});
			}

			setIsOpenModal(false);

			if (onSubmit) {
				onSubmit();
			}
		} catch (error) {
			toast.error(editRole ? 'Sửa danh mục thất bại' : 'Thêm danh mục thất bại', {
				theme: 'colored',
				autoClose: 3000,
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
					<Box>
						<CustomTextField
							fullWidth
							label="Tên danh mục"
							name="categoryName"
							control={methods.control}
							required
						/>
						<CustomTextField fullWidth label="Mô tả" name="description" control={methods.control} />
					</Box>
				</FormProvider>
			</>
		</CRUDModal>
	);
};

export default FormModal;
