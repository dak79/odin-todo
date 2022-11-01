import { selectNode } from '../../helpers';
import { lists } from './lists';
import { List } from './list-class';
import { newListListeners, addListenerLists, editListListeners } from './lists-listeners';
import { renderLists, editListUi, newListUi, newListNameErrorUi } from './lists-ui';


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

    if (!/^[A-Za-z0-9]*$/.test(String(node.value))) {
        renderLists();
        return false
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

export const saveNewList = input => {
   
    const newList = checkListName(input);
    
    if (newList) {
        
        newList.add(lists);
        renderLists();
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
    } else {
        addListenerLists();
    }

}

export const deleteList = (event) => {
    event.stopPropagation();
    const data = event.target.dataset.number;
    const deleteAgent = new List('Delete');
    const itemToDelete = deleteAgent.findId(lists, Number(data));

    deleteAgent.delete(lists, itemToDelete);
    renderLists();
    addListenerLists();
}

export const showList = () => {
   
    console.log('CLICK SHOW LIST');
}
