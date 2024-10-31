import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useStyles } from './Sidebar.styles';
import logo from '@/assets/icon/logo-sidebar.svg';
import { useLocation } from 'react-router-dom';
import useRouter from '@/routes/routerHook';

const drawerWidth = 267;
const openedMixin = (theme: Theme): CSSObject => ({
	// width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	}
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme)
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme)
		})
	})
);
const SideBar = () => {
	const is425px = useMediaQuery('(max-width:425px)');
	const location = useLocation();
	const classes = useStyles();
	const { dRoutes, sidebar, navigate, activeRoute, setActiveRoute } = useRouter();
	const [open, setOpen] = useState(() => (!is425px ? true : false));
	useEffect(() => {
		let pathName = '';
		for (let i = 0; i < dRoutes.length; i++) {
			const item = dRoutes[i];
			if (item.path === location.pathname) {
				pathName = item.path;
				break;
			}

			if (item.children && item.children.length > 0) {
				const a = item.children.find(() => {
					const regexString = `^${item.path}\\/([^\\/]+)$`;
					const regex = new RegExp(regexString);

					return regex.test(location.pathname);
				});

				if (a) {
					pathName = item.path;
					break;
				}
			}

			pathName = '';
		}
		setActiveRoute({ path: pathName });
	}, [location, dRoutes, setActiveRoute]);
	const handleDrawer = () => {
		setOpen(!open);
	};
	return (
		<Box>
			<Drawer
				variant="permanent"
				open={open}
				sx={{
					'&.MuiDrawer-root': {
						position: 'relative',
						'& >.MuiPaper-root': {
							overflow: 'visible',
							boxShadow:
								'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
							border: 'none',
							padding: open ? '24px 24px 0 24px' : 0,
							'& > div:first-of-type': {
								display: 'flex',
								justifyContent: 'center !important',
								alignItems: 'center',
								width: '100%',
								marginBottom: open ? '1.2rem' : 0,
								'& .MuiBox-root': {
									width: '66%',
									'& img': {
										width: '100%'
									}
								}
							}
						}
					}
				}}
			>
				<DrawerHeader>
					<Box onClick={handleDrawer} sx={{ cursor: 'pointer' }}>
						<img src={logo} alt="logo" />
					</Box>
				</DrawerHeader>
				<Divider />
				<List>
					{sidebar?.map((data: any) => {
						return (
							<Box
								key={data.label}
								sx={
									activeRoute?.path === data.path || location.pathname === data.path
										? {
												backgroundColor: '#485CC7',
												color: '#FFFFFF',
												borderRadius: '0.5rem',
												'& .MuiButtonBase-root': {
													'& .MuiListItemIcon-root': {
														color: '#FFFFFF'
													},
													'& .MuiListItemText-root': {
														'& .MuiTypography-root': {
															color: '#FFFFFF'
														}
													}
												}
											}
										: {}
								}
							>
								<ListItem
									disablePadding
									sx={{ display: 'block' }}
									onClick={() => navigate(data.path)}
								>
									<ListItemButton
										className={classes.listItemRoot}
										sx={{
											paddingLeft: open ? '0px' : '10px',
											...(activeRoute?.path === data.path || location.pathname === data.path
												? {
														'& path': {
															fill: 'white'
														}
													}
												: {})
										}}
									>
										<ListItemIcon>
											<data.icon />
										</ListItemIcon>
										<ListItemText
											className={classes.itemTextRoot}
											primary={data.name}
											sx={{ opacity: open ? 1 : 0 }}
										/>
									</ListItemButton>
								</ListItem>
							</Box>
						);
					})}
				</List>
				<IconButton className={classes.iconButtonRoot} onClick={handleDrawer}>
					{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</Drawer>
		</Box>
	);
};

export default SideBar;
