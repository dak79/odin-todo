import { selectNode, selectNodes, saveOnEnter } from '../helpers';
import { lists, checkListName } from './lists';
import { List } from '../classes';
import { newListUi, renderLists } from './lists-ui';

import { edit, saveEdit, findItemId } from '../todo';

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

// Edit List
const editList = event => {
    event.stopPropagation();

    // removeBtns('.btns-lists');
    // btnNewListDisabled();
    
    const nodes = edit(
        `#btn-list-${event.target.dataset.number}`,
        {
            type: 'text',
            id: 'edit-list-title',
            class: 'edit-list-title',
            name: 'edit-list-title',
            maxlength: 15
        });

    editListListeners(nodes);
}

const editListListeners = nodes => {
    nodes[1].addEventListener('focusout', () => saveEditList(nodes));
    nodes[1].addEventListener('keyup', saveOnEnter);
}

const saveEditList = nodes => {
    const newTitle = checkListName(nodes[1]);
    
    if (newTitle) {
        saveEdit(nodes[0], lists, 'title', String(newTitle), null);
        renderLists();
    } else {
        addListsListeners();
    }
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
