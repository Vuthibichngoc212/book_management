import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
	listItemRoot: {
		'&.MuiButtonBase-root': {
			'&.MuiListItemButton-root:hover': {
				borderRadius: '0.5rem'
			},
			'& .MuiListItemIcon-root': {
				minWidth: 0,
				margin: '0px 14px 0px 10px',
				color: '#485CC7'
			}
		}
	},
	itemTextRoot: {
		'& .MuiTypography-root': {
			fontSize: 14
			// color: '#223671'
		}
	},
	sidebarFooter: {
		display: 'flex',
		alignItems: 'center',
		position: 'absolute',
		bottom: '0px',
		right: 0,
		width: '100%',
		minHeight: '48px',
		backgroundColor: '#485CC7',
		boxShadow: '0px 0px 1px 0px rgb(244, 244, 244), 0px 2px 6px 2px rgb(60, 64, 67, 0.15)'
	},
	iconButtonRoot: {
		'&.MuiIconButton-root': {
			position: 'absolute',
			padding: '3px',
			backgroundColor: '#485CC7',
			color: '#FFFFFF',
			bottom: '3.4rem',
			right: 0,
			transform: 'translateX(50%)',
			zIndex: 999,
			'&:hover': {
				backgroundColor: '#485CC7'
			}
		}
	}
}));
