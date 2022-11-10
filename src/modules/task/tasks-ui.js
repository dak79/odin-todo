import { appendChildren, createList, setAttributes, formatDate, cleanNode, selectNode } from '../helpers';
import { addAppListeners } from '../listeners';
import { orderTaskByDate, tasks, tasksVisualizedOn } from './tasks';

export const renderTasks = (desk, isFirstLoad) => {
    orderTaskByDate();
    const section = selectNode('#desk');
    const displayTasks = createTasksUi(desk);
    cleanNode(section);
    section.appendChild(displayTasks);
    if (!isFirstLoad) addAppListeners();
    tasksVisualizedOn(desk);
}

const createTasksUi = desk => {
    const todoes = createList(tasks, desk, taskItem, 'tasks', 'task', 'task-item');
    return todoes;
}

const taskItem = task => {
    const wrapperCheck = document.createElement('span');
    setAttributes(wrapperCheck, {
        id: `checkbox-wrapper-${task.id}`,
        class: 'checkbox-wrapper',
    });

    const checkBtn = document.createElement('input');
    setAttributes(checkBtn, {
        type: 'checkbox',
        id: `task-checkbox-${task.id}`,
        class: 'tasks-checkbox',
        name: `task-checkbox-${task.id}`,
        'aria-label': 'Not done/Done check field',
        'data-number': `${task.id}`
    });

    if (task.complete === true) {
        checkBtn.checked = true;
    } else {
        checkBtn.checked = false;
    }

    const taskLabel = document.createElement('label');
    setAttributes(taskLabel, {
        for: `task-checkbox-${task.id}`,
        'data-number': `${task.id}`,
        'data-type': `${task.type}`
    })
    taskLabel.textContent = `${task.title}`;

    const expandTaskBtn = document.createElement('button');
    setAttributes(expandTaskBtn, {
        type: 'button',
        id: `task-${task.id}-expand-btn`,
        class: 'expand-btn',
        'aria-label': 'Show task detail'
    });
    expandTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 16.35-7-7 2.4-2.375 4.6 4.6 4.6-4.6L19 9.35Z"/></svg>`;

    appendChildren(wrapperCheck, [checkBtn, taskLabel, expandTaskBtn]);

    const wrapperDueDate = document.createElement('span');
    setAttributes(wrapperDueDate, {
        id: `due-date-wrapper-${task.id}`,
        class: 'due-date-wrapper',
        'data-number': `${task.id}`
    });

    if (task.dueDate) {
        const deleteDateBtn = document.createElement('button');
        setAttributes(deleteDateBtn, {
            type: 'button',
            id: `due-date-${task.id}-delete-btn`,
            class: 'due-date-delete-btn',
            'aria-label': 'Delete date',
            'data-number': `${task.id}`
        });
        deleteDateBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="${task.id}" data-type="due-date"><path d="M6.675 22.15q-1.4 0-2.4-.987-1-.988-1-2.413V6.225H1.7v-3.4h6.7v-1.65h7.175v1.65H22.3v3.4h-1.575V18.75q0 1.425-.987 2.413-.988.987-2.413.987Zm1.675-5.125h2.825V7.95H8.35Zm4.5 0h2.825V7.95H12.85Z" data-number="${task.id}" data-type="due-date" /></svg>`;
        
        wrapperDueDate.appendChild(deleteDateBtn);

    } else {
        const editDateBtn = document.createElement('button');
        setAttributes(editDateBtn, {
            type: 'button',
            id: `due-date-${task.id}-edit-btn`,
            class: 'due-date-edit-btn',
            'aria-label': 'Edit date',
            'data-number': `${task.id}`,
            'data-type': 'due-date'
        });
        editDateBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="${task.id}" data-type="due-date"><path d="m19.725 9.4-4.9-4.875 1.25-1.275q.75-.75 1.812-.775 1.063-.025 1.913.775l1.225 1.225q.85.8.787 1.85-.062 1.05-.812 1.8ZM18.3 10.825 7.35 21.8H2.425v-4.9L13.4 5.95Z" data-number="${task.id}" data-type="due-date"/></svg>`;

        wrapperDueDate.appendChild(editDateBtn);
    }
    
    const taskDueDate = document.createElement('span');
    setAttributes(taskDueDate, {
        id:`task-${task.id}-due-date`,
        class: 'task-due-date',
        'data-number': `${task.id}`,
        'data-type': 'due-date'
    });
    taskDueDate.textContent = Date.parse(task.dueDate) ? `${formatDate(task.dueDate)}` : '';

    wrapperDueDate.appendChild(taskDueDate);

    if (task.tags.find(tag => tag === 'late') && task.complete === false) {
        taskDueDate.classList.add('late-color');
        const lateMsg = document.createElement('span');
        setAttributes(lateMsg, {
            id:`late-msg-${task.id}`,
            class: 'late-msg'
        });
        lateMsg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M-.225 21.825 12 .7l12.225 21.125ZM12 18.175q.525 0 .887-.363.363-.362.363-.887 0-.5-.363-.863-.362-.362-.887-.362-.5 0-.875.362-.375.363-.375.863 0 .525.375.887.375.363.875.363Zm-1.125-3.125h2.25v-4.775h-2.25Z"/></svg>`;

        wrapperDueDate.appendChild(lateMsg);
    }

    const wrapperBtns = document.createElement('span');
    setAttributes(wrapperBtns, {
        id: `task-btn-wrapper-${task.id}`,
        class: 'task-btn-wrapper'
    });

    const editTaskBtn = document.createElement('button');
    setAttributes(editTaskBtn, {
        type: 'button',
        id: `task-${task.id}-edit-btn`,
        class: 'task-edit-btn',
        'aria-label': 'Edit task title',
        'data-number':`${task.id}`
    });

    editTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="${task.id}" data-type="${task.type}"><path d="m19.725 9.4-4.9-4.875 1.25-1.275q.75-.75 1.812-.775 1.063-.025 1.913.775l1.225 1.225q.85.8.787 1.85-.062 1.05-.812 1.8ZM18.3 10.825 7.35 21.8H2.425v-4.9L13.4 5.95Z" data-number="${task.id}" data-type="${task.type}"/></svg>`;

    const deleteTaskBtn = document.createElement('button');
    setAttributes(deleteTaskBtn, {
        type: 'button',
        id: `task-${task.id}-delete-btn`,
        class: 'task-delete-btn',
        'aria-label': 'Delete task',
        'data-number': `${task.id}`,
        'data-type': `${task.type}`
    });

    deleteTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="${task.id}" data-type="${task.type}"><path d="M6.675 22.15q-1.4 0-2.4-.987-1-.988-1-2.413V6.225H1.7v-3.4h6.7v-1.65h7.175v1.65H22.3v3.4h-1.575V18.75q0 1.425-.987 2.413-.988.987-2.413.987Zm1.675-5.125h2.825V7.95H8.35Zm4.5 0h2.825V7.95H12.85Z" data-number="${task.id}" data-type="${task.type}" /></svg>`;

    appendChildren(wrapperBtns, [editTaskBtn, deleteTaskBtn]);

    return [wrapperCheck, wrapperDueDate, wrapperBtns];
}
