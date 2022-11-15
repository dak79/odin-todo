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
        class: 'task-checkbox-label',
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

    const wrapperMsg = document.createElement('span');
    setAttributes(wrapperMsg, {
        id: `task-msg-wrapper-${task.id}`,
        class: 'task-msg-wrapper'
    });

    if (task.tags.find(tag => tag === 'late') && task.complete === false) {
        taskDueDate.classList.add('late-color');
        const lateMsg = document.createElement('span');
        setAttributes(lateMsg, {
            id:`late-msg-${task.id}`,
            class: 'late-msg'
        });
        lateMsg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M-.225 21.825 12 .7l12.225 21.125ZM12 18.175q.525 0 .887-.363.363-.362.363-.887 0-.5-.363-.863-.362-.362-.887-.362-.5 0-.875.362-.375.363-.375.863 0 .525.375.887.375.363.875.363Zm-1.125-3.125h2.25v-4.775h-2.25Z"/></svg>`;

        wrapperMsg.appendChild(lateMsg);
    }

    if (task.priority === 'low') {
        const lowPriority = document.createElement('span');
        setAttributes(lowPriority, {
            id: `low-priority-${task.id}`,
            class: 'low-priority'
        });

        lowPriority.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7.725 21.75 5.85 19.9l1.25-1.225Q4.325 18.6 2.337 16.5.35 14.4.35 11.45q0-3 2.125-5.113Q4.6 4.225 7.6 4.225h4.575v3.4H7.6q-1.625 0-2.737 1.113Q3.75 9.85 3.75 11.45q0 1.525.963 2.612Q5.675 15.15 7 15.3h.025L5.85 14.125l1.875-1.85 4.725 4.75Zm6.45-3.05v-3.4h9.45v3.4Zm0-5.525v-3.4h9.45v3.4Zm0-5.55v-3.4h9.45v3.4Z"/></svg>`

        wrapperMsg.appendChild(lowPriority);
    }

    if (task.priority === 'high') {
        const highPriority = document.createElement('span');
        setAttributes(highPriority, {
            id: `high-priority-${task.id}`,
            class: 'high-priority'
        });

        highPriority.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 22.8q-1.25 0-2.137-.887-.888-.888-.888-2.138t.888-2.138q.887-.887 2.137-.887t2.137.9q.888.9.888 2.15t-.888 2.125Q13.25 22.8 12 22.8Zm-2.675-8.1V1.4h5.35v13.3Z"/></svg>`

        wrapperMsg.appendChild(highPriority);
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

    return [wrapperCheck, wrapperDueDate, wrapperMsg, wrapperBtns];
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

export const expandTaskUi = (task) => {

    const wrapper = document.createElement('div');
    setAttributes(wrapper, {
        id: `expand-wrapper-${task.id}`,
        class: `expand-wrapper wrappers-${task.id}`
    })

    const wrapperExtra = document.createElement('div');
    setAttributes(wrapperExtra, {
        id: `extra-wrapper-${task.id}`,
        class: `extra-wrapper wrappers-${task.id}`
    })
    
    const descriptionWrapper = document.createElement('div');
    setAttributes(descriptionWrapper, {
        id: `description-wrapper-${task.id}`,
        class: 'description-wrapper'
    })
    
    const labelDescription = document.createElement('label');
    setAttributes(labelDescription, {
        for: `description-area-${task.id}`,
        class: 'descrition-label'
    });
    labelDescription.textContent = 'Description: ';

    const descriptionText = document.createElement('textarea');
    setAttributes(descriptionText, {
        id: `description-text-${task.id}`,
        class: 'description-text',
        rows: '1',
        cols: '20'
    });

    if (task.description) descriptionText.value = task.description;
    appendChildren(descriptionWrapper, [labelDescription, descriptionText]);

    const priorityWrapper = document.createElement('div');
    setAttributes(priorityWrapper, {
        id: `priority-wrapper-${task.id}`,
        class: 'priority-wrapper'
    });
    const fieldsetRadio = document.createElement('fieldset');
    const legendRadio = document.createElement('legend');
    legendRadio.textContent = 'Priority:';

    const radiosWrapper = document.createElement('div');
    setAttributes(radiosWrapper, {
        id: `radios-wrapper-${task.id}`,
        class: 'radios-wrapper'
    });
    
    const lowWrapper = document.createElement('div');
    setAttributes(lowWrapper, {
        id: `radio-low-wrapper-${task.id}`,
        class: 'radio-wrapper'
    });

    const radioLowLabel = document.createElement('label');
    setAttributes(radioLowLabel, {
        for: `radio-low-btn-${task.id}`,
        class: 'radio-label'
    });
    radioLowLabel.textContent = 'Low';

    const radioLow = document.createElement('input');
    setAttributes(radioLow, {
        type: 'radio',
        id: `radio-low-btn-${task.id}`,
        class: 'radio-btns',
        name: `priority-${task.id}`,
        value: 'low'
    });

    appendChildren(lowWrapper, [radioLow, radioLowLabel]);
    
    const mediumWrapper = document.createElement('div');
    setAttributes(mediumWrapper, {
        id: `radio-medium-wrapper-${task.id}`,
        class: 'radio-wrapper'
    });

    const radioMediumLabel = document.createElement('label');
    setAttributes(radioMediumLabel, {
        for: `radio-medium-btn-${task.id}`,
        class: 'radio-label'
    });
    radioMediumLabel.textContent = 'Medium';
    const radioMedium = document.createElement('input');
    setAttributes(radioMedium, {
        type: 'radio',
        id: `radio-medium-btn-${task.id}`,
        class: 'radio-btns',
        name: `priority-${task.id}`,
        value: 'medium'
    });
    appendChildren(mediumWrapper, [radioMedium, radioMediumLabel]);
    
    const highWrapper = document.createElement('div');
    setAttributes(highWrapper, {
        id: `radio-high-wrapper-${task.id}`,
        class: 'radio-wrapper'
    });

    const radioHighLabel = document.createElement('label');
    setAttributes(radioHighLabel, {
        for: `radio-high-btn-${task.id}`,
        class: 'radio-label'
    });

    radioHighLabel.textContent = 'High';
    const radioHigh = document.createElement('input');
    setAttributes(radioHigh, {
        type: 'radio',
        id: `radio-high-btn-${task.id}`,
        class: 'radio-btns',
        name: `priority-${task.id}`,
        value: 'high'
    });
    appendChildren(highWrapper, [radioHigh, radioHighLabel]);

    

    appendChildren(radiosWrapper, [lowWrapper, mediumWrapper, highWrapper]);
    appendChildren(fieldsetRadio, [legendRadio, radiosWrapper]);
    priorityWrapper.appendChild(fieldsetRadio);

    if(task.priority) {
        if (task.priority === 'low') radioLow.checked = true;
        if (task.priority === 'medium') radioMedium.checked = true;
        if (task.priority === 'high') radioHigh.checked = true;

    } else {
        radioMedium.checked = true;
    }
    
    const tagsWrapper = document.createElement('div');
    setAttributes(tagsWrapper, {
        id: `tags-wrapper-${task.id}`,
        class: 'tags-wrapper'
    });

    const tagsLabel = document.createElement('label');
    setAttributes(tagsLabel, {
        for: `task-tags-${task.id}`,
        class: 'task-tags-label'
    });
    tagsLabel.textContent = 'Lists:';

    const tagsSelect = document.createElement('select');
    setAttributes(tagsSelect, {
        id: `task-tags-${task.id}`,
        class: 'task-tags',
        name: 'tags'
    });

    const option = document.createElement('option');
    setAttributes(option, {
        value: ""
    });
    option.textContent = '-- Choose list --';
    tagsSelect.appendChild(option);

    appendChildren(tagsWrapper, [tagsLabel, tagsSelect]);

    if (task.tags.length) {
        task.tags.map(tag => {
            // if (tag !== 'inbox' && tag !== 'today' && tag !== 'this-week' && tag !== 'anytime' && tag !== 'complete' && tag !== 'late') {
                // }
                tagsSelect.options.add(new Option(tag, tag))
        });
    }
    const checklistWrapper = document.createElement('div');
    setAttributes(checklistWrapper, {
        id: `checklist-wrapper-${task.id}`,
        class: 'checklist-wrapper'
    });

    const fieldsetCheck = document.createElement('fieldset');
    const legendCheck = document.createElement('legend');
    legendCheck.textContent = 'Checklist:';
    
    const addItemBtn = document.createElement('button');
    setAttributes(addItemBtn, {
        type: 'button',
        id: `checklist-add-item-btn-${task.id}`,
        class: 'checklist-add-item-btn'
    })
    addItemBtn.textContent  = '+';
    
    const listWrapper = document.createElement('div');
    setAttributes(listWrapper, {
        id: `list-wrapper-${task.id}`,
        class: 'list-wrapper'
    })

    if (task.checklist) {
        task.checklist.map((item, index) => {
            const itemWrapper = document.createElement('div');
            setAttributes(itemWrapper, {
                id: `checklist-item-wrapper-${task.id}`,
                class: 'checklist-item-wrapper'
            })
            const check = document.createElement('input');
            setAttributes(check, {
                type: 'checkbox',
                id: `checklist-item-${task.id}-${index}`,
                class: 'checklist-item',
                name: 'checklist-item'
            })
        
            const checkLabel = document.createElement('label');
            setAttributes(checkLabel, {
                for: `checklist-item-${task.id}-${index}`,
                class: 'checklist-item-label'
            })
            checkLabel.textContent = item;
            appendChildren(itemWrapper, [check, checkLabel])
            listWrapper.appendChild(itemWrapper);
        })
    }


    
    appendChildren(fieldsetCheck, [legendCheck, addItemBtn, listWrapper])


    checklistWrapper.appendChild(fieldsetCheck);


    appendChildren(wrapper, [descriptionWrapper, priorityWrapper, tagsWrapper, checklistWrapper]);

    return { wrapper, extend: wrapperExtra, description: descriptionWrapper, priority: priorityWrapper, tags: tagsWrapper, checklist: checklistWrapper};
}