export interface IBooks {
	id?: number;
	title: string;
	author: string;
	price: number;
	quantity: number;
	categoryID: number;
	categoryName?: string;
	description: string;
	publisher: string;
	publishedDate: Date | null;
	image: string;
	averageRating: number;
	purchaseCount: number;
}

export interface IBooksResponse {
	status: string;
	message: string;
	data: IBooks;
}
