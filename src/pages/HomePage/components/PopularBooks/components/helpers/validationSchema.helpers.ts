import * as Yup from 'yup';

export const commentsSchema = Yup.object().shape({
	comment: Yup.string().required('Tiêu đề không được để trống')
});
