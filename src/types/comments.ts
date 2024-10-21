export interface IComments {
	comment: string;
	rating: number;
}

export interface IBooksResponse {
	status: string;
	message: string;
	data: IComments;
}
