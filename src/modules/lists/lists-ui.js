import { createList, cleanNode, selectNode, setAttributes, appendChildren, removeElement } from '../helpers';
import { lists } from './lists';
import { listeners, addAppListeners } from '../listeners';
import { btnsUi } from '../ui/btns-ui';
import { textInputUi, appendTextInput } from '../ui/text-input-ui'

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
    const btnNewList = btnsUi(null, 'lists', 'new', 'btns round-btns round-btns-big', 'Add a new list for your project', 'new-list', '+');

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

export const newListUi = object => {

    const input = textInputUi(object, 'new', false, 15);
    appendTextInput('#section-lists', null, input, false);
    
    return input;
}

/**
 * Edit list
 * @param { event } event 
 * @return { Node } nodes for change list title Ui.
 */
export const editListUi = event => {
    const input = textInputUi({type: 'list'}, 'edit', false, 15);
    const nodes = appendTextInput(`#lists-title-btn-${event.target.dataset.number}`, `#list-item-lists-${event.target.dataset.number}`, input, true);
    
    removeElement(`#btns-lists-${event.target.dataset.number}`);
        
    return nodes;
}
