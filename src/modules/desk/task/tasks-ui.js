import { appendChildren, createList, setAttributes } from '../../helpers';
import { tasks } from './tasks';


export const createTasksUi = () => {
    const todoes = createList(tasks, taskItem, 'tasks', 'task-item');

    return todoes
}

const taskItem = task => {
    const wrapperCheck = document.createElement('span');
    setAttributes(wrapperCheck, {
        id: `checkbox-wrapper-${task.id}`,
        class: 'checkbox-wrapper'
    })
    const checkBtn = document.createElement('input');

    setAttributes(checkBtn, {
        type: 'checkbox',
        id: `task-${task.id}`,
        name: `task-${task.id}`
    })

    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for', `task-${task.id}`);
    taskLabel.textContent = `${task.title}`;

    const expandTaskBtn = document.createElement('button');
    setAttributes(expandTaskBtn, {
        id: `task-${task.id}-expand-btn`,
        class: 'expand-btn'
    })
    expandTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" id="icon-${task.id}"><path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" id="icon-${task.id}"/></svg>`

    appendChildren(wrapperCheck, [checkBtn, taskLabel, expandTaskBtn]);

    const taskDueDate = document.createElement('span');
    setAttributes(taskDueDate, {
        id:`task-${task.id}-due-date`,
        class: 'tasks-due-date'
    })
    taskDueDate.textContent = `${task.dueDate}`;

    const wrapperBtns = document.createElement('span');
    setAttributes(wrapperBtns, {
        id: `task-btn-wrapper-${task.id}`,
        class: 'task-btn-wrapper'
    })

    const editTaskBtn = document.createElement('button');
    setAttributes(editTaskBtn, {
        id: `task-${task.id}-edit-btn`,
        class: 'task-edit-btn'
    })

    editTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="svg-task-edit-${task.id}"><path id="svg-task-edit-${task.id}" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>`;

    const deleteTaskBtn = document.createElement('button');
    setAttributes(deleteTaskBtn, {
        id: `task-${task.id}-delete-btn`,
        class: 'task-delete-btn'
    })

    deleteTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="svg-task-delete-${task.id}"><path id="svg-task-delete-${task.id}" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;

    appendChildren(wrapperBtns, [editTaskBtn, deleteTaskBtn])


    return [wrapperCheck, taskDueDate, wrapperBtns];
}