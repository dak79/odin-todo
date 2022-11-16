import { createList, cleanNode, selectNode, setAttributes, appendChildren, removeElement } from '../helpers';
import { lists } from './lists';
import { listeners, addAppListeners } from '../listeners';
import { btnsUi } from '../btns-ui';
import { newInput, editInput } from '../todo';

/**
 * Render Lists
 * @param { boolean } isFirstLoad - Page first load
 */
export const renderLists = isFirstLoad => {
    const section = selectNode('#section-lists');
    const displayHeader = listHeader();
    const displayLists = createListsUi();
    cleanNode(section);
    appendChildren(section, [displayHeader, displayLists]);
    if (!isFirstLoad) addAppListeners();
    console.log(listeners);
}

const listHeader = () => {
    const header = document.createElement('header');
    header.classList.add('headers');
    const title = listsTitle();
    const newListBtn = newListBtnUi();

    appendChildren(header, [newListBtn, title]);

    return header;
}

const listsTitle = () => {
    const title = document.createElement('h2');
    title.classList.add('titles');
    title.textContent = 'Lists';

    return title;
}

const newListBtnUi = () => {
    const btnNewList = btnsUi(null, null, '+', null, {
        type: 'button',
        id: 'btn-new-list',
        class: 'btn',
        'data-type': 'new-list',
        'data-btn': 'new-list'
    });

    return btnNewList; 
}

const createListsUi = () => {
    const projects = createList(lists, 'list', listsBtn, 'menu','lists', ['lists-items', 'items']);
    return projects;
}

/**
 * 
 * @param { Object } list - list instance 
 * @returns - Ui for a list instance
 */
const listsBtn = list => {
    const btnTitle = btnsUi(null, null, list.title, null, {
        type: 'button',
        id: `btn-list-${list.id}`,
        class: 'btn-lists',
        'data-number': `${list.id}`,
        'data-name': `${list.title.toLowerCase().replaceAll(' ', '-').trim()}`,
        'data-type': `${list.type}`,
        'data-btn': 'list-title'
    });

    const wrapper = document.createElement('span');
    setAttributes(wrapper, {
        id: `btns-lists-${list.id}`,
        class: 'btns-lists'
    });
    
    const btnEdit = btnsUi(list, list.type, 'edit', 'edit-list', {
        type: 'button',
        id:`btn-lists-edit-${list.id}`,
        class: 'btn-lists-edit',
        'aria-label': 'Button Edit List',
        'data-number': `${list.id}`,
        'data-type': `${list.type}`,
        'data-btn': 'edit'
    });
    
    const btnDelete = btnsUi(list, list.type, 'delete', 'delete-list', {
        type: 'button',
        id:`btn-lists-delete-${list.id}`,
        class: 'btn-lists-delete',
        'aria-label': 'Button Delete List',
        'data-number': `${list.id}`,
        'data-type': `${list.type}`,
        'data-btn': 'delete'
    });
    
    appendChildren(wrapper, [btnEdit, btnDelete]);
   
    return [btnTitle, wrapper];
}

export const newListUi = () => {
    
    const input = newInput('#section-lists', null, {
        type: 'text',
        id: 'new-list-title',
        class: 'new-list-title',
        name: 'new-list-title',
        maxlength: 15
    });

    return input;
}

/**
 * Edit list
 * @param { event } event 
 * @return { Node } nodes for change list title Ui.
 */
export const editListUi = event => {
    const nodes = editInput(
        `#btn-list-${ event.target.dataset.number }`,
        `#list-item-lists-${ event.target.dataset.number }`, 
        { 
            type: 'text', 
            id: 'edit-list-title', 
            class: 'edit-list-title', 
            name: 'edit-list-title', 
            maxlength: 15 
        });
    
        removeElement(`#btns-lists-${event.target.dataset.number}`);
        
    return nodes;
}
