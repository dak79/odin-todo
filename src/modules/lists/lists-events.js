import { findItemId, findItemName, selectNode, selectNodes } from '../helpers';
import { lists } from './lists';
import { List } from '../classes';
import { newListUi, editListUi, newListNameErrorUi, renderLists } from './lists-ui';

export const addListsListeners = () => {
    const projects = selectNodes('.btn-lists');
    projects.forEach(project => project.addEventListener('click', showList))

    const deleteProjects = selectNodes('.svg-btns-delete')
    deleteProjects.forEach(btnDelete => btnDelete.addEventListener('click', deleteList));
    
    const editProject = selectNodes('.svg-btns-edit');
    editProject.forEach(btnEdit => btnEdit.addEventListener('click', editList));
}

const showList = event => {
    event.stopPropagation();
   
    console.log(event.target);
}

const deleteList = (event) => {
    event.stopPropagation();
    const idListToDelete = event.target.dataset.number;
    const listToDelete = findItemId(lists, Number(idListToDelete))
    listToDelete.delete(lists, idListToDelete);
    renderLists();
}

const editList = (event) => {
    event.stopPropagation();
    const nodes = editListUi(event);
    editListListeners(nodes);
}

const editListListeners = nodes => {
    nodes[1].addEventListener('focusout', () => saveEditList(nodes));
    nodes[1].addEventListener('keyup', saveOnEnter);
}

const saveOnEnter = event => {
    event.preventDefault();
    if (event.keyCode === 13) {
        event.target.blur();
    }
}

const saveEditList = nodes => {
    const newTitle = checkListName(nodes[1]);
    
    if (newTitle) {
        const listToUpdate = findItemId(lists, Number(nodes[0].dataset.number));
        listToUpdate.update('title', String(newTitle));
        renderLists();
    } else {
        addListsListeners();
    }
}

const checkListName = node => {
    if (String(node.value) === '') {
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
        renderLists();
    } else {
        addListsListeners();
    }
}
