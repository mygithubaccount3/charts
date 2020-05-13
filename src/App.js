import React, {useState, useEffect} from 'react';
import {openForm, closeForm, setInitialDates} from './helpers';
import Header from './components/Header.js';
import Content from './components/Content.js';
import Menu from './components/Menu.js';

function App() {
	const date = new Date();
	let [since, setSince] = useState(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
	let [until, setUntil] = useState(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1}`);
	let [data, setData] = useState([
										{name: 'Аналіз аналогічних рішень', start: '2020-06-01', end: '2020-08-04'},
										/*{name: 'Аналіз аналогічних рішень', start: '2020-01-01', end: '2020-10-15'},
										{name: 'Аналіз аналогічних рішень', start: '2020-08-01', end: '2020-09-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-06-01', end: '2020-11-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-04-01', end: '2020-06-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-02-01', end: '2020-05-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-09-01', end: '2020-12-04'},*/
									]);
	useEffect(() => {
		setInitialDates();
		//setMinMaxDateValues();
	}, [])

	let months = [
					{name: 'Jan', days: 31},
					{name: 'Feb', days: 28},
					{name: 'Mar', days: 31},
					{name: 'Apr', days: 30},
					{name: 'May', days: 31},
					{name: 'Jun', days: 30},
					{name: 'Jul', days: 31},
					{name: 'Aug', days: 31},
					{name: 'Sep', days: 30},
					{name: 'Oct', days: 31},
					{name: 'Nov', days: 30},
					{name: 'Dec', days: 31}
				];
	const monDiff = ((until.split('-')[0] - since.split('-')[0]) * 12) + (until.split('-')[1] - since.split('-')[1]) + 1
	const monthDiff = months.slice(since.split('-')[1] - 1, since.split('-')[1] - 1 + monDiff)
	let els = [];
	let colForMon = 2;
	const days = monthDiff.reduce((acc, el) => acc + el.days, 0)
	const len = 89 / days + '%'

	for(let i = 0; i < monthDiff.length; ++i) {
		els.push(<span key={Math.floor(Math.random() * 100000)} style={{gridArea: `1/${colForMon}/2/${colForMon + monthDiff[i].days}`}}>{monthDiff[i].name}</span>)
		colForMon += monthDiff[i].days;
	}

	function sendValue(e) {
		e.target.id === 'startDate' ? setSince(e.target.value) : setUntil(e.target.value)
		/*setMinMaxDateValues(e);*/
	}

	function buttonHandler(e) {
		e.preventDefault();
		setData([{name: e.target.name.value, start: e.target.start.value, end: e.target.end.value}, ...data])
	}

	console.log(`${since.split('-')[0]}-${since.split('-')[1] < 10 ? '0' + Number(since.split('-')[1]) : since.split('-')[1] }-${Number(since.split('-')[2]) + 1 < 10 ? '0' + (Number(since.split('-')[2]) + 1) : Number(since.split('-')[2]) + 1}`)

	/*function setMinMaxDateValues(e) {
		const date = new Date();

		if(e.target.id === 'startDate') {
			document.getElementById('endDate').setAttribute('min', `${since.split('-')[0]}-${since.split('-')[1] < 10 ? '0' + Number(since.split('-')[1]) : since.split('-')[1] }-${Number(since.split('-')[2]) + 1 < 10 ? '0' + (Number(since.split('-')[2]) + 1) : Number(since.split('-')[2]) + 1}`);
			document.getElementById('endDate').setAttribute('max', `${date.getFullYear()}-${date.getMonth() + 6 < 10 ? '0' + (date.getMonth() + 6) : date.getMonth() + 6 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
		}
		
		document.getElementById('startDate').setAttribute('min', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
		document.getElementById('startDate').setAttribute('max', `${date.getFullYear() + 1}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
		
	}*/

	function setMinStartDate() {
		const date = new Date();
		console.log(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`)
		return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
	}

	function setMaxStartDate() {
		const date = new Date();
		date.setYear(date.getYear() + 1);
		console.log(date.getFullYear())
		return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth() }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
	}

	function setMinEndDate() {
		const date = new Date();
		date.setDate(date.getDate() + 1);
		console.log(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`)
		return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
	}

	function setMaxEndDate() {
		const date = new Date();
		date.setMonth(date.getMonth() + 7);
		console.log(`${date.getFullYear()}-${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth() }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`)
		return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth() }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
	}

	const yearStart = date.getFullYear();
	const monthStart = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	const dayStart = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	date.setMonth(date.getMonth() + 6);
	const yearEnd = Number(date.getFullYear());
	const monthEnd = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	const dayEnd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return (
    <div className="App">
    	<div id='overlay' onClick={closeForm}></div>
    	<Menu />
    	<form onSubmit={buttonHandler} className='addTaskForm'>
    		<label htmlFor='taskName'>Name:</label>
    		<input type='text' id='taskName' name='name'/>
    		<label htmlFor='taskStart'>Start:</label>
    		<input type='text' id='taskStart' name='start'/>
    		<label htmlFor='taskEnd'>End:</label>
    		<input type='text' id='taskEnd' name='end'/>
    		<button type='submit' style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>Add</button>
    	</form>
	    <div className='period'>
	    	<label htmlFor='startDate'>Since:</label>
	    	<input type='date' id='startDate' name='startDate' value={since} min={setMinStartDate()} max={setMaxStartDate()}/>
	    	<label htmlFor='endDate'>Until:</label>
	    	<input type='date' id='endDate' name='endDate' value={until} min={setMinEndDate()} max={setMaxEndDate()} onChange={sendValue} />
	    </div>
	    <button onClick={openForm}>Add new task</button>
    	<div className='chart'>
      		<Header el={els} days={days} len={len}/>
        	<Content len={len} days={days} monStart={since.split('-')[1]} monEnd={until.split('-')[1]} data={data}/>
      	</div>
    </div>
  );
}

export default App;
