import CRUDModal from '@/components/common/CRUDModal/CRUDModal';
import CustomTextField from '@/components/common/FormElements/CustomTextField/CustomTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from '../helper/validationSchema.helpers';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useChangePasswordMutation } from '@/api/api.caller';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormModal = ({
	isOpenModal,
	setIsOpenModal,
	headerTitle,
	cancelButtonLabel,
	submitButtonLabel
}: any) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [changePassword] = useChangePasswordMutation();

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const methods = useForm({
		resolver: yupResolver(changePasswordSchema)
	});

	const onSubmit = async (data: any) => {
		try {
			await changePassword(data).unwrap();
			toast.success('Thay đổi mật khẩu thành công', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
			setTimeout(() => {
				setIsOpenModal(false);
			}, 2000);
		} catch (error) {
			toast.error('Lỗi khi thay đổi mật khẩu', {
				theme: 'colored',
				autoClose: 2000,
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
			onSubmit={methods.handleSubmit(onSubmit)}
		>
			<>
				<ToastContainer />
				<CustomTextField
					required
					label="Mật khẩu cũ"
					placeholder="Nhập mật khẩu cũ"
					name="oldPassword"
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

				<CustomTextField
					required
					label="Mật khẩu mới"
					placeholder="Nhập mật khẩu mới"
					name="newPassword"
					control={methods.control}
					type={showNewPassword ? 'text' : 'password'}
					customStyles={{ mb: '5px' }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle new password visibility"
									onClick={handleClickShowNewPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showNewPassword ? (
										<Visibility sx={{ width: '16px', height: '16px' }} />
									) : (
										<VisibilityOff sx={{ width: '16px', height: '16px' }} />
									)}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>

				<CustomTextField
					required
					label="Xác nhận mật khẩu"
					placeholder="Xác nhận mật khẩu"
					name="confirmPassword"
					control={methods.control}
					type={showConfirmPassword ? 'text' : 'password'}
					customStyles={{ mb: '20px' }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle confirm password visibility"
									onClick={handleClickShowConfirmPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showConfirmPassword ? (
										<Visibility sx={{ width: '16px', height: '16px' }} />
									) : (
										<VisibilityOff sx={{ width: '16px', height: '16px' }} />
									)}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
			</>
		</CRUDModal>
	);
};

export default FormModal;
