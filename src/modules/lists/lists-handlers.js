import { selectNode, saveOnEnter } from '../helpers';
import { lists, checkListName } from './lists';
import { List } from '../classes';
import { newListUi, renderLists } from './lists-ui';
import { clearListeners } from '../listeners';

export const showList = event => {
    event.stopPropagation();
   
    console.log(event.target);
}

// New List
export const addNewList = event => {
    newListUi(event);

    const newField = selectNode('#new-list-title');
    newField.focus();
    clearListeners();
    newListListeners(newField);
}

const newListListeners = node => {
    node.addEventListener('focusout', () => saveNewList(node));
    node.addEventListener('keyup', saveOnEnter);
}

const saveNewList = input => {
    const newListTitle = checkListName(input);

    if (newListTitle) {
        const newList = new List(newListTitle);
        newList.add(lists);
        renderLists(false);
    } else {
        //addListsListeners();
    }
}
