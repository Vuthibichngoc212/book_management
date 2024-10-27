export interface IBooks {
	id?: number;
	title: string;
	author: string;
	price: number;
	quantity: number;
	categoryID: number;
	description: string;
	publisher: string;
	publishedDate: Date;
	image: string;
	averageRating?: number;
	purchaseCount?: number;
}

export interface IBooksResponse {
	status: string;
	message: string;
	data: IBooks;
}
