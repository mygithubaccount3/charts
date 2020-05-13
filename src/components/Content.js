import React from 'react';
import Task from './Task.js';

function Content({len, days, monStart, monEnd, data}) {
	const elements = data.map((el, i, arr) => <Task monStart={monStart}
													monEnd={monEnd}
													name={el.name}
													start={el.start}
													end={el.end}
													key={i}
													days={days}
													len={len}/>
							)

	return (
			<div className='content'>
				{elements}
			</div>
		)
}

export default Content;
