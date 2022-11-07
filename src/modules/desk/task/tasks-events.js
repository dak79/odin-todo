import { selectNodes, findItemId, selectNode } from '../../helpers';
import { tasks } from './tasks';
import { renderTasks } from './tasks-ui';

export const addTaskListeners = () => {
    const checkboxes = selectNodes('.tasks-checkbox');
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', checkboxState));

    const expandBtns = selectNodes('.expand-btn');
    expandBtns.forEach(btn => btn.addEventListener('click', expandTask))

    const dueDates = selectNodes('.task-due-date');
    dueDates.forEach(date => date.addEventListener('click', selectDate))
    
    const editBtns = selectNodes('.task-edit-btn');
    editBtns.forEach(btn => btn.addEventListener('click', editTask));
    
    const deleteBtns = selectNodes('.task-delete-btn');
    deleteBtns.forEach(btn => btn.addEventListener('click', deleteTask));
}

const checkboxState = event => {
    const data = event.target.dataset.number;
    const checkbox = selectNode(`#task-checkbox-${data}`);

    if (checkbox.checked) {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', true);
        taskToUpdate.addTag('complete');
        taskToUpdate.tags = taskToUpdate.tags.filter(tag => tag === 'complete');
        renderTasks(tasks, taskToUpdate.visualizedOn);

    } else {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', false);
        taskToUpdate.deleteTag('complete');
        taskToUpdate.addTag('inbox');
        taskToUpdate.updateTimeTags();
        renderTasks(tasks, 'complete');
    }
}

const expandTask = () => {
    console.log('CLICK EXPAND TASK');
}

const selectDate = () => {
    console.log('CLICK ON SELECT DATE');
}

const editTask = () => {
    console.log('CLICK ON EDIT TASK');
}

const deleteTask = () => {
    console.log('CLICK ON DELETE TASK');
}