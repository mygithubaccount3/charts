import React, {useState, useEffect} from 'react';
import {openForm, closeForm} from './helpers';
import Header from './components/Header.js';
import Content from './components/Content.js';
import Menu from './components/Menu.js';

function App() {
	let date = new Date();
	let [since, setSince] = useState(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
	date.setMonth(date.getMonth() + 6);
	let [until, setUntil] = useState(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
	let [data, setData] = useState([
										{name: 'Аналіз аналогічних рішень', start: '2020-06-01', end: '2020-08-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-01-01', end: '2020-10-15'},
										{name: 'Аналіз аналогічних рішень', start: '2020-08-01', end: '2020-09-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-06-01', end: '2020-11-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-04-01', end: '2020-06-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-02-01', end: '2020-05-04'},
										{name: 'Аналіз аналогічних рішень', start: '2020-09-01', end: '2020-12-04'},
									]);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const filteredMonCount = ((until.slice(0, 2) - since.slice(0, 2)) * 12) + (until.slice(5, 7) - since.slice(5, 7)) + 1;
	let days = 0;

	useEffect(() => {
		let date = new Date();
		document.getElementById('startDate').setAttribute('min', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);

		date.setFullYear(date.getFullYear() + 1);
		document.getElementById('startDate').setAttribute('max', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);

		date = new Date(since);
		date.setDate(date.getDate() + 1);
		document.getElementById('endDate').setAttribute('min', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
		/*setUntil(document.getElementById('endDate').getAttribute('min'))*/
		
		date.setDate(date.getDate() - 1);
		date.setMonth(date.getMonth() + 6);
		document.getElementById('endDate').setAttribute('max', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
	}, [since])

	for(let i = 0; i < filteredMonCount; i++) {
		days += new Date(2020, Number(since.slice(5, 7)) - 1 + i, 0).getDate()
	}
	console.log(days)
	let els = [];
	let colForMonth = 2;
	const dayWidth = 89 / days + '%'

	for(let i = 0; i < filteredMonCount; ++i) {
		els.push(<span key={Math.floor(Math.random() * 100000)} style={{gridArea: `1/${colForMonth}/2/${colForMonth + new Date(2020, Number(since.slice(5, 7)) - 1 + i, 0).getDate()}`}}>{months[Number(since.slice(5, 7)) - 1 + i]}</span>)
		colForMonth += new Date(2020, Number(since.slice(5, 7)) - 1 + i, 0).getDate();
	}

	function sendValue(e) {
		e.target.id === 'startDate' ? setSince(e.target.value) : setUntil(e.target.value);
		if(e.target.id === 'startDate') {
			let date = new Date(e.target.value);
			date.setDate(date.getDate() + 1);
			document.getElementById('endDate').setAttribute('min', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`)
			
			date.setDate(date.getDate() - 1);
			date.setMonth(date.getMonth() + 6);
			document.getElementById('endDate').setAttribute('max', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
			setUntil(document.getElementById('endDate').getAttribute('max'))
		}
	}

	function buttonHandler(e) {
		e.preventDefault();
		setData([{name: e.target.name.value, start: e.target.start.value, end: e.target.end.value}, ...data])
	}

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
    		<button type='submit'>Add</button>
    	</form>
	    <div className='period'>
	    	<label htmlFor='startDate'>Since:</label>
	    	<input type='date' id='startDate' name='startDate' value={since} onChange={sendValue}/>
	    	<label htmlFor='endDate'>Until:</label>
	    	<input type='date' id='endDate' name='endDate' value={until} onChange={sendValue} />
	    </div>
	    <button onClick={openForm}>Add new task</button>
    	<div className='chart'>
      		<Header el={els} days={days} dayWidth={dayWidth}/>
        	<Content dayWidth={dayWidth} days={days} monStart={since.slice(5, 7)} monEnd={until.slice(5, 7)} data={data}/>
      	</div>
    </div>
  );
}

export default App;
