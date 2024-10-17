import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Facebook, Twitter, LinkedIn, YouTube } from '@mui/icons-material';

const Footer = () => {
	return (
		<Box
			sx={{
				backgroundColor: '#F4A261',
				padding: '16px',
				textAlign: 'center'
			}}
		>
			<Typography
				variant="h5"
				sx={{
					fontWeight: 'bold',
					color: '#000',
					marginBottom: '16px'
				}}
			>
				Đăng ký nhận ưu đãi mới của chúng tôi!
			</Typography>
			<Box
				sx={{
					display: 'inline-flex',
					alignItems: 'center',
					backgroundColor: '#fff',
					borderRadius: '24px',
					padding: '5px 10px',
					marginBottom: '30px',
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
				}}
			>
				<TextField
					variant="standard"
					placeholder="Nhập email của bạn"
					sx={{
						padding: '0 8px',
						flexGrow: 1
					}}
					InputProps={{
						disableUnderline: true,
						startAdornment: (
							<InputAdornment position="start">
								<MailOutlineIcon />
							</InputAdornment>
						)
					}}
				/>
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#E76F51',
						borderRadius: '20px',
						padding: '10px 24px',
						color: '#fff',
						fontWeight: 'bold',
						'&:hover': {
							backgroundColor: '#D1495B'
						}
					}}
				>
					Đặt mua
				</Button>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
				<Typography variant="body2" sx={{ color: '#000' }}>
					Giá cả
				</Typography>
				<Typography variant="body2" sx={{ color: '#000' }}>
					Giới thiệu về chúng tôi
				</Typography>
				<Typography variant="body2" sx={{ color: '#000' }}>
					Tính năng
				</Typography>
				<Typography variant="body2" sx={{ color: '#000' }}>
					Trung tâm trợ giúp
				</Typography>
				<Typography variant="body2" sx={{ color: '#000' }}>
					Liên hệ với chúng tôi
				</Typography>
				<Typography variant="body2" sx={{ color: '#000' }}>
					Câu hỏi thường gặp
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
				<Facebook sx={{ color: '#4267B2' }} />
				<Twitter sx={{ color: '#1DA1F2' }} />
				<LinkedIn sx={{ color: '#0077b5' }} />
				<YouTube sx={{ color: '#FF0000' }} />
			</Box>

			<Typography variant="body2" sx={{ color: '#000', marginBottom: '8px' }}>
				© 2022 Brand, Inc. · Privacy · Terms · Sitemap
			</Typography>

			<Box sx={{ display: 'inline-block', marginTop: '20px' }}>
				<select
					style={{
						padding: '10px 15px',
						borderRadius: '5px',
						border: '1px solid #000',
						backgroundColor: 'transparent',
						fontSize: '14px'
					}}
				>
					<option value="en">English</option>
					<option value="vi">Tiếng Việt</option>
				</select>
			</Box>
		</Box>
	);
};

export default Footer;
