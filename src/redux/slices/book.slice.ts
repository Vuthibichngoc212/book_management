import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IBooks } from '@/types/books';

export interface IBooksState {
	books: IBooks[];
}

const initialState: IBooksState = {
	books: []
};

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setBooks: (state, action: PayloadAction<IBooks>) => {
			state.books = [...state.books, action.payload];
		}
	}
});

export const { setBooks } = booksSlice.actions;

export const bookselector = (state: RootState) => state.books.books;

export default booksSlice.reducer;
