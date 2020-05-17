export function openForm() {
	document.getElementById('overlay').style.display = 'block';
	document.getElementsByTagName('form')[0].style.display = 'flex';
}

export function closeForm() {
	document.getElementsByTagName('form')[0].style.display = 'none';
	document.getElementById('overlay').style.display = 'none';
}

export function parseDate(date) {
	const arr = date.split('-')
	return new Date(arr[0], arr[1] - 1, arr[2]);
}

export function diff(start, end) {
	return Math.round((end - start)/(1000*60*60*24))
}

function secondsDiff(d1, d2) {
	let millisecondDiff = d2 - d1;
	let secDiff = Math.floor((millisecondDiff) / 1000);
	return secDiff;
}

function minutesDiff(d1, d2) {
	let seconds = secondsDiff(d1, d2);
	let minutesDiff = Math.floor(seconds / 60);
	return minutesDiff;
}

function hoursDiff(d1, d2) {
	let minutes = minutesDiff(d1, d2);
	let hoursDiff = Math.floor(minutes / 60);
	return hoursDiff;
}

export function daysDiff(d1, d2) {
	let hours = hoursDiff(d1, d2);
	let daysDiff = Math.floor(hours / 24);
	return daysDiff;
}

export function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
