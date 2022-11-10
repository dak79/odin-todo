import { selectNode, saveOnEnter, removeElement } from '../helpers';
import { lists, checkListName } from './lists';
import { List } from '../classes';
import { newListUi, renderLists } from './lists-ui';
import { edit, saveEdit, findItemId } from '../todo';
import { clearListeners } from '../listeners';

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
    event.stopPropagation();
    
    const nodes = edit(
        `#btn-list-${event.target.dataset.number}`,
        `#list-item-lists-${event.target.dataset.number}`,
        {
            type: 'text',
            id: 'edit-list-title',
            class: 'edit-list-title',
            name: 'edit-list-title',
            maxlength: 15
        }
    );
    
    return nodes
}

export const saveEditList = nodes => {
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
