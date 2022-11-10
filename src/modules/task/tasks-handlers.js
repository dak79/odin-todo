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
