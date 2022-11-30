import { createList, cleanNode, selectNode, setAttributes, appendChildren, removeElement } from '../helpers';
import { lists } from '../lists';
import { listeners, addAppListeners, clearListeners } from '../listeners';
import { btnsUi } from './btns-ui';
import { textInputUi, appendInput } from './inputs-ui'

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
    if (!isFirstLoad) {
        clearListeners(listeners);
        addAppListeners()
    }
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
    const btnNewList = btnsUi(null, 'lists', 'new', 'btns round-btns round-btns-big', 'Add a new list for your project', 'new-list', '+');

    return btnNewList; 
}

const createListsUi = () => {
    const projects = createList(lists, 'list', listsBtn, 'menu','lists', ['lists-items', 'items']);
    return projects;
}

/**
 * List Ui
 * @param { {} } list - list instance 
 * @returns - Ui for a list instance
 */
const listsBtn = list => {
    const btnTitle = btnsUi(list, 'lists', 'title', 'btns lists-btns text-btns', `List title button: ${list.title}`, list.type, list.title);

    const wrapper = document.createElement('span');
    setAttributes(wrapper, {
        id: `btns-lists-${list.id}`,
        class: 'btns-lists'
    });
    
    const btnEdit = btnsUi(list, 'lists', 'edit', 'btns svg-btns svg-btns-edit', `Button Edit List: ${list.title}`, list.type, 'edit');
    
    const btnDelete = btnsUi(list, 'lists', 'delete', 'btns svg-btns svg-btns-delete', `Button Delete List: ${list.title}`, list.type, 'delete');
    
    appendChildren(wrapper, [btnEdit, btnDelete]);
   
    return [btnTitle, wrapper];
}

/**
 * New List Ui
 * @param { {} } object - Object for retriving data. 
 * @returns { node } An input field for new list.
 */
export const newListUi = object => {

    const input = textInputUi(object, 'new', false, 15);
    appendInput('#section-lists', null, input, false);
    
    return input;
}

/**
 * Edit List Ui
 * @param { Event } event 
 * @returns { {Node, Number} } Node for retriving new value and id for update the instance
 */
export const editListUi = (id, type) => {
    console.log(type)
    const input = textInputUi({type}, 'edit', false, 15);
    const nodes = appendInput(`#lists-title-btn-${id}`, `#list-item-lists-${id}`, input, true);
 
    removeElement(`#btns-lists-${id}`);
        
    return nodes;
}