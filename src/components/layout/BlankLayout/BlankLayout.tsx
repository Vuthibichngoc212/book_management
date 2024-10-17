import React from 'react';
import { Box } from '@mui/material';
import { useOutlet } from 'react-router-dom';

const BlankLayout = () => {
	const outlet = useOutlet();
	return <Box>{outlet}</Box>;
};

export default BlankLayout;
