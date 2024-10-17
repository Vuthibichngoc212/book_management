import { createApi } from '@reduxjs/toolkit/query/react';
import { REQUEST_HEADERS } from '@/constants/api.constant';
import customBaseQuery from './fetchBase';
export const apiCaller = createApi({
	reducerPath: 'apiCaller',
	refetchOnMountOrArgChange: 30,
	baseQuery: customBaseQuery(),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (users) => ({
				url: '/auth/register',
				method: 'POST',
				body: users,
				headers: REQUEST_HEADERS.jsonHeader()
			})
		}),
		login: builder.mutation({
			query: (users) => ({
				url: '/auth/login',
				method: 'POST',
				body: users,
				headers: REQUEST_HEADERS.jsonHeader()
			})
		}),
		loginAdmin: builder.mutation({
			query: (users) => ({
				url: '/auth/admin',
				method: 'POST',
				body: users,
				headers: REQUEST_HEADERS.jsonHeader()
			})
		}),
		forgotPassword: builder.mutation({
			query: (email) => ({
				url: '/auth/forgot-password',
				method: 'POST',
				headers: REQUEST_HEADERS.header(),
				params: { email }
			})
		}),
		changePassword: builder.mutation({
			query: (data) => ({
				url: '/auth/change-password',
				method: 'POST',
				body: data,
				headers: REQUEST_HEADERS.jsonHeader()
			})
		}),

		//books
		getAllBooks: builder.query({
			query: () => ({
				url: `/books`,
				method: 'GET'
			})
		}),
		getBookDetailById: builder.query({
			query: (id) => ({
				url: `/books/details/${id}`,
				method: 'GET'
			})
		}),
		createBook: builder.mutation({
			query: (book) => ({
				url: `/books`,
				method: 'POST',
				body: book
			})
		}),
		updateBook: builder.mutation({
			query: (book) => ({
				url: `/books/update-book/${book.id}`,
				method: 'PUT',
				body: book
			})
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/books/${id}`,
				method: 'DELETE'
			})
		}),
		//orders
		getAllOrders: builder.query({
			query: () => ({
				url: `/orders`,
				method: 'GET'
			})
		}),
		getAllOrdersUser: builder.query({
			query: () => ({
				url: `/orders/user`,
				method: 'GET'
			})
		}),
		confirmOrder: builder.mutation({
			query: (id) => ({
				url: `/orders/admin/confirm/${id}`,
				method: 'PUT'
			})
		}),
		//customers
		getAllCustomers: builder.query({
			query: () => ({
				url: `/users`,
				method: 'GET'
			})
		}),
		// getExportUser: builder.query<Blob, void>({
		// 	query: () => ({
		// 		url: `/export/excel`,
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		// 			Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		// 		}
		// 	})
		// }),
		//infoUser
		getInfoUser: builder.query({
			query: () => ({
				url: `/users/information`,
				method: 'GET'
			})
		}),
		updateInfoUser: builder.mutation({
			query: (data) => ({
				url: `/users/update-information`,
				method: 'PUT',
				body: data,
				headers: REQUEST_HEADERS.jsonHeader()
			})
		}),
		//statistical
		getAllTopBooks: builder.query({
			query: () => ({
				url: `statistical/top5-books`,
				method: 'GET'
			})
		}),
		getAllRevenueByMonth: builder.query({
			query: () => ({
				url: `statistical/revenue-by-month`,
				method: 'GET'
			})
		}),
		//category
		getAllCategories: builder.query({
			query: () => ({
				url: `/categories`,
				method: 'GET'
			})
		}),
		createCategory: builder.mutation({
			query: (category) => ({
				url: `/categories`,
				method: 'POST',
				body: category
			})
		}),
		updateCategory: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `/categories/update-category/${id}`,
				method: 'PUT',
				body: body,
				headers: REQUEST_HEADERS.jsonHeader()
			})
		}),

		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `/categories/${id}`,
				method: 'DELETE'
			})
		}),
		//carts
		getAllCarts: builder.query({
			query: () => ({
				url: `/carts`,
				method: 'GET'
			})
		}),
		createCart: builder.mutation({
			query: (cart) => ({
				url: `/carts`,
				method: 'POST',
				body: cart,
				headers: REQUEST_HEADERS.jsonHeader()
			})
		}),
		deleteCart: builder.mutation({
			query: (id) => ({
				url: `/carts/delete?bookId=${id}`,
				method: 'DELETE'
			})
		}),
		checkoutCart: builder.mutation({
			query: () => ({
				url: `/carts/checkout`,
				method: 'POST'
			})
		}),
		//comments
		getAllComments: builder.query({
			query: (id) => ({
				url: `/comments/${id}`,
				method: 'GET'
			})
		}),
		createComment: builder.mutation({
			query: (comment) => ({
				url: `/comments`,
				method: 'POST',
				body: comment,
				headers: REQUEST_HEADERS.jsonHeader()
			})
		})
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLoginAdminMutation,
	useForgotPasswordMutation,
	useChangePasswordMutation,
	useGetInfoUserQuery,
	useUpdateInfoUserMutation,
	useGetAllBooksQuery,
	useGetBookDetailByIdQuery,
	useCreateBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
	useGetAllOrdersQuery,
	useGetAllOrdersUserQuery,
	useConfirmOrderMutation,
	useGetAllCustomersQuery,
	// useGetExportUserQuery,
	useGetAllTopBooksQuery,
	useGetAllRevenueByMonthQuery,
	useGetAllCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useGetAllCartsQuery,
	useCreateCartMutation,
	useDeleteCartMutation,
	useCheckoutCartMutation,
	useGetAllCommentsQuery,
	useCreateCommentMutation
} = apiCaller;