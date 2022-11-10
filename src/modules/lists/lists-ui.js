import { createList, cleanNode, selectNode, setAttributes, appendChildren } from '../helpers';
import { lists } from './lists';
import { listeners, addAppListeners } from '../listeners';

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
    const btnNewList = document.createElement('button');
    setAttributes(btnNewList, {
        type: 'button',
        id: 'btn-new-list',
        class: 'btn'
    });
    btnNewList.textContent = '+';

    return btnNewList; 
}

const createListsUi = () => {
    const projects = createList(lists, 'list' /*list name*/, listsBtn, 'lists','lists', 'lists-items');
    return projects;
}

const listsBtn = (list) => {
    const btnTitle = document.createElement('button');
    setAttributes(btnTitle, {
        type: 'button',
        id: `btn-list-${list.id}`,
        class: 'btn-lists',
        'data-number': `${list.id}`,
        'data-name': `${list.title.toLowerCase().replaceAll(' ', '-').trim()}`,
        'data-type': `${list.type}`
    });
    btnTitle.textContent = list.title;

    const wrapper = document.createElement('span');
    setAttributes(wrapper, {
        id: `btns-lists-${list.id}`,
        class: 'btns-lists'
    });
    
    const btnEdit = document.createElement('button');
    setAttributes(btnEdit, {
        type: 'button',
        id:`btn-lists-edit-${list.id}`,
        class: 'btn-lists-edit',
        'aria-label': 'Button Edit List'
    });
    btnEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" id="svg-edit-${list.id}" class="svg-btns-edit" data-number="${list.id}" data-type="${list.type}"><path d="m19.725 9.4-4.9-4.875 1.25-1.275q.75-.75 1.812-.775 1.063-.025 1.913.775l1.225 1.225q.85.8.787 1.85-.062 1.05-.812 1.8ZM18.3 10.825 7.35 21.8H2.425v-4.9L13.4 5.95Z" id="svg-edit-path-${list.id}" class="svg-btns-edit" data-number="${list.id}" data-type="${list.type}"/></svg>`;
        
    const btnDelete = document.createElement('button');
    setAttributes(btnDelete, {
        type: 'button',
        id:`btn-lists-delete-${list.id}`,
        class: 'btn-lists-delete',
        'aria-label': 'Button Delete List'
    });
    btnDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" id="svg-delete-${list.id}" class="svg-btns-delete" data-number="${list.id}"><path d="M6.675 22.15q-1.4 0-2.4-.987-1-.988-1-2.413V6.225H1.7v-3.4h6.7v-1.65h7.175v1.65H22.3v3.4h-1.575V18.75q0 1.425-.987 2.413-.988.987-2.413.987Zm1.675-5.125h2.825V7.95H8.35Zm4.5 0h2.825V7.95H12.85Z" id="svg-delete-path-${list.id}"  class="svg-btns-delete" data-number="${list.id}"/></svg>`;
    
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
