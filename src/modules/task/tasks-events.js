import { selectNodes, findItemId, selectNode, edit, saveOnEnter, setAttributes } from '../helpers';
import { tasks } from './tasks';
import { renderTasks } from './tasks-ui';

export const addTaskListeners = () => {
    const checkboxes = selectNodes('.tasks-checkbox');
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', checkboxState));

    const expandBtns = selectNodes('.expand-btn');
    expandBtns.forEach(btn => btn.addEventListener('click', expandTask));

    const dueDates = selectNodes('.task-due-date');
    dueDates.forEach(date => date.addEventListener('click', selectDate));

    const dueDateDeleteBtns = selectNodes('.due-date-delete-btn');
    dueDateDeleteBtns.forEach(btn => btn.addEventListener('click', deleteDueDate));

    const dueDateEditBtns = selectNodes('.due-date-edit-btn');
    dueDateEditBtns.forEach(btn => btn.addEventListener('click', editDueDate));
    
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
        
        renderTasks(taskToUpdate.visualizedOn);
        
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

const selectDate = event => {

    const dueDates = selectNodes('.task-due-date');
    dueDates.forEach(date => date.removeEventListener('click', selectDate));
    
    const dueDate = selectNode(`#task-${event.target.dataset.number}-due-date`);
    const spanDueDate = dueDate.parentNode;
    const input = document.createElement('input');
    setAttributes(input, {
        type: 'date',
        id: `new-due-date-${event.target.dataset.number}`,
        class: 'new-due-date',
        'data-number': `${event.target.dataset.number}`
    });
    addListenerNewDate(input);
    spanDueDate.replaceChild(input, dueDate);
    input.focus();
}

const addListenerNewDate = node => { 
    node.addEventListener('change', () => saveNewDueDate(node));
}

const saveNewDueDate = node => {
    const taskToUpdate = findItemId(tasks, Number(node.dataset.number));
    
    taskToUpdate.update('dueDate', new Date(node.value));
    console.log(taskToUpdate.dueDate);
    taskToUpdate.tags = taskToUpdate.tags.filter(tag => tag === 'inbox');
    taskToUpdate.updateTime();
    renderTasks(taskToUpdate.visualizedOn || 'Inbox');
}

const deleteDueDate = event => {
    const id = event.target.dataset.number;
    const taskToDelete = findItemId(tasks, Number(id));
    taskToDelete.update('dueDate', null);
    taskToDelete.tags = taskToDelete.tags.filter(tag => tag === 'inbox');
    taskToDelete.updateTime();
    renderTasks(taskToDelete.visualizedOn || 'Inbox');
}

const editDueDate = event => {
    selectDate(event);
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
    if (nodes[1].value !== '') {
        taskToUpdate.update('title', nodes[1].value);
    }

    renderTasks(taskToUpdate.visualizedOn || 'Inbox');
}

const deleteTask = event => {
    const id = event.target.dataset.number;
    const taskToDelete = findItemId(tasks, Number(id));
    taskToDelete.delete(tasks, id);
    renderTasks(taskToDelete.visualizedOn || 'Inbox');
}
