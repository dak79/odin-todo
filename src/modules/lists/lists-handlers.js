import { selectNode } from '../helpers';
import { List } from './list-class';
import { lists, newListEvent, addListenerLists } from './lists';
import { newListUi } from './lists-ui';
import { renderLists } from './lists-render';


export const addNewList = () => {
    newListUi();
    
    const newField = selectNode('#new-list-title');
    newField.focus();

    newListEvent();
}

export const saveNewList = () => {
    const content = selectNode('#new-list-title');
    const newList = new List(String(content.value));
    newList.add(lists);
    
    renderLists();
    addListenerLists();
}

export const saveNewListEnter = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        event.target.blur();
    }
}

export const editList = () => {
    console.log('EDIT THIS LIST');
}

export const deleteList = () => {
    console.log('DELETE THIS LIST');
}

export const showList = () => {
   
    console.log('CLICK SHOW LIST');
}
