export const ROUTE_PATH = {
	ROOT: {
		INDEX: '/'
	},
	HOME: {
		INDEX: '/dashboard'
	},
	AUTH: {
		LOGIN: '/login'
	},
	HOMEPAGE: {
		INDEX: '/home'
	},
	ORDERS: {
		INDEX: '/orders',
		LIST: '/orders/history',
		DETAIL: '/orders/:id'
	},
	BOOKS: {
		INDEX: '/books',
		DETAIL: '/books/:id'
	},
	FILTERBOOKSEARCH: {
		INDEX: '/filter-books-search'
	},
	MYBOOKS: {
		INDEX: '/mybooks',
		LIST: '/mybooks',
		DETAIL: '/mybooks/:id'
	},
	CARTS: {
		INDEX: '/carts',
		LIST: '/carts',
		DETAIL: '/carts/:id'
	},
	CHECKOUTCART: {
		INDEX: '/checkoutcarts'
	},
	CATEGORIES: {
		INDEX: '/categories'
	},
	CUSTOMER: {
		INDEX: '/customers',
		LIST: '/customers',
		DETAIL: '/customers/:id'
	},
	PROFILE: {
		INDEX: '/profile'
	},
	SETTING: {
		INDEX: '/settings'
	},

	NOTFOUND: {
		INDEX: '*'
	},
	FORBIDDEN: '/403'
};
