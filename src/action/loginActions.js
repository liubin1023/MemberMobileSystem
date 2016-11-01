export const SHOW_SUCCESS_MESSAGE = 'SHOW_SUCCESS_MESSAGE';
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

export function showSuccessMessage(text){
	return {
		type : SHOW_SUCCESS_MESSAGE,
		text
	};
}
export function showErrorMessage(text){
	return {
		type : SHOW_ERROR_MESSAGE,
		text
	};
}