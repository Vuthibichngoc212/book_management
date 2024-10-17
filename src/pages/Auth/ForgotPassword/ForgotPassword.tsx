import { Box, Button, Typography, Paper, Link } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPassSchema } from '@/helpers/validationSchema.helpers';
import { useStyles } from './ForgotPassword.style';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';
import { useForgotPasswordMutation } from '@/api/api.caller';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = ({ onToggleForm }: any) => {
	const classes = useStyles();
	const methods = useForm({
		resolver: yupResolver(forgotPassSchema)
	});

	const [forgotPassword] = useForgotPasswordMutation();
	const onSubmit = async (data: any) => {
		try {
			const response = await forgotPassword(data.email);

			if (response.data) {
				toast.success('Thay đổi mật khẩu thành công', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
				setTimeout(() => {
					onToggleForm();
				}, 1000);
			}
		} catch (error) {
			toast.error('Thay đổi mật khẩu thất bại', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		}
	};

	return (
		<>
			<ToastContainer />
			<FormProvider {...methods}>
				<Box className={classes.formContainer}>
					<Paper elevation={6} className={classes.form}>
						<Box sx={{ padding: '24px' }}>
							<Typography component="h1" variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
								Quên mật khẩu
							</Typography>
							<Typography sx={{ fontSize: '16px' }} align="center">
								Bạn đã có tài khoản?{' '}
								<Link
									href="#"
									onClick={onToggleForm}
									sx={{
										color: '#ff4081',
										textDecoration: 'none',
										'&:hover': {
											color: '#ff4081'
										}
									}}
								>
									Log In
								</Link>
							</Typography>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<Box sx={{ marginTop: '20px' }}>
									<CustomTextField
										label="Email"
										placeholder="Nhập email"
										name="email"
										control={methods.control}
										required
										multiline
									/>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										sx={{
											textTransform: 'none',
											backgroundColor: '#ff4081',
											'&:hover': {
												backgroundColor: '#ff4081'
											},
											'&:focus': {
												outline: 'none'
											}
										}}
									>
										Tiếp tục
									</Button>
								</Box>
							</form>
						</Box>
					</Paper>
				</Box>
			</FormProvider>
		</>
	);
};

export default ForgotPassword;
