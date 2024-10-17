import { ActionType, ResultType } from '@/types/index.types';

export const MODULE_TITLES = {
	COMPANY: 'công ty',
	DEVICE: 'thiết bị',
	PERMISSION: 'quyền'
};

export const ACTIONS: { GET: ActionType; DELETE: ActionType; ADD: ActionType; EDIT: ActionType } = {
	GET: 'get',
	DELETE: 'delete',
	ADD: 'add',
	EDIT: 'edit'
};

export const RESULTS: {
	SUCCESS: ResultType;
	ERROR: ResultType;
} = {
	SUCCESS: 'success',
	ERROR: 'error'
};

export type ControlType =
	| 'add'
	| 'singleDelete'
	| 'delete'
	| 'multipleDelete'
	| 'filter'
	| 'upload'
	| 'download'
	| 'edit'
	| 'cancel'
	| 'reload'
	| 'search';
