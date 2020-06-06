import React from 'react';

function NewTaskForm({ handler, setTaskMinStartDate, setSelectElements }) {
    return (
        <form onSubmit={handler} id='newTaskForm' className='addTaskForm'>
            <label>
                Project:
                    <select id='taskProject' name='taskProject' onChange={setTaskMinStartDate}>
                    {setSelectElements()}
                </select>
            </label>
            <label>
                Name: <input type='text' id='taskName' name='name' />
            </label>
            <label>
                Start: <input type='date' id='taskStart' name='start' />
            </label>
            <label>
                End: <input type='date' id='taskEnd' name='end' />
            </label>
            <label>
                Proggres, %: <input type='number' id='taskProgress' name='taskProgress' />
            </label>
            <button type='submit'>Add</button>
        </form>
    )
}

export default NewTaskForm;
