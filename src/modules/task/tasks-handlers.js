import { selectNode } from '../helpers';
import { tasks } from './tasks';
import { renderTasks } from './tasks-ui';
import { findItemId } from '../todo';

export const checkboxState = event => {
    const data = event.target.dataset.number;
    const checkbox = selectNode(`#task-checkbox-${data}`);

    if (checkbox.checked) {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', true);
        taskToUpdate.addTag('complete');
        taskToUpdate.tags = taskToUpdate.tags.filter(tag => tag === 'complete');
        
        renderTasks(taskToUpdate.visualizedOn, false);
        
    } else {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', false);
        taskToUpdate.deleteTag('complete');
        taskToUpdate.addTag('inbox');
        taskToUpdate.updateTime();
        renderTasks('complete', false);
    }
}

export const expandTask = () => {
    console.log('Expand task');
}

// Delete due date
export const deleteDueDate = event => {
    const id = event.target.dataset.number;
    const taskToDelete = findItemId(tasks, Number(id));
    taskToDelete.update('dueDate', null);
    taskToDelete.tags = taskToDelete.tags.filter(tag => tag === 'inbox');
    taskToDelete.updateTime();
    renderTasks(taskToDelete.visualizedOn || 'Inbox', false);
}

// Detelte Task
export const deleteTask = event => {
    const id = event.target.dataset.number;
    const taskToDelete = findItemId(tasks, Number(id));
    taskToDelete.delete(tasks, id);
    renderTasks(taskToDelete.visualizedOn || 'Inbox', false);
}
