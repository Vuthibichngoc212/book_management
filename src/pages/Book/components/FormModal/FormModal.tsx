import { FormProvider, useForm } from 'react-hook-form';
import { Box, Grid, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import CRUDModal from '@/components/common/CRUDModal/CRUDModal';
import { bookSchema } from '../helpers/validationSchema.helpers';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';
import CustomDatePicker from '@/components/common/FormElements/CustomDatePicker/CustomDatePicker';
import {
	useCreateBookMutation,
	useGetAllBooksQuery,
	useGetAllCategoriesQuery,
	useUpdateBookMutation
} from '@/api/api.caller';
import {
	CustomSelectField,
	SelectOption
} from '@/components/common/FormElements/CustomSelectField/CustomSelectField';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { IBooks } from '@/types/books';

const FormModal = ({
	isOpenModal,
	setIsOpenModal,
	headerTitle,
	cancelButtonLabel,
	submitButtonLabel,
	editRole
}: any) => {
	const methods = useForm<IBooks>({
		resolver: yupResolver(bookSchema)
	});

	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const [createBook] = useCreateBookMutation();
	const [updateBook] = useUpdateBookMutation();
	const { data: categoriesData } = useGetAllCategoriesQuery(undefined);
	const { data: booksData, refetch } = useGetAllBooksQuery(undefined);

	useEffect(() => {
		console.log('Books data after refetch:', booksData);
	}, [booksData]);

	const categoryOptions: SelectOption[] =
		categoriesData?.data?.elements.map((category: any) => ({
			label: category.categoryName,
			value: category.id
		})) || [];

	useEffect(() => {
		if (isOpenModal) {
			if (editRole) {
				const parsedDate = editRole.publishedDate ? dayjs(editRole.publishedDate) : null;
				// const parsedDate = editRole.publishedDate ? dayjs(editRole.publishedDate).toDate() : null;

				methods.setValue('title', editRole.title || '');
				methods.setValue('author', editRole.author || '');
				methods.setValue('price', editRole.price || 0);
				methods.setValue('categoryID', editRole.categoryID || 0);
				methods.setValue('quantity', editRole.quantity || 0);
				methods.setValue('publishedDate', parsedDate);
				methods.setValue('publisher', editRole.publisher || '');
				methods.setValue('description', editRole.description || '');
			} else {
				methods.reset({
					title: '',
					author: '',
					price: 0,
					categoryID: 0,
					quantity: 0,
					publishedDate: null,
					publisher: '',
					description: ''
				});
			}
			setSelectedImage(null);
			setImagePreview(null);
		}
	}, [isOpenModal, editRole, methods]);

	const handleSubmitForm = async (data: any) => {
		const formData = new FormData();

		if (!selectedImage) {
			console.error('Hình ảnh không được để trống');
			return;
		}

		if (data.publishedDate) {
			data.publishedDate = new Date(data.publishedDate).toISOString().split('T')[0];
		}

		// Thêm tất cả các field từ form vào FormData
		Object.keys(data).forEach((key) => {
			formData.append(key, data[key]);
		});

		if (selectedImage) {
			formData.append('image', selectedImage);
		}

		for (const pair of formData.entries()) {
			console.log(`${pair[0]}, ${pair[1]}`);
		}

		try {
			if (editRole) {
				await updateBook({ id: editRole.id, book: formData });
				toast.success('Cập nhật sách thành công', {
					theme: 'colored',
					autoClose: 3000,
					position: 'bottom-right'
				});
			} else {
				await createBook(formData);
				toast.success('Thêm sách thành công', {
					theme: 'colored',
					autoClose: 3000,
					position: 'bottom-right'
				});
			}

			refetch();
			methods.reset({});
			setSelectedImage(null);
			setImagePreview(null);
			setIsOpenModal(false);
		} catch (error) {
			toast.error(editRole ? 'Cập nhật sách thất bại' : 'Thêm sách thất bại', {
				theme: 'colored',
				autoClose: 3000,
				position: 'bottom-right'
			});
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setSelectedImage(file);
			setImagePreview(URL.createObjectURL(file));
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
					<Box sx={{ paddingTop: '10px' }}>
						<Grid container spacing={2} sx={{ '& > .MuiGrid-item': { paddingTop: '0px' } }}>
							<Grid item xs={4}>
								<Box
									sx={{
										border: '2px dashed #4CAF50',
										borderRadius: '8px',
										padding: '16px',
										textAlign: 'center',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										height: '150px',
										position: 'relative'
									}}
									onClick={() => document.getElementById('upload-input')?.click()}
								>
									{imagePreview ? (
										<Box
											component="img"
											src={imagePreview}
											alt="Preview"
											sx={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												borderRadius: '8px'
											}}
										/>
									) : (
										<>
											<CloudUploadIcon sx={{ fontSize: '40px', color: '#4CAF50' }} />
											<Typography sx={{ marginLeft: '8px', color: '#4CAF50' }}>
												Upload Photos
											</Typography>
										</>
									)}
								</Box>
								<input
									type="file"
									id="upload-input"
									name="image"
									hidden
									accept="image/*"
									onChange={handleImageChange}
								/>
							</Grid>

							<Grid item xs={8}>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<CustomTextField
											label="Tiêu đề"
											name="title"
											control={methods.control}
											// required
										/>
									</Grid>
									<Grid item xs={6}>
										<CustomTextField
											label="Tác giả"
											name="author"
											control={methods.control}
											// required
										/>
									</Grid>

									<Grid item xs={6}>
										<CustomTextField
											label="Giá"
											name="price"
											control={methods.control}
											// required
											type="number"
										/>
									</Grid>
									<Grid item xs={6}>
										<CustomSelectField
											label="Thể loại"
											name="categoryID"
											control={methods.control}
											options={categoryOptions}
											defaultValue={methods.watch('categoryID') || ''}
											// required
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid container item spacing={2}>
								<Grid item xs={6}>
									<CustomTextField
										label="Số lượng"
										name="quantity"
										control={methods.control}
										type="number"
										// required
									/>
								</Grid>

								<Grid item xs={6}>
									<CustomDatePicker
										label="Ngày xuất bản"
										name="publishedDate"
										control={methods.control}
										value={methods.watch('publishedDate') || null}
										onChange={(newValue: any) => methods.setValue('publishedDate', newValue)}
										// required
										type="date"
									/>
								</Grid>
								<Grid item xs={6}>
									<CustomTextField
										label="Nhà xuất bản"
										name="publisher"
										control={methods.control}
										// required
									/>
								</Grid>
							</Grid>

							<Grid item xs={12}>
								<CustomTextField
									label="Mô tả"
									name="description"
									control={methods.control}
									// required
									multiline
									// rows={2}
								/>
							</Grid>
						</Grid>
					</Box>
				</FormProvider>
			</>
		</CRUDModal>
	);
};

export default FormModal;