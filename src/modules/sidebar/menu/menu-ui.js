import { selectNode, createList, setAttributes } from "../../helpers";
import { menuListeners } from "./menu-listener";

export const renderMenu = () => {
    const nav = selectNode('#side-navbar')
    const menu = createMenu();
    nav.appendChild(menu);
    menuListeners();
}

const createMenu = () => {
    const menu = createList([{title: 'Inbox'}, {title: 'Today'}, {title: 'This Week'}, {title: 'Anytime'}, {title: 'Complete'}], navBtn, 'menu', 'menu-items');

    return menu;
}

const navBtn = (name) => {
    const btn = document.createElement('button');
    setAttributes(btn, {
        type: 'button',
        id: `btn-${name.title.replace(' ', '-').toLowerCase().trim()}`,
        class: 'btn-menu'
    });
    btn.textContent = name.title;

    return [btn];
}