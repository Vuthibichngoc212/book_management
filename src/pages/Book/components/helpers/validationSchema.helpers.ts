import * as Yup from 'yup';

export const bookSchema = Yup.object().shape({
	title: Yup.string().required('Tiêu đề không được để trống'),
	author: Yup.string().required('Tác giả là bắt buộc'),
	price: Yup.number().required('Giá là bắt buộc').positive('Giá phải lớn hơn 0'),
	quantity: Yup.number().required('Số lượng là bắt buộc').integer().min(0),
	categoryID: Yup.number().required('Thể loại là bắt buộc'),
	description: Yup.string(),
	publisher: Yup.string().required('Nhà xuất bản là bắt buộc'),
	publishedDate: Yup.date().nullable().required('Ngày xuất bản là bắt buộc')
});
