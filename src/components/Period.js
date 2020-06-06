import React from 'react';

function Period({ since, until, sendValue }) {
    return (
        <div id="period">
            <label htmlFor='startDate'>Since:</label>
            <input type='date' id='startDate' name='startDate' value={since} onChange={sendValue} />
            <label htmlFor='endDate'>Until:</label>
            <input type='date' id='endDate' name='endDate' value={until} onChange={sendValue} />
        </div>
    )
}

export default Period;
