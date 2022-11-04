import { appendChildren, createList, setAttributes, formatDate } from '../../helpers';
import { tasks } from './tasks';

export const createTasksUi = (array, type) => {
    const todoes = createList(array, type, taskItem, 'tasks', 'task', 'task-item');

    return todoes
}

const taskItem = task => {
    const wrapperCheck = document.createElement('span');
    setAttributes(wrapperCheck, {
        id: `checkbox-wrapper-${task.id}`,
        class: 'checkbox-wrapper',
    })
    const checkBtn = document.createElement('input');

    setAttributes(checkBtn, {
        type: 'checkbox',
        id: `task-checkbox-${task.id}`,
        class: 'tasks-checkbox',
        name: `task-checkbox-${task.id}`,
        'aria-label': 'Not done/Done check field',
        'data-number': `${task.id}`
    })

    if (task.complete === true) {
        checkBtn.checked = true;
    } else {
        checkBtn.checked = false;
    }

    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for', `task-checkbox-${task.id}`);
    taskLabel.textContent = `${task.title}`;

    const expandTaskBtn = document.createElement('button');
    setAttributes(expandTaskBtn, {
        type: 'button',
        id: `task-${task.id}-expand-btn`,
        class: 'expand-btn',
        'aria-label': 'Show task detail'
    })
    expandTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 16.35-7-7 2.4-2.375 4.6 4.6 4.6-4.6L19 9.35Z"/></svg>`

    appendChildren(wrapperCheck, [checkBtn, taskLabel, expandTaskBtn]);

    const taskDueDate = document.createElement('span');
    setAttributes(taskDueDate, {
        id:`task-${task.id}-due-date`,
        class: 'task-due-date'
    })
    taskDueDate.textContent = Date.parse(task.dueDate) ? `${formatDate(task.dueDate)}` : '';

    const wrapperBtns = document.createElement('span');
    setAttributes(wrapperBtns, {
        id: `task-btn-wrapper-${task.id}`,
        class: 'task-btn-wrapper'
    })

    const editTaskBtn = document.createElement('button');
    setAttributes(editTaskBtn, {
        type: 'button',
        id: `task-${task.id}-edit-btn`,
        class: 'task-edit-btn',
        'aria-label': 'Edit task title'
    })

    editTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.725 9.4-4.9-4.875 1.25-1.275q.75-.75 1.812-.775 1.063-.025 1.913.775l1.225 1.225q.85.8.787 1.85-.062 1.05-.812 1.8ZM18.3 10.825 7.35 21.8H2.425v-4.9L13.4 5.95Z"/></svg>`

    const deleteTaskBtn = document.createElement('button');
    setAttributes(deleteTaskBtn, {
        type: 'button',
        id: `task-${task.id}-delete-btn`,
        class: 'task-delete-btn',
        'aria-label': 'Delete task'
    })

    deleteTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.675 22.15q-1.4 0-2.4-.987-1-.988-1-2.413V6.225H1.7v-3.4h6.7v-1.65h7.175v1.65H22.3v3.4h-1.575V18.75q0 1.425-.987 2.413-.988.987-2.413.987Zm1.675-5.125h2.825V7.95H8.35Zm4.5 0h2.825V7.95H12.85Z"/></svg>`

    appendChildren(wrapperBtns, [editTaskBtn, deleteTaskBtn])


    return [wrapperCheck, taskDueDate, wrapperBtns];
}

