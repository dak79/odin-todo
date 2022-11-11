import { btnsUi } from '../btns-ui';
import { selectNode, createList, setAttributes } from '../helpers';
import { addAppListeners } from '../listeners';

export const renderMenu = isFirstLoad => {
    const nav = selectNode('#side-navbar')
    const menu = createMenu();
    nav.appendChild(menu);
    if (!isFirstLoad) addAppListeners();
}

const createMenu = () => {
    const menu = createList([{id: 1, title: 'Inbox', tags:['menu']}, {id: 2, title: 'Today', tags:['menu']}, {id: 3, title: 'This Week', tags:['menu']}, {id: 4, title: 'Anytime', tags:['menu']}, {id: 5, title: 'Complete', tags:['menu']}], 'menu', navBtn, 'menu', 'menu', 'menu-items');

    return menu;
}

const navBtn = desk => {
    const btn = btnsUi(null, null, desk.title, null, {
        type: 'button',
        id: `btn-${desk.title.replace(' ', '-').toLowerCase().trim()}`,
        class: 'btn-menu',
        'data-name': `${desk.title.replace(' ', '-').toLowerCase().trim()}`
    });
    
    return [btn];
}