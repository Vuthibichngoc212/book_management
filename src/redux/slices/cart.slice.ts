// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store';

// interface CartItem {
// 	bookId: number;
// 	quantity: number;
// }

// interface CartState {
// 	items: CartItem[];
// 	totalItems: number;
// }

// const initialState: CartState = {
// 	items: [],
// 	totalItems: 0
// };

// export const cartSlice = createSlice({
// 	name: 'cart',
// 	initialState,
// 	reducers: {
// 		addToCart: (state, action: PayloadAction<CartItem>) => {
// 			const existingItem = state.items.find((item) => item.bookId === action.payload.bookId);

// 			if (existingItem) {
// 				// Tăng số lượng sản phẩm đã tồn tại trong giỏ hàng
// 				existingItem.quantity += action.payload.quantity;
// 			} else {
// 				// Thêm sản phẩm mới vào giỏ hàng
// 				state.items.push(action.payload);
// 			}

// 			// Cập nhật tổng số lượng sản phẩm
// 			state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
// 		}
// 	}
// });

// export const { addToCart } = cartSlice.actions;

// export const cartSelector = (state: RootState) => state.cart;

// export default cartSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CartItem {
	bookId: number;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	totalItems: number;
}

const initialState: CartState = {
	items: [],
	totalItems: 0
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existingItem = state.items.find((item) => item.bookId === action.payload.bookId);

			if (existingItem) {
				// Tăng số lượng sản phẩm đã tồn tại trong giỏ hàng
				existingItem.quantity += action.payload.quantity;
			} else {
				// Thêm sản phẩm mới vào giỏ hàng
				state.items.push(action.payload);
			}

			// Cập nhật tổng số lượng `bookId` duy nhất
			state.totalItems = state.items.length;
		}
	}
});

export const { addToCart } = cartSlice.actions;

export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
