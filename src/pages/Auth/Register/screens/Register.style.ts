import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
	formContainer: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		padding: '20px'
	},
	form: {
		width: '100%',
		maxWidth: '400px',
		overflowY: 'auto',
		'&.MuiPaper-root': {
			borderRadius: '10px'
		}
	},
	btn: {
		'&.MuiButtonBase-root': {
			textTransform: 'none',
			backgroundColor: '#ff4081',
			'&:hover': {
				backgroundColor: '#ff4081'
			},
			'&:focus': {
				outline: 'none'
			}
		}
	}
}));
