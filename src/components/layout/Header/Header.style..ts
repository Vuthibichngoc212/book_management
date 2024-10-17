import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
	listItemRoot: {
		'&.MuiButtonBase-root': {
			textTransform: 'none',
			marginRight: '24px',
			'&:hover': {
				backgroundColor: '#D6E4FF',
				color: '#485CC7'
			}
		}
	}
}));
