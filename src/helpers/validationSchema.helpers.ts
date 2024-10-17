import * as Yup from 'yup';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = Yup.object().shape({
	username: Yup.string().trim().required('user name không được để trống'),
	password: Yup.string().required('Mật khẩu không được để trống')
});

export const registerSchema = Yup.object().shape({
	username: Yup.string().trim().required('username không được để trống'),
	fullName: Yup.string().trim().required('Họ tên không được để trống'),
	email: Yup.string()
		.required('Email không được để trống')
		.matches(EMAIL_REGEX, 'Email không hợp lệ'),
	phone: Yup.string().trim().required('Số điện thoại không được để trống'),
	address: Yup.string().trim().required('Địa chỉ không được để trống'),
	password: Yup.string().required('Mật khẩu không được để trống')
});

export const forgotPassSchema = Yup.object().shape({
	email: Yup.string()
		.required('Email không được để trống')
		.matches(EMAIL_REGEX, 'Email không hợp lệ')
});
