import React, { Fragment, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dayDiff } from '../helpers.js'

function Task({ dayWidth, days, dateStart, dateEnd, name, start, end, isOnMobile, projId, taskId, userEmail, userToken, deleteTask }) {
    const colors = ['#dfceff', '#c4dcff', '#fec4ff', '#c4f4ff', '#c8ffc4', '#ffc4c4', '#304c8029', '#8a5858b0', '#10bdb5b0']

    let startGrid = 0;
    let endGrid = 0;
    let display;

    function parseDate(date) {
        const arr = date.split('-')
        return new Date(arr[0], arr[1] - 1, arr[2]);
    }

    if (parseDate(start) < parseDate(dateStart)) {
        if (parseDate(end) < parseDate(dateStart)) {
            display = 'none';
        } else if (parseDate(end) >= parseDate(dateStart) && parseDate(end) <= parseDate(dateEnd)) {
            startGrid = 2;
            const vis = dayDiff(parseDate(dateStart), parseDate(end))//`2020-${monStart}-01`
            endGrid = startGrid + (1 + (vis));
            display = 'block';
        } else if (parseDate(end) > parseDate(dateEnd)) {
            startGrid = 2;
            endGrid = days;
            display = 'block';
        }
    } else if (parseDate(start) >= parseDate(dateStart) && parseDate(start) <= parseDate(dateEnd)) {
        startGrid = dayDiff(parseDate(dateStart), parseDate(start)) + 2;

        if (parseDate(end) <= parseDate(dateEnd)) {
            endGrid = startGrid + dayDiff(parseDate(start), parseDate(end));
            display = 'block';
        } else if (parseDate(end) > parseDate(dateEnd)) {
            endGrid = days;
            display = 'block';
        }
    } else if (parseDate(start) > parseDate(dateEnd)) {
        display = 'none';
    }

    useEffect(() => {
        function func(isOnMobile) {
            const taskElements = document.getElementsByClassName('task');
            const taskCharts = document.getElementsByClassName('task__chart');

            if (isOnMobile.matches) {
                const dayW = ((11 / days) + Number(dayWidth.slice(0, dayWidth.length - 1))) + "%";

                for (let i = 0; i < taskElements.length; i++) {
                    taskElements[i].children[0].style.display = 'none';
                    taskElements[i].setAttribute('style', `grid-template-columns: repeat(${days}, ${dayW});margin-top: 11px;margin-bottom: 11px`);

                    taskCharts[i].style.backgroundColor = 'white';
                    taskCharts[i].style.border = `2px solid ${colors[Math.floor(Math.random() * 10)]}`;
                    taskCharts[i].innerHTML = name;
                }
            } else {
                for (let i = 0; i < taskElements.length; i++) {
                    taskElements[i].children[0].style.display = 'block';
                    taskElements[i].setAttribute('style', `grid-template-columns: 11% repeat(${days}, ${dayWidth})`);

                    taskCharts[i].style.backgroundColor = colors[Math.floor(Math.random() * 10)];
                    taskCharts[i].style.border = 0;
                    taskCharts[i].innerHTML = '';
                }
            }
        }

        func(isOnMobile)
        isOnMobile.addListener(func);

        return function cleanup() {
            isOnMobile.removeListener(func)
        }
    }, [isOnMobile, dayWidth, days])

    return (
        <Fragment>
            <div className='task' id={uuidv4()}>
                <div className='task__info'>
                    <div className='task__name'>{name}</div>
                    <div className='task__duration'>{dayDiff(parseDate(start), parseDate(end))} day(s)</div>
                    <span className='task__start'>{start}</span> - <span className='taskInfo__end'>{end}</span>
                    <button>Edit</button>
                    <button onClick={deleteTask(taskId, projId)}>Delete</button>
                </div>
                <div className='task__chart'
                    style={{
                        gridArea: `1/${startGrid}/2/${endGrid}`,
                        display: display,
                        backgroundColor: `${colors[Math.floor(Math.random() * 10)]}`
                    }}>
                </div>
            </div>
        </Fragment>
    )
}

export default Task;
