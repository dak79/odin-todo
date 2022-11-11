import { deleteItem, findItemName } from '../todo';
import { List } from '../classes';
import { newListUi, renderLists } from './lists-ui';
import { clearListeners } from '../listeners';

// Lists database
export const lists = [];

export const addNewList = event => {
    event.stopPropagation();
    const inputField = newListUi();

    return [inputField, null];
}

export const checkListName = node => {
    if (String(node.value) === '') {
        renderLists(false);
        return false;
    }

    const newList = new List(String(node.value));
    const listsTitles = findItemName(lists, String(node.value))
   
    if (listsTitles !== undefined && listsTitles.title.toLowerCase().trim() === newList.title.toLowerCase().trim() || newList.title === 'Already exists') {
        newListNameError(node);
        node.focus();
        return false;
    }
    
    return String(node.value);
}

const newListNameError = element => {
    element.value = 'Already exists';
    element.classList.add('new-lists-error');
    element.addEventListener('keydown', cancelText)

    function cancelText () {
        element.value = '';
        element.removeEventListener('keydown', cancelText);
        element.classList.remove('new-lists-error');
    }
}

export const deleteList = event => {
    event.stopPropagation();

    const id = event.target.dataset.number;

    deleteItem(lists, id);
    clearListeners();
    renderLists(false);

}