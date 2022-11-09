import { selectNode, selectNodes, saveOnEnter, removeElement } from '../helpers';
import { lists, checkListName } from './lists';
import { List } from '../classes';
import { newListUi, renderLists } from './lists-ui';

import { edit, saveEdit, findItemId } from '../todo';

import { listeners, addListeners, clearListeners, addListener } from '../listeners';

export const showList = event => {
    event.stopPropagation();
   
    console.log(event.target);
}

export const deleteList = (event) => {
    event.stopPropagation();
    const idListToDelete = event.target.dataset.number;
    const listToDelete = findItemId(lists, Number(idListToDelete))
    listToDelete.delete(lists, idListToDelete);
    renderLists(false);
}

// Edit List
export const editList = event => {

    const nodes = edit(
        `#btn-list-${event.target.dataset.number}`,
        `#list-item-lists-${event.target.dataset.number}`,
        {
            type: 'text',
            id: 'edit-list-title',
            class: 'edit-list-title',
            name: 'edit-list-title',
            maxlength: 15
        });

        removeElement(`#btns-lists-${event.target.dataset.number}`);
        
        clearListeners();
        editListListeners(nodes);
}

const editListListeners = nodes => {
    nodes[1].addEventListener('focusout', () => saveEditList(nodes));
    nodes[1].addEventListener('keyup', saveOnEnter);
}

const saveEditList = nodes => {
    const newTitle = checkListName(nodes[1]);
    
    if (newTitle) {
        saveEdit(nodes[0], lists, 'title', String(newTitle), null);
        renderLists(false);
    } 
}

// New List
export const addNewList = event => {
    newListUi(event);

    const newField = selectNode('#new-list-title');
    newField.focus();

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
