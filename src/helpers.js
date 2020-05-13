export function openForm() {
	document.getElementById('overlay').style.display = 'block';
	document.getElementsByTagName('form')[0].style.display = 'flex';
}

export function closeForm() {
	document.getElementsByTagName('form')[0].style.display = 'none';
	document.getElementById('overlay').style.display = 'none';
}

export function setInitialDates() {
		//console.log(document.getElementById('startDate').value)
		let date = new Date();
		//document.getElementById('startDate').setAttribute('value', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1}`)
		
		//console.log(date.getMonth() + 1)
		//date.setMonth(date.getMonth() + 7)
		
		
		//document.getElementById('endDate').setAttribute('value', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1}`)
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
	let secDiff = Math.floor((d2 - d1) / 1000);
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
