import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sidebarRoutes } from './sidebarRoutes';
import routes from './routes';

interface SidebarType {
	path: string;
	name: string;
	label: string;
	icon: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
	children?: SidebarType[];
}

const useRouter = () => {
	const makeNavigate = useNavigate();
	const [dRoutes, setDRoutes] = useState<any[]>([]);
	const [sidebar, setSideBar] = useState<SidebarType[]>();
	const [activeRoute, setActiveRoute] = useState<any>();
	useEffect(() => {
		setSideBar(sidebarRoutes);
		setDRoutes(routes);
	}, []);
	const navigate = (route: string) => {
		const newRoute = dRoutes.find((item) => item.path === route);
		if (!newRoute) {
			return;
		}

		setActiveRoute(newRoute);
		makeNavigate(route);
	};
	const isAllowRoute = (path: string) => {
		if (path === '') {
			return false;
		}
		return true;
	};

	return {
		dRoutes,
		sidebar,
		isAllowRoute,
		navigate,
		activeRoute,
		setActiveRoute
	};
};

export default useRouter;
