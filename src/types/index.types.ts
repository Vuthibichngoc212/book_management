export type DateTime = Date | string | number | null;

export type ControlType =
	| 'add'
	| 'delete'
	| 'filter'
	| 'upload'
	| 'download'
	| 'edit'
	| 'cancel'
	| 'reload'
	| 'search';

export type ActionType = 'get' | 'delete' | 'add' | 'edit';
export type ResultType = 'success' | 'error';
export interface BaseModel {
	id: number;
	created_at: DateTime | '';
	updated_at: DateTime | '';
	deleted_at: DateTime | '';
}

export interface ActionPayloadMeta {
	onSuccess: () => void;
	onError: () => void;
}
export interface ActionPayload<T> {
	data: T;
	meta: ActionPayloadMeta;
}
