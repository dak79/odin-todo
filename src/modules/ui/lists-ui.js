import { cleanNode, selectNode, setAttributes, appendChildren, createUl, createLi } from '../helpers';
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
    const ul = createUl('menu');
    lists.map(list => {
        const node = createLi(list, ['lists-items', 'items'], listsBtn);
        ul.appendChild(node);    
    });

    cleanNode(section);
    appendChildren(section, [displayHeader, ul]);
    if (!isFirstLoad) {
        clearListeners(listeners);
        addAppListeners();
    }
}

const listHeader = () => {
    const header = document.createElement('header');
    header.classList.add('headers');
    const title = listsTitle();
    const newListBtn = btnsUi({type: 'list'}, 'new', ['btns', 'round-btns', 'round-btns-big'], 'Add new list');

    appendChildren(header, [newListBtn, title]);

    return header;
}

const listsTitle = () => {
    const title = document.createElement('h2');
    title.classList.add('titles');
    title.textContent = 'Lists';

    return title;
}

/**
 * List Ui
 * @param { {} } list - list instance 
 * @returns - Ui for a list instance
 */
const listsBtn = list => {
    
    const btnTitle = btnsUi(list, 'title', ['btns', 'lists-btns', 'text-btns'], `List title button: ${list.title}`);

    const wrapper = document.createElement('span');
    setAttributes(wrapper, {
        id: `btns-lists-${list.id}`,
        class: 'btns-lists'
    });

    const btnEdit = btnsUi(list, 'edit', ['btns', 'svg-btns', 'svg-btns-edit'], `Edit list: ${list.title}`);

    const btnDelete = btnsUi(list, 'delete', ['btns', 'svg-btns', 'svg-btns-delete'], `Delete list: ${list.title}`);
    
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
