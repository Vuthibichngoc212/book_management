import * as Yup from 'yup';

export const commentsSchema = Yup.object().shape({
	comment: Yup.string().required('Nội dung không được để trống'),
	rating: Yup.number()
		.required('Đánh giá không được để trống')
		.min(1, 'Đánh giá không hợp lệ')
		.max(5, 'Đánh giá không hợp lệ')
});
