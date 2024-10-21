/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './Header.style.';
import { AccountCircleOutlined } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Badge, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Search from './components/Search';
import Logo from '@/assets/image/Group1.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dialog from '@/components/common/Diaglog/Dialog';
import { useGetAllCartsQuery } from '@/api/api.caller';

const Header = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const { data: cartData } = useGetAllCartsQuery(undefined);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleProfileMenuOpen = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const handleAccountClick = () => {
		setAnchorEl(null);
		navigate('/profile');
	};

	const handleLogoutClick = () => {
		localStorage.removeItem('userToken');
		navigate('/');
	};
	const [openDialog, setOpenDialog] = useState(false);
	const [searchOpen, setSearchOpen] = React.useState(false);

	const handleSearchOpen = () => setSearchOpen(true);
	const handleSearchClose = () => setSearchOpen(false);

	const handleCartOpen = () => {
		const userToken = localStorage.getItem('userToken');
		if (userToken) {
			navigate('/carts');
		} else {
			setOpenDialog(true);
		}
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const drawer = (
		<List>
			{['Trang chủ', 'Sách của tôi', 'Về chúng tôi', 'Cộng đồng', 'Liên hệ'].map((text) => (
				<ListItem button key={text}>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</List>
	);

	const isMenuOpen = Boolean(anchorEl);

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
			sx={{
				top: '8%',
				left: '5%',
				'&.MuiPopover-root': {
					'& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper': {
						padding: '0px'
					}
				}
			}}
		>
			<MenuItem onClick={handleAccountClick}>Thông tin tài khoản</MenuItem>
			<MenuItem onClick={() => navigate('/orders/history')}>Đơn hàng của tôi</MenuItem>
			<MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
		</Menu>
	);

	return (
		<AppBar sx={{ backgroundColor: theme.palette.background.default }}>
			<Toolbar>
				{isMobile && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, color: 'black' }}
					>
						<MenuIcon />
					</IconButton>
				)}
				<Box onClick={() => navigate('/home')} sx={{ cursor: 'pointer' }}>
					<img src={Logo} alt="logo" width="134px" height="50px" style={{ objectFit: 'contain' }} />
					<Typography sx={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
						Book Heaven
					</Typography>
				</Box>
				{!isMobile && (
					<>
						<Button className={classes.listItemRoot} onClick={() => navigate('/home')}>
							Trang chủ
						</Button>
						<Button className={classes.listItemRoot}>Sách của tôi</Button>
						<Button className={classes.listItemRoot}>Về chúng tôi</Button>
						<Button className={classes.listItemRoot}>Cộng đồng</Button>
						<Button className={classes.listItemRoot}>Liên hệ</Button>
					</>
				)}
				<Box
					sx={{
						color: theme.palette.text.secondary,
						display: 'flex',
						alignItems: 'center',
						cursor: 'pointer'
					}}
					onClick={handleSearchOpen}
				>
					<SearchIcon />
				</Box>
				<Search open={searchOpen} onClose={handleSearchClose} />

				<Box sx={{ flexGrow: 1 }} />
				<Box
					onClick={handleProfileMenuOpen}
					sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
				>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
					>
						<AccountCircleOutlined />
					</IconButton>
					<Typography sx={{ color: theme.palette.text.primary }}>Tài khoản</Typography>
				</Box>
				<Box
					sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: '16px' }}
					onClick={handleCartOpen}
				>
					<IconButton size="large" aria-label="shopping cart" aria-haspopup="true">
						<Badge badgeContent={cartData?.data?.totalItem || 0} color="error">
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
					<Typography sx={{ color: theme.palette.text.primary }}>Giỏ hàng</Typography>
				</Box>

				<Dialog
					open={openDialog}
					title="Thông báo"
					message="Bạn cần "
					onClose={handleCloseDialog}
					confirmButtonText="Đăng nhập"
					confirmButtonColor="primary"
				/>
			</Toolbar>
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true
				}}
				sx={{
					display: { xs: 'block', md: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
				}}
			>
				{drawer}
			</Drawer>
			{renderMenu}
		</AppBar>
	);
};

export default Header;
