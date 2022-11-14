import { selectNode } from '../helpers';
import { clearListeners, addAppListeners } from '../listeners';
import { deleteItem, updateItem } from '../todo';
import { renderTasks, newTaskUi } from './tasks-ui';
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
        
        clearListeners();
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
        clearListeners();
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
        clearListeners();
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
    clearListeners();
    setTimeout(() => renderTasks(desk, false), 1000);   
}
