import { clearListeners, addAppListeners } from '../listeners';
import { deleteItem, updateItem } from '../todo';
import { renderTasks, newTaskUi } from './tasks-ui';
import { Task } from '../classes';

// Tasks database
export const tasks = [];

export const orderTaskByDate = () => tasks.sort((firstDate, secondDate) =>
        firstDate.dueDate - secondDate.dueDate || secondDate.id - firstDate.id
);

export const updateTimeTasks = () => tasks.map(task => task.updateTime());

export const tasksVisualizedOn = value => tasks.map(task => task.visualizedOn = value);

export const addNewTask = event => {
        event.stopPropagation();

        const instance = new Task();
        const input = newTaskUi(instance);
        
        clearListeners();
        addAppListeners();

        return  { input, instance }
}

export const deleteTask = event => {
        event.stopPropagation();

        const id = event.target.dataset.number;
        const itemToDelete = deleteItem(tasks, id);
        clearListeners();
        renderTasks(itemToDelete.visualizedOn || 'inbox', false);
}

export const deleteDate = event => {
        event.stopPropagation();

        const id = event.target.dataset.number;

        const itemToUpdate = updateItem(tasks, id, 'dueDate', null);
        clearListeners();
        itemToUpdate.tags = itemToUpdate.tags.filter(tag => tag === 'inbox');
        itemToUpdate.updateTime();
        renderTasks(itemToUpdate.visualizedOn || 'inbox', false);
}
