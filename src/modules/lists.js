import { deleteItem } from './todo';
import { List } from './classes';
import { newListUi, renderLists } from './ui/lists-ui';
import { findItemName } from './helpers';

// Lists database
export const lists = [];

/**
 * New list
 * @param { event } event 
 * @property { Node } node - Input node.
 * @property { {} } instance - New list instance. 
 * @returns { {} } - Data for new list: input node and new list instance. 
 */
export const addNewList = event => {
    event.stopPropagation();

    const instance = new List()
    const input = newListUi(instance);

    return { node: input, instance };
}

/**
 * List name validation.
 * @param { Object } item - Item to check
 * @property { input } node - Node with new list title.
 * @returns { false|string} false if title is not valid | Valid title
 */
export const checkListName = item => {
    if (String(item.node.value) === '') {
        renderLists(false);
        return false;
    }

    const newList = new List(String(item.node.value));
    const listsTitles = findItemName(lists, String(item.node.value))
   
    if (listsTitles !== undefined && listsTitles.title.toLowerCase().trim() === newList.title.toLowerCase().trim() || newList.title === 'Already exists') {
        newListNameError(item.node);
        item.node.focus();
        return false;
    }
    
    return String(item.node.value);
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
    renderLists(false);
}
