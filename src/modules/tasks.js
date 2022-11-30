import { findItemId, findItemName, selectNode } from './helpers';
import { addExpandListener } from './listeners';
import { renderTasks, newTaskUi, expandTaskUi } from './ui/tasks-ui';
import { Task } from './classes';

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
 * @property { Node } node - Input node for update.
 * @property { {} } instance - New task instance.
 * @returns { {} } New task data.
 */
export const addNewTask = event => {
        event.stopPropagation();

        const instance = new Task();
        const input = newTaskUi(instance);
        
        return {node: input, instance}
}

/**
 * Checkbox State.
 * @param { number } id - Task id. 
 */
export const checkboxState = id => {
    const checkbox = selectNode(`#task-checkbox-${id}`);

    const isCompleted = checkbox.checked ? true : false;
    const task = findItemId(tasks, Number(id));
    task.update('complete', isCompleted);
    const desk = isCompleted ? task.visualizedOn : 'complete';
    
    if (isCompleted) {
        task.addTag('complete');
        task.deleteTag('inbox');
        task.deleteTimeTags();
    } else {
        task.deleteTag('complete');
        task.addTag('inbox');
        task.updateTime();
    }
    
    setTimeout(() => renderTasks(desk, false), 1000);   
}

/**
 * Expand task.
 * @param { number } id - Task id. 
 */
export const expandTask = id => {
        
        const task = findItemId(tasks, Number(id));
        task.expanded = task.expanded ? false : true;
        const hook = selectNode(`#list-item-task-${id}`);

        if (task.expanded) {
                hook.classList.remove('expand-btn-down');
                hook.classList.add('expand-btn-up');
                const nodes = expandTaskUi(task);
                hook.appendChild(nodes.wrapper);
                addExpandListener(id);
                
        } else {
                hook.classList.remove('expand-btn-up');
                hook.classList.add('expand-btn-down');
                const expandedSection = selectNode(`#expand-wrapper-${id}`);
                if (expandedSection) expandedSection.remove();
        }        
}

export const newTags = event => {
        const task = findItemId(tasks, Number(event.target.dataset.number))
        const newTag = String(event.target.value).toLowerCase().trim();
        const exists = findItemName(task.tags, newTag);

        if (!exists) {
                task.addTag(newTag);
                updateNewTagUi(task, newTag);
        }
    }

const updateNewTagUi = (task, tag) => {
        const label = selectNode(`label[for='task-tags-${task.id}']`);
        label.textContent += ` ${(tag.charAt(0).toUpperCase() + tag.slice(1))} - `;
}
