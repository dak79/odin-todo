import { selectNode, selectNodes } from '../helpers';
import { clearListeners, addAppListeners, addExpandListener, listeners } from '../listeners';
import { findItemId, deleteItem, updateItem, findItemName } from '../todo';
import { renderTasks, newTaskUi, expandTaskUi, updatePriorityUi } from './tasks-ui';
import { Task } from '../classes';

// Tasks database
export const tasks = [];

/**
 * Sort tasks array by due date and id (when due dat is the same).
 * @returns sorted array.
 */
export const orderTaskByDate = () => tasks.sort((firstDate, secondDate) =>
        firstDate.dueDate - secondDate.dueDate || secondDate.id - firstDate.id
);

/**
 * Update array tags according to due date (and new due date).
 * @returns Updated array.
 */
export const updateTimeTasks = () => tasks.map(task => task.updateTime());

/**
 * Update task.visualizedOn property.
 * @param { string } value - Desk name
 * @returns Desk where task is visualized.
 */
export const tasksVisualizedOn = value => tasks.map(task => task.visualizedOn = value);

/**
 * Add new task
 * @param { event } event 
 * @returns { Object } New task data.
 * @property { Node } input - Input node for update.
 * @property { Object } instance - New task instance.
 */
export const addNewTask = event => {
        event.stopPropagation();

        const instance = new Task();
        const input = newTaskUi(instance);
        
        clearListeners(listeners);
        addAppListeners();

        return  { input, instance }
}

/**
 * Delete task.
 * @param { event } event 
 */
export const deleteTask = event => {
        event.stopPropagation();

        const id = event.target.dataset.number;
        const itemToDelete = deleteItem(tasks, id);
        clearListeners(listeners);
        renderTasks(itemToDelete.visualizedOn || 'inbox', false);
}

/**
 * Delete due date.
 * @param { event } event 
 */
export const deleteDate = event => {
        event.stopPropagation();

        const id = event.target.dataset.number;

        const itemToUpdate = updateItem(tasks, id, 'dueDate', null);
        clearListeners(listeners);
        itemToUpdate.tags = itemToUpdate.tags.filter(tag => tag === 'inbox');
        itemToUpdate.updateTime();
        renderTasks(itemToUpdate.visualizedOn || 'inbox', false);
}

/**
 * Checkbox State
 * @param { event } event 
 */
export const checkboxState = event => {
    const data = event.target.dataset.number;
    const checkbox = selectNode(`#task-checkbox-${data}`);

    const isCompleted = checkbox.checked ? true : false;
    const task = updateItem(tasks, Number(data), 'complete', isCompleted);
    const desk = isCompleted ? task.visualizedOn : 'complete';
    
    if (isCompleted) {
        task.addTag('complete');
        task.tags = task.tags.filter(tag => tag === 'complete');
    } else {
        task.deleteTag('complete');
        task.addTag('inbox');
        task.updateTime();
    }
    
    clearListeners(listeners);
    setTimeout(() => renderTasks(desk, false), 1000);   
}

export const expandTask = event => {
        console.log(event.target);
        const task = findItemId(tasks, Number(event.target.dataset.number));
        task.expanded = task.expanded ? false : true;
        const hook = selectNode(`#list-item-task-${event.target.dataset.number}`);

        if (task.expanded) {
                hook.classList.remove('expand-btn-down');
                hook.classList.add('expand-btn-up');
                const nodes = expandTaskUi(task);
                hook.appendChild(nodes.wrapper);
                addExpandListener(event);
                
        } else {
                hook.classList.remove('expand-btn-up');
                hook.classList.add('expand-btn-down');
                const expandedSection = selectNode(`#expand-wrapper-${event.target.dataset.number}`);
                if (expandedSection) expandedSection.remove();
        }        
}

export const saveNewDescription = event => {
        updateItem(tasks, Number(event.target.dataset.number), 'description', String(event.target.value))
    
        console.log(tasks);
        
}

export const priorityValue = event => {
        console.log(event.target.value, event.target.dataset.number);
        updateItem(tasks, Number(event.target.dataset.number), 'priority', String(event.target.value));

        const task = findItemId(tasks, Number(event.target.dataset.number));

        updatePriorityUi(task, `#task-msg-wrapper-${event.target.dataset.number}`, true);

    }

export const newTags = event => {
        const task = findItemId(tasks, Number(event.target.dataset.number))
        const newTag = String(event.target.value).toLowerCase().trim();
        const exists = findItemName(task.tags, newTag);

        if (!exists) {
                task.addTag(newTag);
                updateNewTagUi(event, task, newTag);
        }
    }

export const updateNewTagUi = (event, task, tag) => {
        const label = selectNode(`label[for='task-tags-${task.id}']`);
        label.textContent += ` ${(tag.charAt(0).toUpperCase() + tag.slice(1))} - `;
}