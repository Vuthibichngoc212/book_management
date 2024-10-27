import { Box } from '@mui/material';
import noData from '@/assets/image/no-data.png';

const NoDataCommon = () => {
	return (
		<Box
			width={'100%'}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'cente'}
			flexDirection={'column'}
		>
			<Box display={'flex'} justifyContent={'center'} alignItems={'cente'}>
				<img src={noData} alt="On Development" />
			</Box>
		</Box>
	);
};

export default NoDataCommon;
