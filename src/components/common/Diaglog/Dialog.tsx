import React from 'react';
import { Button, Typography, Modal, Box, Divider, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import { useStyles } from './Dialog.styles';
import { useNavigate } from 'react-router-dom';

interface DialogProps {
	open: boolean;
	title: string;
	message: string;
	onClose: () => void;
	onConfirm?: () => void;
	confirmButtonText?: string;
	confirmButtonColor?: 'primary' | 'secondary';
}

const Dialog: React.FC<DialogProps> = ({ open, title, message, onClose }) => {
	const classes = useStyles();
	const navigate = useNavigate();

	const handleNavigate = (path: string) => {
		navigate(path);
		onClose();
	};

	return (
		<Modal open={open} onClose={onClose} className={classes.root}>
			<Box className={classes.boxWrapper}>
				<Box sx={{ display: 'grid' }}>
					<HeaderTitle
						title={title}
						customStyle={{
							'& .MuiTypography-root': { color: '#000', fontSize: '20px', fontWeight: '600' },
							textAlign: 'center',
							marginBottom: '1.6rem',
							gridColumn: '2/3'
						}}
					/>
					<Box sx={{ gridColumn: '3', textAlign: 'end' }}>
						<CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
					</Box>
				</Box>
				<Divider sx={{ mb: '1.6rem' }} />
				<Box sx={{ mb: '1.6rem' }}>
					<Typography>
						{message}{' '}
						<Link
							sx={{ color: '#1e88e5', cursor: 'pointer', textDecoration: 'none' }}
							onClick={() => handleNavigate('/login')}
						>
							Đăng nhập
						</Link>{' '}
						hoặc{' '}
						<Link
							sx={{ color: '#1e88e5', cursor: 'pointer', textDecoration: 'none' }}
							onClick={() => handleNavigate('/login')}
						>
							Đăng ký
						</Link>{' '}
						để thực hiện thao tác này
					</Typography>
				</Box>

				<Box sx={{ display: 'flex', justifyContent: 'end', gap: '1.6rem' }}>
					<Button
						variant="contained"
						size="medium"
						onClick={onClose}
						sx={{ textTransform: 'none' }}
					>
						Đóng
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default Dialog;
