import { Box, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import { useStyles } from './CustomDatepicker.styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DatePickerViewProps {
	control: Control<any>;
	name: string;
	label?: string;
	variant?: 'standard' | 'outlined' | 'filled' | undefined;
	size?: 'small' | 'medium' | undefined;
	required?: boolean;
	[x: string]: any;
	customStyles?: any;
}

const CustomDatePicker = ({
	control,
	name,
	label,

	required,
	customStyles,
	...props
}: DatePickerViewProps) => {
	const classes = useStyles();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Box sx={{ mb: '1.2rem', ...customStyles }}>
					<InputLabel
						sx={{
							mb: '0.4rem',
							fontSize: '1rem',
							fontFamily: 'Inter',
							color: '#19191A',
							...(error && { color: 'red' })
						}}
					>
						{label}{' '}
						{required && (
							<Typography component="span" color="red">
								*
							</Typography>
						)}
					</InputLabel>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							// renderInput={(props) => (
							// 	<TextField
							// 		{...props}
							// 		className={classes.textFieldRoot}
							// 		variant={variant || 'outlined'}
							// 		size={size}
							// 		fullWidth
							// 		error={!!error?.message}
							// 		helperText={error?.message ?? ''}
							// 	/>
							// )}
							value={value}
							onChange={onChange}
							{...props}
							className={classes.DatePickerSize}
						/>
					</LocalizationProvider>
				</Box>
			)}
		/>
	);
};

export default CustomDatePicker;
