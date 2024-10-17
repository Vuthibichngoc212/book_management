import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
	root: {
		'& .MuiPaper-root': {
			padding: '24px',
			boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
		},
		'&.MuiBackdrop-root': {
			backgroundColor: 'rgba(0, 0, 0, 0)'
		}
	},
	dialogTitle: {
		'&.MuiTypography-root': {
			padding: 0
		}
	},
	dialogContent: {
		marginTop: '20px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	dialogActions: {
		'&.MuiDialogActions-root': {
			padding: 0
		}
	}
}));
