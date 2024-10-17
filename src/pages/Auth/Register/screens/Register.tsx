import { Box, Button, Typography, Paper, Link, InputAdornment, IconButton } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/helpers/validationSchema.helpers';
import { useStyles } from './Register.style';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRegisterMutation } from '@/api/api.caller';
import { IUser } from '@/types/users';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '@/redux/slices/users.slice';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';

const Register = ({ onToggleForm }: any) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const methods = useForm({
		resolver: yupResolver(registerSchema)
	});

	const [registerUser] = useRegisterMutation();

	const onSubmit = async (data: IUser) => {
		try {
			const response = await registerUser(data).unwrap();
			if (response) {
				dispatch(setUser(response));
				toast.success('Đăng ký thành công', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
				setTimeout(() => {
					onToggleForm();
				}, 1000);
			} else {
				toast.error('Đăng ký thất bại. Vui lòng thử lại', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
			}
		} catch {
			toast.error('Đăng ký thất bại. Vui lòng thử lại', {
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
								Đăng ký
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
										label="Username"
										name="username"
										control={methods.control}
										required
									/>
									<CustomTextField
										label="Họ tên"
										placeholder="Nhập họ tên"
										name="fullName"
										control={methods.control}
										required
									/>
									<CustomTextField
										label="Email"
										placeholder="Nhập email"
										name="email"
										control={methods.control}
										required
									/>
									<CustomTextField
										label="Số điện thoại"
										name="phone"
										control={methods.control}
										required
									/>
									<CustomTextField
										label="Địa chỉ"
										name="address"
										control={methods.control}
										required
									/>
									<CustomTextField
										required
										label="Mật khẩu"
										placeholder="Nhập mật khẩu"
										name="password"
										control={methods.control}
										type={showPassword ? 'text' : 'password'}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
														edge="end"
													>
														{showPassword ? (
															<Visibility sx={{ width: '16px', height: '16px' }} />
														) : (
															<VisibilityOff sx={{ width: '16px', height: '16px' }} />
														)}
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
									<Button type="submit" fullWidth variant="contained" className={classes.btn}>
										Đăng ký
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

export default Register;
