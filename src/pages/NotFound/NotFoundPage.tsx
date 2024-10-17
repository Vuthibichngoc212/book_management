import React from 'react';
import { Box, Stack } from '@mui/material';
import styles from './NotFoundPage.module.css';
import SideBar from '@/components/organisms/SideBar/SideBar';

function NotFoundPage() {
	return (
		<Box className={styles.container}>
			<SideBar />
			<Stack
				sx={{
					width: '100%'
				}}
			>
				<Stack
					sx={{
						margin: '4rem 0 0  2.4rem',
						paddingBottom: '4.4rem',
						width: '97%'
					}}
				>
					<Box
						sx={{
							textAlign: 'center',
							height: '90vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Box>
							<h1>Không tìm thấy trang</h1>
							<p>Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra URL và thử lại.</p>
						</Box>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
}

export default NotFoundPage;
