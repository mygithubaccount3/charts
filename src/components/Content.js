import React from 'react';
import Task from './Task.js';

function Content({dayWidth, days, monStart, monEnd, data, isOnMobile}) {
	const elements = data.map((el, i, arr) => <Task monStart={monStart}
													monEnd={monEnd}
													name={el.name}
													start={el.start}
													end={el.end}
													key={i}
													days={days}
													dayWidth={dayWidth}
													isOnMobile={isOnMobile}/>
							)

	return (
			<div className='content'>
				{elements}
			</div>
		)
}

export default Content;
