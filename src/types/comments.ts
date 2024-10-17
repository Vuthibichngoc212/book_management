export interface IComments {
	id?: number;
	comment: string;
	fullName: string;
	ratting: number;
}

export interface IBooksResponse {
	status: string;
	message: string;
	data: IComments;
}
