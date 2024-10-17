// import { Footer, Header } from '@/components/layout';
// import { Outlet } from 'react-router-dom';
// import { Container } from '@mui/material';

// const DefaultLayout = () => {
// 	return (
// 		<Container>
// 			<Header />
// 			<Outlet />
// 			<Footer />
// 		</Container>
// 	);
// };

// export default DefaultLayout;

import { Footer } from '@/components/layout';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const DefaultLayout = () => {
	return (
		<Container>
			<Outlet />
			<Footer />
		</Container>
	);
};

export default DefaultLayout;
