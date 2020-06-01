import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { openForm, closeForm, openNewProjectForm } from '../helpers';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import Menu from '../components/Menu.js';

function AuthenticatedUserScreen({ userEmail, userToken }) {
    let date = new Date();
    let [since, setSince] = useState(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
    date.setMonth(date.getMonth() + 6);
    let [until, setUntil] = useState(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
    /*let [data, setData] = useState([
        { name: 'Аналіз аналогічних рішень', start: '2020-06-01', end: '2020-08-04' },
        { name: 'Аналіз аналогічних рішень', start: '2020-01-01', end: '2020-10-15' },
        { name: 'Аналіз аналогічних рішень', start: '2020-08-01', end: '2020-09-04' },
        { name: 'Аналіз аналогічних рішень', start: '2020-06-01', end: '2020-11-04' },
        { name: 'Аналіз аналогічних рішень', start: '2020-04-01', end: '2020-06-04' },
        { name: 'Аналіз аналогічних рішень', start: '2020-02-01', end: '2020-05-04' },
        { name: 'Аналіз аналогічних рішень', start: '2020-09-01', end: '2020-12-04' },
    ]);*/
    let [projects, setProjects] = useState([])
    let [selectedProjects, setSelectedProjects] = useState([])
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const filteredMonCount = ((until.slice(0, 2) - since.slice(0, 2)) * 12) + (until.slice(5, 7) - since.slice(5, 7)) + 1;
    let days = 0;
    let maxWidth767 = window.matchMedia("(max-width: 767px)")
    function func(maxWidth767) {
        maxWidth767.matches ? document.getElementById('period').style.width = '80%' : document.getElementById('period').style.width = '40%';
    }

    const fetchProjects = async () => {
        const apiCall = await fetch('http://localhost:8083/project/all', { credentials: 'include', headers: { email: userEmail, token: userToken } })
        const projects = await apiCall.json();
        console.log(projects[0])
        setProjects(projects)
    }

    useEffect(() => {
        fetchProjects();

        func(maxWidth767);
        maxWidth767.addListener(func);

        let date = new Date();
        document.getElementById('startDate').setAttribute('min', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);

        date.setFullYear(date.getFullYear() + 1);
        document.getElementById('startDate').setAttribute('max', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);

        date = new Date(since);
        date.setDate(date.getDate() + 1);
        document.getElementById('endDate').setAttribute('min', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);

        date.setDate(date.getDate() - 1);
        date.setMonth(date.getMonth() + 6);
        document.getElementById('endDate').setAttribute('max', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);

        return function cleanup() {
            maxWidth767.removeListener(func)
        }
    }, [])

    for (let i = 0; i < filteredMonCount; i++) {
        days += new Date(2020, Number(since.slice(5, 7)) - 1 + i, 0).getDate()
    }

    let els = [];
    let colForMonth = 2;
    const dayWidth = 89 / days + '%'

    for (let i = 0; i < filteredMonCount; ++i) {
        els.push(<span key={Math.floor(Math.random() * 100000)} style={{ gridArea: `1/${colForMonth}/2/${colForMonth + new Date(2020, Number(since.slice(5, 7)) - 1 + i, 0).getDate()}` }}>{months[Number(since.slice(5, 7)) - 1 + i]}</span>)
        colForMonth += new Date(2020, Number(since.slice(5, 7)) - 1 + i, 0).getDate();
    }

    function sendValue(e) {
        e.target.id === 'startDate' ? setSince(e.target.value) : setUntil(e.target.value);
        if (e.target.id === 'startDate') {
            let date = new Date(e.target.value);
            date.setDate(date.getDate() + 1);
            document.getElementById('endDate').setAttribute('min', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`)

            date.setDate(date.getDate() - 1);
            date.setMonth(date.getMonth() + 6);
            document.getElementById('endDate').setAttribute('max', `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
            setUntil(document.getElementById('endDate').getAttribute('max'))
        }
    }

    async function newTaskFormHandler(e) {
        e.preventDefault();
        const apiCall = await fetch('http://localhost:8083/project/createTask', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                projectId: e.target.taskProject.value,
                email: userEmail,
                token: userToken
            },
            body: JSON.stringify({
                id: uuidv4(),
                name: e.target.name.value,
                duration: 2,
                /*manager: e.target.projectManager.value,*/
                startDate: e.target.start.value,
                endDate: e.target.end.value,
                progress: e.target.taskProgress.value,
                parentId: null,
                child: null,
                userModelFull: null
            })
        })
        const projects = await apiCall.text();
        const fetchUpdated = await fetch('http://localhost:8083/project/all', { credentials: 'include', headers: { email: userEmail, token: userToken } });
        const updatedProjects = await fetchUpdated.json();
        setProjects(updatedProjects)
        closeForm();
        console.log(projects)
        //setOptions(projects)
    }

    async function newProjectFormHandler(e) {
        e.preventDefault();
        const apiCall = await fetch('http://localhost:8083/project/create', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                email: userEmail,
                token: userToken
            },
            body: JSON.stringify({
                id: uuidv4(),
                name: e.target.projectName.value,
                /*manager: e.target.projectManager.value,*/
                startDate: e.target.projectStartDate.value,
                comment: e.target.projectComment.value,
                taskList: []
            })
        })
        const projects = await apiCall.text();
        const fetchUpdated = await fetch('http://localhost:8083/project/all', { credentials: 'include', headers: { email: userEmail, token: userToken } });
        const updatedProjects = await fetchUpdated.json();
        setProjects(updatedProjects)
        closeForm();
        console.log(projects)
        //setOptions(projects)
    }

    function deleteTask(taskId, projId) {
        return async function(e) {
            e.preventDefault();
            const apiCall = await fetch('http://localhost:8083/project/deleteTask', {
                credentials: 'include',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    taskId: taskId,
                    projectId: projId,
                    email: userEmail,
                    token: userToken
                }
            })
            const projects = await apiCall.text();
            const fetchUpdated = await fetch('http://localhost:8083/project/all', { credentials: 'include', headers: { email: userEmail, token: userToken } });
            const updatedProjects = await fetchUpdated.json();
            setProjects(updatedProjects);
            console.log(projects)
            //setOptions(projects)
        }
    }
    
    function selectProjectTask(e) {
        console.log(projects.filter(el => el.name === e.target.value))
        let selectedProj = projects.filter(el => el.name === e.target.value)
        console.log(selectedProj.length)
        selectedProj.length === 0 ? setSelectedProjects(projects) : setSelectedProjects(selectedProj)
    }

    return (
        <div className="App">
            <div id='overlay' onClick={closeForm}></div>
            <Menu />
            <form onSubmit={newTaskFormHandler} className='addTaskForm'>
                <label>
                    Name: <input type='text' id='taskName' name='name' />
                </label>
                <label>
                    Duration: <input type='text' id='taskDuration' name='taskDuration' />
                </label>
                <label>
                    Start: <input type='text' id='taskStart' name='start' />
                </label>
                <label>
                    End: <input type='text' id='taskEnd' name='end' />
                </label>
                <label>
                    Proggres: <input type='number' id='taskProgress' name='taskProgress' />
                </label>
                <label>
                    Project:
                    <select id='taskProject' name='taskProject'>
                        {projects.map(el => <option value={el.id}>{el.name}</option>)}
                    </select>
                </label>
                <button type='submit'>Add</button>
            </form>
            <form onSubmit={newProjectFormHandler} id='newProjectForm'>
                <label>
                    Name: <input type='text' name='projectName' />
                </label>
                <label>
                    Manager: <input type='text' name='projectManager' />
                </label>
                <label>
                    Start Date: <input type='text' name='projectStartDate' />
                </label>
                <label>
                    Comment: <input type='text' name='projectComment' />
                </label>
                <button type='submit'>Add</button>
            </form>
            <div id="period">
                <label htmlFor='startDate'>Since:</label>
                <input type='date' id='startDate' name='startDate' value={since} onChange={sendValue} />
                <label htmlFor='endDate'>Until:</label>
                <input type='date' id='endDate' name='endDate' value={until} onChange={sendValue} />
            </div>
            <select onChange={selectProjectTask}>
                <option value='all'>All projects</option>
                {projects.map(el => <option>{el.name}</option>)}
            </select>
            <button onClick={openForm}>New task</button>
            <button onClick={openNewProjectForm}>New project</button>
            <div id='chart'>
                <Header el={els} days={days} dayWidth={dayWidth} isOnMobile={maxWidth767} />
                <Content dayWidth={dayWidth}
                    days={days}
                    dateStart={since}
                    dateEnd={until}
                    data={selectedProjects}
                    isOnMobile={maxWidth767}
                    userEmail={userEmail}
                    userToken={userToken}
                    deleteTask={deleteTask} />
            </div>
        </div>
    );
}

export default AuthenticatedUserScreen;
