export function getCurrentDate(): string {
	const today = new Date();
	let year = today.getFullYear();
	let month: string | number = today.getMonth() + 1;
	let day: string | number = today.getDate();

	// Thêm số 0 vào trước tháng/ngày nếu giá trị nhỏ hơn 10
	if (month < 10) {
		month = `0${month}`;
	}
	if (day < 10) {
		day = `0${day}`;
	}

	return `${year}-${month}-${day}`;
}

export function getLocaleDateString(entryDate: string): string {
	const date = new Date(entryDate);
	let year = date.getFullYear();
	let month: string | number = date.getMonth() + 1;
	let day: string | number = date.getDate();

	// Thêm số 0 vào trước tháng/ngày nếu giá trị nhỏ hơn 10
	if (month < 10) {
		month = `0${month}`;
	}
	if (day < 10) {
		day = `0${day}`;
	}

	return `${year}-${month}-${day}`;
}
