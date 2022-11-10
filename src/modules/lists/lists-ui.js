import { createList, cleanNode, selectNode, setAttributes, appendChildren } from '../helpers';
import { lists } from './lists';
import { listeners, addAppListeners } from '../listeners';
import { btnsUi } from '../common-btns';

export const renderLists = isFirstLoad => {
    const section = selectNode('#side-section-lists');
    const displayHeader = listHeader();
    const displayLists = createListsUi();
    cleanNode(section);
    appendChildren(section, [displayHeader, displayLists]);
    if (!isFirstLoad) addAppListeners();
    console.log(listeners);
}

const listHeader = () => {
    const header = document.createElement('header');
    header.classList.add('lists-header');
    const title = listsTitle();
    const newListBtn = newListBtnUi();

    appendChildren(header, [newListBtn, title]);

    return header;
}

const listsTitle = () => {
    const title = document.createElement('h2');
    title.classList.add('lists-title');
    title.textContent = 'Lists';

    return title;
}

const newListBtnUi = () => {
    const btnNewList = btnsUi(null, 'new', '+', null, null, {
        type: 'button',
        id: 'btn-new-list',
        class: 'btn'
    });

    return btnNewList; 
}

const createListsUi = () => {
    const projects = createList(lists, 'list', listsBtn, 'lists','lists', 'lists-items');
    return projects;
}

const listsBtn = list => {
    const btnTitle = btnsUi(null, 'title', list.title, null, null, {
        type: 'button',
        id: `btn-list-${list.id}`,
        class: 'btn-lists',
        'data-number': `${list.id}`,
        'data-name': `${list.title.toLowerCase().replaceAll(' ', '-').trim()}`,
        'data-type': `${list.type}`
    });

    const wrapper = document.createElement('span');
    setAttributes(wrapper, {
        id: `btns-lists-${list.id}`,
        class: 'btns-lists'
    });
    
    const btnEdit = btnsUi(list, 'edit', null, 'edit', 'list', {
        type: 'button',
        id:`btn-lists-edit-${list.id}`,
        class: 'btn-lists-edit',
        'aria-label': 'Button Edit List',
        'data-number': `${list.id}`,
        'data-type': `${list.type}`
    });
    
    const btnDelete = btnsUi(list, 'delete', null, 'delete-list', 'list', {
        type: 'button',
        id:`btn-lists-delete-${list.id}`,
        class: 'btn-lists-delete',
        'aria-label': 'Button Delete List',
        'data-number': `${list.id}`,
        'data-type': `${list.type}`
    });
    
    appendChildren(wrapper, [btnEdit, btnDelete]);
   
    return [btnTitle, wrapper];
}

export const newListUi = event => {
    const section = selectNode('#side-section-lists');

    const btnNewList = event.target;
    btnNewList.remove();
    //removeBtns('.btns-lists')
    
    const title = document.createElement('input');
    setAttributes(title, {
        type: 'text',
        id: 'new-list-title',
        class: 'new-list-title',
        name: 'new-list-title',
        maxlength: 15
    });

    section.appendChild(title);
}

const btnNewListDisabled = () => {
    const btnNewList = selectNode('#btn-new-list');
    btnNewList.removeEventListener('click', addNewList);
}
