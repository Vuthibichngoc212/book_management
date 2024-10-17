import { Box, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import { useStyles } from './CustomTimepicker.styles';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
interface DatePickerViewProps {
	control?: Control<any>;
	name: string;
	label?: string;
	variant?: 'standard' | 'outlined' | 'filled' | undefined;
	size?: 'small' | 'medium' | undefined;
	required?: boolean;
	[x: string]: any;
	customStyles?: any;
}

const CustomTimePicker = ({
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
							fontSize: '1.4rem',
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
						<TimePicker
							sx={{ width: '100%' }}
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
								seconds: renderTimeViewClock
							}}
							// defaultValue={dayjs('2022-04-17T15:30')}
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

export default CustomTimePicker;
