import { selectNodes, findItemId, selectNode, edit, saveOnEnter } from '../helpers';
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
        setTimeout(() => renderTasks(taskToUpdate.visualizedOn), 1000);
    } else {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', false);
        taskToUpdate.deleteTag('complete');
        taskToUpdate.addTag('inbox');
        taskToUpdate.updateTime();
        renderTasks('complete');
    }
}

const expandTask = () => {
    console.log('Expand task')
    

}

const selectDate = () => {
    console.log('CLICK ON SELECT DATE');
}

const editTask = event => {
    const nodes = edit(`#checkbox-wrapper-${event.target.dataset.number} > label`, 
        `#checkbox-wrapper-${event.target.dataset.number}`, 
        {
            type: 'text',
            id: 'edit-task-title',
            class: 'edit-task-title',
            name: 'edit-task-title',
            maxlength: 40
        });
        editTaskListeners(nodes);
}

const editTaskListeners = nodes => {
    nodes[1].addEventListener('focusout', () => saveEditTask(nodes));
    nodes[1].addEventListener('keyup', saveOnEnter);
}

const saveEditTask = nodes => {
    const taskToUpdate = findItemId(tasks, Number(nodes[0].dataset.number));
    taskToUpdate.update('title', nodes[1].value);
    renderTasks(taskToUpdate.visualizedOn || 'Inbox');
}

const deleteTask = event => {
    const id = event.target.dataset.number;
    const taskToDelete = findItemId(tasks, Number(id));
    taskToDelete.delete(tasks, id);
    renderTasks(taskToDelete.visualizedOn || 'Inbox');
}
