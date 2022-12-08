import { btnsUi } from '../ui/btns-ui';
import { appendChildren, setAttributes, cleanNode, selectNode, createUl, createLi } from '../helpers';
import { format, parseISO } from 'date-fns';
import { addAppListeners, clearListeners, listeners } from '../listeners';
import { orderTaskByDate, tasks } from '../tasks';
import { checkboxUi } from '../ui/checkbox-ui';
import { checklistUi } from '../ui/checklist-ui';
import { radioUi } from '../ui/radio-ui';
import { updatePriorityUi } from './priority-ui';
import { tagsUi } from './select-ui';
import { textInputUi, appendInput } from '../ui/inputs-ui'

/**
 * Render tasks
 * @param { Node } desk - Which desk render
 * @param { boolean } isFirstLoad - Check if it is first load for page
 */
export const renderTasks = (desk, isFirstLoad) => {
    orderTaskByDate();
    const section = selectNode('#desk');
    const ul = createUl('tasks');

    tasks.map(task => {
        if (task.tags.includes(desk)) {
            const node = createLi(task, ['task-item', 'items'], taskItem);
            ul.appendChild(node);
        }
    });

    cleanNode(section);
    section.appendChild(ul);
    if (!isFirstLoad) {
        clearListeners(listeners);
        addAppListeners();
    }
}

/**
 * Task Ui
 * @param { {} } task - Task instance.
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

    const expandTaskBtn = btnsUi(task, 'expand', ['btns', 'expand-btn', 'svg-btns'], 'Show task details');
    
    appendChildren(wrapperCheck, checkbox);
    wrapperCheck.appendChild(expandTaskBtn);

    const wrapperDueDate = document.createElement('span');
    setAttributes(wrapperDueDate, {
        id: `due-date-wrapper-${task.id}`,
        class: 'due-date-wrapper',
        'data-number': `${task.id}`
    });

    if (task.dueDate) {
        const deleteDateBtn = btnsUi({id: task.id, type: 'due-date'}, 'delete', ['btns','due-date-delete-btn', 'svg-btns'], 'Delete date');
             
        wrapperDueDate.appendChild(deleteDateBtn);

    } else {
        const editDateBtn = btnsUi({id: task.id, type: 'due-date'}, 'edit', ['btns', 'due-date-edit-btn', 'svg-btns'], 'Edit date');
        
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
    taskDueDate.textContent = Date.parse(task.dueDate) ? `${format(parseISO(task.dueDate), 'dd-MM-yyyy')}` : '';

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

    const editTaskBtn = btnsUi(task, 'edit', ['btns', 'task-edit-btn', 'svg-btns'], `Edit task: ${task.title}`);
    
    
    const deleteTaskBtn = btnsUi(task, 'delete', ['btns', 'task-delete-btn', 'svg-btns'], `Delete task: ${task.title}`);
    
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

    const tags = tagsUi(task, 'tags', `Lists:`);
    appendChildren(tagsWrapper, tags);

    const checklistWrapper = document.createElement('div');
    checklistWrapper.classList.add('checklist-wrapper');
   
    const checkListBtn = btnsUi({id: task.id, type: 'checklist'}, 'new', ['btns', 'round-btns', 'round-btns-small'], 'Add new item to checklist');
    
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
export const newTaskUi  = newItem => {
   
    const li = createLi(newItem, ['task-item', 'items'], taskItem)
   
    const ul = selectNode('.tasks');
    ul.prepend(li);

    const input = textInputUi(newItem, 'new', false, 40);
    
    appendInput(`#checkbox-wrapper-${newItem.id} > label`, `#checkbox-wrapper-${newItem.id}`, input, false);

    return input;
}

