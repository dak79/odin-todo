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
    const todoes = createList(tasks, desk, taskItem, 'tasks', 'task', ['task-item', 'items']);
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
        class: 'task-checkbox-labels',
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
        class: 'btns expand-btn svg-btns',
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
            class: 'btns due-date-delete-btn svg-btns',
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
            class: 'btns due-date-edit-btn svg-btns',
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
        class: 'btns task-edit-btn svg-btns',
        'aria-label': 'Edit task title',
        'data-number':`${task.id}`,
        'data-type': `${task.type}`,
        'data-btn': 'edit'
    });
    
    const deleteTaskBtn = btnsUi(task, task.type, 'delete', 'delete-task', {
        type: 'button',
        id: `task-${task.id}-delete-btn`,
        class: 'btns task-delete-btn svg-btns',
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
        class: 'task-item items'
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
                        class: 'input-text',
                        name: 'new-task-input',
                        maxlength: 40
                    }
    );

    return input;
}

/**
 * Edit task Ui.
 * @param { event } event 
 * @returns { Node } - Input for edit task
 */
export const editTaskUi = event => {
    const type = event.target.dataset.type;
    const id = event.target.dataset.number;

    const input =  (type === 'task') ? 
                    editInput(
                        `#checkbox-wrapper-${event.target.dataset.number} > label`,
                        `#checkbox-wrapper-${event.target.dataset.number}`,
                        {
                            type: 'text',
                            id: 'edit-task-title',
                            class: 'input-text',
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
                            class: 'new-due-date input-text',
                            'data-number': `${event.target.dataset.number}`
                        }) :
                    0;
    
    const btn = selectNode(`#${type}-${id}-edit-btn`);
    btn.classList.add('svg-active');

    return input;
}

export const expandTaskUi = task => {

    const wrapper = document.createElement('div');
    setAttributes(wrapper, {
        id: `expand-wrapper-${task.id}`,
        class: `expand-wrapper wrappers-${task.id} items`
    })

    const descriptionWrapper = document.createElement('div');
    setAttributes(descriptionWrapper, {
        id: `task-description-wrapper-${task.id}`,
        class: 'task-description-wrapper'
    })

    const description = descriptionAndTagsUi(task, 'Description:', 'description', 1, 25)
    appendChildren(descriptionWrapper, description);
    
    const priorityWrapper = document.createElement('div');
    setAttributes(priorityWrapper, {
        id: `priority-wrapper-${task.id}`,
        class: 'priority-wrapper'
    });

    const radio = checkAndRadioUi(task, 'radio', 'Priority:', ['low', 'medium', 'high'], 'priority', 'medium');

    priorityWrapper.appendChild(radio);

    const tagsWrapper = document.createElement('div');
    setAttributes(tagsWrapper, {
        id: `tags-wrapper-${task.id}`,
        class: 'tags-wrapper'
    });

    const tags = descriptionAndTagsUi(task, 'Lists:', 'tags', null, null);
    appendChildren(tagsWrapper, tags);

    const checklistWrapper = document.createElement('div');
    checklistWrapper.classList.add('checklist-wrapper')
    
    const checkListBtn = btnsUi(null, null, '+', null, {
        type: 'button',
        id: `checklist-add-btn-${task.id}`,
        class: 'btns round-btns round-btns-small'
    });
    
    const checklist = checkAndRadioUi(task, 'checkbox', 'Checklist:', task.checklist, null, null);    
    appendChildren(checklistWrapper, [checkListBtn, checklist]);

    appendChildren(wrapper, [descriptionWrapper, priorityWrapper, tagsWrapper, checklistWrapper]);

    return { wrapper, description: descriptionWrapper, priority: priorityWrapper, tags: tagsWrapper, checklist: checklistWrapper };
}

