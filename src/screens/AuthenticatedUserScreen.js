import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dayDiff } from '../helpers';
import NewTaskForm from '../components/NewTaskForm';
import NewProjectForm from '../components/NewProjectForm';
import Header from '../components/Header';
import Period from '../components/Period';
import Content from '../components/Content';

function AuthenticatedUserScreen({ userEmail, userToken }) {
    let date = new Date();
    let [since, setSince] = useState(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
    date.setMonth(date.getMonth() + 6);
    let [until, setUntil] = useState(`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`);
    let [projects, setProjects] = useState([]);
    let [filteredProjects, setFilteredProjects] = useState([]);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = 0;
    let maxWidth767 = window.matchMedia("(max-width: 767px)")
    function func(maxWidth767) {
        maxWidth767.matches ? document.getElementById('period').style.width = '80%' : document.getElementById('period').style.width = '40%';
    }

    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months + 1;
    }

    const fetchProjects = async () => {
        const apiCall = await fetch('http://localhost:8083/project/all', { credentials: 'include', headers: { email: userEmail, token: userToken } })
        const projects = await apiCall.json();
        console.log(projects[0])
        selectProjectTask(projects)();
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

    days = dayDiff(new Date(since), new Date(until))
    let countOfMonths = monthDiff(new Date(since), new Date(until))

    let els = [];
    let colForMonth = 2;
    const dayWidth = 89 / days + '%'
    let y = new Date(since);

    for (let i = 0; i <= countOfMonths; ++i) {
        if (i === 0) {
            els.push(<span key={uuidv4()} style={{ gridArea: `1/${colForMonth}/2/${colForMonth + (new Date(Number(since.slice(0, 4)), Number(since.slice(5, 7)), 0).getDate() - Number(since.slice(8)))}` }}>{months[y.getMonth()]}</span>)
            colForMonth += new Date(Number(since.slice(0, 4)), Number(since.slice(5, 7)), 0).getDate() - Number(since.slice(8));
            y.setMonth(y.getMonth() + 1);
        } else if (i <= countOfMonths - 1) {
            els.push(<span key={uuidv4()} style={{ gridArea: `1/${colForMonth}/2/${colForMonth + new Date(Number(since.slice(0, 4)), Number(since.slice(5, 7)) - 1 + i, 0).getDate()}` }}>{months[y.getMonth()]}</span>)
            colForMonth += new Date(Number(since.slice(0, 4)), Number(since.slice(5, 7)) - 1 + i, 0).getDate();
            y.setMonth(y.getMonth() + 1);
        } else {
            els.push(<span key={uuidv4()} style={{ gridArea: `1/${colForMonth}/2/${colForMonth + Number(until.slice(8))}` }}>{months[Number(until.slice(5, 7)) - 1]}</span>)
        }
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
        await fetch('http://localhost:8083/project/createTask', {
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
        const fetchUpdated = await fetch('http://localhost:8083/project/all', { credentials: 'include', headers: { email: userEmail, token: userToken } });
        const updatedProjects = await fetchUpdated.json();
        setProjects(updatedProjects)
        closeForm();
    }

    async function newProjectFormHandler(e) {
        e.preventDefault();
        await fetch('http://localhost:8083/project/create', {
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
        const fetchUpdated = await fetch('http://localhost:8083/project/all', { credentials: 'include', headers: { email: userEmail, token: userToken } });
        const updatedProjects = await fetchUpdated.json();
        setProjects(updatedProjects)
        closeForm();
    }

    function deleteTask(taskId, projId) {
        return async function(e) {
            e.preventDefault();
            await fetch('http://localhost:8083/project/deleteTask', {
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
            const fetchUpdated = await fetch('http://localhost:8083/project/all', { credentials: 'include', headers: { email: userEmail, token: userToken } });
            const updatedProjects = await fetchUpdated.json();
            setProjects(updatedProjects);
        }
    }

    function selectProjectTask(projects) {
        return e => {
            if (typeof e === 'undefined') {
                setProjects(projects);
                setFilteredProjects(projects);
            } else {
                let selectedProj = projects.filter(el => el.name === e.target.value)
                selectedProj.length === 0 ? setFilteredProjects(projects) : setFilteredProjects(selectedProj)
            }
        }
    }

    function openForm(e) {
        switch (e.target.id) {
            case "openNewTaskFormButton":
                const selectedProjectStartDate = new Date(projects.find((el) => el.id === document.getElementById('taskProject').value).startDate);
                document.getElementById('newTaskForm').start.setAttribute('min', `${selectedProjectStartDate.getFullYear()}-${selectedProjectStartDate.getMonth() + 1 < 10 ? "0" + (selectedProjectStartDate.getMonth() + 1) : selectedProjectStartDate.getMonth() + 1}-${selectedProjectStartDate.getDate() < 10 ? "0" + selectedProjectStartDate.getDate() : selectedProjectStartDate.getDate()}`)
                document.getElementById('overlay').style.display = 'block';
                document.getElementById('newTaskForm').style.display = 'flex';
                break;
            case "openNewProjectFormButton":
                document.getElementById('overlay').style.display = 'block';
                document.getElementById('newProjectForm').style.display = 'flex';
        }
    }

    function closeForm() {
        let forms = [...document.getElementsByTagName('form')]
        forms.forEach(el => {
            el.style.display = 'none';
        })
        document.getElementById('overlay').style.display = 'none';
    }

    function setTaskMinStartDate() {
        const selectedProjectStartDate = new Date(projects.find((el) => el.id === document.getElementById('taskProject').value).startDate);
        document.getElementById('newTaskForm').start.setAttribute('min', `${selectedProjectStartDate.getFullYear()}-${selectedProjectStartDate.getMonth() + 1 < 10 ? "0" + (selectedProjectStartDate.getMonth() + 1) : selectedProjectStartDate.getMonth() + 1}-${selectedProjectStartDate.getDate() < 10 ? "0" + selectedProjectStartDate.getDate() : selectedProjectStartDate.getDate()}`)
    }

    function setSelectElements() {
        let selectElements = projects.map(el => <option key={uuidv4()} value={el.id}>{el.name}</option>)
        return selectElements;
    }

    return (
        <div className="App">
            <div id='overlay' onClick={closeForm}></div>
            <NewTaskForm handler={newTaskFormHandler} setTaskMinStartDate={setTaskMinStartDate} setSelectElements={setSelectElements} />
            <NewProjectForm handler={newProjectFormHandler} />
            <Period since={since} until={until} sendValue={sendValue} />
            <label>
                Select project:
                <select onChange={selectProjectTask(projects)} style={{ marginLeft: '20px' }}>
                    <option value='all'>All projects</option>
                    {projects.map(el => <option>{el.name}</option>)}
                </select>
            </label>
            <button id="openNewTaskFormButton" onClick={openForm}>New task</button>
            <button id="openNewProjectFormButton" onClick={openForm}>New project</button>
            <div id='chart'>
                <Header el={els} days={days} dayWidth={dayWidth} isOnMobile={maxWidth767} />
                <Content dayWidth={dayWidth}
                    days={days}
                    dateStart={since}
                    dateEnd={until}
                    data={filteredProjects}
                    isOnMobile={maxWidth767}
                    userEmail={userEmail}
                    userToken={userToken}
                    deleteTask={deleteTask} />
            </div>
        </div>
    );
}

export default AuthenticatedUserScreen;
