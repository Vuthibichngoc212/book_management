import { systemTimezone } from '@/utils/DateTime';

export const API_STATUS_CODES = {
	ok: 200,
	created: 201,
	accepted: 202,
	nonAuthoritativeInfo: 203,
	noContent: 204,
	badRequest: 400,
	unauthorized: 401,
	paymentRequired: 402,
	forbidden: 403,
	notFound: 404,
	methodNotAllowed: 405,
	notAcceptable: 406,
	expiredToken: 408,
	upgradeRequired: 426,
	internalServerError: 500,
	serviceTemporarilyUnavailable: 503
};

export const REQUEST_HEADERS = {
	defaultHeader: {
		'Content-Type': 'application/json; charset=UTF-8',
		'X-Timezone': systemTimezone
	},
	header: () => ({
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cache-Control': 'no-store, no-cache'
		// 'X-Timezone': systemTimezone
	}),
	jsonHeader: () => ({
		'Content-Type': 'application/json; charset=UTF-8'
		// 'X-Timezone': systemTimezone
	}),
	fileHeader: () => ({
		'Content-Type': 'multipart/form-data'
	}),
	scmHeader: () => ({
		'Content-Type': 'application/json; charset=UTF-8',
		'X-Timezone': systemTimezone
	})
};

// useEffect(() => {
// 	if (isOpenModal && editRole) {
// 		if (editRole.image) {
// 			setImagePreview(editRole.image);
// 		} else {
// 			setImagePreview(null);
// 		}
// 	}
// }, [isOpenModal, editRole, categoryOptions, methods]);
