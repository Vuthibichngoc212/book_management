import { Box, Button, Typography, Paper, Link, InputAdornment, IconButton } from '@mui/material';
import { useStyles } from './Login.style';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/helpers/validationSchema.helpers';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLoginAdminMutation, useLoginMutation } from '@/api/api.caller';
import { IUser } from '@/types/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/users.slice';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';

const Login = ({ onToggleForm, onForgotPassword }: any) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const methods = useForm({
		resolver: yupResolver(loginSchema)
	});

	const [loginUser] = useLoginMutation();
	const [loginAdmin] = useLoginAdminMutation();

	const onSubmit = async (data: IUser) => {
		try {
			let response;

			if (data.username.toLowerCase().startsWith('admin')) {
				response = await loginAdmin(data).unwrap();
				localStorage.setItem('adminToken', response.data.token);
			} else {
				response = await loginUser(data).unwrap();
				localStorage.setItem('userToken', response.data.token);
			}

			if (response) {
				dispatch(setUser(response));
				toast.success('Đăng nhập thành công', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});

				setTimeout(() => {
					if (data.username.toLowerCase().startsWith('admin')) {
						navigate('/dashboard');
					} else {
						navigate('/');
					}
				}, 1000);
			} else {
				toast.error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.', {
					theme: 'colored',
					autoClose: 2000,
					position: 'bottom-right'
				});
			}
		} catch (error) {
			toast.error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.', {
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
								Đăng nhập
							</Typography>
							<Typography sx={{ fontSize: '16px' }} align="center">
								Bạn chưa có tài khoản?{' '}
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
									Register
								</Link>
							</Typography>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<Box sx={{ marginTop: '20px' }}>
									<CustomTextField
										label="Username"
										name="username"
										control={methods.control}
										required
										multiline
									/>
									<CustomTextField
										required
										label="Mật khẩu"
										placeholder="Nhập mật khẩu"
										name="password"
										control={methods.control}
										type={showPassword ? 'text' : 'password'}
										customStyles={{ mb: '5px' }}
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
									<Typography sx={{ fontSize: '12px', margin: '10px 0px' }}>
										<Link
											href="#"
											onClick={onForgotPassword}
											sx={{
												fontSize: '12px',
												color: '#ff4081',
												textDecoration: 'none',
												'&:hover': {
													color: '#ff4081'
												}
											}}
										>
											Quên mật khẩu ?
										</Link>
									</Typography>

									<Button type="submit" fullWidth variant="contained" className={classes.btnLogin}>
										Đăng nhập
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

export default Login;
