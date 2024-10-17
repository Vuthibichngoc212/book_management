/// <reference types="vite-plugin-svgr/client" />
import { ROUTE_PATH } from '@/constants/routePath.constant';

import overview from '@/assets/icon/overview.svg?react';
import orders from '@/assets/icon/orders-icon.svg?react';
import book from '@/assets/icon/book.svg?react';
import customer from '@/assets/icon/customer.svg?react';
import category from '@/assets/icon/category.svg?react';

export const sidebarRoutes = [
	{
		path: ROUTE_PATH.ROOT.INDEX,
		name: 'Tổng quan',
		label: 'Dashboard',
		icon: overview,
		children: []
	},
	{
		path: ROUTE_PATH.BOOKS.INDEX,
		name: 'Quản lý sách',
		label: 'Books',
		icon: book,
		children: []
	},
	{
		path: ROUTE_PATH.ORDERS.INDEX,
		name: 'Quản lý đơn hàng',
		label: 'Orders',
		icon: orders,
		children: []
	},
	{
		path: ROUTE_PATH.CATEGORIES.INDEX,
		name: 'Quản lý danh mục',
		label: 'Categories',
		icon: category,
		children: []
	},
	{
		path: ROUTE_PATH.CUSTOMER.INDEX,
		name: 'Quản lý khách hàng',
		label: 'Customers',
		icon: customer,
		children: []
	}
	// {
	// 	path: ROUTE_PATH.SETTING.INDEX,
	// 	name: 'Cài đặt',
	// 	label: 'setting',
	// 	icon: seting,
	// 	children: []
	// }
];