/**
 * Create checklist and priority Ui.
 * @param { Object } object - Object for retriving data.
 * @param { 'radio'|'checkbox' } type - Radio Button or Checkbox.
 * @param { string } legendText - Legend text content.
 * @param { string[] } array - Radio names or Checklist label.
 * @param { string|null } radioGroup - Name attribute for Radio Buttons.
 * @param { string|null } defaultChecked - Set checked button by default or null for Radio Buttons.
 * @returns { Node } A fieldset with radio buttons or checkboxes. 
 */
const checkAndRadioUi = (object, type, legendText, array, radioGroup, defaultChecked) => {
    let nameValue = (type === 'checkbox') ? 'checklist' : type;
    
    const fieldset = document.createElement('fieldset');
    setAttributes(fieldset, {
        id: `${nameValue}-fieldset-${object.id}`,
        class: `${nameValue}-fieldset`
    });

    const legend = document.createElement('legend');
    legend.textContent = legendText;

    const wrapper = document.createElement('div');
    setAttributes(wrapper, {
        id: `${nameValue}s-wrapper-${object.id}`,
        class: `${nameValue}s-wrapper`
    });

    array.forEach((item, index) => {
        if (typeof item !== 'string') String(item);

        nameValue = (type === 'checkbox') ? 'checklist-item' : type;

        const group = document.createElement('div');
        setAttributes(group, {
            id: `${nameValue}-wrapper-${object.id}-${index}`,
            class: `${nameValue}-wrapper`
        });

        const label = document.createElement('label');
        setAttributes(label, {
            for: `${nameValue}-${object.id}-${index}`,
        });
        label.textContent = item.charAt(0).toUpperCase() + item.slice(1);

        const input = document.createElement('input');
        setAttributes(input, {
            type: `${type}`,
            id: `${nameValue}-${object.id}-${index}`,
            name: type === 'radio' ? `${radioGroup}-${object.id}` : 'checklist-item',
            value: type === 'radio' ? `${item}` : `checklist-item-${object.id}-${index}`
        });

        appendChildren(group, [input, label]);
        
        if (type === 'radio') {
            if (object.priority) {
                if (object.priority === item) input.checked = true;
            } else {
                if (item === defaultChecked) input.checked = true;
            }
        }
    
        wrapper.appendChild(group);
    });

    appendChildren(fieldset, [legend, wrapper]);

    return fieldset;
}

/**
 * Create description and tags Ui.
 * @param { Object } object - Object for retriving data.
 * @param { string } labelText - Label Text Content 
 * @param { string } prefix - For Id, Class, Name attributes.
 * @param { number|null } rows - Textarea rows.
 * @param { number|null } cols - Textarea cols.
 * @returns { Node[] } Array with label and select|textarea nodes.
 */
const descriptionAndTagsUi = (object, labelText, prefix, rows, cols) => {
    const label = document.createElement('label');
    setAttributes(label, {
        for: `${object.type}-${prefix}-${object.id}`,
        class: `${object.type}-${prefix}-label`
    });
    label.textContent = labelText;

    if (prefix === 'tags') {
        const select = document.createElement('select');
        setAttributes(select, {
            id: `${object.type}-${prefix}-${object.id}`,
            class: `${object.type}-${prefix}`,
            name: `${prefix}`
        });
        
        const option = document.createElement('option');
        setAttributes(option, {
            value: ""
        });
        option.textContent = '-- Choose list --';
        select.appendChild(option);
        
        object.tags.forEach(tag => {
            // if (tag !== 'inbox' && tag !== 'today' && tag !== 'this-week' && tag !== 'anytime' && tag !== 'complete' && tag !== 'late') {
                // }
            select.options.add(new Option(tag, tag))
        });
        
        return [label, select];
    
    } else {
        const textarea = document.createElement('textarea');
        setAttributes(textarea, {
            id: `${object.type}-${prefix}-${object.id}`,
            class: `${object.type}-${prefix}-text input-text`,
            rows: `${rows}`,
            cols: `${cols}`
        });

        if (object.description) textarea.value = object.description;
        
        return [label, textarea];
    }
}
