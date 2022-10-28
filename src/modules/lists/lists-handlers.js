import { selectNode } from '../helpers';
import { List } from './list-class';
import { lists, newListListeners, addListenerLists } from './lists';
import { editListUi, newListUi, newListNameErrorUi } from './lists-ui';
import { renderLists } from './lists-render';


export const addNewList = () => {
    newListUi();
    
    const newField = selectNode('#new-list-title');
    newField.focus();

    newListListeners();
}

export const saveNewList = () => {
    const content = selectNode('#new-list-title');

    if (content.value === '') {
        renderLists();
        return false;
    }

    const newList = new List(String(content.value));
    const n = newList.findName(lists);

    if (n !== undefined && n.title.toLowerCase().trim() === newList.title.toLowerCase().trim() || newList.title === 'Already exists') {
        newListNameErrorUi(content);
        content.focus();
    } else {
        const newListBtn = selectNode('#btn-new-list');
        newListBtn.disabled = false;
        
        newList.add(lists);
        renderLists();
        addListenerLists();
    }

}

export const saveNewListEnter = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        event.target.blur();
    }
}

export const editList = (event) => {
    event.stopPropagation();
    editListUi(event);

}

export const deleteList = () => {
    console.log('DELETE THIS LIST');
}

export const showList = () => {
   
    console.log('CLICK SHOW LIST');
}
