import React from 'react';

function NewProjectForm({ handler }) {
    return (
        <form onSubmit={handler} id='newProjectForm'>
            <label>
                Name: <input type='text' name='projectName' />
            </label>
            <label>
                Manager: <input type='text' name='projectManager' />
            </label>
            <label>
                Start Date: <input type='date' name='projectStartDate' min={`${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1 < 10 ? "0" + ((new Date()).getMonth() + 1) : (new Date()).getMonth() + 1}-${(new Date()).getDate() < 10 ? "0" + (new Date()).getDate() : (new Date()).getDate()}`} />
            </label>
            <label>
                Comment: <input type='text' name='projectComment' />
            </label>
            <button type='submit'>Add</button>
        </form>
    )
}

export default NewProjectForm;
