import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import {
	Box,
	Typography,
	TextField,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Grid,
	CircularProgress
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LockIcon from '@mui/icons-material/Lock';
import PinIcon from '@mui/icons-material/Pin';
import DeleteIcon from '@mui/icons-material/Delete';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

import { useGetInfoUserQuery, useUpdateInfoUserMutation } from '@/api/api.caller';
import FormModal from '../components/FormModal/FormModal';
import { useEffect, useState } from 'react';

interface UserData {
	fullName: string;
	username: string;
	email: string;
	phone: string;
	address: string;
	gender: string;
	nationality: string;
}

function ProfileUser() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const { data: userData, isLoading, isError } = useGetInfoUserQuery(undefined);
	const [updateUserInfo] = useUpdateInfoUserMutation();

	const handleOpenModal = () => {
		setIsOpenModal(true);
	};

	const [formData, setFormData] = useState({
		fullName: '',
		username: '',
		email: '',
		phone: '',
		address: '',
		gender: '',
		nationality: 'Việt Nam'
	});

	useEffect(() => {
		if (userData && userData.data) {
			const user = userData.data;
			setFormData({
				fullName: user.fullName || '',
				username: user.username || '',
				email: user.email || '',
				phone: user.phoneNumber || '',
				address: user.address || '',
				gender: 'Nữ',
				nationality: 'Việt Nam'
			});
		}
	}, [userData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async () => {
		try {
			const payload: Partial<UserData> = {};
			for (const key in formData) {
				if (formData[key as keyof UserData] !== userData.data[key as keyof UserData]) {
					payload[key as keyof UserData] = formData[key as keyof UserData];
				}
			}

			await updateUserInfo(payload).unwrap();
			toast.success('Cập nhật thông tin thành công!', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		} catch (error) {
			toast.error('Có lỗi xảy ra khi cập nhật thông tin.', {
				theme: 'colored',
				autoClose: 2000,
				position: 'bottom-right'
			});
		}
	};

	if (isLoading) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress />
			</Box>
		);
	}
	if (isError) return <Typography>Error loading user data</Typography>;

	return (
		<>
			<ToastContainer />
			<Header />
			<Box sx={{ marginTop: '100px', padding: '0 24px', marginBottom: '24px' }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<Box
							sx={{
								padding: '24px',
								backgroundColor: '#fff',
								borderRadius: '8px',
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
							}}
						>
							<Typography variant="h6" sx={{ marginBottom: '24px' }}>
								Thông tin tài khoản
							</Typography>

							<Box>
								<TextField
									fullWidth
									label="Họ & Tên"
									name="fullName"
									value={formData.fullName}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Username"
									name="username"
									value={formData.username}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Số điện thoại"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Địa chỉ"
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									margin="normal"
								/>

								<Typography variant="body1" sx={{ marginBottom: '8px' }}>
									Giới tính
								</Typography>
								<RadioGroup row name="gender" value={formData.gender} onChange={handleInputChange}>
									<FormControlLabel value="Nam" control={<Radio />} label="Nam" />
									<FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
									<FormControlLabel value="Khác" control={<Radio />} label="Khác" />
								</RadioGroup>

								<FormControl fullWidth sx={{ marginTop: '16px' }}>
									<InputLabel>Quốc tịch</InputLabel>
									<Select
										name="nationality"
										value={formData.nationality}
										onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
									>
										<MenuItem value="Việt Nam">Việt Nam</MenuItem>
										<MenuItem value="Mỹ">Mỹ</MenuItem>
										<MenuItem value="Nhật Bản">Nhật Bản</MenuItem>
									</Select>
								</FormControl>

								<Button
									onClick={handleSubmit}
									variant="contained"
									color="primary"
									sx={{
										marginTop: '24px',
										display: 'block',
										width: '100%',
										textTransform: 'none',
										fontSize: '14px'
									}}
								>
									Lưu thay đổi
								</Button>
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12} md={4}>
						<Box
							sx={{
								padding: '24px',
								backgroundColor: '#fff',
								borderRadius: '8px',
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								marginBottom: '16px'
							}}
						>
							<Typography variant="h6" sx={{ marginBottom: '16px' }}>
								Bảo mật
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
								<Typography sx={{ display: 'flex', alignItems: 'center' }}>
									<LockIcon sx={{ marginRight: '8px' }} />
									Thiết lập mật khẩu
								</Typography>
								<Button
									variant="outlined"
									sx={{ textTransform: 'none', fontSize: '14px' }}
									onClick={() => handleOpenModal()}
								>
									Cập nhật
								</Button>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
								<Typography sx={{ display: 'flex', alignItems: 'center' }}>
									<PinIcon sx={{ marginRight: '8px' }} />
									Thiết lập mã PIN
								</Typography>
								<Button variant="outlined" sx={{ textTransform: 'none', fontSize: '14px' }}>
									Thiết lập
								</Button>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
								<Typography sx={{ display: 'flex', alignItems: 'center' }}>
									<DeleteIcon sx={{ marginRight: '8px' }} />
									Yêu cầu xóa tài khoản
								</Typography>
								<Button variant="outlined" sx={{ textTransform: 'none', fontSize: '14px' }}>
									Yêu cầu
								</Button>
							</Box>

							<Typography variant="h6" sx={{ marginTop: '24px' }}>
								Liên kết mạng xã hội
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
								<Typography sx={{ display: 'flex', alignItems: 'center' }}>
									<FacebookIcon sx={{ marginRight: '8px', color: '#4267B2' }} />
									Facebook
								</Typography>
								<Button variant="outlined" sx={{ textTransform: 'none', fontSize: '14px' }}>
									Liên kết
								</Button>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
								<Typography sx={{ display: 'flex', alignItems: 'center' }}>
									<GoogleIcon sx={{ marginRight: '8px', color: '#4285F4' }} />
									Google
								</Typography>
								<Button variant="outlined" sx={{ textTransform: 'none', fontSize: '14px' }}>
									Liên kết
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Footer />
			<FormModal
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
				headerTitle="Thiết lập mật khẩu"
				cancelButtonLabel="Hủy"
				submitButtonLabel="Cập nhật"
			/>
		</>
	);
}

export default ProfileUser;
