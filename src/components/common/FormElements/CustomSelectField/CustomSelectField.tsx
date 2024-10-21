import { Box, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Control, Controller, useController } from 'react-hook-form';

export interface SelectOption {
	label?: string;
	value: number | string;
}

export interface CustomSelectFieldProps {
	name: string;
	control: Control<any>;
	label?: string;
	disabled?: boolean;
	options: SelectOption[];
	required?: boolean;
	classNameSelect?: string;
	customStyles?: any;
	[x: string]: any;
	handleColorValue?: (value: string) => string;
}

export function CustomSelectField({
	name,
	control,
	label,
	options,
	required,
	customStyles,
	classNameSelect,
	handleColorValue
}: CustomSelectFieldProps) {
	const {
		field: { onBlur }
	} = useController({
		name,
		control
	});

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Box sx={customStyles}>
					{label && (
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
					)}

					<Select
						size="small"
						labelId={`${name}_label`}
						value={value}
						onChange={onChange}
						fullWidth
						onBlur={onBlur}
						className={classNameSelect}
						sx={{
							backgroundColor: handleColorValue ? handleColorValue(value) : 'initial',
							'&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: 'rgba(0, 0, 0, 0.23)'
							},
							'&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
								borderColor: 'rgba(0, 0, 0, 0.23)'
							}
						}}
					>
						{options.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{error && <FormHelperText sx={{ color: '#d32f2f' }}>{error.message}</FormHelperText>}
				</Box>
			)}
		/>
	);
}
