import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
	container: {
		width: '100%',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5'
	},
	imageContainer: {
		display: 'flex',
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	},
	loginImage: {
		margin: '1.25rem',
		borderRadius: '50px'
	},
	'@media (max-width:600px)': {
		loginImage: {
			display: 'none'
		},
		imageContainer: {
			flexDirection: 'column'
		}
	},
	'@media (min-width:601px)': {
		imageContainer: {
			flexDirection: 'row'
		},
		loginImage: {
			width: '50%',
			height: 'auto'
		}
	}
}));
