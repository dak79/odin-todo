import { createList, selectNode, selectNodes, setAttributes, appendChildren } from '../../helpers';
import { lists } from './lists';
import { addNewList, editList, deleteList } from './lists-handlers';

export const listHeader = () => {
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
    btnNewList.addEventListener('click', addNewList);

    return btnNewList; 

}

export const createListsUi = () => {
    const projects = createList(lists, listsBtn, 'lists', 'lists-items');
    return projects;
}

const listsBtn = (list) => {
    const btnTitle = document.createElement('button');
    setAttributes(btnTitle, {
        type: 'button',
        id: `btn-${list.title.replaceAll(' ', '-').toLowerCase().trim()}`,
        class: 'btn-lists',
        'data-btn':`${list.title.replaceAll(' ', '-').toLowerCase().trim()}`,
        'data-list-id': `${list.id}`
    });
    btnTitle.textContent = list.title;

    const wrapper = document.createElement('span');
    wrapper.classList.add('btns-lists');
    
    const btnEdit = document.createElement('button');
    setAttributes(btnEdit, {
        type: 'button',
        class: 'btn-lists btn-lists-edit',
        'data-btn':`${list.title.replace(' ', '-').toLowerCase().trim()}`,
        'aria-label': 'Button Edit List'
    });
    btnEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-btn-edit" id="svg-${list.id}" data-btn="${list.title.replaceAll(' ', '-').toLowerCase().trim()}"><path id="svg-${list.id}" data-btn="${list.title.replaceAll(' ', '-').toLowerCase().trim()}" class="svg-btn-edit" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>`;
    
    const btnDelete = document.createElement('button');
    setAttributes(btnDelete, {
        type: 'button',
        class: 'btn-lists btn-lists-delete',
        'aria-label': 'Button Delete List'
    });
    btnDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-number="${list.id}" class="svg-btn-delete"><path data-number="${list.id}" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;

    appendChildren(wrapper, [btnEdit, btnDelete]);
   
    return [btnTitle, wrapper];
}

export const newListUi = event => {
    const section = selectNode('#side-section-lists');

    const btnNewList = event.target
    btnNewList.remove();
    
    const title = document.createElement('input');
    setAttributes(title, {
        type: 'text',
        id: 'new-list-title',
        class: 'new-list-title',
        name: 'new-list-title'
    });

    section.appendChild(title);
}

export const newListNameErrorUi = element => {
    element.value = 'Already exists';
    element.classList.add('new-lists-error');
    element.addEventListener('keydown', cancelText)

    function cancelText () {
        element.value = '';
        element.removeEventListener('keydown', cancelText);
        element.classList.remove('new-lists-error');
    }
}

export const editListUi = (event) => {

    const data = event.target.dataset.btn;
    const button = selectNode(`#btn-${data}`);
    const li = selectNode(`#${data}`);
    const btn = selectNode(`#${event.target.id}`);
    btn.remove();
    
    btnDeleteDisabled();
    btnNewListDisabled();

    const input = document.createElement('input');
    const inputValue = button.textContent;
    setAttributes(input, {
        type: 'text',
        id: 'edit-list-title',
        class: 'edit-list-title',
        name: 'edit-list-title'
    });

    input.value = inputValue;
    li.replaceChild(input, button);
    input.focus();

    return [button, input];
}

export const btnNewListDisabled = () => {
    const btnNewList = selectNode('#btn-new-list');
    btnNewList.removeEventListener('click', addNewList);
}

const btnDeleteDisabled = () => {
    const deleteBtns = selectNodes('.svg-btn-delete')
    deleteBtns.forEach(btnDelete => btnDelete.removeEventListener('click', deleteList));
}