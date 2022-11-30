import { btnsUi } from '../ui/btns-ui';
import { appendChildren, createList, setAttributes, cleanNode, selectNode } from '../helpers';
import { format } from 'date-fns';
import { addAppListeners, clearListeners, listeners } from '../listeners';
import { orderTaskByDate, tasks, tasksVisualizedOn } from '../tasks';
import { lists } from '../lists';
import { checkboxUi } from '../ui/checkbox-ui';
import { checklistUi } from '../ui/checklist-ui';
import { radioUi } from '../ui/radio-ui';
import { tagsUi } from './select-ui';
import { textInputUi, appendInput, dateInputUi } from '../ui/inputs-ui'

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
    if (!isFirstLoad) {
        clearListeners(listeners);
        addAppListeners();
    }
    tasksVisualizedOn(desk);
}

const createTasksUi = desk => {
    const todoes = createList(tasks, desk, taskItem, 'tasks', 'task', ['task-item', 'items']);
    return todoes;
}

/**
 * Task Ui
 * @param { {}} task - Task instance.
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

    const checkbox = checkboxUi(task, 'checkbox', 'Task done or not done');

    const expandTaskBtn = btnsUi(task, 'task', 'expand', 'btns expand-btn svg-btns', 'Show task details', 'expand-task', 'expand');
    
    appendChildren(wrapperCheck, checkbox);
    wrapperCheck.appendChild(expandTaskBtn);

    const wrapperDueDate = document.createElement('span');
    setAttributes(wrapperDueDate, {
        id: `due-date-wrapper-${task.id}`,
        class: 'due-date-wrapper',
        'data-number': `${task.id}`
    });

    if (task.dueDate) {
        const deleteDateBtn = btnsUi(task, 'due-date', 'delete', 'btns due-date-delete-btn svg-btns', 'Delete Date', 'due-date', 'delete');
             
        wrapperDueDate.appendChild(deleteDateBtn);

    } else {
        const editDateBtn = btnsUi(task, 'due-date', 'edit', 'btns due-date-edit-btn svg-btns', 'Edit Date', 'due-date', 'edit');
        
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

    updatePriorityUi(task, wrapperMsg, false);

    const wrapperBtns = document.createElement('span');
    setAttributes(wrapperBtns, {
        id: `task-btn-wrapper-${task.id}`,
        class: 'task-btn-wrapper'
    });

    const editTaskBtn = btnsUi(task, 'task', 'edit', 'btns task-edit-btn svg-btns', `Edit Task: ${task.title}`, task.type, 'edit'); 
    
    const deleteTaskBtn = btnsUi(task, 'task', 'delete', 'btns task-delete-btn svg-btns', `Delete Task: ${task.title}`, task.type, 'delete');
    
    appendChildren(wrapperBtns, [editTaskBtn, deleteTaskBtn]);

    return [wrapperCheck, wrapperDueDate, wrapperMsg, wrapperBtns];
}

/**
 * Create expanded section for task
 * @param { {} } task Object task for retriving data. 
 * @returns { Node{} } - An object with all nodes of expanded section of tasks.
 */
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

    const description = textInputUi(task, 'description', true, 40);
    
    appendChildren(descriptionWrapper, description);
    
    const priorityWrapper = document.createElement('div');
    setAttributes(priorityWrapper, {
        id: `priority-wrapper-${task.id}`,
        class: 'priority-wrapper'
    });

    const radio = radioUi(task, 'radio', `Priority: `, ['low', 'medium', 'high']);
    priorityWrapper.appendChild(radio);

    const tagsWrapper = document.createElement('div');
    setAttributes(tagsWrapper, {
        id: `tags-wrapper-${task.id}`,
        class: 'tags-wrapper'
    });

    const tags = tagsUi(task, 'tags', `Lists: `);
    appendChildren(tagsWrapper, tags);

    const checklistWrapper = document.createElement('div');
    checklistWrapper.classList.add('checklist-wrapper')
   
    const checkListBtn = btnsUi(task, 'checklist', 'new', 'btns round-btns round-btns-small', 'Add new item to checklist', 'checklist', '+');
    
    const checklist = checklistUi(task, 'checklist');
    
    appendChildren(checklistWrapper, [checkListBtn, checklist]);

    appendChildren(wrapper, [descriptionWrapper, priorityWrapper, tagsWrapper, checklistWrapper]);

    return { wrapper, description: descriptionWrapper, priority: priorityWrapper, tags: tagsWrapper, checklist: checklistWrapper };
}

/**
 * New task Ui
 * @param { {} } newItem - Task instance.
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

    const input = textInputUi(newItem, 'new', false, 40);
    
    appendInput(`#checkbox-wrapper-${newItem.id} > label`, `#checkbox-wrapper-${newItem.id}`, input, false)

    return input;
}

/**
 * Edit task Ui.
 * @param { event } event 
 * @returns { Node } - Input for edit task
 */
export const editTaskUi = (id, type) => {

    const input = (type === 'task') ? textInputUi({type, id}, 'edit', false, 40) : dateInputUi({id});

    const newInput = (type === 'task') ? appendInput(`#checkbox-wrapper-${id} > label`, `#checkbox-wrapper-${id}`, input, true) : appendInput(`#task-${id}-due-date`, null, input, true);
 
    const btn = selectNode(`#${type}-edit-btn-${id}`);
    btn.classList.add('svg-active');

    return newInput;
}

export const updatePriorityUi = (task, wrapperMsg, isChanging) => {
    if (isChanging) wrapperMsg = selectNode(wrapperMsg);
    
    if (wrapperMsg.querySelector(`#low-priority-${task.id}`)) wrapperMsg.querySelector(`#low-priority-${task.id}`).remove();
    
    if (wrapperMsg.querySelector(`#high-priority-${task.id}`)) wrapperMsg.querySelector(`#high-priority-${task.id}`).remove();
    
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
}


/**
 * Populate and update task tags
 * @param { Node } select - Select HTMLElement
 */
export const updateTagsUi = select => {
    if (!select) select = selectNode(`select[name='tags']`);

    if (select) {
        lists.map(list => {
            console.log(select.options);
            let opti = Array.from(select.options).map(opt => opt.text);
            console.log(opti);
    
            if(!opti.includes(list.title)) select.options.add(new Option(list.title, list.title))
        });
    }
}
