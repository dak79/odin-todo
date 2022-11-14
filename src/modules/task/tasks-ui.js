import { btnsUi } from '../btns-ui';
import { appendChildren, createList, setAttributes, cleanNode, selectNode } from '../helpers';
import { format } from 'date-fns';
import { addAppListeners } from '../listeners';
import { orderTaskByDate, tasks, tasksVisualizedOn } from './tasks';
import { newInput, editInput, findItemId } from '../todo';

/**
 * Render tasks
 * @param { Node } desk - Which desk render
 * @param { boolean } isFirstLoad - Check if it is first load for page
 */
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

/**
 * Task Ui
 * @param { Object } task - Task instance.
 * @property { number } id - Task id.
 * @property { string } type - Task type.
 * @property { string } title - Task title.
 * @property { boolean } complete - Is task complete?
 * @property { Date } dueDate - Task due date.
 * @property { [] } tags - Task tags. 
 * @returns { Node } Task node.
 */
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
        'data-number': `${task.id}`,
        'data-type': 'checkbox-state',
        'data-btn': 'checkbox'
    });

    (task.complete) ? checkBtn.checked = true : checkBtn.checked = false;

    const taskLabel = document.createElement('label');
    setAttributes(taskLabel, {
        for: `task-checkbox-${task.id}`,
        'data-number': `${task.id}`,
        'data-type': `${task.type}`
    })
    if (task.title) {
        taskLabel.textContent = `${task.title}`;
    } else {
        taskLabel.textContent = '';
    }

    const expandTaskBtn = btnsUi(task, 'expand-task', 'expand', null, {
        type: 'button',
        id: `task-${task.id}-expand-btn`,
        class: 'expand-btn',
        'aria-label': 'Show task detail',
        'data-number': `${task.id}`,
        'data-btn': 'expand',
        'data-type': 'expand-task'
    });

    appendChildren(wrapperCheck, [checkBtn, taskLabel, expandTaskBtn]);

    const wrapperDueDate = document.createElement('span');
    setAttributes(wrapperDueDate, {
        id: `due-date-wrapper-${task.id}`,
        class: 'due-date-wrapper',
        'data-number': `${task.id}`
    });

    if (task.dueDate) {
        const deleteDateBtn = btnsUi(task, 'due-date', 'delete','due-date-delete', {
            type: 'button',
            id: `due-date-${task.id}-delete-btn`,
            class: 'due-date-delete-btn',
            'aria-label': 'Delete date',
            'data-number': `${task.id}`,
            'data-type': 'due-date',
            'data-btn': 'delete'
        }); 
            
        wrapperDueDate.appendChild(deleteDateBtn);

    } else {
        const editDateBtn = btnsUi(task, 'due-date', 'edit', 'edit-due-date', {
            type: 'button',
            id: `due-date-${task.id}-edit-btn`,
            class: 'due-date-edit-btn',
            'aria-label': 'Edit date',
            'data-number': `${task.id}`,
            'data-type': 'due-date',
            'data-btn': 'edit'
        });
        
        wrapperDueDate.appendChild(editDateBtn);
    }
    
    const taskDueDate = document.createElement('span');
    setAttributes(taskDueDate, {
        id:`task-${task.id}-due-date`,
        class: 'task-due-date',
        'data-number': `${task.id}`,
        'data-type': 'due-date',
        'data-btn': 'edit'
    });
    taskDueDate.textContent = Date.parse(task.dueDate) ? `${format(task.dueDate, 'dd-MM-yyyy')}` : '';

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

    const editTaskBtn = btnsUi(task, task.type, 'edit', 'edit-task', {
        type: 'button',
        id: `task-${task.id}-edit-btn`,
        class: 'task-edit-btn',
        'aria-label': 'Edit task title',
        'data-number':`${task.id}`,
        'data-type': `${task.type}`,
        'data-btn': 'edit'
    });
    
    const deleteTaskBtn = btnsUi(task, task.type, 'delete', 'delete-task', {
        type: 'button',
        id: `task-${task.id}-delete-btn`,
        class: 'task-delete-btn',
        'aria-label': 'Delete task',
        'data-number': `${task.id}`,
        'data-type': `${task.type}`,
        'data-btn': 'delete'
    });
    
    appendChildren(wrapperBtns, [editTaskBtn, deleteTaskBtn]);

    return [wrapperCheck, wrapperDueDate, wrapperBtns];
}

/**
 * New task Ui
 * @param { Object } newItem - Task instance.
 * @property { number } id - Task.id.
 * @returns { Node } - Input for new task.
 */
