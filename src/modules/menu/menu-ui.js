import { selectNode, createList, setAttributes } from "../helpers";
import { menuListeners } from "./menu-events";

export const renderMenu = () => {
    const nav = selectNode('#side-navbar')
    const menu = createMenu();
    nav.appendChild(menu);
    menuListeners();
}

const createMenu = () => {
    const menu = createList([{title: 'Inbox', tags:['menu']}, {title: 'Today', tags:['menu']}, {title: 'This Week', tags:['menu']}, {title: 'Anytime', tags:['menu']}, {title: 'Complete', tags:['menu']}], 'menu', navBtn, 'menu', 'menu-items');

    return menu;
}

const navBtn = (name) => {
    const btn = document.createElement('button');
    setAttributes(btn, {
        type: 'button',
        id: `btn-${name.title.replace(' ', '-').toLowerCase().trim()}`,
        class: 'btn-menu',
        'data-name': `${name.title.replace(' ', '-').toLowerCase().trim()}`
    });
    btn.textContent = name.title;

    return [btn];
}