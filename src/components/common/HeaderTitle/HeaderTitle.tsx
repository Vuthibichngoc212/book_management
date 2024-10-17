import { Box, Typography } from '@mui/material';

interface Props {
	title: string;
	customStyle?: Record<any, any>;
	variant?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'subtitle1'
		| 'subtitle2'
		| 'body1'
		| 'body2'
		| 'caption'
		| 'button'
		| 'overline'
		| 'inherit';
}

const HeaderTitle = ({ title, customStyle, variant = 'h3' }: Props) => {
	return (
		<Box
			sx={{
				marginBottom: '2.4rem',
				'& .MuiTypography-root': {
					color: '#223671'
				},
				...customStyle
			}}
		>
			<Typography variant={variant}>{title}</Typography>
		</Box>
	);
};

export default HeaderTitle;