export const newTaskUi = newItem => {
    const li = document.createElement('li');
    setAttributes(li, {
        id: `list-item-task-${newItem.id}`,
        class: 'task-item'
    });

    const newTaskContent = taskItem(newItem);
    appendChildren(li, newTaskContent);
    
    const ul = selectNode('.tasks');
    ul.prepend(li);

    const input = newInput(
                            `#checkbox-wrapper-${newItem.id} > label`,
                            `#checkbox-wrapper-${newItem.id}`,
                            {
                                type: 'text',
                                id: 'new-task-input',
                                class: 'new-task-input',
                                name: 'new-task-input',
                                maxlength: 40
    });

    return input;
}

/**
 * Edit task Ui.
 * @param { event } event 
 * @returns { Node } - Input for edit task
 */
export const editTaskUi = event => {
    const type = event.target.dataset.type;

    return  (type === 'task') ? 
            editInput(
                `#checkbox-wrapper-${event.target.dataset.number} > label`,
                `#checkbox-wrapper-${event.target.dataset.number}`,
                {
                    type: 'text',
                    id: 'edit-task-title',
                    class: 'edit-task-title',
                    name: 'edit-task-title',
                    maxlength: 40
                }) :
            (type === 'due-date') ? 
            editInput(
                `#task-${event.target.dataset.number}-due-date`,
                `#due-date-wrapper-${event.target.dataset.number}`,
                {
                    type: 'date',
                    id: `new-due-date-${event.target.dataset.number}`,
                    class: 'new-due-date',
                    'data-number': `${event.target.dataset.number}`
                }) :
            0;
}

export const expandTaskUi = (event, task) => {

    const wrapper = document.createElement('div');
    setAttributes(wrapper, {
        id: `expand-wrapper-${event.target.dataset.number}`,
        class: 'expand-wrapper'
    })
    
    const descriptionWrapper = document.createElement('div');
    setAttributes(descriptionWrapper, {
        id: `description-wrapper-${event.target.dataset.number}`,
        class: 'description-wrapper'
    })
    
    const labelDescription = document.createElement('label');
    setAttributes(labelDescription, {
        for: `description-area-${event.target.dataset.number}`,
        class: 'descrition-label'
    });
    labelDescription.textContent = 'Description: ';

    const descriptionText = document.createElement('textarea');
    setAttributes(descriptionText, {
        id: `description-text-${event.target.dataset.number}`,
        class: 'description-text',
        rows: '1',
        cols: '20'
    });

    if (task.description) descriptionText.value = task.description;
    appendChildren(descriptionWrapper, [labelDescription, descriptionText]);

    const checklistWrapper = document.createElement('div');
    setAttributes(checklistWrapper, {
        id: `checklist-wrapper-${event.target.dataset.number}`,
        class: 'checklist-wrapper'
    });

    const priorityWrapper = document.createElement('div');
    setAttributes(priorityWrapper, {
        id: `priority-wrapper-${event.target.dataset.number}`,
        class: 'priority-wrapper'
    });
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = 'Priority:';

    const radiosWrapper = document.createElement('div');
    
    const lowWrapper = document.createElement('div');
    const radioLow = document.createElement('input');
    const radioLowLabel = document.createElement('label');
    appendChildren(lowWrapper, [radioLow, radioLowLabel]);
    
    const mediumWrapper = document.createElement('div');
    const radioMedium = document.createElement('input');
    const radioMediumLabel = document.createElement('label');
    appendChildren(mediumWrapper, [radioMedium, radioMediumLabel]);
    
    const highWrapper = document.createElement('div');
    const radioHigh = document.createElement('input');
    const radioHighLabel = document.createElement('label');
    appendChildren(highWrapper, [radioHigh, radioHighLabel]);

    appendChildren(radiosWrapper, [lowWrapper, mediumWrapper, highWrapper]);
    appendChildren(fieldset, [legend, radiosWrapper]);
    priorityWrapper.appendChild(fieldset);

    const tagsWrapper = document.createElement('div');
    setAttributes(tagsWrapper, {
        id: `tags-wrapper-${event.target.dataset.number}`,
        class: 'tags-wrapper'
    });

    appendChildren(wrapper, [descriptionWrapper, priorityWrapper, tagsWrapper, checklistWrapper]);

    return { wrapper, description: descriptionWrapper, priority: priorityWrapper, tags: tagsWrapper, checklist: checklistWrapper};
}