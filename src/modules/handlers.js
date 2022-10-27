import { newListUi } from './ui-sidebar';
import { newListEvent, addListenerLists } from './lists';
import { selectNode } from './helpers';
import { List } from './classes';
import { lists } from './todo';
import { renderLists } from './ui-renders';

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

export const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

export const showInbox = () => {
    console.log('CLICK SHOW INBOX');
}
export const showToday = () => {
    console.log('CLICK SHOW TODAY');
}
export const showThisWeek = () => {
    console.log('CLICK SHOW THIS WEEK');
}
export const showAnytime = () => {
    console.log('CLICK SHOW ANYTIME');
}
export const showList = () => {
   
    console.log('CLICK SHOW LIST');
}