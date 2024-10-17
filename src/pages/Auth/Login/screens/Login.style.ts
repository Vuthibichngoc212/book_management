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
		'&.MuiPaper-root': {
			borderRadius: '10px'
		}
	},
	btnLogin: {
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
	},
	btnOther: {
		'&.MuiButtonBase-root': {
			marginTop: '10px',
			color: 'black',
			textTransform: 'none',
			backgroundColor: '#fff',
			'&:hover': {
				backgroundColor: '#f2f2f2'
			},
			'&:focus': {
				outline: 'none'
			}
		}
	}
}));
