import { DateTime } from '@/types/index.types';
import dayjs from 'dayjs';

const dayjsToday = dayjs();

export const DEFAULT_ISO_DATE_STRING = '0001-01-01T00:00:00Z';
export const today = dayjsToday.toDate();
export const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getSystemTimezoneOffset = () => {
	const offset = new Date().getTimezoneOffset();
	const hours = String(Math.abs(Math.floor(offset / 60))).padStart(2, '0');
	const minutes = String(Math.abs(offset % 60)).padStart(2, '0');
	const sign = offset <= 0 ? '+' : '-';
	return `GMT${sign}${hours}:${minutes}`;
};

export const toLocaleDateString = (
	date: DateTime | null | undefined,
	format = 'DD/MM/YYYY',
	locale = 'vi'
) => {
	dayjs.locale(locale);
	if (date && dayjs(date).isAfter(dayjs(DEFAULT_ISO_DATE_STRING))) {
		return dayjs(date).format(format);
	}
	return '';
};

export const toLocaleDateTimeString = (
	date: DateTime | null | undefined,
	format = 'DD/MM/YYYY HH:mm:ss',
	locale = 'vi'
) => {
	dayjs.locale(locale);
	if (date && dayjs(date).isAfter(dayjs(DEFAULT_ISO_DATE_STRING))) {
		return dayjs(date).format(format);
	}
	return '';
};
