import { selectNode } from '../helpers';
import { List } from './list-class';
import { lists, newListListeners, addListenerLists, editListListeners } from './lists';
import { editListUi, newListUi, newListNameErrorUi } from './lists-ui';
import { renderLists } from './lists-render';
import { btnNewListEnabled, btnNewListDisabled } from '../footer';


export const addNewList = () => {
    newListUi();
    
    const newField = selectNode('#new-list-title');
    newField.focus();

    newListListeners();
}

const checkListName = node => {
    if (node.value === '') {
        renderLists();
        return false;
    }

    const newList = new List(String(node.value));
    const listsTitles = newList.findName(lists);

    if (listsTitles !== undefined && listsTitles.title.toLowerCase().trim() === newList.title.toLowerCase().trim() || newList.title === 'Already exists') {
        newListNameErrorUi(node);
        node.focus();
        return false;
    }
    
    return newList
}

export const saveNewList = () => {
    const input = selectNode('#new-list-title');
    
    const newList = checkListName(input);
    if (newList) {
        btnNewListEnabled(true);
        
        newList.add(lists);
        renderLists();
        addListenerLists();
    } else {
        btnNewListEnabled(true);
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
    const involvedNodes = editListUi(event);
    editListListeners(involvedNodes);
}

export const saveEditList = nodes => {
    const newTitle = checkListName(nodes[1]);
    
    if (newTitle) {
        const index = newTitle.findId(lists, Number(nodes[0].dataset.listId));
        newTitle.update(index, 'title', String(nodes[1].value))
        renderLists();
        addListenerLists();
        btnNewListEnabled(false);
    }

}

export const deleteList = () => {
    console.log('DELETE THIS LIST');
}

export const showList = () => {
   
    console.log('CLICK SHOW LIST');
}
