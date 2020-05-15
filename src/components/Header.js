import React from 'react';

function Header({el, days, dayWidth}) {
	
	return (
			<div className="gantt__row gantt__row--months" style={{gridTemplateColumns: `11% repeat(${days}, ${dayWidth})`}}>
	            <div className="gantt__row-first"></div>
	            {el}
	            
        	</div>
		)
}

export default Header;
