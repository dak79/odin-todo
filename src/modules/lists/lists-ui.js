import { createList, selectNode, setAttributes, appendChildren } from '../helpers';
import { lists } from './lists';

export const createProjectsUi = () => {
    const projects = createList(lists, listsBtn, 'lists', 'lists-items');
    return projects;
}

const listsBtn = (name) => {
    const btnTitle = document.createElement('button');
    setAttributes(btnTitle, {
        type: 'button',
        id: `btn-${name.title.replace(' ', '-').toLowerCase().trim()}`,
        class: 'btn-lists',
        'data-btn':`${name.title.replace(' ', '-').toLowerCase().trim()}`
    });
    btnTitle.textContent = name.title;

    const wrapper = document.createElement('span');
    wrapper.classList.add('btns-lists');
    
    const btnEdit = document.createElement('button');
    setAttributes(btnEdit, {
        type: 'button',
        class: 'btn-menu btn-lists-edit',
        'data-btn':`${name.title.replace(' ', '-').toLowerCase().trim()}`
    });
    btnEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-btn-edit" data-btn="${name.title.replace(' ', '-').toLowerCase().trim()}"><path data-btn="${name.title.replace(' ', '-').toLowerCase().trim()}" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>`;
    
    const btnDelete = document.createElement('button');
    setAttributes(btnDelete, {
        type: 'button',
        class: 'btn-menu btn-lists-delete'
    });
    btnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-btn-delete"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>';

    appendChildren(wrapper, [btnEdit, btnDelete]);
   
    return [btnTitle, wrapper];
}

export const newListUi = () => {
    const section = selectNode('#side-section-lists');

    const newListBtn = selectNode('#btn-new-list');
    newListBtn.disabled = true;
    
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
    console.log(event.target.dataset.btn);
    // if (event.target == path)
    

    // const data = event.target.parentNode.parentNode.previousSibling;
    // console.log(data);
    // if (data) {
    //     const input = selectNode(`#btn-${data}`);
    //     console.log(input);

    // }
}
