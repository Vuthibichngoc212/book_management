import { BREADCRUMB } from '@/constants/breadCumb.constant';
import { Breadcrumbs, Link as MuiLink, Box } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';

type BreadcrumbType = {
	[key: string]: {
		INDEX?: string;
	};
};

const breadcrumbData: BreadcrumbType = BREADCRUMB;

const Breadcrumb = () => {
	const location = useLocation();

	const parentPath = location.pathname.split('/').filter((item) => item !== '')[0];
	const upperPathItem = parentPath.toUpperCase();
	const breadcrumbItem = breadcrumbData[upperPathItem];

	return (
		<Box>
			<Breadcrumbs>
				{breadcrumbItem && (
					<MuiLink
						component={Link}
						to={`/${parentPath}`}
						color="primary.midnightBlue"
						underline="none"
						sx={{ display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: 600 }}
					>
						{breadcrumbItem.INDEX || parentPath}
					</MuiLink>
				)}
			</Breadcrumbs>
		</Box>
	);
};

export default Breadcrumb;
