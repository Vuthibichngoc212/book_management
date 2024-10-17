import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IUsersState } from './slices/users.slice';

export const usersPersistConfig: PersistConfig<IUsersState> = {
	key: 'users',
	storage
};
