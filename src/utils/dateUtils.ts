import { UI_CONSTANTS } from "../constants/ui";

/**
 * 생년월일 배열을 생성합니다.
 * @param startYear 시작 년도
 * @param range 년도 범위
 * @returns 년도 배열
 */
export const generateBirthYears = (
	startYear: number = 2025,
	range: number = UI_CONSTANTS.FORM.BIRTH_YEAR_RANGE
): number[] => {
	return Array.from({ length: range }, (_, i) => startYear - i);
};

/**
 * 월 배열을 생성합니다.
 * @returns 월 배열 (01, 02, ..., 12)
 */
export const generateMonths = (): string[] => {
	return Array.from({ length: UI_CONSTANTS.FORM.MONTHS_IN_YEAR }, (_, i) =>
		(i + 1).toString().padStart(2, "0")
	);
};

/**
 * 일 배열을 생성합니다.
 * @returns 일 배열 (01, 02, ..., 31)
 */
export const generateDays = (): string[] => {
	return Array.from({ length: UI_CONSTANTS.FORM.DAYS_IN_MONTH }, (_, i) =>
		(i + 1).toString().padStart(2, "0")
	);
};

/**
 * 생년월일을 ISO 형식으로 포맷합니다.
 * @param year 년도
 * @param month 월
 * @param day 일
 * @returns ISO 형식의 날짜 문자열
 */
export const formatBirthDate = (
	year: string,
	month: string,
	day: string
): string => {
	const paddedMonth = month.padStart(2, "0");
	const paddedDay = day.padStart(2, "0");
	return `${year}-${paddedMonth}-${paddedDay}`;
};

/**
 * 날짜 문자열에서 날짜 부분만 추출합니다.
 * @param dateString ISO 날짜 문자열
 * @returns 날짜 부분만 (YYYY-MM-DD)
 */
export const extractDateFromISO = (dateString: string): string => {
	return dateString.split("T")[0];
};

/**
 * 날짜를 한국어 형식으로 포맷합니다.
 * @param date Date 객체
 * @returns 한국어 형식의 날짜 문자열
 */
export const formatDate = (date: Date): string => {
	return date.toLocaleDateString("ko-KR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
