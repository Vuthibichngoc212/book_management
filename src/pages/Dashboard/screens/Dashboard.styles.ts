import { makeStyles } from '@mui/material';

export const useStyles = makeStyles(() => ({
	dashboard: {
		display: 'flex',
		justifyContent: 'space-around'
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '250px',
		height: '100px',
		borderRadius: '10px',
		backgroundColor: '#fff',
		boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
		padding: '10px',
		transition: 'box-shadow 0.3s ease',
		'&:hover': {
			boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
		}
	},
	iconContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		marginBottom: '8px'
	},
	count: {
		fontSize: '24px',
		fontWeight: 'bold',
		color: 'green'
	},
	label: {
		fontSize: '16px',

		'&.MuiTypography-root': {
			color: 'black',
			fontWeight: 'bold'
		}
	},
	// Color classes
	orange: {
		backgroundColor: '#ffe6cc',
		color: '#ff6600'
	},
	blue: {
		backgroundColor: '#cce5ff',
		color: '#007bff'
	},
	green: {
		backgroundColor: '#d9f2d9',
		color: '#28a745'
	},
	red: {
		backgroundColor: '#fddde6',
		color: '#dc3545'
	}
}));
