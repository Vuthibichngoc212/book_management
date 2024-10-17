import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	root: {
		'&.MuiPaper-root': {
			backgroundColor: '#fff',
			marginLeft: '10px',
			borderBottomLeftRadius: '12px',
			boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
		},
		'&.MuiStack-root': {
			width: '100%'
		},
		flexShrink: 0,
		flexDirection: 'row'
	},
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '1.6rem 2.4rem'
	},

	userMenu: {
		marginTop: '45px'
	},
	title: {
		'&.MuiTypography-root': {
			fontFamily: 'Inter-Bold',
			fontSize: 24,
			color: '#f26526'
		}
	},
	menuItemText: {
		'&.MuiTypography-root': {
			color: '#000000'
		}
	},

	link: {
		'&.MuiTypography-root': {
			color: '#223671'
		}
	},
	space: {
		'&.MuiTypography-root': {
			color: '#223671',
			margin: '0 0.8rem'
		}
	},
	userName: {
		'&.MuiTypography-root MuiSvgIcon-root': {
			color: '#000000',
			cursor: 'pointer'
		}
	},

	userStack: {
		'&.MuiBox-root': {
			cursor: 'pointer',
			color: '#000000',
			paddingRight: '2.4rem'
		}
	},
	menuItem: {
		'&.MuiTypography-root': {
			color: '#98989A'
		}
	},
	menuItemIcon: {
		'& .MuiSvgIcon-root': {
			color: '#000000'
		}
	}
});

export default useStyles;
