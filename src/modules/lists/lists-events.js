
import { findItemId, findItemName, selectNode, selectNodes } from '../helpers';
import { lists } from './lists';
import { List } from '../classes';
import { newListUi, editListUi, newListNameErrorUi, renderLists } from './lists-ui';

export const addListenerLists = () => {
    const projects = selectNodes('.btn-lists');
    projects.forEach(project => project.addEventListener('click', showList))

    const deleteProjects = selectNodes('.svg-btns-delete')
    deleteProjects.forEach(btnDelete => btnDelete.addEventListener('click', deleteList));
    
    const editProject = selectNodes('.svg-btns-edit');
    editProject.forEach(btnEdit => btnEdit.addEventListener('click', editList));
}

export const newListListeners = node => {
    node.addEventListener('focusout', saveNewList.bind(this, node));
    node.addEventListener('keyup', saveOnEnter);
}

export const editListListeners = nodes => {
    nodes[1].addEventListener('focusout', saveEditList.bind(this, nodes));
    nodes[1].addEventListener('keyup', saveOnEnter);
}

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
    const newListTitle = checkListName(input);
    
    if (newListTitle) {
        const newList = new List(newList);
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
