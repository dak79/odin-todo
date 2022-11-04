import { findItemId, findItemName, selectNode, selectNodes } from '../../helpers';
import { lists } from './lists';
import { List } from './list-class';
import { newListListeners, addListenerLists, editListListeners } from './lists-listeners';
import { newListUi, editListUi, newListNameErrorUi } from './lists-ui';
import { renderLists } from './lists-render';


export const addNewList = event => {
        newListUi(event);
    
    const newField = selectNode('#new-list-title');
    newField.focus();

    newListListeners(newField);
}

const checkListName = node => {
    if (node.value === '') {
        renderLists();
        return false;
    }

    const newList = new List(String(node.value));
    const listsTitles = findItemName(lists, String(node.value))
   
    if (listsTitles !== undefined && listsTitles.title.toLowerCase().trim() === newList.title.toLowerCase().trim() || newList.title === 'Already exists') {
        newListNameErrorUi(node);
        node.focus();
        return false;
    }
    
    return String(node.value);
}

export const saveNewList = input => {
    const newList = checkListName(input);
    
    if (newList) {
        newList.add(lists);
        renderLists();
        addListenerLists();
    } else {
        addListenerLists();
    }
}

export const saveOnEnter = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        event.target.blur();
    }
}

export const editList = (event) => {
    event.stopPropagation();
    const nodes = editListUi(event);
    editListListeners(nodes);
}

export const saveEditList = nodes => {
    const newTitle = checkListName(nodes[1]);
    
    if (newTitle) {
        const listToUpdate = findItemId(lists, Number(nodes[0].dataset.number));
        listToUpdate.update('title', String(newTitle));
        renderLists();
        addListenerLists();
    } else {
        addListenerLists();
    }
}

export const deleteList = (event) => {
    event.stopPropagation();
    const idListToDelete = event.target.dataset.number;
    const listToDelete = findItemId(lists, Number(idListToDelete))
    listToDelete.delete(lists, idListToDelete);
    
    renderLists();
    addListenerLists();
}

export const showList = event => {
    event.stopPropagation();
   
    console.log('CLICK SHOW LIST');
}
