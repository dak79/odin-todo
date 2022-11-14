import { deleteItem, findItemName } from '../todo';
import { List } from '../classes';
import { newListUi, renderLists } from './lists-ui';
import { clearListeners } from '../listeners';

// Lists database
export const lists = [];

export const addNewList = event => {
    event.stopPropagation();

    const instance = new List()
    const input = newListUi();

    return { input, instance };
}

export const checkListName = item => {
    console.log(item)
    if (String(item.input.value) === '') {
        renderLists(false);
        return false;
    }

    const newList = new List(String(item.input.value));
    const listsTitles = findItemName(lists, String(item.input.value))
   
    if (listsTitles !== undefined && listsTitles.title.toLowerCase().trim() === newList.title.toLowerCase().trim() || newList.title === 'Already exists') {
        newListNameError(item.input);
        item.input.focus();
        return false;
    }
    
    return String(item.input.value);
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