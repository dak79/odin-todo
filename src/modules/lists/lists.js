import { findItemName } from '../todo';
import { List } from '../classes';
import { renderLists } from './lists-ui';

// Lists database
export const lists = [];

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