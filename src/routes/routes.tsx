import Auth from '@/pages/Auth';
import ProtectedLayout from '@/components/layout/ProtectedLayout/ProtectedLayout';
import { ROUTE_PATH } from '@/constants/routePath.constant';
import HomePage from '@/pages/HomePage/screens/HomePage';
import Dashboard from '@/pages/Dashboard/screens/Dashboard';
import BookManagement from '@/pages/Book/screens/BookManagement';
import Order from '@/pages/Order/screens/Order';
import Customer from '@/pages/Customers/screens/Customer';
import Categories from '@/pages/Categories/screens/Categories';
import BookDetail from '@/pages/HomePage/components/PopularBooks/components/BookDetail/BookDetail';
import Carts from '@/pages/Carts/screens/Carts';
import ProfileUser from '@/pages/ProfileUser/screens/ProfileUser';
import CheckoutCart from '@/pages/HomePage/components/CheckoutCart/CheckoutCart';
import OrderHistory from '@/pages/OrderHistory/screens/OrderHistory';
import FilterBookSearch from '@/pages/FilterBookSearch/screens/FilterBookSearch';

const routes = [
	{
		path: ROUTE_PATH.AUTH.LOGIN,
		element: <Auth />
	},
	{
		label: 'Home Page',
		path: ROUTE_PATH.ROOT.INDEX,
		element: <HomePage />
	},
	{
		label: 'Book Detail',
		path: ROUTE_PATH.BOOKS.DETAIL,
		element: <BookDetail />
	},
	{
		label: 'Filter book search',
		path: ROUTE_PATH.FILTERBOOKSEARCH.INDEX,
		element: <FilterBookSearch />
	},
	{
		label: 'Cart Detail',
		path: ROUTE_PATH.CARTS.INDEX,
		element: <Carts />
	},
	{
		label: 'My profile',
		path: ROUTE_PATH.PROFILE.INDEX,
		element: <ProfileUser />
	},
	{
		label: 'My order',
		path: ROUTE_PATH.ORDERS.LIST,
		element: <OrderHistory />
	},
	{
		label: 'Checkout Cart',
		path: ROUTE_PATH.CHECKOUTCART.INDEX,
		element: <CheckoutCart />
	},
	{
		label: 'Admin Dashboard',
		path: ROUTE_PATH.HOME.INDEX,
		element: <ProtectedLayout />,
		children: [
			{
				path: ROUTE_PATH.HOME.INDEX,
				element: <Dashboard />
			}
		]
	},
	{
		label: 'Books',
		path: ROUTE_PATH.BOOKS.INDEX,
		element: <ProtectedLayout />,
		children: [
			{
				path: ROUTE_PATH.BOOKS.INDEX,
				element: <BookManagement />
			}
		]
	},
	{
		label: 'ORDERS',
		path: ROUTE_PATH.ORDERS.INDEX,
		element: <ProtectedLayout />,
		children: [
			{
				path: ROUTE_PATH.ORDERS.INDEX,
				element: <Order />
			}
		]
	},
	{
		label: 'CATEGORIES',
		path: ROUTE_PATH.CATEGORIES.INDEX,
		element: <ProtectedLayout />,
		children: [
			{
				path: ROUTE_PATH.CATEGORIES.INDEX,
				element: <Categories />
			}
		]
	},
	{
		label: 'CUSTOMER',
		path: ROUTE_PATH.CUSTOMER.INDEX,
		element: <ProtectedLayout />,
		children: [
			{
				path: ROUTE_PATH.CUSTOMER.INDEX,
				element: <Customer />
			}
		]
	}
];

export default routes;
