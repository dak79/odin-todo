import { selectNode, selectNodes } from '../../helpers';
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
    console.log(newTitle);
    console.log(nodes[0])
    
    if (newTitle) {
        const index = newTitle.findId(lists, Number(nodes[0].dataset.number));
        newTitle.update(index, 'title', String(nodes[1].value))
        renderLists();
        addListenerLists();
    } else {
        addListenerLists();
    }

}

export const deleteList = (event) => {
    event.stopPropagation();
    const listToDelete = event.target.dataset.number;

    const deleteAgent = new List('Delete');
    const itemToDelete = deleteAgent.findId(lists, Number(listToDelete));

    deleteAgent.delete(lists, itemToDelete);
    renderLists();
    addListenerLists();
}

export const showList = event => {
    event.stopPropagation();
   
    console.log('CLICK SHOW LIST');
}
