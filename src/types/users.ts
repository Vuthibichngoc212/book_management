export interface IUser {
	id?: number;
	fullname?: string;
	username: string;
	email?: string;
	password: string;
	phoneNumber?: number;
	address?: string;
	imageUrl?: string;
}

export interface IUserResponse {
	status: string;
	message: string;
	data: IUser;
}
