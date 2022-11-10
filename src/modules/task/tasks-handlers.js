import { selectNodes, selectNode, saveOnEnter } from '../helpers';
import { tasks } from './tasks';
import { renderTasks } from './tasks-ui';
import { edit, saveEdit, findItemId } from '../todo';
import { clearListeners } from '../listeners';

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
    console.log('Expand task')
    

}

// Edit due date
export const editDate = event => {
    const nodes = edit(
        `#task-${event.target.dataset.number}-due-date`,
        `#due-date-wrapper-${event.target.dataset.number}`,
        {
            type: 'date',
            id: `new-due-date-${event.target.dataset.number}`,
            class: 'new-due-date',
            'data-number': `${event.target.dataset.number}`
        }
    );

    return nodes
}

export const saveNewDueDate = nodes => {
    
    const taskToUpdate = saveEdit(nodes[0], tasks, 'dueDate', new Date(nodes[1].value), 'inbox');
  
    renderTasks(taskToUpdate.visualizedOn || 'Inbox', false);
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

// Edit Task
export const editTask = event => {
    const nodes = edit(
        `#checkbox-wrapper-${event.target.dataset.number} > label`,
        `#checkbox-wrapper-${event.target.dataset.number}`,
        {
            type: 'text',
            id: 'edit-task-title',
            class: 'edit-task-title',
            name: 'edit-task-title',
            maxlength: 40
        });

    return nodes
}

export const saveEditTask = nodes => {
    const taskToUpdate = saveEdit(nodes[0], tasks, 'title', nodes[1].value, null);
    renderTasks(taskToUpdate.visualizedOn || 'Inbox', false);
}

// Detelte Task
export const deleteTask = event => {
    const id = event.target.dataset.number;
    const taskToDelete = findItemId(tasks, Number(id));
    taskToDelete.delete(tasks, id);
    renderTasks(taskToDelete.visualizedOn || 'Inbox', false);
}
