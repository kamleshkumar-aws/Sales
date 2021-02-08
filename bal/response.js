let createResponse = (message, result, isSuccess, statusCode) => {
	return (response = {
		message: message,
		result: result,
		isSuccess: isSuccess,
		statusCode: statusCode,
	});
};
let SelectList = (id, value, selectedValue, parentId) => {
	return (SelectListItem = {
		id: id,
		value: value,
		selectedValue: selectedValue,
		parentId: parentId,
	});
};
module.exports = { createResponse, SelectList };
