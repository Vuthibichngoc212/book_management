import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
	categoryName: Yup.string().required('Tên danh mục không được để trống'),
	description: Yup.string().required('Mô tả danh mục không được để trống')
});
