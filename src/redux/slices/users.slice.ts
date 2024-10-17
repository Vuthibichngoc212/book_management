import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser } from '@/types/users';
import { IMenuItem } from '@/types/menu';

export interface IUsersState {
	users: IUser[];
	menus: IMenuItem[];
}

const initialState: IUsersState = {
	users: [],
	menus: []
};

export const dashboardSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.users = [...state.users, action.payload];
		}
		// setMenu: (state, action: PayloadAction<IMenuItem>) => {
		// 	state.menus = [...state.menus, action.payload];
		// }
	}
});

export const { setUser } = dashboardSlice.actions;

export const userSelector = (state: RootState) => state.users.users;

export default dashboardSlice.reducer;
