import React, {Fragment, useEffect} from 'react';
import {parseDate, diff} from '../helpers.js'

function Task({dayWidth, days, monStart, monEnd, name, start, end, isOnMobile}) {
	const colors = ['#dfceff', '#c4dcff', '#fec4ff', '#c4f4ff', '#c8ffc4', '#feffc4', '#ffc4c4', '#304c8029', '#8a5858b0', '#10bdb5b0']

	let startGrid = 0;
	let endGrid = 0;
	let display;

	if (parseDate(start).getMonth() + 1 < monStart)  {
		if (parseDate(end).getMonth() + 1 < monStart) {
			display = 'none';
		} else if(parseDate(end).getMonth() + 1 >= monStart && parseDate(end).getMonth() + 1 <= monEnd) {
			startGrid = 2;
			const vis = diff(parseDate(`2020-${monStart}-01`), parseDate(end))
			endGrid = startGrid + (1 + (vis));
			display = 'flex';
		} else if(parseDate(end).getMonth() + 1 > monEnd) {
			startGrid = 2;
			endGrid = days;
			display = 'flex';
		}
		
	} else if (parseDate(start).getMonth() + 1 >= monStart && parseDate(start).getMonth() + 1 <= monEnd) {
		startGrid = diff(parseDate(`2020-${monStart}-01`), parseDate(start)) + 2;

		if (parseDate(end).getMonth() + 1 <= monEnd) {
			endGrid = startGrid + diff(parseDate(start), parseDate(end));
			display = 'flex';
		} else if(parseDate(end).getMonth() + 1 > monEnd) {
			endGrid = days;
			display = 'flex';
		}
	} else if (parseDate(start).getMonth() + 1 > monEnd) {
		display = 'none';
	}

	useEffect(() => {
		function func(isOnMobile) {
		const taskElements = document.getElementsByClassName('task');

		if (isOnMobile.matches) {
			const dayW = ((11 / days) + Number(dayWidth.slice(0, dayWidth.length - 1))) + "%";
			
			for (let i = 0; i < taskElements.length; i++) {
				taskElements[i].children[0].style.display = 'none';
				taskElements[i].setAttribute('style', `grid-template-columns: repeat(${days}, ${dayW});margin-top: 11px;margin-bottom: 11px`)
			}
		} else {
				for (let i = 0; i < taskElements.length; i++) {
					taskElements[i].children[0].style.display = 'block';
					taskElements[i].setAttribute('style', `grid-template-columns: 11% repeat(${days}, ${dayWidth});margin-top: 0;margin-bottom: 0`)
				}
			}
		}

		func(isOnMobile)
		isOnMobile.addListener(func);

		return function cleanup() {
			isOnMobile.removeListener(func)
		}	
	}, [isOnMobile, dayWidth, days])
	
	return(
		<Fragment>
			<div className='task' id='task'>
				<div className='taskInfo'>
					<div className='taskInfo__name'>{name}</div>
					<div className='taskInfo__duration'>{diff(parseDate(start), parseDate(end))} day(s)</div>
					<span className='taskInfo__start'>{start}</span> - <span className='taskInfo__end'>{end}</span>
				</div>
				<div className='taskChart' style={{gridArea: `1/${startGrid}/2/${endGrid}`, display: display}}>
					<div style={{backgroundColor: `${colors[Math.floor(Math.random() * 10)]}`}}></div>
				</div>
			</div>
		</Fragment>
	)
}

export default Task;
