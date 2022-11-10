import { editList, saveEditList } from './lists/lists-handlers';
import { editTask, saveEditTask, editDate, saveNewDueDate } from './task/tasks-handlers';
import { clearListeners } from './listeners';
import { removeElement, saveOnEnter } from './helpers';

export const editItem = event => {
    event.stopPropagation();
    console.log(event.target);

    if (event.target.dataset.type === 'list') {
        removeElement(`#btns-lists-${event.target.dataset.number}`);
        const nodes = editList(event);
        clearListeners();
        editListeners(event, nodes);
    } else if (event.target.dataset.type === 'task') {
        const nodes = editTask(event);
        clearListeners();
        editListeners(event, nodes);
    } else if (event.target.dataset.type === 'due-date') {
        const nodes = editDate(event);
        clearListeners();
        editListeners(event, nodes);
    } 
}

const editListeners = (event, nodes) => {
    if (event.target.dataset.type === 'due-date') {
        nodes[1].addEventListener('change', () => saveNewItem(nodes));
    } else {
        nodes[1].addEventListener('focusout', () => saveNewItem(nodes));
        nodes[1].addEventListener('keyup', saveOnEnter);
    }
}

const saveNewItem = nodes => {
    if (nodes[0].dataset.type === 'list'){
        saveEditList(nodes);
    } else if (nodes[0].dataset.type === 'task') {
        saveEditTask(nodes);
    } else if(nodes[0].dataset.type === 'due-date') {
        saveNewDueDate(nodes);
    }
}

