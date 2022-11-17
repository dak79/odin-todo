import { deleteItem, findItemName } from '../todo';
import { List } from '../classes';
import { newListUi, renderLists } from './lists-ui';
import { clearListeners } from '../listeners';

// Lists database
export const lists = [];

/**
 * New list
 * @param { event } event 
 * @returns { Object } - Data for new list. 
 * @property { Node } input - Input node.
 * @property { Object } instance - New list instance. 
 */
export const addNewList = event => {
    event.stopPropagation();

    const instance = new List()
    const input = newListUi();

    return { input, instance };
}

/**
 * List name validation.
 * @param { Object } item - Item to check
 * @property { input } input - Node with new list title.
 * @returns { false|string} false if title is not valid | Valid title
 */
export const checkListName = item => {
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

/**
 * Invalid list name.
 * @param { HTMLElement } element - input field 
 */
const newListNameError = element => {
    element.value = 'Already exists';
    element.classList.add('input-text-lists-error');
    element.addEventListener('keydown', cancelText)

    function cancelText () {
        element.value = '';
        element.removeEventListener('keydown', cancelText);
        element.classList.remove('input-text-lists-error');
    }
}

/**
 * Delete List
 * @param { event } event 
 */
export const deleteList = event => {
    event.stopPropagation();

    const id = event.target.dataset.number;

    deleteItem(lists, id);
    clearListeners();
    renderLists(false);
}
