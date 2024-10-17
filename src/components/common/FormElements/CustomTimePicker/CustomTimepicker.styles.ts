import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
	textFieldRoot: {
		'& .MuiFormHelperText-root': {
			marginLeft: 0
		}
	},
	test: {
		'& > div.MuiInputBase-root:forcus': {
			outline: 'none',
			border: 'none'
		},
		'& .Mui-focused': {
			outline: 'none',
			border: 'none'
		}
	},
	selectRoot: {
		'&.MuiOutlinedInput-notchedOutline': { border: 0, outline: 'none' },
		'&.Mui-focused': { border: 0, outline: 'none' },

		width: '100%',
		height: '100%'
	},
	DatePickerSize: {
		'& .MuiInputBase-root': {
			height: '4.1rem'
		}
	}
}));
