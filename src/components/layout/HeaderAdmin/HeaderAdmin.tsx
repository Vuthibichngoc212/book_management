import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { ListItemIcon, MenuItem, Stack } from '@mui/material';
import Img from '@/assets/image/avatar-icon.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import useRouter from '@/routes/routerHook';
import useStyles from './HeaderAdmin.styles';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb';

const settings = [
	{ label: 'Trang cá nhân', icon: <PeopleAltOutlinedIcon />, path: '/myprofile' },
	{ label: 'Đăng xuất', icon: <LogoutIcon /> }
];

const HeaderAdmin = () => {
	const { navigate } = useRouter();
	const classes = useStyles();

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar
				className={classes.container}
				sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}
			>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Typography className={classes.title} noWrap>
						Book Heaven
					</Typography>

					<Box className={classes.userStack}>
						<Stack
							onClick={handleOpenUserMenu}
							direction="row"
							justifyContent="center"
							alignItems="center"
							className={classes.userStack}
						>
							<Avatar alt="Logo" src={Img} className={classes.userName} />
							<Typography className={classes.userName} noWrap>
								Book Heaven
							</Typography>
							<KeyboardArrowDownIcon className={classes.userName} />
						</Stack>
						<Menu
							className={classes.userMenu}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting.label}
									onClick={() => {
										if (setting.label === 'Đăng xuất') {
											localStorage.removeItem('adminToken');
											navigate('/');
										} else if (setting.path) {
											navigate(setting.path);
										}
										handleCloseUserMenu();
									}}
									className={classes.menuItem}
								>
									<ListItemIcon className={classes.menuItemIcon}>{setting.icon}</ListItemIcon>
									<Typography className={classes.menuItemText}>{setting.label}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Box>

				<Box sx={{ width: '100%', marginTop: '10px' }}>
					<Breadcrumb />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default HeaderAdmin;
