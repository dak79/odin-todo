import { appendChildren, createList, setAttributes } from '../../helpers';
import { tasks } from './tasks';


export const createTasksUi = () => {
    const todoes = createList(tasks, taskItem, 'tasks', 'task-item');

    return todoes
}

const taskItem = task => {
    const wrapper = document.createElement('span');
    setAttributes(wrapper, {
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

    appendChildren(wrapper, [checkBtn, taskLabel, expandTaskBtn]);

    const taskDueDate = document.createElement('span');
    setAttributes(taskDueDate, {
        id:`task-${task.id}-due-date`,
        class: 'tasks-due-date'
    })
    taskDueDate.textContent = `${task.dueDate}`;

    return [wrapper, taskDueDate];
}