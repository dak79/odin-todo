import { clearListeners } from './listeners';
import { saveOnEnter } from './helpers';
import { editInput, findItemId, saveEditInput } from './todo';
import { lists, checkListName } from './lists/lists';
import { tasks } from './task/tasks';
import { renderLists } from './lists/lists-ui';
import { renderTasks } from './task/tasks-ui';

export const editBtns = event => {
    event.stopPropagation();

    const type = event.target.dataset.type;
    const nodes = (type === 'list') ? 
                    editInput(
                        `#btn-list-${ event.target.dataset.number }`,
                        `#list-item-lists-${ event.target.dataset.number }`, 
                        { 
                            type: 'text', 
                            id: 'edit-list-title', 
                            class: 'edit-list-title', 
                            name: 'edit-list-title', 
                            maxlength: 15 
                        }) : 
                    (type === 'task') ? 
                    editInput(
                        `#checkbox-wrapper-${event.target.dataset.number} > label`,
                        `#checkbox-wrapper-${event.target.dataset.number}`,
                        {
                            type: 'text',
                            id: 'edit-task-title',
                            class: 'edit-task-title',
                            name: 'edit-task-title',
                            maxlength: 40
                        }) : 
                    (type === 'due-date') ? 
                    editInput(
                        `#task-${event.target.dataset.number}-due-date`,
                        `#due-date-wrapper-${event.target.dataset.number}`,
                        {
                            type: 'date',
                            id: `new-due-date-${event.target.dataset.number}`,
                            class: 'new-due-date',
                            'data-number': `${event.target.dataset.number}`
                        }) : 
                    0;

    if (nodes) {
        clearListeners();
        editListeners(type, nodes);
    }
}

const editListeners = (type, nodes) => {
    if (type === 'due-date') {
        nodes[1].addEventListener('change', () => saveInput(type, nodes));
    } else {
        nodes[1].addEventListener('focusout', () => saveInput(type, nodes));
        nodes[1].addEventListener('keyup', saveOnEnter);
    }
}

const saveInput= (type, nodes) => {
    if (type === 'list') {
        const newTitle = checkListName(nodes[1]);
        if (newTitle) {
            saveEditInput(nodes[0], lists, 'title', String(newTitle), null);
            renderLists(false);
        } 
    } else if (type === 'task') {
            const taskToUpdate = saveEditInput(nodes[0], tasks, 'title', nodes[1].value, null);
            
            renderTasks(taskToUpdate.visualizedOn || 'Inbox', false);
    } else {
        const taskToUpdate = saveEditInput(nodes[0], tasks, 'dueDate', new Date(nodes[1].value), 'inbox');
        
        renderTasks(taskToUpdate.visualizedOn || 'inbox', false);
    }
}

export const deleteBtns = event => {
    event.stopPropagation();

    const id = event.target.dataset.number;
    const type = event.target.dataset.type;
    const array = (type === 'list') ? lists : (type === 'task' || type === 'due-date') ? tasks : 0;
    const itemToDelete = findItemId(array, Number(id));

    (type === 'due-date') ? itemToDelete.update('dueDate', null) : itemToDelete.delete(array, id);
    clearListeners();
    
    if (type === 'list') {
        renderLists(false);
    } else if (type === 'task') {
        renderTasks(itemToDelete.visualizedOn || 'inbox', false);
    } else {
        itemToDelete.tags = itemToDelete.tags.filter(tag => tag === 'inbox');
        itemToDelete.updateTime();
        renderTasks(itemToDelete.visualizedOn || 'inbox', false);
    }

}
