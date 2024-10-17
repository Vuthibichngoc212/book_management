export interface IMenuItem {
	id: number;
	itemName: string;
	price: number;
	image: string;
	category: string;
}

export interface IMenuResponse {
	status: string;
	message: string;
	data: {
		totalPages: number;
		menuItemResponseList: IMenuItem[];
	};
}
